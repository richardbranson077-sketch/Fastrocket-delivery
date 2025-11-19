'use client';

import { ArrowRight, Package, Clock, Globe, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

import LogisticsBackground from '@/components/LogisticsBackground';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 text-white md:py-32">
        <LogisticsBackground />

        <div className="container flex max-w-screen-2xl flex-col items-center px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="mb-4 inline-block rounded-full bg-primary/20 px-4 py-1.5 text-sm font-medium text-primary-foreground backdrop-blur-sm ring-1 ring-primary/30"
            >
              FastRocketDelivery
            </motion.span>
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Delivery at the speed of <br className="hidden sm:block" />
              <motion.span
                initial={{ backgroundPosition: "0% 50%" }}
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className="relative bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400 bg-[length:200%_auto] bg-clip-text text-transparent"
              >
                light.
                <motion.span
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -right-2 -top-2 h-3 w-3 rounded-full bg-orange-400 blur-sm"
                ></motion.span>
              </motion.span>
            </h1>
            <p className="mb-8 max-w-2xl text-lg text-slate-300 md:text-xl">
              Experience the fastest, most reliable delivery service. Track your packages in real-time and enjoy peace of mind with FastRocket.
            </p>
          </motion.div>

          {/* Tracking Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-md"
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const input = e.currentTarget.elements.namedItem('trackingId') as HTMLInputElement;
                if (input.value) {
                  window.location.href = `/tracking?id=${input.value}`;
                }
              }}
              className="relative flex items-center"
            >
              <input
                name="trackingId"
                type="text"
                placeholder="Enter your tracking number..."
                className="h-14 w-full rounded-full border border-white/20 bg-white/10 px-6 py-2 pr-36 text-base text-white placeholder:text-slate-400 shadow-sm backdrop-blur-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 hover:shadow-md focus:shadow-lg"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="absolute right-1.5 top-1.5 h-11 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-6 text-sm font-medium text-white shadow-lg transition-all hover:from-orange-600 hover:to-orange-700"
              >
                Track Now
              </motion.button>
            </form>
            <p className="mt-3 text-xs text-slate-400">
              e.g., FR-123456789
            </p>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-slate-300"
          >
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span>10M+ Deliveries</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              <span>200+ Countries</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-purple-500"></div>
              <span>99.9% On-Time</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/30 py-20">
        <div className="container max-w-screen-2xl px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Why Choose FastRocket?</h2>
            <p className="mt-4 text-muted-foreground">We deliver more than just packages; we deliver promises.</p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                icon: Clock,
                title: "Lightning Fast",
                description: "Same-day delivery options available for major cities. We value your time."
              },
              {
                icon: Globe,
                title: "Global Reach",
                description: "Shipping to over 200 countries worldwide with real-time tracking updates."
              },
              {
                icon: ShieldCheck,
                title: "Secure Handling",
                description: "Your packages are handled with utmost care and insured against damage."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group rounded-2xl border bg-card p-8 shadow-sm transition-all hover:shadow-lg"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20">
        <div className="container max-w-screen-2xl px-4">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                About FastRocket
              </span>
              <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">
                Revolutionizing the Delivery Industry
              </h2>
              <p className="mb-4 text-lg text-muted-foreground">
                FastRocket was founded with a simple mission: to make shipping faster, more reliable, and more accessible for everyone. What started as a local courier service has grown into a global logistics powerhouse.
              </p>
              <p className="mb-6 text-muted-foreground">
                Today, we handle millions of packages annually, serving individuals and businesses across the globe. Our commitment to innovation, customer service, and sustainability sets us apart in the delivery industry.
              </p>
              <Link href="/services">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center text-primary hover:underline"
                >
                  Learn more about our services <ArrowRight className="ml-2 h-4 w-4" />
                </motion.span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-6"
            >
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
                  className="rounded-2xl border bg-card p-6 text-center shadow-sm"
                >
                  <div className="mb-2 text-3xl font-bold text-primary md:text-4xl">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Showcase */}
      <section className="bg-muted/30 py-20">
        <div className="container max-w-screen-2xl px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Our Services</h2>
            <p className="text-muted-foreground">Comprehensive delivery solutions tailored to your needs</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Express Delivery",
                description: "Same-day and next-day delivery for urgent shipments",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                title: "International Shipping",
                description: "Global delivery to over 200 countries worldwide",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                title: "Freight Services",
                description: "Heavy cargo and bulk shipment solutions",
                gradient: "from-orange-500 to-red-500"
              },
              {
                title: "Business Solutions",
                description: "Custom logistics for businesses of all sizes",
                gradient: "from-green-500 to-emerald-500"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group rounded-2xl border bg-card p-6 shadow-sm transition-all hover:shadow-lg"
              >
                <div className={`mb-4 h-2 w-16 rounded-full bg-gradient-to-r ${service.gradient}`}></div>
                <h3 className="mb-2 text-xl font-semibold">{service.title}</h3>
                <p className="mb-4 text-sm text-muted-foreground">{service.description}</p>
                <Link href="/services" className="inline-flex items-center text-sm font-medium text-primary hover:underline">
                  Learn more <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container max-w-screen-2xl px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">How It Works</h2>
            <p className="text-muted-foreground">Simple, fast, and reliable shipping in three easy steps</p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-primary/50 to-transparent lg:block"></div>

            <div className="space-y-12">
              {[
                {
                  step: "01",
                  title: "Book Your Shipment",
                  description: "Enter your package details and destination. Get instant quotes and choose the service that fits your needs."
                },
                {
                  step: "02",
                  title: "We Pick Up & Ship",
                  description: "Schedule a pickup or drop off at any of our locations. We handle your package with care and get it on its way."
                },
                {
                  step: "03",
                  title: "Track & Receive",
                  description: "Monitor your package in real-time with our tracking system. Receive notifications at every milestone until delivery."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className={`flex flex-col gap-8 lg:flex-row lg:gap-16 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                >
                  <div className="flex-1">
                    <div className="rounded-2xl border bg-card p-8 shadow-sm">
                      <div className="mb-4 text-5xl font-bold text-primary/20">{item.step}</div>
                      <h3 className="mb-3 text-2xl font-bold">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                  <div className="hidden flex-1 lg:block"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose FastRocket Delivery */}
      <section className="bg-white py-20">
        <div className="container max-w-screen-2xl px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Why Deliver With Us</h2>
            <p className="text-muted-foreground">Experience the FastRocket difference in every shipment</p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                src: "/images/cargo-ship.png",
                title: "Never Lost,\nAlways Found",
                description: "Real-time GPS tracking on every package, every mile of the journey"
              },
              {
                src: "/images/cargo-plane.png",
                title: "Speed That\nDefies Gravity",
                description: "Same-day delivery available - your urgent packages arrive before you know it"
              },
              {
                src: "/images/freight-truck.png",
                title: "Handled With\nWhite Gloves",
                description: "Every item treated as precious cargo, insured and protected throughout"
              },
              {
                src: "/images/warehouse.png",
                title: "Smart Storage,\nFast Retrieval",
                description: "AI-powered warehousing ensures your shipment is always ready to move"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 shadow-sm transition-shadow hover:shadow-lg">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover p-4"
                  />
                </div>
                <h3 className="mb-2 text-xl font-semibold whitespace-pre-line">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-muted/30 py-20">
        <div className="container max-w-screen-2xl px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">What Our Customers Say</h2>
            <p className="text-muted-foreground">Trusted by thousands of satisfied customers worldwide</p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                name: "Sarah Johnson",
                role: "Small Business Owner",
                content: "FastRocket has been a game-changer for my e-commerce business. Their same-day delivery option keeps my customers happy and coming back!",
                rating: 5
              },
              {
                name: "Michael Chen",
                role: "International Trader",
                content: "I ship products globally, and FastRocket's international service is unmatched. Reliable tracking and customs support make everything seamless.",
                rating: 5
              },
              {
                name: "Emily Rodriguez",
                role: "Logistics Manager",
                content: "The business solutions and API integration have streamlined our entire shipping process. Excellent service and support team!",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl border bg-card p-8 shadow-sm"
              >
                <div className="mb-4 flex text-primary">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="mb-6 text-muted-foreground">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container max-w-screen-2xl px-4">
          <div className="rounded-3xl bg-primary px-6 py-16 text-center text-primary-foreground md:px-12 md:py-20">
            <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">Ready to ship with speed?</h2>
            <p className="mb-8 text-lg text-primary-foreground/90">
              Join thousands of satisfied customers who trust FastRocket for their delivery needs.
            </p>
            <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Link href="/signup">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex h-12 items-center justify-center rounded-full bg-background px-8 text-base font-medium text-primary shadow transition-colors hover:bg-background/90"
                >
                  Get Started
                </motion.span>
              </Link>
              <Link href="/contact">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex h-12 items-center justify-center rounded-full border border-primary-foreground/20 bg-transparent px-8 text-base font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10"
                >
                  Contact Sales
                </motion.span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
