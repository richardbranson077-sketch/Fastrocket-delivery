'use client';

import Link from 'next/link';
import { Rocket, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [hoveredPath, setHoveredPath] = useState<string | null>(null);

    const navLinks = [
        { path: '/tracking', label: 'Track Package' },
        { path: '/services', label: 'Services' },
        { path: '/about', label: 'About Us' },
        { path: '/contact', label: 'Contact' },
    ];

    const mobileMenuVariants = {
        closed: {
            opacity: 0,
            height: 0,
            transition: {
                staggerChildren: 0.05,
                staggerDirection: -1
            }
        },
        open: {
            opacity: 1,
            height: 'auto',
            transition: {
                staggerChildren: 0.07,
                delayChildren: 0.1
            }
        }
    };

    const mobileItemVariants = {
        closed: { opacity: 0, x: -16 },
        open: { opacity: 1, x: 0 }
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4">
                <Link href="/" className="flex items-center space-x-2">
                    <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <Rocket className="h-5 w-5" />
                    </div>
                    <span className="text-lg font-bold tracking-tight">FastRocket</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex md:items-center md:space-x-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            href={link.path}
                            className="relative px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                            onMouseEnter={() => setHoveredPath(link.path)}
                            onMouseLeave={() => setHoveredPath(null)}
                        >
                            {link.path === hoveredPath && (
                                <motion.span
                                    layoutId="navbar-hover"
                                    className="absolute inset-0 -z-10 rounded-md bg-primary/10"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            {link.label}
                        </Link>
                    ))}

                </div>

                {/* Mobile Menu Button */}
                <button
                    className="flex h-9 w-9 items-center justify-center rounded-md border border-input bg-transparent md:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span className="sr-only">Toggle menu</span>
                    {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                </button>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={mobileMenuVariants}
                        className="border-b border-border md:hidden"
                    >
                        <div className="flex flex-col space-y-4 p-4">
                            {navLinks.map((link) => (
                                <motion.div key={link.path} variants={mobileItemVariants}>
                                    <Link
                                        href={link.path}
                                        className="block text-sm font-medium transition-colors hover:text-primary"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
