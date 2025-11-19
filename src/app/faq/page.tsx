'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { HelpCircle, ChevronDown, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

const faqs = [
    {
        category: "Shipping & Delivery",
        questions: [
            {
                question: "What are your delivery timeframes?",
                answer: "We offer same-day, next-day, and standard delivery options. Same-day delivery is available for orders placed before 12 PM in major cities. Next-day delivery covers most urban areas, while standard delivery typically takes 2-5 business days depending on the destination."
            },
            {
                question: "Do you ship internationally?",
                answer: "Yes! We ship to over 200 countries worldwide. Our international shipping includes customs clearance support, door-to-door service, and real-time tracking. Delivery times vary by destination, typically ranging from 3-10 business days."
            },
            {
                question: "How much does shipping cost?",
                answer: "Shipping costs vary based on package weight, dimensions, destination, and delivery speed. You can get an instant quote on our services page or during checkout. We also offer volume discounts for business customers."
            }
        ]
    },
    {
        category: "Tracking & Support",
        questions: [
            {
                question: "How can I track my package?",
                answer: "You can track your package in real-time using your tracking number on our tracking page. You'll receive email and SMS notifications at key milestones, and you can also download our mobile app for instant updates."
            },
            {
                question: "What if my package is delayed?",
                answer: "If your package is delayed, you'll receive automatic notifications. You can contact our 24/7 support team for assistance. We'll investigate the delay and provide you with updated delivery information."
            },
            {
                question: "Can I change my delivery address after shipping?",
                answer: "Yes, in most cases you can request an address change before the package is out for delivery. Contact our support team as soon as possible with your tracking number and new address. Additional fees may apply."
            }
        ]
    },
    {
        category: "Payments & Refunds",
        questions: [
            {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for business accounts. All payments are processed securely through encrypted connections."
            },
            {
                question: "What is your refund policy?",
                answer: "If your package doesn't arrive by the guaranteed delivery date, you may be eligible for a refund. Contact our support team within 48 hours of the missed delivery date to initiate a refund request."
            },
            {
                question: "Do you offer insurance for packages?",
                answer: "Yes, all shipments include basic insurance up to $100. Additional insurance can be purchased for high-value items. Insurance covers loss and damage during transit."
            }
        ]
    },
    {
        category: "Business Services",
        questions: [
            {
                question: "Do you offer business accounts?",
                answer: "Yes! Our business solutions include volume discounts, API integration, dedicated account management, and custom reporting. Contact our sales team to discuss your specific needs and get a tailored quote."
            },
            {
                question: "Can I integrate your API with my e-commerce platform?",
                answer: "Absolutely! We offer a comprehensive API that integrates with major e-commerce platforms including Shopify, WooCommerce, and Magento. Our technical team provides full documentation and support."
            },
            {
                question: "What are your volume discounts?",
                answer: "Volume discounts are available for businesses shipping 100+ packages per month. Discounts increase with volume and vary by service level. Contact our business team for a custom quote."
            }
        ]
    }
];

function FAQItem({ faq, index }: { faq: typeof faqs[0]['questions'][0], index: number }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="border-b border-border last:border-0"
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center justify-between py-5 text-left transition-colors hover:text-primary"
            >
                <span className="pr-4 font-semibold">{faq.question}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
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
                <p className="pb-5 text-muted-foreground">{faq.answer}</p>
            </motion.div>
        </motion.div>
    );
}

export default function FAQPage() {
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
                    className="absolute right-0 top-0 -z-10 h-[400px] w-[400px] rounded-full bg-yellow-500/20 blur-[120px]"
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
                        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 text-white shadow-lg">
                            <HelpCircle className="h-8 w-8" />
                        </div>
                        <h1 className="mb-6 text-4xl font-extrabold tracking-tight md:text-5xl">
                            Frequently Asked Questions
                        </h1>
                        <p className="mx-auto max-w-2xl text-lg text-slate-300">
                            Find answers to common questions about our delivery services
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* FAQ Content */}
            <section className="py-20">
                <div className="container max-w-4xl px-4">
                    <div className="space-y-12">
                        {faqs.map((category, categoryIndex) => (
                            <motion.div
                                key={categoryIndex}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: categoryIndex * 0.1 }}
                            >
                                <h2 className="mb-6 text-2xl font-bold">{category.category}</h2>
                                <div className="rounded-2xl border bg-card p-6 shadow-sm">
                                    {category.questions.map((faq, index) => (
                                        <FAQItem key={index} faq={faq} index={index} />
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Still Have Questions CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-16 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8 text-center text-white md:p-12"
                    >
                        <h2 className="mb-4 text-2xl font-bold">Still have questions?</h2>
                        <p className="mb-6 text-slate-300">
                            Can't find the answer you're looking for? Our support team is here to help.
                        </p>
                        <Link href="/contact">
                            <motion.span
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex h-12 items-center justify-center rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 px-8 text-base font-medium text-white shadow-lg transition-all hover:from-orange-600 hover:to-orange-700"
                            >
                                Contact Support
                            </motion.span>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
