import { NextResponse } from 'next/server';
import { getAllShipments } from '@/lib/db';
import { getServerSession } from 'next-auth';

export async function GET(request: Request) {
    try {
        const session = await getServerSession();
        // In a real app, checking session here is crucial. 

        const shipments = await getAllShipments();

        // Sort by creation date descending
        shipments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        return NextResponse.json(shipments);
    } catch (error) {
        console.error('Error listing shipments:', error);
        return NextResponse.json(
            { error: 'Failed to list shipments' },
            { status: 500 }
        );
    }
}
