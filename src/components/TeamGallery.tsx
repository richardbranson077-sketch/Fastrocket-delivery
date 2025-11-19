'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export function TeamGallery() {
    return (
        <section className="py-12 border-t bg-slate-50/50">
            <div className="container max-w-screen-2xl px-4">
                <div className="mb-8 text-center">
                    <h2 className="mb-2 text-2xl font-bold tracking-tight md:text-3xl">Our Team in Action</h2>
                    <p className="text-sm text-muted-foreground">Dedicated professionals ensuring your packages arrive safely</p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {[
                        {
                            src: "/images/delivery-handover.png",
                            title: "Personalized Service",
                            description: "Our friendly couriers ensure a smile with every delivery."
                        },
                        {
                            src: "/images/warehouse-scanning.png",
                            title: "Advanced Logistics",
                            description: "State-of-the-art warehousing for precise package tracking."
                        },
                        {
                            src: "/images/driver-van.png",
                            title: "Modern Fleet",
                            description: "Eco-friendly electric vans for sustainable delivery."
                        }
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="group"
                        >
                            <div className="relative mb-3 aspect-[4/3] overflow-hidden rounded-xl shadow-sm">
                                <Image
                                    src={item.src}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                            </div>
                            <h3 className="mb-1 text-lg font-semibold">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
