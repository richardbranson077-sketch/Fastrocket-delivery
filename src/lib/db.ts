import { supabaseAdmin } from './supabase';

export interface Shipment {
    trackingNumber: string;
    senderName: string;
    senderAddress: string;
    senderPhone: string;
    senderEmail?: string;
    senderCountry?: string;
    senderZip?: string;
    receiverName: string;
    receiverAddress: string;
    receiverPhone: string;
    receiverEmail?: string;
    receiverCountry?: string;
    receiverZip?: string;
    weight: string;
    serviceType: string;
    status: string;
    dateSent: string;
    estimatedDelivery: string;
    contents?: string;
    paymentMode?: string;
    instructions?: string;
    createdAt: string;
    events: ShipmentEvent[];
}

export interface ShipmentEvent {
    id: string;
    status: string;
    location: string;
    timestamp: string;
    description: string;
}

// Database types (match Supabase schema with snake_case)
interface DbShipment {
    id: string;
    tracking_number: string;
    sender_name: string;
    sender_address: string;
    sender_phone: string;
    sender_email: string | null;
    sender_country: string | null;
    sender_zip: string | null;
    receiver_name: string;
    receiver_address: string;
    receiver_phone: string;
    receiver_email: string | null;
    receiver_country: string | null;
    receiver_zip: string | null;
    weight: string;
    service_type: string;
    status: string;
    date_sent: string;
    estimated_delivery: string;
    contents: string | null;
    payment_mode: string | null;
    instructions: string | null;
    created_at: string;
}

interface DbShipmentEvent {
    id: string;
    shipment_id: string;
    status: string;
    location: string;
    description: string;
    timestamp: string;
    created_at: string;
}

// Convert database format to app format
function dbToShipment(dbShipment: DbShipment, events: DbShipmentEvent[]): Shipment {
    return {
        trackingNumber: dbShipment.tracking_number,
        senderName: dbShipment.sender_name,
        senderAddress: dbShipment.sender_address,
        senderPhone: dbShipment.sender_phone,
        senderEmail: dbShipment.sender_email || undefined,
        senderCountry: dbShipment.sender_country || undefined,
        senderZip: dbShipment.sender_zip || undefined,
        receiverName: dbShipment.receiver_name,
        receiverAddress: dbShipment.receiver_address,
        receiverPhone: dbShipment.receiver_phone,
        receiverEmail: dbShipment.receiver_email || undefined,
        receiverCountry: dbShipment.receiver_country || undefined,
        receiverZip: dbShipment.receiver_zip || undefined,
        weight: dbShipment.weight,
        serviceType: dbShipment.service_type,
        status: dbShipment.status,
        dateSent: dbShipment.date_sent,
        estimatedDelivery: dbShipment.estimated_delivery,
        contents: dbShipment.contents || undefined,
        paymentMode: dbShipment.payment_mode || undefined,
        instructions: dbShipment.instructions || undefined,
        createdAt: dbShipment.created_at,
        events: events.map(e => ({
            id: e.id,
            status: e.status,
            location: e.location,
            timestamp: e.timestamp,
            description: e.description
        }))
    };
}

export async function getAllShipments(): Promise<Shipment[]> {
    const { data: shipments, error: shipmentsError } = await supabaseAdmin
        .from('shipments')
        .select('*')
        .order('created_at', { ascending: false });

    if (shipmentsError) {
        console.error('Error fetching shipments:', shipmentsError);
        return [];
    }

    if (!shipments || shipments.length === 0) {
        return [];
    }

    // Fetch all events for all shipments
    const { data: allEvents, error: eventsError } = await supabaseAdmin
        .from('shipment_events')
        .select('*')
        .order('timestamp', { ascending: false });

    if (eventsError) {
        console.error('Error fetching events:', eventsError);
        return [];
    }

    // Group events by shipment_id
    const eventsByShipment = (allEvents || []).reduce((acc, event) => {
        if (!acc[event.shipment_id]) {
            acc[event.shipment_id] = [];
        }
        acc[event.shipment_id].push(event);
        return acc;
    }, {} as Record<string, DbShipmentEvent[]>);

    return shipments.map(s => dbToShipment(s as DbShipment, eventsByShipment[s.id] || []));
}

export async function getShipment(trackingNumber: string): Promise<Shipment | null> {
    const { data: shipment, error: shipmentError } = await supabaseAdmin
        .from('shipments')
        .select('*')
        .eq('tracking_number', trackingNumber)
        .single();

    if (shipmentError || !shipment) {
        return null;
    }

    const { data: events, error: eventsError } = await supabaseAdmin
        .from('shipment_events')
        .select('*')
        .eq('shipment_id', shipment.id)
        .order('timestamp', { ascending: false });

    if (eventsError) {
        console.error('Error fetching events:', eventsError);
        return null;
    }

    return dbToShipment(shipment as DbShipment, (events || []) as DbShipmentEvent[]);
}

export async function createShipment(shipment: Omit<Shipment, 'createdAt' | 'events'>): Promise<Shipment> {
    // Insert shipment
    const { data: newShipment, error: shipmentError } = await supabaseAdmin
        .from('shipments')
        .insert({
            tracking_number: shipment.trackingNumber,
            sender_name: shipment.senderName,
            sender_address: shipment.senderAddress,
            sender_phone: shipment.senderPhone,
            sender_email: shipment.senderEmail || null,
            sender_country: shipment.senderCountry || null,
            sender_zip: shipment.senderZip || null,
            receiver_name: shipment.receiverName,
            receiver_address: shipment.receiverAddress,
            receiver_phone: shipment.receiverPhone,
            receiver_email: shipment.receiverEmail || null,
            receiver_country: shipment.receiverCountry || null,
            receiver_zip: shipment.receiverZip || null,
            weight: shipment.weight,
            service_type: shipment.serviceType,
            status: shipment.status,
            date_sent: shipment.dateSent,
            estimated_delivery: shipment.estimatedDelivery,
            contents: shipment.contents || null,
            payment_mode: shipment.paymentMode || null,
            instructions: shipment.instructions || null
        })
        .select()
        .single();

    if (shipmentError || !newShipment) {
        throw new Error(`Failed to create shipment: ${shipmentError?.message}`);
    }

    // Create initial event
    const { error: eventError } = await supabaseAdmin
        .from('shipment_events')
        .insert({
            shipment_id: newShipment.id,
            status: 'created',
            location: shipment.senderAddress.split(',').pop()?.trim() || 'Origin Facility',
            description: 'Shipment information received'
        });

    if (eventError) {
        console.error('Error creating initial event:', eventError);
    }

    // Fetch the complete shipment with events
    const result = await getShipment(shipment.trackingNumber);
    if (!result) {
        throw new Error('Failed to fetch created shipment');
    }

    return result;
}

export async function updateShipmentStatus(
    trackingNumber: string,
    status: string,
    location: string,
    description: string
): Promise<Shipment | null> {
    // Get shipment ID
    const { data: shipment, error: shipmentError } = await supabaseAdmin
        .from('shipments')
        .select('id')
        .eq('tracking_number', trackingNumber)
        .single();

    if (shipmentError || !shipment) {
        return null;
    }

    // Update shipment status
    const { error: updateError } = await supabaseAdmin
        .from('shipments')
        .update({ status })
        .eq('id', shipment.id);

    if (updateError) {
        console.error('Error updating shipment:', updateError);
        return null;
    }

    // Create new event
    const { error: eventError } = await supabaseAdmin
        .from('shipment_events')
        .insert({
            shipment_id: shipment.id,
            status,
            location,
            description
        });

    if (eventError) {
        console.error('Error creating event:', eventError);
        return null;
    }

    // Return updated shipment
    return await getShipment(trackingNumber);
}
