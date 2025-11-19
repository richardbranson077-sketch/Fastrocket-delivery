'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    Package,
    Plus,
    Search,
    LogOut,
    Rocket,
    Truck,
    CheckCircle,
    AlertCircle
} from 'lucide-react';
import { signOut } from 'next-auth/react';
import { Shipment } from '@/lib/db';

export default function AdminDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [shipments, setShipments] = useState<Shipment[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        }
    }, [status, router]);

    useEffect(() => {
        const fetchShipments = async () => {
            try {
                // Since we don't have a dedicated "get all" API yet, we'll create one or just rely on the file system if we were server-side.
                // But since this is a client component, we need an API.
                // Let's quickly create a simple API route for getting all shipments or just use the create one with GET? 
                // Actually, let's just add a GET handler to /api/shipments/create for listing all (renaming it would be better but let's stick to simple for now)
                // Wait, I should create a new route /api/shipments/list

                const response = await fetch('/api/shipments/list');
                if (response.ok) {
                    const data = await response.json();
                    setShipments(data);
                }
            } catch (error) {
                console.error('Failed to fetch shipments:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (session) {
            fetchShipments();
        }
    }, [session]);

    if (status === 'loading' || isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
        );
    }

    if (!session) {
        return null;
    }

    const filteredShipments = shipments.filter(s =>
        s.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.receiverName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
            {/* Header */}
            <header className="border-b bg-white/50 backdrop-blur-sm dark:bg-slate-900/50">
                <div className="container mx-auto flex items-center justify-between px-4 py-4">
                    <div className="flex items-center space-x-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                            <Rocket className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold">FastRocket Admin</h1>
                            <p className="text-sm text-muted-foreground">Welcome, {session.user?.name}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="flex items-center space-x-2 rounded-lg border px-4 py-2 text-sm transition-colors hover:bg-muted"
                    >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                        <p className="text-muted-foreground">Manage shipments and tracking</p>
                    </div>
                    <Link
                        href="/admin/create"
                        className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground shadow-lg transition-colors hover:bg-primary/90"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        New Shipment
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="mb-8 grid gap-4 md:grid-cols-4">
                    <div className="rounded-xl border bg-white p-6 shadow-sm dark:bg-slate-900">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Total Shipments</p>
                                <h3 className="text-2xl font-bold">{shipments.length}</h3>
                            </div>
                            <Package className="h-8 w-8 text-blue-500 opacity-20" />
                        </div>
                    </div>
                    <div className="rounded-xl border bg-white p-6 shadow-sm dark:bg-slate-900">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">In Transit</p>
                                <h3 className="text-2xl font-bold">{shipments.filter(s => s.status === 'in_transit').length}</h3>
                            </div>
                            <Truck className="h-8 w-8 text-orange-500 opacity-20" />
                        </div>
                    </div>
                    <div className="rounded-xl border bg-white p-6 shadow-sm dark:bg-slate-900">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Delivered</p>
                                <h3 className="text-2xl font-bold">{shipments.filter(s => s.status === 'delivered').length}</h3>
                            </div>
                            <CheckCircle className="h-8 w-8 text-green-500 opacity-20" />
                        </div>
                    </div>
                    <div className="rounded-xl border bg-white p-6 shadow-sm dark:bg-slate-900">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                                <h3 className="text-2xl font-bold">{shipments.filter(s => s.status === 'pending').length}</h3>
                            </div>
                            <AlertCircle className="h-8 w-8 text-yellow-500 opacity-20" />
                        </div>
                    </div>
                </div>

                {/* Recent Shipments */}
                <div className="rounded-xl border bg-white shadow-sm dark:bg-slate-900">
                    <div className="flex items-center justify-between border-b p-6">
                        <h2 className="text-lg font-semibold">Recent Shipments</h2>
                        <div className="relative w-64">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search shipments..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full rounded-lg border bg-muted/50 py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="border-b bg-muted/50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Tracking #</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Sender</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Receiver</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                                    <th className="px-6 py-4 text-right text-sm font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredShipments.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center">
                                            <Package className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
                                            <p className="mb-2 text-lg font-medium">No shipments yet</p>
                                            <p className="mb-4 text-sm text-muted-foreground">
                                                Create your first shipment to get started
                                            </p>
                                            <Link
                                                href="/admin/create"
                                                className="inline-flex items-center space-x-2 rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                                            >
                                                <Plus className="h-4 w-4" />
                                                <span>Create Shipment</span>
                                            </Link>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredShipments.map((shipment) => (
                                        <tr key={shipment.trackingNumber} className="border-b hover:bg-muted/50">
                                            <td className="px-6 py-4 font-medium">
                                                <Link href={`/tracking?id=${shipment.trackingNumber}`} className="text-primary hover:underline">
                                                    {shipment.trackingNumber}
                                                </Link>
                                            </td>
                                            <td className="px-6 py-4">{shipment.senderName}</td>
                                            <td className="px-6 py-4">{shipment.receiverName}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${shipment.status === 'delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                                                        shipment.status === 'in_transit' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                                                            'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                                    }`}>
                                                    {shipment.status.replace('_', ' ').toUpperCase()}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-muted-foreground">
                                                {new Date(shipment.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Link href={`/tracking?id=${shipment.trackingNumber}`} className="text-sm font-medium text-primary hover:underline">
                                                    View
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
