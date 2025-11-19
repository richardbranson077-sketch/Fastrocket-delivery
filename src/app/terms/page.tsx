'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FileText, ArrowLeft } from 'lucide-react';

export default function TermsPage() {
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
                    className="absolute right-0 top-0 -z-10 h-[400px] w-[400px] rounded-full bg-indigo-500/20 blur-[120px]"
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
                        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-lg">
                            <FileText className="h-8 w-8" />
                        </div>
                        <h1 className="mb-6 text-4xl font-extrabold tracking-tight md:text-5xl">
                            Terms of Service
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
                                <h2 className="mb-4 text-2xl font-bold">1. Acceptance of Terms</h2>
                                <p className="text-muted-foreground">
                                    By accessing and using FastRocket's delivery services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                                </p>
                            </div>

                            <div>
                                <h2 className="mb-4 text-2xl font-bold">2. Service Description</h2>
                                <p className="text-muted-foreground">
                                    FastRocket provides package delivery and tracking services. We reserve the right to modify, suspend, or discontinue any aspect of our services at any time without prior notice.
                                </p>
                            </div>

                            <div>
                                <h2 className="mb-4 text-2xl font-bold">3. User Accounts</h2>
                                <h3 className="mb-2 text-lg font-semibold">Account Creation</h3>
                                <p className="mb-4 text-muted-foreground">
                                    To use certain features, you must create an account. You agree to:
                                </p>
                                <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                                    <li>Provide accurate and complete information</li>
                                    <li>Maintain the security of your account credentials</li>
                                    <li>Notify us immediately of any unauthorized access</li>
                                    <li>Be responsible for all activities under your account</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="mb-4 text-2xl font-bold">4. Shipping Terms</h2>
                                <h3 className="mb-2 text-lg font-semibold">Prohibited Items</h3>
                                <p className="mb-4 text-muted-foreground">
                                    You agree not to ship:
                                </p>
                                <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                                    <li>Hazardous or dangerous materials</li>
                                    <li>Illegal items or contraband</li>
                                    <li>Perishable goods (without prior arrangement)</li>
                                    <li>Items prohibited by international shipping regulations</li>
                                </ul>

                                <h3 className="mb-2 mt-4 text-lg font-semibold">Delivery Timeframes</h3>
                                <p className="text-muted-foreground">
                                    Delivery estimates are not guaranteed. We are not liable for delays caused by weather, customs, or other factors beyond our control.
                                </p>
                            </div>

                            <div>
                                <h2 className="mb-4 text-2xl font-bold">5. Pricing and Payment</h2>
                                <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                                    <li>All prices are subject to change without notice</li>
                                    <li>Payment is due at the time of service</li>
                                    <li>We accept major credit cards and other specified payment methods</li>
                                    <li>Additional fees may apply for special services or international shipping</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="mb-4 text-2xl font-bold">6. Liability and Insurance</h2>
                                <h3 className="mb-2 text-lg font-semibold">Limited Liability</h3>
                                <p className="mb-4 text-muted-foreground">
                                    Our liability for lost or damaged packages is limited to the declared value or $100, whichever is less, unless additional insurance is purchased.
                                </p>

                                <h3 className="mb-2 text-lg font-semibold">Claims</h3>
                                <p className="text-muted-foreground">
                                    Claims for lost or damaged items must be filed within 30 days of the scheduled delivery date.
                                </p>
                            </div>

                            <div>
                                <h2 className="mb-4 text-2xl font-bold">7. Intellectual Property</h2>
                                <p className="text-muted-foreground">
                                    All content on our website, including text, graphics, logos, and software, is the property of FastRocket and protected by copyright and trademark laws.
                                </p>
                            </div>

                            <div>
                                <h2 className="mb-4 text-2xl font-bold">8. User Conduct</h2>
                                <p className="mb-4 text-muted-foreground">You agree not to:</p>
                                <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                                    <li>Use our services for any illegal purpose</li>
                                    <li>Attempt to gain unauthorized access to our systems</li>
                                    <li>Interfere with the proper functioning of our services</li>
                                    <li>Impersonate any person or entity</li>
                                    <li>Transmit viruses or malicious code</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="mb-4 text-2xl font-bold">9. Termination</h2>
                                <p className="text-muted-foreground">
                                    We reserve the right to terminate or suspend your account and access to our services at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
                                </p>
                            </div>

                            <div>
                                <h2 className="mb-4 text-2xl font-bold">10. Dispute Resolution</h2>
                                <p className="text-muted-foreground">
                                    Any disputes arising from these Terms will be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.
                                </p>
                            </div>

                            <div>
                                <h2 className="mb-4 text-2xl font-bold">11. Governing Law</h2>
                                <p className="text-muted-foreground">
                                    These Terms are governed by the laws of the State of Texas, without regard to its conflict of law provisions.
                                </p>
                            </div>

                            <div>
                                <h2 className="mb-4 text-2xl font-bold">12. Changes to Terms</h2>
                                <p className="text-muted-foreground">
                                    We reserve the right to modify these Terms at any time. Continued use of our services after changes constitutes acceptance of the modified Terms.
                                </p>
                            </div>

                            <div>
                                <h2 className="mb-4 text-2xl font-bold">13. Contact Information</h2>
                                <p className="text-muted-foreground">
                                    For questions about these Terms of Service, please contact us:
                                </p>
                                <div className="mt-4 rounded-lg border bg-muted/30 p-4">
                                    <p className="font-medium">FastRocket Legal Team</p>
                                    <p className="text-sm text-muted-foreground">Email: legal@fastrocket.com</p>
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
