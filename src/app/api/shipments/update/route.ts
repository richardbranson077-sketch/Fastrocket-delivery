import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db';
import { notifyStatusUpdate } from '@/lib/notifications';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { trackingNumber, status, location, description } = body;

        if (!trackingNumber || !status) {
            return NextResponse.json(
                { error: 'Tracking number and status are required' },
                { status: 400 }
            );
        }

        // 1. Get current shipment data (for contact info)
        const { data: shipment, error: fetchError } = await supabase
            .from('shipments')
            .select('*')
            .eq('tracking_number', trackingNumber)
            .single();

        if (fetchError || !shipment) {
            return NextResponse.json(
                { error: 'Shipment not found' },
                { status: 404 }
            );
        }

        // 2. Update shipment status
        const { error: updateError } = await supabase
            .from('shipments')
            .update({ status })
            .eq('tracking_number', trackingNumber);

        if (updateError) {
            return NextResponse.json(
                { error: 'Failed to update shipment status' },
                { status: 500 }
            );
        }

        // 3. Add shipment event
        const { error: eventError } = await supabase
            .from('shipment_events')
            .insert({
                shipment_id: shipment.id,
                status,
                location: location || 'Processing Center',
                description: description || `Shipment status updated to ${status.replace(/_/g, ' ')}`,
                timestamp: new Date().toISOString(),
            });

        if (eventError) {
            console.error('Failed to add shipment event:', eventError);
            // Continue anyway as the main update succeeded
        }

        // 4. Trigger Notification
        // We map the DB fields to the ShipmentData interface expected by notifications
        const shipmentData = {
            trackingNumber: shipment.tracking_number,
            sender: {
                name: shipment.sender_name,
                email: shipment.sender_email,
                phone: shipment.sender_phone,
                address: shipment.sender_address,
            },
            receiver: {
                name: shipment.receiver_name,
                email: shipment.receiver_email,
                phone: shipment.receiver_phone,
                address: shipment.receiver_address,
            },
            // ... other fields if needed by notification template
        };

        // Run notification in background (don't await)
        notifyStatusUpdate(
            shipmentData as any, // Type assertion for simplicity, ensure fields match
            status,
            location || 'Processing Center',
            description || `Shipment status updated to ${status.replace(/_/g, ' ')}`
        ).catch(err => console.error('Notification failed:', err));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error updating shipment:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
