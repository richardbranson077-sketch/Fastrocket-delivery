export type TrackingStatus = 'ordered' | 'processing' | 'shipped' | 'out_for_delivery' | 'delivered';

export interface TrackingEvent {
    id: string;
    status: TrackingStatus;
    location: string;
    timestamp: string;
    description: string;
}

export interface ShipmentData {
    id: string;
    trackingNumber: string;
    status: TrackingStatus;
    estimatedDelivery: string;
    origin: string;
    destination: string;
    sender: {
        name: string;
        address: string;
        phone: string;
    };
    receiver: {
        name: string;
        address: string;
        phone: string;
    };
    packageDetails: {
        weight: string;
        type: string;
        description: string;
    };
    events: TrackingEvent[];
}

export const MOCK_SHIPMENTS: Record<string, ShipmentData> = {
    'FR-123456789': {
        id: '1',
        trackingNumber: 'FR-123456789',
        status: 'out_for_delivery',
        estimatedDelivery: 'Today, by 8:00 PM',
        origin: 'New York, NY',
        destination: 'San Francisco, CA',
        sender: {
            name: 'John Smith',
            address: '123 Broadway Ave, New York, NY 10001',
            phone: '+1 (212) 555-0123'
        },
        receiver: {
            name: 'Jane Doe',
            address: '456 Market Street, San Francisco, CA 94102',
            phone: '+1 (415) 555-0456'
        },
        packageDetails: {
            weight: '2.5 lbs',
            type: 'Express',
            description: 'Electronics - Laptop Accessories'
        },
        events: [
            {
                id: 'e1',
                status: 'out_for_delivery',
                location: 'San Francisco, CA',
                timestamp: '2023-10-27T08:30:00Z',
                description: 'Out for delivery',
            },
            {
                id: 'e2',
                status: 'shipped',
                location: 'San Francisco Distribution Center',
                timestamp: '2023-10-27T06:15:00Z',
                description: 'Arrived at local facility',
            },
            {
                id: 'e3',
                status: 'shipped',
                location: 'Denver, CO',
                timestamp: '2023-10-26T14:20:00Z',
                description: 'Departed transit facility',
            },
            {
                id: 'e4',
                status: 'processing',
                location: 'New York, NY',
                timestamp: '2023-10-25T10:00:00Z',
                description: 'Package received at origin facility',
            },
            {
                id: 'e5',
                status: 'ordered',
                location: 'Online',
                timestamp: '2023-10-25T09:00:00Z',
                description: 'Order placed',
            },
        ],
    },
    'FR-DELIVERED': {
        id: '2',
        trackingNumber: 'FR-DELIVERED',
        status: 'delivered',
        estimatedDelivery: 'Delivered',
        origin: 'Chicago, IL',
        destination: 'Austin, TX',
        sender: {
            name: 'Tech Store Inc.',
            address: '789 Michigan Ave, Chicago, IL 60611',
            phone: '+1 (312) 555-0789'
        },
        receiver: {
            name: 'Michael Johnson',
            address: '321 Congress Ave, Austin, TX 78701',
            phone: '+1 (512) 555-0321'
        },
        packageDetails: {
            weight: '5.0 lbs',
            type: 'Standard',
            description: 'Books and Documents'
        },
        events: [
            {
                id: 'e1',
                status: 'delivered',
                location: 'Austin, TX',
                timestamp: '2023-10-26T14:30:00Z',
                description: 'Delivered to front porch',
            },
        ],
    },
};

export async function getTrackingData(trackingNumber: string): Promise<ShipmentData | null> {
    try {
        const response = await fetch(`/api/tracking/${trackingNumber}`);
        if (!response.ok) {
            if (response.status === 404) return null;
            throw new Error('Failed to fetch data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching tracking data:', error);
        return null;
    }
}
