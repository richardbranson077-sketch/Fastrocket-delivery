'use client';

import { motion } from 'framer-motion';

export default function LogisticsBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden">
            {/* Solid Dark Blue Background - matching Services page */}
            <div className="absolute inset-0 bg-[#0f1729]" />

            {/* Subtle animated particles */}
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
        </div>
    );
}
