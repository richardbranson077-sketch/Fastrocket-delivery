import Link from 'next/link';
import { Rocket, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { TeamGallery } from '@/components/TeamGallery';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export function Footer() {
    return (
        <footer className="border-t bg-muted/40">
            <TeamGallery />
            <div className="container max-w-screen-2xl px-4 py-12 md:py-16">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                <Rocket className="h-5 w-5" />
                            </div>
                            <span className="text-lg font-bold tracking-tight">FastRocket</span>
                        </Link>
                        <p className="text-sm text-muted-foreground">
                            Premium delivery solutions for the modern world. Fast, reliable, and secure shipping worldwide.
                        </p>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-semibold">Services</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/services" className="hover:text-primary">Express Delivery</Link></li>
                            <li><Link href="/services" className="hover:text-primary">International Shipping</Link></li>
                            <li><Link href="/services" className="hover:text-primary">Freight Services</Link></li>
                            <li><Link href="/services" className="hover:text-primary">Business Solutions</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-semibold">Company</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
                            <li><Link href="/faq" className="hover:text-primary">FAQ</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-semibold">Legal</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-primary">Terms of Service</Link></li>
                            <li><Link href="/cookies" className="hover:text-primary">Cookie Policy</Link></li>
                            <li><Link href="/shipping" className="hover:text-primary">Shipping Policy</Link></li>
                            <li><Link href="/refunds" className="hover:text-primary">Refund Policy</Link></li>
                        </ul>
                    </div>

                    <div className="md:col-span-2 lg:col-span-1">
                        <h3 className="mb-4 text-sm font-semibold">Connect</h3>
                        <div className="flex space-x-4 mb-6">
                            <Link href="#" className="text-muted-foreground hover:text-primary">
                                <Facebook className="h-5 w-5" />
                                <span className="sr-only">Facebook</span>
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary">
                                <Twitter className="h-5 w-5" />
                                <span className="sr-only">Twitter</span>
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary">
                                <Instagram className="h-5 w-5" />
                                <span className="sr-only">Instagram</span>
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary">
                                <Linkedin className="h-5 w-5" />
                                <span className="sr-only">LinkedIn</span>
                            </Link>
                        </div>
                        <div>
                            <h3 className="mb-4 text-sm font-semibold">Language</h3>
                            <LanguageSwitcher />
                        </div>
                    </div>
                </div>

                <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} FastRocketDelivery. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
