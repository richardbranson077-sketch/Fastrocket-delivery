'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const words = [
    {
        text: 'doorstep in 24hrs.',
        color: 'from-orange-400 via-orange-500 to-orange-600',
        glow: 'shadow-orange-500/50',
        particles: 'bg-orange-400'
    },
    {
        text: 'tracked every mile.',
        color: 'from-blue-400 via-blue-500 to-blue-600',
        glow: 'shadow-blue-500/50',
        particles: 'bg-blue-400'
    },
    {
        text: 'insured & protected.',
        color: 'from-green-400 via-green-500 to-green-600',
        glow: 'shadow-green-500/50',
        particles: 'bg-green-400'
    },
    {
        text: '200+ countries served.',
        color: 'from-purple-400 via-purple-500 to-purple-600',
        glow: 'shadow-purple-500/50',
        particles: 'bg-purple-400'
    },
];

export default function RotatingText() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((current) => (current + 1) % words.length);
        }, 5000); // 5 seconds per word - slower for readability

        return () => clearInterval(interval);
    }, []);

    const currentWord = words[index];

    return (
        <div className="relative inline-block h-24 md:h-32">
            {/* Floating Particles */}
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={`particle-${index}-${i}`}
                    initial={{
                        opacity: 0,
                        scale: 0,
                        x: 0,
                        y: 0,
                    }}
                    animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1.5, 0],
                        x: (Math.random() - 0.5) * 200,
                        y: (Math.random() - 0.5) * 200,
                    }}
                    transition={{
                        duration: 1.5,
                        delay: i * 0.15,
                        repeat: Infinity,
                        repeatDelay: 1.5,
                    }}
                    className={`absolute left-1/2 top-1/2 h-2 w-2 rounded-full ${currentWord.particles} blur-sm`}
                />
            ))}

            {/* Glow Effect Background */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={`glow-${index}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.6, scale: 1.2 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                    className={`absolute inset-0 -z-10 rounded-3xl bg-gradient-to-r ${currentWord.color} blur-3xl ${currentWord.glow} shadow-2xl`}
                />
            </AnimatePresence>

            {/* Main Text */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{
                        opacity: 0,
                        y: 80,
                        rotateX: 90,
                        scale: 0.8,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        rotateX: 0,
                        scale: 1,
                    }}
                    exit={{
                        opacity: 0,
                        y: -80,
                        rotateX: -90,
                        scale: 0.8,
                    }}
                    transition={{
                        duration: 0.6,
                        ease: [0.645, 0.045, 0.355, 1.0],
                    }}
                    className="relative"
                    style={{
                        transformStyle: 'preserve-3d',
                        perspective: '1000px',
                    }}
                >
                    {/* Text with Gradient and Shadow */}
                    <span className={`bg-gradient-to-r ${currentWord.color} bg-clip-text text-5xl font-black text-transparent drop-shadow-2xl md:text-7xl ${currentWord.glow} shadow-2xl`}>
                        {currentWord.text}
                    </span>

                    {/* Animated Underline */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className={`mt-2 h-1 w-full rounded-full bg-gradient-to-r ${currentWord.color} shadow-lg ${currentWord.glow}`}
                    />

                    {/* Sparkle Effects */}
                    {[...Array(4)].map((_, i) => (
                        <motion.div
                            key={`sparkle-${i}`}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{
                                opacity: [0, 1, 0],
                                scale: [0, 1, 0],
                                rotate: [0, 180, 360],
                            }}
                            transition={{
                                duration: 1,
                                delay: 0.5 + i * 0.2,
                                repeat: Infinity,
                                repeatDelay: 1.5,
                            }}
                            className={`absolute ${currentWord.particles} h-1 w-1 rounded-full`}
                            style={{
                                left: `${20 + i * 25}%`,
                                top: i % 2 === 0 ? '-10px' : 'auto',
                                bottom: i % 2 === 1 ? '-10px' : 'auto',
                            }}
                        />
                    ))}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
