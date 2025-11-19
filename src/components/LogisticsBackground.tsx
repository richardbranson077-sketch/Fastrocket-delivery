'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function LogisticsBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600" />

            {/* Animated Grid Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `
                        linear-gradient(to right, white 1px, transparent 1px),
                        linear-gradient(to bottom, white 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px'
                }} />
            </div>

            {/* Floating Logistics Images */}
            <motion.div
                className="absolute top-[10%] left-[5%] w-32 h-32 md:w-48 md:h-48 opacity-20"
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, 5, 0],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                <Image
                    src="/images/cargo-ship.png"
                    alt="Cargo Ship"
                    fill
                    className="object-contain drop-shadow-2xl"
                />
            </motion.div>

            <motion.div
                className="absolute top-[15%] right-[8%] w-40 h-40 md:w-56 md:h-56 opacity-25"
                animate={{
                    y: [0, 30, 0],
                    x: [0, -15, 0],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                }}
            >
                <Image
                    src="/images/cargo-plane.png"
                    alt="Cargo Plane"
                    fill
                    className="object-contain drop-shadow-2xl"
                />
            </motion.div>

            <motion.div
                className="absolute bottom-[20%] left-[10%] w-36 h-36 md:w-52 md:h-52 opacity-15"
                animate={{
                    x: [0, 25, 0],
                    y: [0, -10, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
            >
                <Image
                    src="/images/freight-truck.png"
                    alt="Freight Truck"
                    fill
                    className="object-contain drop-shadow-2xl"
                />
            </motion.div>

            <motion.div
                className="absolute bottom-[10%] right-[5%] w-44 h-44 md:w-60 md:h-60 opacity-20"
                animate={{
                    y: [0, -25, 0],
                    rotate: [0, -3, 0],
                }}
                transition={{
                    duration: 9,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                }}
            >
                <Image
                    src="/images/warehouse.png"
                    alt="Warehouse"
                    fill
                    className="object-contain drop-shadow-2xl"
                />
            </motion.div>

            {/* Additional smaller decorative images */}
            <motion.div
                className="absolute top-[50%] left-[15%] w-24 h-24 md:w-32 md:h-32 opacity-10"
                animate={{
                    y: [0, 15, 0],
                    x: [0, 10, 0],
                    rotate: [0, 360],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
            >
                <Image
                    src="/images/cargo-plane.png"
                    alt="Cargo Plane"
                    fill
                    className="object-contain drop-shadow-xl"
                />
            </motion.div>

            <motion.div
                className="absolute top-[35%] right-[20%] w-28 h-28 md:w-40 md:h-40 opacity-12"
                animate={{
                    y: [0, -20, 0],
                    x: [0, -15, 0],
                }}
                transition={{
                    duration: 11,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 3
                }}
            >
                <Image
                    src="/images/cargo-ship.png"
                    alt="Cargo Ship"
                    fill
                    className="object-contain drop-shadow-xl"
                />
            </motion.div>

            {/* Animated Particles/Dots */}
            {Array.from({ length: 50 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        opacity: [0.2, 0.8, 0.2],
                        scale: [1, 1.5, 1],
                    }}
                    transition={{
                        duration: Math.random() * 3 + 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                    }}
                />
            ))}

            {/* Overlay gradient for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-blue-900/30" />
        </div>
    );
}
