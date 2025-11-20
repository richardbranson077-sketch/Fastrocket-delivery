'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Package,
    Plus,
    Search,
    LogOut,
    Rocket,
    Truck,
    CheckCircle,
    AlertCircle,
    Edit,
    X
} from 'lucide-react';
import { signOut } from 'next-auth/react';
import { Shipment } from '@/lib/db';

export default function AdminDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [shipments, setShipments] = useState<Shipment[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Modal State
    const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [updateForm, setUpdateForm] = useState({
        status: '',
        location: '',
        description: ''
    });
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        }
    }, [status, router]);

    const fetchShipments = async () => {
        try {
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

    useEffect(() => {
        if (session) {
            fetchShipments();
        }
    }, [session]);

    const openUpdateModal = (shipment: Shipment) => {
        setSelectedShipment(shipment);
        setUpdateForm({
            status: shipment.status,
            location: '',
            description: ''
        });
        setIsUpdateModalOpen(true);
    };

    const handleUpdateSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedShipment) return;

        setIsUpdating(true);
        try {
            const response = await fetch('/api/shipments/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    trackingNumber: selectedShipment.trackingNumber,
                    status: updateForm.status,
                    location: updateForm.location,
                    description: updateForm.description
                })
            });

            if (!response.ok) throw new Error('Failed to update');

            alert('Shipment updated and notifications sent!');
            setIsUpdateModalOpen(false);
            fetchShipments(); // Refresh list
        } catch (error) {
            console.error('Update failed:', error);
            alert('Failed to update shipment');
        } finally {
            setIsUpdating(false);
        }
    };

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
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => openUpdateModal(shipment)}
                                                        className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-primary"
                                                        title="Update Status"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </button>
                                                    <Link
                                                        href={`/tracking?id=${shipment.trackingNumber}`}
                                                        className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-primary"
                                                        title="View Details"
                                                    >
                                                        <Search className="h-4 w-4" />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            {/* Update Status Modal */}
            <AnimatePresence>
                {isUpdateModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:bg-slate-900"
                        >
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-xl font-bold">Update Status</h2>
                                <button
                                    onClick={() => setIsUpdateModalOpen(false)}
                                    className="rounded-full p-1 hover:bg-muted"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="mb-4 rounded-lg bg-muted/50 p-3 text-sm">
                                <p><span className="font-semibold">Tracking #:</span> {selectedShipment?.trackingNumber}</p>
                            </div>

                            <form onSubmit={handleUpdateSubmit} className="space-y-4">
                                <div>
                                    <label className="mb-1 block text-sm font-medium">New Status</label>
                                    <select
                                        value={updateForm.status}
                                        onChange={(e) => setUpdateForm({ ...updateForm, status: e.target.value })}
                                        className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                        required
                                    >
                                        <option value="pending">Pending Pickup</option>
                                        <option value="picked_up">Picked Up</option>
                                        <option value="processing">Processing at Facility</option>
                                        <option value="in_transit">In Transit</option>
                                        <option value="customs">Customs Clearance</option>
                                        <option value="out_for_delivery">Out for Delivery</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="exception">Exception / Delay</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-medium">Location</label>
                                    <input
                                        type="text"
                                        value={updateForm.location}
                                        onChange={(e) => setUpdateForm({ ...updateForm, location: e.target.value })}
                                        placeholder="e.g., New York Distribution Center"
                                        className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-medium">Description</label>
                                    <textarea
                                        value={updateForm.description}
                                        onChange={(e) => setUpdateForm({ ...updateForm, description: e.target.value })}
                                        placeholder="e.g., Package has arrived at the facility"
                                        rows={3}
                                        className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                        required
                                    />
                                </div>

                                <div className="flex justify-end gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsUpdateModalOpen(false)}
                                        className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isUpdating}
                                        className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                                    >
                                        {isUpdating ? 'Updating...' : 'Update & Notify'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
