'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { RotateCcw, ArrowLeft, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export default function RefundPolicyPage() {
    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-20 text-white md:py-32">
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
                    className="absolute right-0 top-0 -z-10 h-[400px] w-[400px] rounded-full bg-emerald-500/20 blur-[120px]"
                ></motion.div>

                <div className="container max-w-screen-2xl px-4">
                    <Link href="/" className="mb-8 inline-flex items-center space-x-2 text-slate-300 hover:text-white">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="text-sm">Back to Home</span>
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                    >
                        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-green-500 text-white shadow-lg">
                            <RotateCcw className="h-8 w-8" />
                        </div>
                        <h1 className="mb-6 text-4xl font-extrabold tracking-tight md:text-5xl">
                            Refund & Return Policy
                        </h1>
                        <p className="mx-auto max-w-2xl text-lg text-slate-300">
                            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content */}
            <section className="py-20">
                <div className="container max-w-4xl px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="prose prose-slate max-w-none"
                    >
                        <div className="space-y-8">
                            <div>
                                <h2 className="mb-4 text-2xl font-bold">1. Our Commitment</h2>
                                <p className="text-muted-foreground">
                                    At FastRocket, we strive for 100% customer satisfaction. If you're not completely satisfied with our shipping services, we're here to help with refunds and returns according to the terms outlined below.
                                </p>
                            </div>

                            <div>
                                <h2 className="mb-4 text-2xl font-bold">2. Refund Eligibility</h2>
                                <p className="mb-4 text-muted-foreground">
                                    You may be eligible for a refund in the following situations:
                                </p>

                                <div className="space-y-4">
                                    <div className="rounded-lg border bg-green-50 p-4 dark:bg-green-950">
                                        <div className="flex items-start gap-3">
                                            <CheckCircle className="mt-1 h-5 w-5 text-green-600 dark:text-green-400" />
                                            <div>
                                                <h3 className="mb-1 font-semibold text-green-900 dark:text-green-100">Eligible for Full Refund</h3>
                                                <ul className="list-disc space-y-1 pl-5 text-sm text-green-800 dark:text-green-200">
                                                    <li>Package lost in transit (after investigation)</li>
                                                    <li>Service not delivered as promised</li>
                                                    <li>Duplicate charges or billing errors</li>
                                                    <li>Cancellation before package pickup</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rounded-lg border bg-amber-50 p-4 dark:bg-amber-950">
                                        <div className="flex items-start gap-3">
                                            <AlertCircle className="mt-1 h-5 w-5 text-amber-600 dark:text-amber-400" />
                                            <div>
                                                <h3 className="mb-1 font-semibold text-amber-900 dark:text-amber-100">Eligible for Partial Refund</h3>
                                                <ul className="list-disc space-y-1 pl-5 text-sm text-amber-800 dark:text-amber-200">
                                                    <li>Significant delivery delays (case-by-case basis)</li>
                                                    <li>Package damage (based on insurance coverage)</li>
                                                    <li>Service downgrade (difference in cost)</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rounded-lg border bg-red-50 p-4 dark:bg-red-950">
                                        <div className="flex items-start gap-3">
                                            <XCircle className="mt-1 h-5 w-5 text-red-600 dark:text-red-400" />
                                            <div>
                                                <h3 className="mb-1 font-semibold text-red-900 dark:text-red-100">Not Eligible for Refund</h3>
                                                <ul className="list-disc space-y-1 pl-5 text-sm text-red-800 dark:text-red-200">
                                                    <li>Delays due to incorrect address provided</li>
                                                    <li>Recipient unavailability</li>
                                                    <li>Customs delays or fees</li>
                                                    <li>Weather-related delays</li>
                                                    <li>Refused deliveries</li>
                                                    <li>After package has been delivered</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h2 className="mb-4 text-2xl font-bold">3. Refund Request Process</h2>
                                <h3 className="mb-2 text-lg font-semibold">Step 1: Contact Us</h3>
                                <p className="mb-4 text-muted-foreground">
                                    Submit a refund request within 30 days of your shipment date:
                                </p>
                                <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                                    <li>Email: refunds@fastrocket.com</li>
                                    <li>Phone: +1 (214) 249-6444</li>
                                    <li>Online: Through your account dashboard</li>
                                </ul>

                                <h3 className="mb-2 mt-4 text-lg font-semibold">Step 2: Provide Information</h3>
                                <p className="mb-4 text-muted-foreground">
                                    Include the following in your request:
                                </p>
                                <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                                    <li>Tracking number</li>
                                    <li>Order confirmation number</li>
                                    <li>Reason for refund request</li>
                                    <li>Supporting documentation (photos, receipts, etc.)</li>
                                </ul>

                                <h3 className="mb-2 mt-4 text-lg font-semibold">Step 3: Review Process</h3>
                                <p className="text-muted-foreground">
                                    We will review your request within 5-7 business days and notify you of our decision via email.
                                </p>
                            </div>

                            <div>
                                <h2 className="mb-4 text-2xl font-bold">4. Refund Timeline</h2>
                                <p className="mb-4 text-muted-foreground">
                                    Once approved, refunds are processed as follows:
                                </p>
                                <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                                    <li><strong>Credit/Debit Cards:</strong> 5-10 business days</li>
                                    <li><strong>PayPal:</strong> 3-5 business days</li>
                                    <li><strong>Bank Transfer:</strong> 7-14 business days</li>
                                    <li><strong>Store Credit:</strong> Immediate</li>
                                </ul>
                                <p className="mt-4 text-muted-foreground">
                                    Refund timing may vary depending on your financial institution's processing time.
                                </p>
                            </div>

                            <div>
                                <h2 className="mb-4 text-2xl font-bold">5. Package Returns</h2>
                                <h3 className="mb-2 text-lg font-semibold">Return to Sender</h3>
                                <p className="mb-4 text-muted-foreground">
                                    If a package cannot be delivered and is returned to sender:
                                </p>
                                <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                                    <li>Original shipping fees are non-refundable</li>
                                    <li>Return shipping fees will be deducted from any refund</li>
                                    <li>Sender will be notified when package is returned</li>
                                    <li>Package must be claimed within 30 days</li>
                                </ul>

                                <h3 className="mb-2 mt-4 text-lg font-semibold">Refused Packages</h3>
                                <p className="text-muted-foreground">
                                    If a recipient refuses delivery, the sender is responsible for return shipping costs and the original shipping fee is non-refundable.
                                </p>
                            </div>

                            <div>
                                <h2 className="mb-4 text-2xl font-bold">6. Lost or Damaged Packages</h2>
                                <h3 className="mb-2 text-lg font-semibold">Lost Packages</h3>
                                <p className="mb-4 text-muted-foreground">
                                    If your package is lost:
                                </p>
                                <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                                    <li>We will conduct a thorough investigation (7-14 days)</li>
                                    <li>If confirmed lost, you'll receive a full refund or reshipment</li>
                                    <li>Insurance claims will be processed for insured items</li>
                                </ul>

                                <h3 className="mb-2 mt-4 text-lg font-semibold">Damaged Packages</h3>
                                <p className="mb-4 text-muted-foreground">
                                    For damaged packages:
                                </p>
                                <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                                    <li>Report damage within 48 hours of delivery</li>
                                    <li>Provide photos of package and contents</li>
                                    <li>Keep all packaging materials for inspection</li>
                                    <li>Compensation based on declared value and insurance</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="mb-4 text-2xl font-bold">7. Cancellations</h2>
                                <h3 className="mb-2 text-lg font-semibold">Before Pickup</h3>
                                <p className="mb-4 text-muted-foreground">
                                    Full refund available if cancelled before package pickup.
                                </p>

                                <h3 className="mb-2 text-lg font-semibold">After Pickup</h3>
                                <p className="mb-4 text-muted-foreground">
                                    Cancellations after pickup are subject to:
                                </p>
                                <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                                    <li>Processing fees may apply</li>
                                    <li>Package must be intercepted (additional fee)</li>
                                    <li>Partial refund based on service completion</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="mb-4 text-2xl font-bold">8. International Shipments</h2>
                                <p className="mb-4 text-muted-foreground">
                                    Special conditions apply to international shipments:
                                </p>
                                <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                                    <li>Customs fees and duties are non-refundable</li>
                                    <li>Delays due to customs are not eligible for refunds</li>
                                    <li>Return shipping from international destinations is customer's responsibility</li>
                                    <li>Refund processing may take longer for international transactions</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="mb-4 text-2xl font-bold">9. Exceptions & Special Cases</h2>
                                <p className="mb-4 text-muted-foreground">
                                    The following situations are handled on a case-by-case basis:
                                </p>
                                <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                                    <li>Natural disasters or extreme weather events</li>
                                    <li>Government restrictions or regulations</li>
                                    <li>Carrier strikes or service disruptions</li>
                                    <li>Pandemic-related delays</li>
                                </ul>
                                <p className="mt-4 text-muted-foreground">
                                    Contact our customer service team to discuss your specific situation.
                                </p>
                            </div>

                            <div>
                                <h2 className="mb-4 text-2xl font-bold">10. Dispute Resolution</h2>
                                <p className="mb-4 text-muted-foreground">
                                    If you disagree with our refund decision:
                                </p>
                                <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                                    <li>Request a review by our customer service manager</li>
                                    <li>Provide additional evidence or documentation</li>
                                    <li>Escalate to our disputes department if necessary</li>
                                </ul>
                                <p className="mt-4 text-muted-foreground">
                                    We aim to resolve all disputes fairly and promptly.
                                </p>
                            </div>

                            <div>
                                <h2 className="mb-4 text-2xl font-bold">11. Contact Us</h2>
                                <p className="text-muted-foreground">
                                    For refund and return inquiries:
                                </p>
                                <div className="mt-4 rounded-lg border bg-muted/30 p-4">
                                    <p className="font-medium">FastRocket Refunds Department</p>
                                    <p className="text-sm text-muted-foreground">Phone: +1 (214) 249-6444</p>
                                    <p className="text-sm text-muted-foreground">Email: refunds@fastrocket.com</p>
                                    <p className="text-sm text-muted-foreground">Hours: Monday-Friday, 8 AM - 6 PM CST</p>
                                    <p className="text-sm text-muted-foreground">Address: 123 Delivery Lane, Dallas, TX 75201</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
