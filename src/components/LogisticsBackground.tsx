'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LogisticsBackground() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    // Simplified world map dots coordinates (approximate for visual effect)
    const mapDots = [
        // North America
        { x: 20, y: 30 }, { x: 25, y: 32 }, { x: 15, y: 25 }, { x: 22, y: 38 },
        { x: 28, y: 35 }, { x: 18, y: 28 }, { x: 30, y: 40 }, { x: 12, y: 20 },
        // South America
        { x: 32, y: 60 }, { x: 35, y: 65 }, { x: 30, y: 55 }, { x: 38, y: 70 },
        // Europe
        { x: 52, y: 25 }, { x: 55, y: 28 }, { x: 50, y: 22 }, { x: 58, y: 26 },
        { x: 54, y: 32 }, { x: 60, y: 24 },
        // Africa
        { x: 55, y: 50 }, { x: 58, y: 55 }, { x: 52, y: 45 }, { x: 60, y: 60 },
        { x: 65, y: 52 },
        // Asia
        { x: 75, y: 30 }, { x: 80, y: 35 }, { x: 70, y: 25 }, { x: 85, y: 32 },
        { x: 78, y: 40 }, { x: 82, y: 28 }, { x: 88, y: 38 },
        // Australia
        { x: 85, y: 70 }, { x: 90, y: 75 }, { x: 82, y: 68 }
    ];

    // Routes connecting major hubs
    const routes = [
        { start: { x: 25, y: 32 }, end: { x: 52, y: 25 } }, // NY -> London
        { start: { x: 52, y: 25 }, end: { x: 75, y: 30 } }, // London -> Dubai
        { start: { x: 75, y: 30 }, end: { x: 85, y: 32 } }, // Dubai -> Shanghai
        { start: { x: 85, y: 32 }, end: { x: 25, y: 32 } }, // Shanghai -> NY (Pacific route)
        { start: { x: 52, y: 25 }, end: { x: 55, y: 50 } }, // London -> Johannesburg
        { start: { x: 25, y: 32 }, end: { x: 32, y: 60 } }, // NY -> Sao Paulo
    ];

    return (
        <div className="absolute inset-0 -z-10 overflow-hidden">
            {/* Dark Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>

            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]"></div>

            {/* World Map Dots */}
            {mapDots.map((dot, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: [0.1, 0.3, 0.1],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2
                    }}
                    className="absolute h-1.5 w-1.5 rounded-full bg-blue-500/40"
                    style={{
                        left: `${dot.x}%`,
                        top: `${dot.y}%`
                    }}
                />
            ))}

            {/* Connecting Routes */}
            <svg className="absolute inset-0 h-full w-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                        <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                    </linearGradient>
                </defs>
                {routes.map((route, i) => (
                    <motion.path
                        key={i}
                        d={`M ${route.start.x} ${route.start.y} Q ${(route.start.x + route.end.x) / 2} ${(route.start.y + route.end.y) / 2 - 5} ${route.end.x} ${route.end.y}`}
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="0.2"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 2, delay: i * 0.5 }}
                        vectorEffect="non-scaling-stroke"
                    />
                ))}
            </svg>

            {/* Animated Particles (Packages/Vehicles) */}
            {routes.map((route, i) => (
                <motion.div
                    key={`particle-${i}`}
                    className="absolute h-2 w-2 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.8)]"
                    animate={{
                        left: [`${route.start.x}%`, `${route.end.x}%`],
                        top: [`${route.start.y}%`, `${route.end.y}%`],
                        opacity: [0, 1, 0],
                        scale: [0.5, 1, 0.5]
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 2
                    }}
                />
            ))}

            {/* Pulse Beacons at Major Hubs */}
            {[
                { x: 25, y: 32, color: 'bg-blue-500' }, // NY
                { x: 52, y: 25, color: 'bg-purple-500' }, // London
                { x: 75, y: 30, color: 'bg-orange-500' }, // Dubai
                { x: 85, y: 32, color: 'bg-green-500' }, // Shanghai
            ].map((hub, i) => (
                <div key={`hub-${i}`} className="absolute" style={{ left: `${hub.x}%`, top: `${hub.y}%` }}>
                    <motion.div
                        animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className={`absolute -left-2 -top-2 h-4 w-4 rounded-full ${hub.color}`}
                    />
                    <div className={`absolute -left-1 -top-1 h-2 w-2 rounded-full ${hub.color} shadow-lg`} />
                </div>
            ))}
        </div>
    );
}
