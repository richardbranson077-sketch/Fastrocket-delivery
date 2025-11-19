import { NextResponse } from 'next/server';
import { getShipment } from '@/lib/db';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const id = (await params).id;
        const shipment = await getShipment(id);

        if (!shipment) {
            return NextResponse.json(
                { error: 'Shipment not found' },
                { status: 404 }
            );
        }

        // Transform DB structure to frontend structure
        const shipmentData = {
            id: shipment.trackingNumber,
            trackingNumber: shipment.trackingNumber,
            status: shipment.status,
            estimatedDelivery: shipment.estimatedDelivery,
            origin: shipment.senderAddress.split(',').pop()?.trim() || 'Unknown',
            destination: shipment.receiverAddress.split(',').pop()?.trim() || 'Unknown',
            sender: {
                name: shipment.senderName,
                address: shipment.senderAddress,
                phone: shipment.senderPhone
            },
            receiver: {
                name: shipment.receiverName,
                address: shipment.receiverAddress,
                phone: shipment.receiverPhone
            },
            packageDetails: {
                weight: `${shipment.weight} kg`,
                type: shipment.serviceType,
                description: shipment.contents || 'Package'
            },
            events: shipment.events
        };

        return NextResponse.json(shipmentData);
    } catch (error) {
        console.error('Error fetching shipment:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
