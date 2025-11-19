import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { Providers } from "@/components/Providers";
import ChatWidget from '@/components/ChatWidget';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://fastrocket.com'),
  title: {
    default: "FastRocket Delivery | Fast, Reliable Package Tracking & Shipping",
    template: "%s | FastRocket Delivery"
  },
  description: "Premium delivery and package tracking service. Ship packages worldwide with real-time tracking, express delivery options, and 24/7 customer support. Fast, reliable, and secure shipping solutions.",
  keywords: ["package tracking", "delivery service", "express shipping", "international shipping", "freight services", "package delivery", "tracking number", "fast delivery"],
  authors: [{ name: "FastRocket Delivery" }],
  creator: "FastRocket Delivery",
  publisher: "FastRocket Delivery",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://fastrocket.com",
    title: "FastRocket Delivery | Fast, Reliable Package Tracking & Shipping",
    description: "Premium delivery and package tracking service with real-time updates, express shipping, and worldwide coverage.",
    siteName: "FastRocket Delivery",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FastRocket Delivery - Premium Shipping Service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FastRocket Delivery | Fast, Reliable Package Tracking",
    description: "Premium delivery service with real-time tracking and worldwide shipping.",
    images: ["/og-image.jpg"],
    creator: "@fastrocket",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};



// ... imports

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased`}
      >
        <Providers>
          <GoogleAnalytics />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <ChatWidget />
        </Providers>
      </body>
    </html>
  );
}
