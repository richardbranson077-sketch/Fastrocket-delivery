'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const words = [
    { text: 'fast.', color: 'from-orange-400 to-orange-600' },
    { text: 'secure.', color: 'from-blue-400 to-blue-600' },
    { text: 'reliable.', color: 'from-green-400 to-green-600' },
    { text: 'global.', color: 'from-purple-400 to-purple-600' },
];

export default function RotatingText() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((current) => (current + 1) % words.length);
        }, 2500); // Change word every 2.5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative inline-block h-20 w-64">
            <AnimatePresence mode="wait">
                <motion.span
                    key={index}
                    initial={{
                        opacity: 0,
                        y: 60,
                        rotateX: 90,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        rotateX: 0,
                    }}
                    exit={{
                        opacity: 0,
                        y: -60,
                        rotateX: -90,
                    }}
                    transition={{
                        duration: 0.6,
                        ease: [0.645, 0.045, 0.355, 1.0],
                    }}
                    className={`absolute left-0 top-0 bg-gradient-to-r ${words[index].color} bg-clip-text text-5xl font-bold text-transparent md:text-7xl`}
                    style={{
                        transformStyle: 'preserve-3d',
                        perspective: '1000px',
                    }}
                >
                    {words[index].text}
                </motion.span>
            </AnimatePresence>
        </div>
    );
}
