'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Cookie, ArrowLeft } from 'lucide-react';

export default function CookiePolicyPage() {
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
                    className="absolute right-0 top-0 -z-10 h-[400px] w-[400px] rounded-full bg-amber-500/20 blur-[120px]"
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
                        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-lg">
                            <Cookie className="h-8 w-8" />
                        </div>
                        <h1 className="mb-6 text-4xl font-extrabold tracking-tight md:text-5xl">
                            Cookie Policy
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
                                <h2 className="mb-4 text-2xl font-bold">1. What Are Cookies?</h2>
                                <p className="text-muted-foreground">
                                    Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our services.
                                </p>
                            </div>

                            <div>
                                <h2 className="mb-4 text-2xl font-bold">2. Types of Cookies We Use</h2>

                                <h3 className="mb-2 text-lg font-semibold">Essential Cookies</h3>
                                <p className="mb-4 text-muted-foreground">
                                    These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility.
                                </p>
                                <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                                    <li>Authentication and session management</li>
                                    <li>Security and fraud prevention</li>
                                    <li>Load balancing</li>
                                </ul>

                                <h3 className="mb-2 mt-4 text-lg font-semibold">Analytics Cookies</h3>
                                <p className="mb-4 text-muted-foreground">
                                    We use analytics cookies to understand how visitors interact with our website. This helps us improve our services.
                                </p>
                                <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                                    <li>Google Analytics - tracks user behavior and site performance</li>
                                    <li>Page view tracking</li>
                                    <li>Traffic source analysis</li>
                                </ul>

                                <h3 className="mb-2 mt-4 text-lg font-semibold">Functional Cookies</h3>
                                <p className="mb-4 text-muted-foreground">
                                    These cookies enable enhanced functionality and personalization.
                                </p>
                                <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                                    <li>Language preferences</li>
                                    <li>User interface customization</li>
                                    <li>Recently viewed items</li>
                                </ul>

                                <h3 className="mb-2 mt-4 text-lg font-semibold">Marketing Cookies</h3>
                                <p className="text-muted-foreground">
                                    These cookies track your online activity to help advertisers deliver more relevant advertising or to limit how many times you see an ad.
                                </p>
                            </div>

                            <div>
                                <h2 className="mb-4 text-2xl font-bold">3. Third-Party Cookies</h2>
                                <p className="mb-4 text-muted-foreground">
                                    We use services from third-party companies that may set cookies on your device:
                                </p>
                                <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                                    <li><strong>Google Analytics:</strong> For website analytics and performance tracking</li>
                                    <li><strong>Google reCAPTCHA:</strong> For spam and bot protection</li>
                                    <li><strong>Payment Processors:</strong> For secure payment processing</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="mb-4 text-2xl font-bold">4. How Long Do Cookies Last?</h2>

                                <h3 className="mb-2 text-lg font-semibold">Session Cookies</h3>
                                <p className="mb-4 text-muted-foreground">
                                    These are temporary cookies that expire when you close your browser.
                                </p>

                                <h3 className="mb-2 text-lg font-semibold">Persistent Cookies</h3>
                                <p className="text-muted-foreground">
                                    These remain on your device for a set period or until you delete them. We use persistent cookies for:
                                </p>
                                <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                                    <li>Remembering your login status (up to 30 days)</li>
                                    <li>Analytics data (up to 2 years)</li>
                                    <li>Preferences (up to 1 year)</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="mb-4 text-2xl font-bold">5. Managing Cookies</h2>
                                <p className="mb-4 text-muted-foreground">
                                    You have the right to decide whether to accept or reject cookies. You can manage your cookie preferences through:
                                </p>

                                <h3 className="mb-2 text-lg font-semibold">Browser Settings</h3>
                                <p className="mb-4 text-muted-foreground">
                                    Most web browsers allow you to control cookies through their settings:
                                </p>
                                <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                                    <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies</li>
                                    <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies</li>
                                    <li><strong>Safari:</strong> Preferences → Privacy → Cookies</li>
                                    <li><strong>Edge:</strong> Settings → Cookies and site permissions</li>
                                </ul>

                                <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950">
                                    <p className="text-sm text-amber-900 dark:text-amber-100">
                                        <strong>Note:</strong> Blocking all cookies may prevent you from using certain features of our website, such as staying logged in or tracking your shipments.
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h2 className="mb-4 text-2xl font-bold">6. Do Not Track Signals</h2>
                                <p className="text-muted-foreground">
                                    Some browsers include a "Do Not Track" (DNT) feature. Currently, there is no industry standard for how to respond to DNT signals. We do not currently respond to DNT browser signals.
                                </p>
                            </div>

                            <div>
                                <h2 className="mb-4 text-2xl font-bold">7. Updates to This Policy</h2>
                                <p className="text-muted-foreground">
                                    We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Please revisit this page regularly to stay informed.
                                </p>
                            </div>

                            <div>
                                <h2 className="mb-4 text-2xl font-bold">8. Contact Us</h2>
                                <p className="text-muted-foreground">
                                    If you have questions about our use of cookies, please contact us:
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
