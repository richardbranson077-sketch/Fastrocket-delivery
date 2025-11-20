'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { getTrackingData, ShipmentData } from '@/lib/tracking';
import { Search, Package, Truck, CheckCircle, MapPin, Clock, AlertCircle, HelpCircle, ChevronDown, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

function TrackingContent() {
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get('id') || '';
    const [query, setQuery] = useState(initialQuery);
    const [data, setData] = useState<ShipmentData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [hasSearched, setHasSearched] = useState(false);

    const t = useTranslations('Tracking');

    useEffect(() => {
        if (initialQuery) {
            handleSearch(initialQuery);
        }
    }, [initialQuery]);

    const handleSearch = async (trackingId: string) => {
        if (!trackingId.trim()) return;

        setLoading(true);
        setError('');
        setHasSearched(true);
        setData(null);

        try {
            const result = await getTrackingData(trackingId);
            if (result) {
                setData(result);
            } else {
                setError(t('notFound'));
            }
        } catch (err) {
            setError(t('error'));
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSearch(query);
    };

    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

    const handleDownloadPDF = async () => {
        setIsGeneratingPDF(true);
        try {
            const element = document.getElementById('tracking-result');
            if (!element) {
                throw new Error('Tracking result element not found');
            }

            // Dynamically import libraries to ensure they load correctly on the client
            const html2canvas = (await import('html2canvas')).default;
            const { jsPDF } = await import('jspdf');

            console.log('Generating canvas...');
            const canvas = await html2canvas(element, {
                scale: 2,
                logging: true,
                useCORS: true,
                backgroundColor: '#ffffff',
                foreignObjectRendering: false
            });

            console.log('Canvas generated, creating PDF...');
            try {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF({
                    orientation: 'portrait',
                    unit: 'mm',
                    format: 'a4'
                });

                const imgWidth = 210;
                const imgHeight = (canvas.height * imgWidth) / canvas.width;

                pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
                pdf.save(`tracking-${data?.trackingNumber || 'receipt'}.pdf`);
                console.log('PDF saved successfully');
            } catch (canvasError) {
                console.error('Canvas to DataURL error:', canvasError);
                throw new Error('Security Error: Canvas is tainted. Please try printing instead.');
            }
        } catch (err: any) {
            console.error('Error generating PDF:', err);
            const shouldPrint = confirm(`Failed to generate PDF automatically: ${err.message || 'Unknown error'}.\n\nWould you like to open the print dialog instead?`);
            if (shouldPrint) {
                window.print();
            }
        } finally {
            setIsGeneratingPDF(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
            {/* Hero Header */}
            <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-16 text-white">
                <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
                <motion.div
                    animate={{
                        y: [0, -20, 0],
                        opacity: [0.15, 0.25, 0.15],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute right-0 top-0 -z-10 h-[300px] w-[300px] rounded-full bg-orange-500/20 blur-[100px]"
                ></motion.div>

                <div className="container max-w-screen-lg px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-orange-500/20 px-4 py-1.5 text-sm font-medium text-orange-300 backdrop-blur-sm ring-1 ring-orange-500/30">
                            <Package className="h-4 w-4" />
                            Package Tracking
                        </div>
                        <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">{t('title')}</h1>
                        <p className="text-slate-300">{t('subtitle')}</p>
                    </motion.div>
                </div>
            </div>

            <div className="container max-w-screen-lg px-4 py-12">
                {/* Search Box */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mx-auto mb-12 max-w-xl"
                >
                    <form onSubmit={handleSubmit} className="relative flex items-center">
                        <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder={t('searchPlaceholder')}
                            className="h-14 w-full rounded-full border border-input bg-white pl-12 pr-36 text-base shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 hover:shadow-xl"
                        />
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            disabled={loading}
                            className="absolute right-1.5 top-1.5 h-11 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-6 text-sm font-medium text-white shadow-lg transition-all hover:from-orange-600 hover:to-orange-700 disabled:opacity-50"
                        >
                            {loading ? t('tracking') : t('trackButton')}
                        </motion.button>
                    </form>
                </motion.div>

                {/* Results */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mx-auto max-w-xl rounded-2xl border border-red-200 bg-red-50 p-6 text-center shadow-lg"
                    >
                        <div className="flex items-center justify-center space-x-2 text-red-600">
                            <AlertCircle className="h-5 w-5" />
                            <span className="font-medium">{error}</span>
                        </div>
                    </motion.div>
                )}

                {data && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <div className="flex justify-end">
                            <button
                                onClick={handleDownloadPDF}
                                disabled={isGeneratingPDF}
                                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-200 transition-all hover:bg-slate-50 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isGeneratingPDF ? (
                                    <>
                                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-400 border-t-transparent"></div>
                                        {t('saving')}
                                    </>
                                ) : (
                                    <>
                                        <Download className="h-4 w-4" />
                                        {t('saveReceipt')}
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Main Grid Layout */}
                        <div id="tracking-result" className="grid grid-cols-1 gap-6 bg-slate-50 p-4 lg:grid-cols-3">
                            {/* Left Column - Package Status & Timeline */}
                            <div className="space-y-6 lg:col-span-2">
                                {/* Status Overview Card */}
                                <div className="rounded-2xl border bg-white p-6 shadow-xl">
                                    <div className="mb-6 flex items-start justify-between">
                                        <div>
                                            <p className="mb-1 text-sm text-muted-foreground">{t('labels.trackingNumber')}</p>
                                            <h2 className="text-2xl font-bold text-orange-600">{data.trackingNumber}</h2>
                                        </div>
                                        <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
                                            <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-500"></div>
                                            {data.status === 'delivered' ? t('status.delivered') : data.status === 'out_for_delivery' ? t('status.outForDelivery') : t('status.inTransit')}
                                        </div>
                                    </div>

                                    {/* Delivery Info */}
                                    <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div className="rounded-xl bg-gradient-to-br from-orange-50 to-orange-100/50 p-4">
                                            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-orange-700">
                                                <Clock className="h-4 w-4" />
                                                {t('labels.estimatedDelivery')}
                                            </div>
                                            <p className="text-lg font-bold text-orange-900">{data.estimatedDelivery}</p>
                                        </div>
                                        <div className="rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 p-4">
                                            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-blue-700">
                                                <Package className="h-4 w-4" />
                                                {t('labels.serviceType')}
                                            </div>
                                            <p className="text-lg font-bold text-blue-900">{data.packageDetails.type}</p>
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="relative mb-4 px-4">
                                        <div className="absolute left-0 top-1/2 h-2 w-full -translate-y-1/2 rounded-full bg-slate-200"></div>
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: data.status === 'delivered' ? '100%' : data.status === 'out_for_delivery' ? '75%' : '50%' }}
                                            transition={{ duration: 1.5, ease: "easeInOut" }}
                                            className="absolute left-0 top-1/2 h-2 -translate-y-1/2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600"
                                        ></motion.div>
                                        <div className="relative flex justify-between">
                                            {[t('steps.ordered'), t('steps.processing'), t('steps.shipped'), t('steps.outForDelivery'), t('steps.delivered')].map((step, index) => {
                                                const isActive = index <= (data.status === 'delivered' ? 4 : data.status === 'out_for_delivery' ? 3 : 2);
                                                return (
                                                    <div key={step} className="flex flex-col items-center space-y-2">
                                                        <motion.div
                                                            initial={{ scale: 0 }}
                                                            animate={{ scale: isActive ? 1 : 0.8 }}
                                                            transition={{ delay: index * 0.2, type: "spring" }}
                                                            className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${isActive ? 'border-orange-500 bg-orange-500 text-white shadow-lg' : 'border-slate-300 bg-white text-slate-400'}`}
                                                        >
                                                            {index === 4 && data.status === 'delivered' ? <CheckCircle className="h-5 w-5" /> : <div className={`h-3 w-3 rounded-full ${isActive ? 'bg-white' : 'bg-slate-300'}`} />}
                                                        </motion.div>
                                                        <span className={`hidden text-xs font-medium md:block ${isActive ? 'text-slate-900' : 'text-slate-400'}`}>{step}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>

                                {/* Tracking History */}
                                <div className="rounded-2xl border bg-white p-6 shadow-xl">
                                    <h3 className="mb-6 flex items-center gap-2 text-lg font-bold">
                                        <Clock className="h-5 w-5 text-orange-500" />
                                        {t('labels.history')}
                                    </h3>
                                    <div className="space-y-4 border-l-2 border-orange-200 pl-6">
                                        {data.events.map((event, index) => (
                                            <motion.div
                                                key={event.id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.5 + index * 0.1 }}
                                                className="relative pb-4"
                                            >
                                                <div className={`absolute -left-[29px] top-1 flex h-5 w-5 items-center justify-center rounded-full ${index === 0 ? 'bg-orange-500 ring-4 ring-orange-100' : 'bg-slate-300'}`}>
                                                    {index === 0 && <div className="h-2 w-2 animate-pulse rounded-full bg-white"></div>}
                                                </div>
                                                <div className="flex flex-col space-y-1">
                                                    <span className="text-xs font-medium text-muted-foreground">{new Date(event.timestamp).toLocaleString()}</span>
                                                    <h4 className="font-semibold text-slate-900">{event.description}</h4>
                                                    <p className="flex items-center gap-1 text-sm text-muted-foreground">
                                                        <MapPin className="h-3 w-3" />
                                                        {event.location}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Details */}
                            <div className="space-y-6">
                                {/* Package Details Card */}
                                <div className="rounded-2xl border bg-white p-6 shadow-xl">
                                    <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                                        <Package className="h-5 w-5 text-orange-500" />
                                        {t('labels.packageDetails')}
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="rounded-lg bg-slate-50 p-3">
                                            <p className="mb-1 text-xs font-medium text-muted-foreground">{t('labels.weight')}</p>
                                            <p className="font-semibold">{data.packageDetails.weight}</p>
                                        </div>
                                        <div className="rounded-lg bg-slate-50 p-3">
                                            <p className="mb-1 text-xs font-medium text-muted-foreground">{t('labels.description')}</p>
                                            <p className="font-semibold">{data.packageDetails.description}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Sender Card */}
                                <div className="rounded-2xl border bg-gradient-to-br from-blue-50 to-white p-6 shadow-xl">
                                    <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-blue-900">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white">
                                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                        {t('labels.sender')}
                                    </h3>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="mb-1 text-xs font-medium text-blue-700">{t('labels.name')}</p>
                                            <p className="font-semibold text-blue-900">{data.sender.name}</p>
                                        </div>
                                        <div>
                                            <p className="mb-1 text-xs font-medium text-blue-700">{t('labels.address')}</p>
                                            <p className="text-sm text-blue-800">{data.sender.address}</p>
                                        </div>
                                        <div>
                                            <p className="mb-1 text-xs font-medium text-blue-700">{t('labels.phone')}</p>
                                            <p className="text-sm text-blue-800">{data.sender.phone}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Receiver Card */}
                                <div className="rounded-2xl border bg-gradient-to-br from-green-50 to-white p-6 shadow-xl">
                                    <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-green-900">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white">
                                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                        {t('labels.receiver')}
                                    </h3>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="mb-1 text-xs font-medium text-green-700">{t('labels.name')}</p>
                                            <p className="font-semibold text-green-900">{data.receiver.name}</p>
                                        </div>
                                        <div>
                                            <p className="mb-1 text-xs font-medium text-green-700">{t('labels.address')}</p>
                                            <p className="text-sm text-green-800">{data.receiver.address}</p>
                                        </div>
                                        <div>
                                            <p className="mb-1 text-xs font-medium text-green-700">{t('labels.phone')}</p>
                                            <p className="text-sm text-green-800">{data.receiver.phone}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* FAQ Section */}
                <div className="container max-w-screen-2xl px-4 py-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="mx-auto max-w-3xl"
                    >
                        <div className="mb-8 text-center">
                            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                                <HelpCircle className="h-6 w-6" />
                            </div>
                            <h2 className="mb-2 text-3xl font-bold">Frequently Asked Questions</h2>
                            <p className="text-muted-foreground">Everything you need to know about tracking your shipment</p>
                        </div>

                        <div className="space-y-4">
                            <FAQItem
                                question="What Is a Tracking Number & Where Can I Find It?"
                                answer="A tracking number or ID is a combination of numbers and possibly letters that uniquely identifies your shipment for national or international tracking. Usually, the shipper or online shop is able to provide the tracking number or ID. If you have ordered a product in an online shop, the confirmation email or shipment tracking notification often contains the tracking number or ID. If not, please contact your shipper or online shop."
                            />
                            <FAQItem
                                question="When will my tracking information appear?"
                                answer="Tracking events usually appear 24-48 hours after receiving the Track and Trace ID. In general, once the shipment has reached our facility, a tracking event will appear."
                            />
                            <FAQItem
                                question="Why is my tracking number/ID not working?"
                                answer="Please make sure you entered the correct tracking number in the correct format: Check for minimum length of 5 characters, and if there are any special characters in your input. Tab, comma, space and semicolon are understood as separators between several tracking IDs. If your tracking ID is not working, please contact your shipper or online shop."
                            />
                            <FAQItem
                                question="If I do not have my tracking number, is it still possible to track my shipment?"
                                answer="If you do not have a tracking number, we advise you to contact your shipper. However, if you have other shipping reference numbers, they may work using shipment tracking systems of the specific business unit in charge of the shipment."
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

// FAQ Accordion Component
function FAQItem({ question, answer }: { question: string; answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-lg border bg-card shadow-sm transition-shadow hover:shadow-md"
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-muted/50"
            >
                <span className="pr-4 font-semibold">{question}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <div className="border-t bg-muted/30 p-6 pt-4">
                            <p className="text-sm leading-relaxed text-muted-foreground">{answer}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default function TrackingPage() {
    return (
        <Suspense fallback={<div className="flex h-[50vh] items-center justify-center">Loading...</div>}>
            <TrackingContent />
        </Suspense>
    );
}
