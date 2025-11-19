'use client';

import { motion } from 'framer-motion';
import { Package, Plane, Truck, Building2, Clock, Shield, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const services = [
    {
        icon: Package,
        title: "Express Delivery",
        description: "Same-day and next-day delivery options for urgent shipments. Perfect for time-sensitive packages.",
        features: ["Same-day delivery", "Real-time tracking", "Priority handling", "Weekend delivery available"],
        color: "from-blue-500 to-cyan-500"
    },
    {
        icon: Plane,
        title: "International Shipping",
        description: "Global shipping to over 200 countries with customs clearance support and competitive rates.",
        features: ["200+ countries", "Customs assistance", "Door-to-door service", "Multi-currency support"],
        color: "from-purple-500 to-pink-500"
    },
    {
        icon: Truck,
        title: "Freight Services",
        description: "Heavy cargo and bulk shipment solutions with dedicated logistics support and flexible scheduling.",
        features: ["LTL & FTL options", "Specialized handling", "Flexible scheduling", "Volume discounts"],
        color: "from-orange-500 to-red-500"
    },
    {
        icon: Building2,
        title: "Business Solutions",
        description: "Tailored shipping solutions for businesses with dedicated account management and API integration.",
        features: ["API integration", "Volume pricing", "Dedicated support", "Custom reporting"],
        color: "from-green-500 to-emerald-500"
    }
];

const faqs = [
    {
        question: "What are your delivery timeframes?",
        answer: "We offer same-day, next-day, and standard delivery options. Same-day delivery is available for orders placed before 12 PM in major cities. Next-day delivery covers most urban areas, while standard delivery typically takes 2-5 business days depending on the destination."
    },
    {
        question: "Do you ship internationally?",
        answer: "Yes! We ship to over 200 countries worldwide. Our international shipping includes customs clearance support, door-to-door service, and real-time tracking. Delivery times vary by destination, typically ranging from 3-10 business days."
    },
    {
        question: "How can I track my package?",
        answer: "You can track your package in real-time using your tracking number on our tracking page. You'll receive email and SMS notifications at key milestones, and you can also download our mobile app for instant updates."
    },
    {
        question: "What if my package is damaged or lost?",
        answer: "All shipments are insured against damage and loss. If your package arrives damaged or doesn't arrive at all, contact our support team within 48 hours. We'll investigate immediately and provide a replacement or full refund as appropriate."
    },
    {
        question: "Do you offer business accounts?",
        answer: "Yes! Our business solutions include volume discounts, API integration, dedicated account management, and custom reporting. Contact our sales team to discuss your specific needs and get a tailored quote."
    },
    {
        question: "What items cannot be shipped?",
        answer: "We cannot ship hazardous materials, illegal items, perishables (without special arrangements), and items prohibited by international shipping regulations. Contact us if you're unsure about a specific item."
    }
];

function FAQItem({ faq, index }: { faq: typeof faqs[0], index: number }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="border-b border-border"
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center justify-between py-6 text-left transition-colors hover:text-primary"
            >
                <span className="text-lg font-semibold">{faq.question}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ChevronDown className="h-5 w-5" />
                </motion.div>
            </button>
            <motion.div
                initial={false}
                animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
            >
                <p className="pb-6 text-muted-foreground">{faq.answer}</p>
            </motion.div>
        </motion.div>
    );
}

export default function ServicesPage() {
    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-20 text-white md:py-32">
                <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

                {/* Animated Blobs */}
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
                    className="absolute right-0 top-0 -z-10 h-[400px] w-[400px] rounded-full bg-orange-500/20 blur-[120px]"
                ></motion.div>

                <motion.div
                    animate={{
                        y: [0, 25, 0],
                        opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{
                        duration: 7,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                    }}
                    className="absolute bottom-0 left-0 -z-10 h-[350px] w-[350px] rounded-full bg-blue-500/15 blur-[100px]"
                ></motion.div>

                <div className="container max-w-screen-2xl px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="mb-4 inline-block rounded-full bg-orange-500/20 px-4 py-1.5 text-sm font-medium text-orange-300 backdrop-blur-sm ring-1 ring-orange-500/30">
                            Our Services
                        </span>
                        <h1 className="mb-6 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
                            Delivery Solutions for <br className="hidden sm:block" />
                            <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400 bg-clip-text text-transparent">Every Need</span>
                        </h1>
                        <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-300 md:text-xl">
                            From express local delivery to international freight, we've got you covered with reliable, fast, and secure shipping solutions.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="bg-muted/30 py-20">
                <div className="container max-w-screen-2xl px-4">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                className="group rounded-2xl border bg-card p-8 shadow-sm transition-all hover:shadow-lg"
                            >
                                <div className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${service.color} text-white shadow-lg`}>
                                    <service.icon className="h-8 w-8" />
                                </div>
                                <h3 className="mb-3 text-2xl font-bold">{service.title}</h3>
                                <p className="mb-6 text-muted-foreground">{service.description}</p>
                                <ul className="mb-6 space-y-2">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center text-sm">
                                            <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary"></div>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <Link href="/contact">
                                    <motion.span
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="inline-flex items-center text-sm font-medium text-primary transition-colors hover:text-primary/80"
                                    >
                                        Learn More →
                                    </motion.span>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-20">
                <div className="container max-w-screen-2xl px-4">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Why Choose FastRocket?</h2>
                        <p className="text-muted-foreground">We're committed to delivering excellence with every shipment.</p>
                    </div>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {[
                            { icon: Clock, title: "Fast & Reliable", description: "On-time delivery guaranteed with real-time tracking and updates." },
                            { icon: Shield, title: "Secure & Insured", description: "All shipments are fully insured and handled with utmost care." },
                            { icon: Building2, title: "24/7 Support", description: "Our dedicated support team is always here to help you." }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                    <item.icon className="h-6 w-6" />
                                </div>
                                <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                                <p className="text-muted-foreground">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="bg-muted/30 py-20">
                <div className="container max-w-screen-2xl px-4">
                    <div className="mx-auto max-w-3xl">
                        <div className="mb-12 text-center">
                            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Frequently Asked Questions</h2>
                            <p className="text-muted-foreground">Got questions? We've got answers.</p>
                        </div>
                        <div className="rounded-2xl border bg-card p-6 shadow-sm md:p-8">
                            {faqs.map((faq, index) => (
                                <FAQItem key={index} faq={faq} index={index} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20">
                <div className="container max-w-screen-2xl px-4">
                    <div className="rounded-3xl bg-primary px-6 py-16 text-center text-primary-foreground md:px-12 md:py-20">
                        <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">Ready to Get Started?</h2>
                        <p className="mb-8 text-lg text-primary-foreground/90">
                            Contact our team to discuss your shipping needs and get a custom quote.
                        </p>
                        <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                            <Link href="/contact">
                                <motion.span
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="inline-flex h-12 items-center justify-center rounded-full bg-background px-8 text-base font-medium text-primary shadow transition-colors hover:bg-background/90"
                                >
                                    Contact Sales
                                </motion.span>
                            </Link>
                            <Link href="/tracking">
                                <motion.span
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="inline-flex h-12 items-center justify-center rounded-full border border-primary-foreground/20 bg-transparent px-8 text-base font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10"
                                >
                                    Track Package
                                </motion.span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
