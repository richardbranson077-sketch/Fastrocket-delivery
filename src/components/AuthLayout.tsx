'use client';

import Link from 'next/link';
import { Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle: string;
    image?: string;
}

export function AuthLayout({ children, title, subtitle, image = "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop" }: AuthLayoutProps) {
    return (
        <div className="flex min-h-screen w-full">
            {/* Left Side - Form */}
            <div className="flex w-full flex-col justify-center bg-background px-4 py-12 sm:px-6 lg:w-1/2 lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div className="mb-10">
                        <Link href="/" className="flex items-center space-x-2 text-primary">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                <Rocket className="h-5 w-5" />
                            </div>
                            <span className="text-lg font-bold tracking-tight text-foreground">FastRocket</span>
                        </Link>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="mt-8 text-3xl font-bold tracking-tight text-foreground">{title}</h2>
                            <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        {children}
                    </motion.div>
                </div>
            </div>

            {/* Right Side - Image */}
            <div className="hidden w-1/2 bg-muted lg:block">
                <div className="relative h-full w-full">
                    <img
                        className="absolute inset-0 h-full w-full object-cover"
                        src={image}
                        alt="Delivery logistics"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-12">
                        <div className="text-white">
                            <h3 className="text-2xl font-bold">Global Logistics Partner</h3>
                            <p className="mt-2 text-gray-200">Connecting the world, one package at a time.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
