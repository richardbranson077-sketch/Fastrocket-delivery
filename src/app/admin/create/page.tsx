'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Package } from 'lucide-react';

export default function CreateShipment() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        trackingNumber: `FR${Date.now()}`,
        senderName: '',
        senderAddress: '',
        senderPhone: '',
        senderEmail: '',
        senderCountry: '',
        senderZip: '',
        receiverName: '',
        receiverAddress: '',
        receiverPhone: '',
        receiverEmail: '',
        receiverCountry: '',
        receiverZip: '',
        weight: '',
        serviceType: 'standard',
        status: 'pending',
        dateSent: '',
        estimatedDelivery: '',
        contents: '',
        paymentMode: 'prepaid',
        instructions: ''
    });

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        }
        // Set default date on client side only to avoid hydration mismatch
        setFormData(prev => ({
            ...prev,
            dateSent: new Date().toISOString().split('T')[0]
        }));
    }, [status, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('/api/shipments/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to create shipment');
            }

            const data = await response.json();
            alert(`Shipment created successfully! Tracking Number: ${data.trackingNumber}`);
            router.push('/admin');
        } catch (error) {
            console.error('Error creating shipment:', error);
            alert('Failed to create shipment. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    if (status === 'loading') {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
        );
    }

    if (!session) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
            <div className="container mx-auto px-4 py-8">
                <Link
                    href="/admin"
                    className="mb-6 inline-flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground"
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to Dashboard</span>
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mx-auto max-w-4xl"
                >
                    <div className="mb-6">
                        <h1 className="mb-2 text-3xl font-bold">Create New Shipment</h1>
                        <p className="text-muted-foreground">Fill in the details to create a new tracking number</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Tracking Number */}
                        <div className="rounded-xl border bg-white p-6 shadow-sm dark:bg-slate-900">
                            <h2 className="mb-4 text-lg font-semibold">Tracking Information</h2>
                            <div className="grid gap-4">
                                <div>
                                    <label className="mb-2 block text-sm font-medium">Tracking Number</label>
                                    <input
                                        type="text"
                                        name="trackingNumber"
                                        value={formData.trackingNumber}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border bg-muted/50 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                                        readOnly
                                    />
                                    <p className="mt-1 text-xs text-muted-foreground">Auto-generated tracking number</p>
                                </div>
                            </div>
                        </div>

                        {/* Sender Information */}
                        <div className="rounded-xl border bg-white p-6 shadow-sm dark:bg-slate-900">
                            <h2 className="mb-4 text-lg font-semibold">Sender Information</h2>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-medium">Name *</label>
                                    <input
                                        type="text"
                                        name="senderName"
                                        value={formData.senderName}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium">Phone *</label>
                                    <input
                                        type="tel"
                                        name="senderPhone"
                                        value={formData.senderPhone}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium">Email</label>
                                    <input
                                        type="email"
                                        name="senderEmail"
                                        value={formData.senderEmail}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium">Country *</label>
                                    <input
                                        type="text"
                                        name="senderCountry"
                                        value={formData.senderCountry}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium">Zip Code *</label>
                                    <input
                                        type="text"
                                        name="senderZip"
                                        value={formData.senderZip}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="mb-2 block text-sm font-medium">Address *</label>
                                    <textarea
                                        name="senderAddress"
                                        value={formData.senderAddress}
                                        onChange={handleChange}
                                        required
                                        rows={3}
                                        className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Receiver Information */}
                        <div className="rounded-xl border bg-white p-6 shadow-sm dark:bg-slate-900">
                            <h2 className="mb-4 text-lg font-semibold">Receiver Information</h2>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-medium">Name *</label>
                                    <input
                                        type="text"
                                        name="receiverName"
                                        value={formData.receiverName}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium">Phone *</label>
                                    <input
                                        type="tel"
                                        name="receiverPhone"
                                        value={formData.receiverPhone}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium">Email</label>
                                    <input
                                        type="email"
                                        name="receiverEmail"
                                        value={formData.receiverEmail}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium">Country *</label>
                                    <input
                                        type="text"
                                        name="receiverCountry"
                                        value={formData.receiverCountry}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium">Zip Code *</label>
                                    <input
                                        type="text"
                                        name="receiverZip"
                                        value={formData.receiverZip}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="mb-2 block text-sm font-medium">Address *</label>
                                    <textarea
                                        name="receiverAddress"
                                        value={formData.receiverAddress}
                                        onChange={handleChange}
                                        required
                                        rows={3}
                                        className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Package Details */}
                        <div className="rounded-xl border bg-white p-6 shadow-sm dark:bg-slate-900">
                            <h2 className="mb-4 text-lg font-semibold">Package Details</h2>
                            <div className="grid gap-4 md:grid-cols-3">
                                <div>
                                    <label className="mb-2 block text-sm font-medium">Weight (kg) *</label>
                                    <input
                                        type="number"
                                        name="weight"
                                        value={formData.weight}
                                        onChange={handleChange}
                                        required
                                        step="0.1"
                                        min="0"
                                        className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>

                                <div className="md:col-span-3">
                                    <label className="mb-2 block text-sm font-medium">Package Contents Description *</label>
                                    <input
                                        type="text"
                                        name="contents"
                                        placeholder="e.g., Electronics, Documents, Clothing"
                                        className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Service & Shipping */}
                        <div className="rounded-xl border bg-white p-6 shadow-sm dark:bg-slate-900">
                            <h2 className="mb-4 text-lg font-semibold">Service & Shipping</h2>
                            <div className="grid gap-4 md:grid-cols-3">
                                <div>
                                    <label className="mb-2 block text-sm font-medium">Service Type *</label>
                                    <select
                                        name="serviceType"
                                        value={formData.serviceType}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                                    >
                                        <option value="express">Express Delivery (1-2 Days)</option>
                                        <option value="standard">Standard Delivery (3-5 Days)</option>
                                        <option value="international">International Economy</option>
                                        <option value="international_priority">International Priority</option>
                                        <option value="freight">Freight / Cargo</option>
                                        <option value="same_day">Same Day Delivery</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium">Current Status *</label>
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
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
                                    <label className="mb-2 block text-sm font-medium">Payment Mode</label>
                                    <select
                                        name="paymentMode"
                                        className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                                    >
                                        <option value="prepaid">Prepaid</option>
                                        <option value="cod">Cash on Delivery (COD)</option>
                                        <option value="credit">Credit Account</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium">Date Sent</label>
                                    <input
                                        type="date"
                                        name="dateSent"
                                        value={formData.dateSent}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium">Estimated Delivery</label>
                                    <input
                                        type="date"
                                        name="estimatedDelivery"
                                        value={formData.estimatedDelivery}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="mb-2 block text-sm font-medium">Special Instructions</label>
                                    <input
                                        type="text"
                                        name="instructions"
                                        placeholder="e.g., Fragile, Handle with care, Call before delivery"
                                        className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end space-x-4">
                            <Link
                                href="/admin"
                                className="rounded-lg border px-6 py-3 font-medium transition-colors hover:bg-muted"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="inline-flex items-center space-x-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-3 font-medium text-white shadow-lg transition-all hover:from-blue-600 hover:to-cyan-600 disabled:opacity-50"
                            >
                                {isLoading ? (
                                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                ) : (
                                    <>
                                        <Save className="h-5 w-5" />
                                        <span>Create Shipment</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
