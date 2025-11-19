'use client';

import { motion } from 'framer-motion';
import { Users, Target, Award, TrendingUp, Globe, Heart } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
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

                <div className="container max-w-screen-2xl px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="mb-4 inline-block rounded-full bg-blue-500/20 px-4 py-1.5 text-sm font-medium text-blue-300 backdrop-blur-sm ring-1 ring-blue-500/30">
                            About Us
                        </span>
                        <h1 className="mb-6 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
                            Redefining <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400 bg-clip-text text-transparent">Delivery</span>
                        </h1>
                        <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-300 md:text-xl">
                            We're on a mission to make shipping faster, more reliable, and more accessible for everyone around the world.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Our Story */}
            <section className="py-20">
                <div className="container max-w-screen-2xl px-4">
                    <div className="mx-auto max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-16 text-center"
                        >
                            <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">Our Story</h2>
                            <div className="space-y-4 text-lg text-muted-foreground">
                                <p>
                                    FastRocket was founded with a simple yet powerful vision: to revolutionize the delivery industry by combining cutting-edge technology with exceptional customer service.
                                </p>
                                <p>
                                    What started as a local courier service has grown into a global logistics powerhouse, serving millions of customers across 200+ countries. Our commitment to innovation, reliability, and sustainability has made us a trusted partner for individuals and businesses alike.
                                </p>
                                <p>
                                    Today, we handle millions of packages annually, but our focus remains the same: delivering your packages safely, quickly, and with the care they deserve.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Mission & Values */}
            <section className="bg-muted/30 py-20">
                <div className="container max-w-screen-2xl px-4">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Our Mission & Values</h2>
                        <p className="text-muted-foreground">The principles that guide everything we do</p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {[
                            {
                                icon: Target,
                                title: "Our Mission",
                                description: "To provide the fastest, most reliable delivery service while maintaining the highest standards of customer care and environmental responsibility.",
                                color: "from-orange-500 to-red-500"
                            },
                            {
                                icon: Award,
                                title: "Excellence",
                                description: "We strive for excellence in every delivery, ensuring your packages arrive on time and in perfect condition.",
                                color: "from-blue-500 to-cyan-500"
                            },
                            {
                                icon: Heart,
                                title: "Customer First",
                                description: "Your satisfaction is our priority. We go above and beyond to ensure a seamless delivery experience.",
                                color: "from-pink-500 to-rose-500"
                            },
                            {
                                icon: TrendingUp,
                                title: "Innovation",
                                description: "We continuously invest in technology and processes to improve our services and stay ahead of the curve.",
                                color: "from-purple-500 to-indigo-500"
                            },
                            {
                                icon: Globe,
                                title: "Sustainability",
                                description: "We're committed to reducing our environmental impact through eco-friendly practices and carbon-neutral shipping options.",
                                color: "from-green-500 to-emerald-500"
                            },
                            {
                                icon: Users,
                                title: "Teamwork",
                                description: "Our success is built on the dedication and expertise of our global team working together seamlessly.",
                                color: "from-yellow-500 to-orange-500"
                            }
                        ].map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="rounded-2xl border bg-card p-8 shadow-sm transition-all hover:shadow-lg"
                            >
                                <div className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${value.color} text-white shadow-lg`}>
                                    <value.icon className="h-7 w-7" />
                                </div>
                                <h3 className="mb-3 text-xl font-bold">{value.title}</h3>
                                <p className="text-muted-foreground">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-20">
                <div className="container max-w-screen-2xl px-4">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">FastRocket by the Numbers</h2>
                        <p className="text-muted-foreground">Our impact in the delivery industry</p>
                    </div>

                    <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                        {[
                            { value: "10M+", label: "Packages Delivered" },
                            { value: "200+", label: "Countries Served" },
                            { value: "99.9%", label: "On-Time Delivery" },
                            { value: "24/7", label: "Customer Support" }
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="rounded-2xl border bg-card p-8 text-center shadow-sm"
                            >
                                <div className="mb-2 text-4xl font-bold text-primary md:text-5xl">{stat.value}</div>
                                <div className="text-sm text-muted-foreground">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-muted/30 py-20">
                <div className="container max-w-screen-2xl px-4">
                    <div className="rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-6 py-16 text-center text-white md:px-12 md:py-20">
                        <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">Join Us on Our Journey</h2>
                        <p className="mb-8 text-lg text-slate-300">
                            Experience the FastRocket difference. Fast, reliable, and customer-focused delivery.
                        </p>
                        <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                            <Link href="/services">
                                <motion.span
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-8 text-base font-medium text-white shadow-lg transition-all hover:from-orange-600 hover:to-orange-700"
                                >
                                    Explore Services
                                </motion.span>
                            </Link>
                            <Link href="/contact">
                                <motion.span
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 bg-transparent px-8 text-base font-medium text-white transition-colors hover:bg-white/10"
                                >
                                    Contact Us
                                </motion.span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
