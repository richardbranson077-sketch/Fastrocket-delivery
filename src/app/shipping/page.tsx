'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Truck, ArrowLeft, Package, Clock, MapPin } from 'lucide-react';

export default function ShippingPolicyPage() {
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
                    className="absolute right-0 top-0 -z-10 h-[400px] w-[400px] rounded-full bg-blue-500/20 blur-[120px]"
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
                        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg">
                            <Truck className="h-8 w-8" />
                        </div>
                        <h1 className="mb-6 text-4xl font-extrabold tracking-tight md:text-5xl">
                            Shipping Policy
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
                                <h2 className="mb-4 text-2xl font-bold">1. Shipping Services Overview</h2>
                                <p className="text-muted-foreground">
                                    FastRocket offers multiple shipping options to meet your delivery needs. We are committed to providing fast, reliable, and secure shipping services domestically and internationally.
                                </p>
                            </div>

                            <div>
                                <h2 className="mb-4 text-2xl font-bold">2. Shipping Options & Delivery Times</h2>

                                <div className="space-y-4">
                                    <div className="rounded-lg border bg-blue-50 p-4 dark:bg-blue-950">
                                        <div className="flex items-start gap-3">
                                            <Package className="mt-1 h-5 w-5 text-blue-600 dark:text-blue-400" />
                                            <div>
                                                <h3 className="mb-1 font-semibold text-blue-900 dark:text-blue-100">Express Delivery</h3>
                                                <p className="text-sm text-blue-800 dark:text-blue-200">1-2 business days</p>
                                                <p className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                                                    Our fastest service for urgent shipments. Includes real-time tracking and signature confirmation.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rounded-lg border bg-cyan-50 p-4 dark:bg-cyan-950">
                                        <div className="flex items-start gap-3">
                                            <Clock className="mt-1 h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                                            <div>
                                                <h3 className="mb-1 font-semibold text-cyan-900 dark:text-cyan-100">Standard Delivery</h3>
                                                <p className="text-sm text-cyan-800 dark:text-cyan-200">3-5 business days</p>
                                                <p className="mt-2 text-sm text-cyan-700 dark:text-cyan-300">
                                                    Reliable and cost-effective shipping for most packages. Includes tracking and insurance up to $100.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rounded-lg border bg-purple-50 p-4 dark:bg-purple-950">
                                        <div className="flex items-start gap-3">
                                            <MapPin className="mt-1 h-5 w-5 text-purple-600 dark:text-purple-400" />
                                            <div>
                                                <h3 className="mb-1 font-semibold text-purple-900 dark:text-purple-100">International Shipping</h3>
                                                <p className="text-sm text-purple-800 dark:text-purple-200">7-14 business days</p>
                                                <p className="mt-2 text-sm text-purple-700 dark:text-purple-300">
                                                    Worldwide delivery with customs clearance assistance. Delivery times vary by destination.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rounded-lg border bg-orange-50 p-4 dark:bg-orange-950">
                                        <div className="flex items-start gap-3">
                                            <Truck className="mt-1 h-5 w-5 text-orange-600 dark:text-orange-400" />
                                            <div>
                                                <h3 className="mb-1 font-semibold text-orange-900 dark:text-orange-100">Freight Services</h3>
                                                <p className="text-sm text-orange-800 dark:text-orange-200">Custom timeline</p>
                                                <p className="mt-2 text-sm text-orange-700 dark:text-orange-300">
                                                    For large or heavy shipments. Contact us for a custom quote and delivery schedule.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h2 className="mb-4 text-2xl font-bold">3. Shipping Costs</h2>
                                <p className="mb-4 text-muted-foreground">
                                    Shipping costs are calculated based on:
                                </p>
                                <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                                    <li>Package weight and dimensions</li>
                                    <li>Shipping destination</li>
                                    <li>Selected delivery speed</li>
                                    <li>Additional services (insurance, signature confirmation, etc.)</li>
                                </ul>
                                <p className="mt-4 text-muted-foreground">
                                    You can calculate shipping costs using our online shipping calculator or by contacting our customer service team.
                                </p>
                            </div>

                            <div>
                                <h2 className="mb-4 text-2xl font-bold">4. Processing Time</h2>
                                <p className="mb-4 text-muted-foreground">
                                    Orders are typically processed within:
                                </p>
                                <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                                    <li><strong>Same-day processing:</strong> Orders placed before 2 PM local time</li>
                                    <li><strong>Next business day:</strong> Orders placed after 2 PM</li>
                                    <li><strong>Weekend orders:</strong> Processed on the next business day</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="mb-4 text-2xl font-bold">5. Tracking Your Shipment</h2>
                                <p className="mb-4 text-muted-foreground">
                                    All shipments include tracking. You will receive:
                                </p>
                                <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                                    <li>A tracking number via email once your package ships</li>
                                    <li>Real-time updates on your package location</li>
                                    <li>Estimated delivery date</li>
                                    <li>Delivery confirmation with signature (for applicable services)</li>
                                </ul>
                                <p className="mt-4 text-muted-foreground">
                                    Track your package anytime at <Link href="/tracking" className="text-blue-600 hover:underline dark:text-blue-400">fastrocket.com/tracking</Link>
                                </p>
                            </div>

                            <div>
                                <h2 className="mb-4 text-2xl font-bold">6. Packaging Requirements</h2>
                                <p className="mb-4 text-muted-foreground">
                                    To ensure safe delivery, packages must be:
                                </p>
                                <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                                    <li>Securely sealed with appropriate packaging materials</li>
                                    <li>Properly labeled with complete sender and recipient information</li>
                                    <li>Adequately protected with cushioning for fragile items</li>
                                    <li>Within size and weight limits for the selected service</li>
                                </ul>
                                <p className="mt-4 text-muted-foreground">
                                    We offer packaging supplies and services at our locations for your convenience.
                                </p>
                            </div>

                            <div>
                                <h2 className="mb-4 text-2xl font-bold">7. Prohibited Items</h2>
                                <p className="mb-4 text-muted-foreground">
                                    The following items cannot be shipped:
                                </p>
                                <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                                    <li>Hazardous materials (explosives, flammable liquids, toxic substances)</li>
                                    <li>Illegal drugs or contraband</li>
                                    <li>Weapons and ammunition (restrictions apply)</li>
                                    <li>Perishable food items (without special arrangement)</li>
                                    <li>Live animals</li>
                                    <li>Currency or negotiable instruments exceeding $500</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="mb-4 text-2xl font-bold">8. International Shipping</h2>
                                <h3 className="mb-2 text-lg font-semibold">Customs & Duties</h3>
                                <p className="mb-4 text-muted-foreground">
                                    International shipments may be subject to:
                                </p>
                                <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                                    <li>Customs duties and taxes (paid by recipient)</li>
                                    <li>Customs clearance delays</li>
                                    <li>Additional documentation requirements</li>
                                </ul>

                                <h3 className="mb-2 mt-4 text-lg font-semibold">Restricted Destinations</h3>
                                <p className="text-muted-foreground">
                                    We cannot ship to certain countries due to legal restrictions. Please contact us to verify if we ship to your destination.
                                </p>
                            </div>

                            <div>
                                <h2 className="mb-4 text-2xl font-bold">9. Delivery Attempts</h2>
                                <p className="mb-4 text-muted-foreground">
                                    Our delivery process:
                                </p>
                                <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                                    <li><strong>First attempt:</strong> Delivery to specified address</li>
                                    <li><strong>If undeliverable:</strong> Notice left with redelivery instructions</li>
                                    <li><strong>Second attempt:</strong> Next business day</li>
                                    <li><strong>After final attempt:</strong> Package held at local facility for pickup (5 business days)</li>
                                    <li><strong>Unclaimed packages:</strong> Returned to sender after holding period</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="mb-4 text-2xl font-bold">10. Delays & Force Majeure</h2>
                                <p className="mb-4 text-muted-foreground">
                                    Delivery times are estimates and not guaranteed. Delays may occur due to:
                                </p>
                                <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                                    <li>Severe weather conditions</li>
                                    <li>Natural disasters</li>
                                    <li>Customs delays</li>
                                    <li>Incorrect address information</li>
                                    <li>Recipient unavailability</li>
                                    <li>Government restrictions or regulations</li>
                                </ul>
                                <p className="mt-4 text-muted-foreground">
                                    We are not liable for delays caused by circumstances beyond our control.
                                </p>
                            </div>

                            <div>
                                <h2 className="mb-4 text-2xl font-bold">11. Insurance & Liability</h2>
                                <p className="mb-4 text-muted-foreground">
                                    All shipments include basic insurance coverage:
                                </p>
                                <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                                    <li><strong>Standard coverage:</strong> Up to $100 per package</li>
                                    <li><strong>Additional insurance:</strong> Available for purchase for high-value items</li>
                                    <li><strong>Claims:</strong> Must be filed within 30 days of delivery date</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="mb-4 text-2xl font-bold">12. Contact Us</h2>
                                <p className="text-muted-foreground">
                                    For shipping questions or assistance:
                                </p>
                                <div className="mt-4 rounded-lg border bg-muted/30 p-4">
                                    <p className="font-medium">FastRocket Shipping Support</p>
                                    <p className="text-sm text-muted-foreground">Phone: +1 (214) 249-6444</p>
                                    <p className="text-sm text-muted-foreground">Email: shipping@fastrocket.com</p>
                                    <p className="text-sm text-muted-foreground">Hours: Monday-Friday, 8 AM - 6 PM CST</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
