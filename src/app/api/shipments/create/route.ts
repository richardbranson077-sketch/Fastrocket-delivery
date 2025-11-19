import { NextResponse } from 'next/server';
import { createShipment } from '@/lib/db';
import { getServerSession } from 'next-auth';

export async function POST(request: Request) {
    try {
        const session = await getServerSession();
        // In a real app, checking session here is crucial. 
        // For now, we'll allow it but ideally we pass auth options to getServerSession

        const body = await request.json();

        // Basic validation
        if (!body.trackingNumber || !body.senderName || !body.receiverName) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const shipment = await createShipment(body);

        return NextResponse.json(shipment, { status: 201 });
    } catch (error) {
        console.error('Error creating shipment:', error);
        return NextResponse.json(
            { error: 'Failed to create shipment' },
            { status: 500 }
        );
    }
}
