'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Shield, ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
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
                    className="absolute right-0 top-0 -z-10 h-[400px] w-[400px] rounded-full bg-green-500/20 blur-[120px]"
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
                        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-lg">
                            <Shield className="h-8 w-8" />
                        </div>
                        <h1 className="mb-6 text-4xl font-extrabold tracking-tight md:text-5xl">
                            Privacy Policy
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
                                <h2 className="mb-4 text-2xl font-bold">1. Introduction</h2>
                                <p className="text-muted-foreground">
                                    FastRocket ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our delivery tracking service.
                                </p>
                            </div>

                            <div>
                                <h2 className="mb-4 text-2xl font-bold">2. Information We Collect</h2>
                                <h3 className="mb-2 text-lg font-semibold">Personal Information</h3>
                                <p className="mb-4 text-muted-foreground">
                                    We may collect personal information that you provide to us, including:
                                </p>
                                <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                                    <li>Name and contact information (email, phone number, address)</li>
                                    <li>Account credentials (username, password)</li>
                                    <li>Shipping and delivery information</li>
                                    <li>Payment information (processed securely through third-party providers)</li>
                                </ul>

                                <h3 className="mb-2 mt-4 text-lg font-semibold">Automatically Collected Information</h3>
                                <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                                    <li>IP address and device information</li>
                                    <li>Browser type and version</li>
                                    <li>Usage data and analytics</li>
                                    <li>Cookies and tracking technologies</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="mb-4 text-2xl font-bold">3. How We Use Your Information</h2>
                                <p className="mb-4 text-muted-foreground">We use your information to:</p>
                                <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                                    <li>Process and fulfill your delivery orders</li>
                                    <li>Provide customer support and respond to inquiries</li>
                                    <li>Send tracking updates and notifications</li>
                                    <li>Improve our services and user experience</li>
                                    <li>Prevent fraud and ensure security</li>
                                    <li>Comply with legal obligations</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="mb-4 text-2xl font-bold">4. Information Sharing</h2>
                                <p className="mb-4 text-muted-foreground">
                                    We do not sell your personal information. We may share your information with:
                                </p>
                                <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                                    <li>Service providers who assist in our operations</li>
                                    <li>Delivery partners and carriers</li>
                                    <li>Payment processors</li>
                                    <li>Law enforcement when required by law</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="mb-4 text-2xl font-bold">5. Data Security</h2>
                                <p className="text-muted-foreground">
                                    We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
                                </p>
                            </div>

                            <div>
                                <h2 className="mb-4 text-2xl font-bold">6. Your Rights</h2>
                                <p className="mb-4 text-muted-foreground">You have the right to:</p>
                                <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                                    <li>Access your personal information</li>
                                    <li>Correct inaccurate data</li>
                                    <li>Request deletion of your data</li>
                                    <li>Opt-out of marketing communications</li>
                                    <li>Object to data processing</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="mb-4 text-2xl font-bold">7. Cookies</h2>
                                <p className="text-muted-foreground">
                                    We use cookies and similar tracking technologies to enhance your experience. You can control cookie preferences through your browser settings.
                                </p>
                            </div>

                            <div>
                                <h2 className="mb-4 text-2xl font-bold">8. Children's Privacy</h2>
                                <p className="text-muted-foreground">
                                    Our services are not intended for children under 13. We do not knowingly collect personal information from children.
                                </p>
                            </div>

                            <div>
                                <h2 className="mb-4 text-2xl font-bold">9. Changes to This Policy</h2>
                                <p className="text-muted-foreground">
                                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
                                </p>
                            </div>

                            <div>
                                <h2 className="mb-4 text-2xl font-bold">10. Contact Us</h2>
                                <p className="text-muted-foreground">
                                    If you have questions about this Privacy Policy, please contact us at:
                                </p>
                                <div className="mt-4 rounded-lg border bg-muted/30 p-4">
                                    <p className="font-medium">FastRocket Privacy Team</p>
                                    <p className="text-sm text-muted-foreground">Email: privacy@fastrocket.com</p>
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
