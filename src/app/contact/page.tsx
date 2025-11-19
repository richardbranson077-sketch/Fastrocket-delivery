'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Headphones } from 'lucide-react';
import { useState } from 'react';
import { ReCaptchaProvider, useReCaptcha } from '@/components/ReCaptcha';

function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const { getReCaptchaToken } = useReCaptcha();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage('');

        try {
            // Get reCAPTCHA token
            const recaptchaToken = await getReCaptchaToken('contact_form');

            if (!recaptchaToken) {
                throw new Error('reCAPTCHA verification failed');
            }

            // Verify reCAPTCHA token
            const verifyResponse = await fetch('/api/verify-recaptcha', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: recaptchaToken }),
            });

            const verifyData = await verifyResponse.json();

            if (!verifyData.success) {
                throw new Error('Bot detection failed. Please try again.');
            }

            // TODO: Send form data to your backend
            // For now, simulate successful submission
            await new Promise((resolve) => setTimeout(resolve, 1000));

            setIsSubmitting(false);
            setSubmitStatus('success');
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });

            // Reset success message after 5 seconds
            setTimeout(() => setSubmitStatus('idle'), 5000);
        } catch (error: any) {
            setIsSubmitting(false);
            setSubmitStatus('error');
            setErrorMessage(error.message || 'Failed to submit form. Please try again.');
            setTimeout(() => setSubmitStatus('idle'), 5000);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const contactMethods = [
        {
            icon: Phone,
            title: "Call Us",
            description: "Mon-Fri from 8am to 6pm",
            value: "+1 (214) 249-6444",
            link: "tel:+12142496444",
            gradient: "from-blue-500 to-cyan-500"
        },
        {
            icon: Mail,
            title: "Email Us",
            description: "We'll respond within 24 hours",
            value: "support@fastrocket.com",
            link: "mailto:support@fastrocket.com",
            gradient: "from-purple-500 to-pink-500"
        },
        {
            icon: MessageSquare,
            title: "Live Chat",
            description: "Available 24/7 for urgent matters",
            value: "Start a conversation",
            link: "#",
            gradient: "from-orange-500 to-red-500"
        },
        {
            icon: Headphones,
            title: "Support Center",
            description: "Browse our help articles",
            value: "Visit Help Center",
            link: "#",
            gradient: "from-green-500 to-emerald-500"
        }
    ];

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
                    className="absolute right-0 top-0 -z-10 h-[400px] w-[400px] rounded-full bg-purple-500/20 blur-[120px]"
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
                        <span className="mb-4 inline-block rounded-full bg-purple-500/20 px-4 py-1.5 text-sm font-medium text-purple-300 backdrop-blur-sm ring-1 ring-purple-500/30">
                            Get In Touch
                        </span>
                        <h1 className="mb-6 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
                            We're Here to <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-400 bg-clip-text text-transparent">Help</span>
                        </h1>
                        <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-300 md:text-xl">
                            Have questions about our services? Need support with a shipment? Our team is ready to assist you.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Methods Grid */}
            <section className="py-20">
                <div className="container max-w-screen-2xl px-4">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-3xl font-bold tracking-tight">Choose Your Preferred Way to Connect</h2>
                        <p className="text-muted-foreground">We're available through multiple channels to serve you better</p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {contactMethods.map((method, index) => (
                            <motion.a
                                key={index}
                                href={method.link}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="group relative overflow-hidden rounded-2xl border bg-card p-6 shadow-sm transition-all hover:shadow-lg"
                            >
                                <div className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${method.gradient} text-white shadow-lg`}>
                                    <method.icon className="h-7 w-7" />
                                </div>
                                <h3 className="mb-2 text-lg font-bold">{method.title}</h3>
                                <p className="mb-3 text-sm text-muted-foreground">{method.description}</p>
                                <p className="font-medium text-primary">{method.value}</p>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form & Office Info */}
            <section className="bg-muted/30 py-20">
                <div className="container max-w-screen-2xl px-4">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                        {/* Office Information */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            <div>
                                <h2 className="mb-6 text-2xl font-bold">Our Office</h2>
                                <p className="text-muted-foreground">Visit us at our headquarters or reach out through any of our contact channels.</p>
                            </div>

                            <div className="space-y-6">
                                <div className="rounded-xl border bg-card p-6 shadow-sm">
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-500 text-white">
                                        <MapPin className="h-6 w-6" />
                                    </div>
                                    <h3 className="mb-2 font-semibold">Address</h3>
                                    <p className="text-sm text-muted-foreground">
                                        123 Delivery Lane<br />
                                        Dallas, TX 75201<br />
                                        United States
                                    </p>
                                </div>

                                <div className="rounded-xl border bg-card p-6 shadow-sm">
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                                        <Clock className="h-6 w-6" />
                                    </div>
                                    <h3 className="mb-2 font-semibold">Business Hours</h3>
                                    <div className="space-y-1 text-sm text-muted-foreground">
                                        <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                                        <p>Saturday: 9:00 AM - 4:00 PM</p>
                                        <p>Sunday: Closed</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="lg:col-span-2"
                        >
                            <form onSubmit={handleSubmit} className="rounded-2xl border bg-card p-8 shadow-lg">
                                <div className="mb-8">
                                    <h2 className="mb-2 text-2xl font-bold">Send us a Message</h2>
                                    <p className="text-muted-foreground">Fill out the form below and we'll get back to you within 24 hours.</p>
                                </div>

                                {submitStatus === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 text-green-800"
                                    >
                                        <p className="font-medium">✓ Message sent successfully!</p>
                                        <p className="text-sm">We'll get back to you as soon as possible.</p>
                                    </motion.div>
                                )}

                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div>
                                        <label htmlFor="name" className="mb-2 block text-sm font-medium">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="h-12 w-full rounded-lg border border-input bg-background px-4 text-sm shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary hover:border-primary/50"
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="mb-2 block text-sm font-medium">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="h-12 w-full rounded-lg border border-input bg-background px-4 text-sm shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary hover:border-primary/50"
                                            placeholder="john@example.com"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className="mb-2 block text-sm font-medium">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="h-12 w-full rounded-lg border border-input bg-background px-4 text-sm shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary hover:border-primary/50"
                                            placeholder="+1 (555) 000-0000"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="subject" className="mb-2 block text-sm font-medium">
                                            Subject *
                                        </label>
                                        <select
                                            id="subject"
                                            name="subject"
                                            required
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="h-12 w-full rounded-lg border border-input bg-background px-4 text-sm shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary hover:border-primary/50"
                                        >
                                            <option value="">Select a subject</option>
                                            <option value="general">General Inquiry</option>
                                            <option value="shipping">Shipping Question</option>
                                            <option value="tracking">Tracking Issue</option>
                                            <option value="business">Business Partnership</option>
                                            <option value="support">Customer Support</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <label htmlFor="message" className="mb-2 block text-sm font-medium">
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={6}
                                        className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary hover:border-primary/50"
                                        placeholder="Tell us how we can help you..."
                                    ></textarea>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 px-8 text-base font-medium text-white shadow-lg transition-all hover:from-purple-600 hover:to-purple-700 disabled:opacity-50 md:w-auto"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="mr-2 h-4 w-4" />
                                            Send Message
                                        </>
                                    )}
                                </motion.button>

                                {/* Error Message */}
                                {submitStatus === 'error' && errorMessage && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200"
                                    >
                                        {errorMessage}
                                    </motion.div>
                                )}
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="py-20">
                <div className="container max-w-screen-2xl px-4">
                    <div className="mb-8 text-center">
                        <h2 className="mb-4 text-3xl font-bold tracking-tight">Find Us</h2>
                        <p className="text-muted-foreground">Visit our headquarters in Dallas, Texas</p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="overflow-hidden rounded-2xl border bg-card shadow-xl"
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3355.2891917755845!2d-96.80174492346654!3d32.77997897362059!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864e993c4f3b3f3f%3A0x3f3f3f3f3f3f3f3f!2sDallas%2C%20TX!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                            width="100%"
                            height="500"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="w-full"
                        ></iframe>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

// Wrap with ReCaptchaProvider
export default function ContactPage() {
    return (
        <ReCaptchaProvider>
            <ContactForm />
        </ReCaptchaProvider>
    );
}
