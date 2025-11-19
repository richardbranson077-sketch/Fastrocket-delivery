'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, ArrowLeft, Rocket } from 'lucide-react';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const result = await signIn('credentials', {
                email: formData.email,
                password: formData.password,
                redirect: false,
            });

            if (result?.error) {
                setError('Invalid email or password. Please try again.');
                setIsLoading(false);
            } else if (result?.ok) {
                // Successful login - redirect to admin dashboard
                router.push('/admin');
                router.refresh();
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        // Clear error when user starts typing
        if (error) setError('');
    };

    return (
        <div className="flex min-h-screen flex-col">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-12 text-white">
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
                    className="absolute right-0 top-0 -z-10 h-[300px] w-[300px] rounded-full bg-blue-500/20 blur-[100px]"
                ></motion.div>

                <div className="container max-w-screen-2xl px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center justify-center"
                    >
                        <Link href="/" className="inline-flex items-center space-x-2 text-white hover:text-slate-200">
                            <ArrowLeft className="h-4 w-4" />
                            <span className="text-sm">Back to Home</span>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Login Form */}
            <section className="flex flex-1 items-center justify-center py-12">
                <div className="container max-w-screen-2xl px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mx-auto max-w-md"
                    >
                        <div className="mb-8 text-center">
                            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg">
                                <Rocket className="h-8 w-8" />
                            </div>
                            <h1 className="mb-2 text-3xl font-bold">Admin Login</h1>
                            <p className="text-muted-foreground">Sign in to access the dashboard</p>
                        </div>

                        <form onSubmit={handleSubmit} className="rounded-2xl border bg-card p-8 shadow-lg">
                            <div className="grid gap-6">
                                {/* Error Message */}
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200"
                                    >
                                        {error}
                                    </motion.div>
                                )}

                                <div className="grid gap-2">
                                    <label className="text-sm font-medium" htmlFor="email">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                                        <input
                                            id="email"
                                            name="email"
                                            placeholder="you@example.com"
                                            type="email"
                                            autoCapitalize="none"
                                            autoComplete="email"
                                            autoCorrect="off"
                                            required
                                            disabled={isLoading}
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="flex h-12 w-full rounded-lg border border-input bg-background px-3 py-2 pl-11 text-sm shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary hover:border-primary/50 disabled:cursor-not-allowed disabled:opacity-50"
                                        />
                                    </div>
                                </div>

                                <div className="grid gap-2">
                                    <div className="flex items-center justify-between">
                                        <label className="text-sm font-medium" htmlFor="password">
                                            Password
                                        </label>
                                        <Link href="#" className="text-sm text-primary hover:underline">
                                            Forgot password?
                                        </Link>
                                    </div>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoCapitalize="none"
                                            autoComplete="current-password"
                                            required
                                            disabled={isLoading}
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="flex h-12 w-full rounded-lg border border-input bg-background px-3 py-2 pl-11 text-sm shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary hover:border-primary/50 disabled:cursor-not-allowed disabled:opacity-50"
                                        />
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={isLoading}
                                    className="inline-flex h-12 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 px-8 text-base font-medium text-white shadow-lg transition-all hover:from-blue-600 hover:to-cyan-600 disabled:opacity-50"
                                >
                                    {isLoading ? (
                                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                    ) : (
                                        <>
                                            Sign In <ArrowRight className="ml-2 h-5 w-5" />
                                        </>
                                    )}
                                </motion.button>
                            </div>
                        </form>



                        {/* Demo Credentials */}
                        <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950">
                            <p className="mb-2 text-sm font-medium text-blue-900 dark:text-blue-100">Demo Credentials:</p>
                            <p className="text-xs text-blue-700 dark:text-blue-300">
                                Email: demo@fastrocket.com<br />
                                Password: password123
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
