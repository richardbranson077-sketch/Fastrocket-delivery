'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Home, Search, ArrowLeft, Package } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col">
            {/* Hero Section */}
            <section className="relative flex flex-1 items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-20 text-white">
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
                    className="absolute right-0 top-0 -z-10 h-[400px] w-[400px] rounded-full bg-red-500/20 blur-[120px]"
                ></motion.div>

                <div className="container max-w-screen-2xl px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="mb-8 inline-flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-red-500 to-orange-500 text-white shadow-2xl">
                            <Package className="h-12 w-12" />
                        </div>

                        <h1 className="mb-4 text-8xl font-extrabold tracking-tight md:text-9xl">
                            404
                        </h1>

                        <h2 className="mb-6 text-3xl font-bold md:text-4xl">
                            Page Not Found
                        </h2>

                        <p className="mx-auto mb-12 max-w-2xl text-lg text-slate-300">
                            Oops! The page you're looking for seems to have been shipped to the wrong address. Let's get you back on track.
                        </p>

                        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Link href="/">
                                <motion.span
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 px-8 text-base font-medium text-white shadow-lg transition-all hover:from-orange-600 hover:to-orange-700"
                                >
                                    <Home className="h-5 w-5" />
                                    Back to Home
                                </motion.span>
                            </Link>

                            <Link href="/tracking">
                                <motion.span
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/20 bg-transparent px-8 text-base font-medium text-white transition-colors hover:bg-white/10"
                                >
                                    <Search className="h-5 w-5" />
                                    Track Package
                                </motion.span>
                            </Link>
                        </div>

                        <div className="mt-16">
                            <p className="mb-4 text-sm text-slate-400">Popular Pages</p>
                            <div className="flex flex-wrap items-center justify-center gap-4">
                                <Link href="/services" className="text-sm text-slate-300 hover:text-white hover:underline">
                                    Services
                                </Link>
                                <span className="text-slate-600">•</span>
                                <Link href="/about" className="text-sm text-slate-300 hover:text-white hover:underline">
                                    About Us
                                </Link>
                                <span className="text-slate-600">•</span>
                                <Link href="/contact" className="text-sm text-slate-300 hover:text-white hover:underline">
                                    Contact
                                </Link>
                                <span className="text-slate-600">•</span>
                                <Link href="/faq" className="text-sm text-slate-300 hover:text-white hover:underline">
                                    FAQ
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
