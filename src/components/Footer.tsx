'use client';

import Link from 'next/link';
import { Rocket, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { TeamGallery } from '@/components/TeamGallery';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useTranslations } from 'use-intl';

export function Footer() {
    const t = useTranslations('Footer');
    const currentYear = new Date().getFullYear();

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
                            {t('tagline')}
                        </p>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-semibold">{t('services.title')}</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/services" className="hover:text-primary">{t('services.express')}</Link></li>
                            <li><Link href="/services" className="hover:text-primary">{t('services.international')}</Link></li>
                            <li><Link href="/services" className="hover:text-primary">{t('services.freight')}</Link></li>
                            <li><Link href="/services" className="hover:text-primary">{t('services.business')}</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-semibold">{t('company.title')}</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/about" className="hover:text-primary">{t('company.about')}</Link></li>
                            <li><Link href="/contact" className="hover:text-primary">{t('company.contact')}</Link></li>
                            <li><Link href="/faq" className="hover:text-primary">{t('company.faq')}</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-semibold">{t('legal.title')}</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/privacy" className="hover:text-primary">{t('legal.privacy')}</Link></li>
                            <li><Link href="/terms" className="hover:text-primary">{t('legal.terms')}</Link></li>
                            <li><Link href="/cookies" className="hover:text-primary">{t('legal.cookies')}</Link></li>
                            <li><Link href="/shipping" className="hover:text-primary">{t('legal.shipping')}</Link></li>
                            <li><Link href="/refunds" className="hover:text-primary">{t('legal.refunds')}</Link></li>
                        </ul>
                    </div>

                    <div className="md:col-span-2 lg:col-span-1">
                        <h3 className="mb-4 text-sm font-semibold">{t('connect.title')}</h3>
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
                            <h3 className="mb-4 text-sm font-semibold">{t('connect.language')}</h3>
                            <LanguageSwitcher />
                        </div>
                    </div>
                </div>

                <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
                    <p>&copy; {currentYear} FastRocketDelivery. {t('copyright')}</p>
                </div>
            </div>
        </footer>
    );
}
