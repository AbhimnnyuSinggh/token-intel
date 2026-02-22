'use client'
import React, { useEffect, useState } from 'react';

export default function MiniGauge({ value, label, subtext, color = 'var(--score-good)' }) {
    const [animatedValue, setAnimatedValue] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimatedValue(value);
        }, 100);
        return () => clearTimeout(timer);
    }, [value]);

    const size = 120;
    const strokeWidth = 8;
    const radius = (size - strokeWidth) / 2;
    const circumference = Math.PI * radius; // Half circle
    // Value should be 0-100 for the fill calculation
    const offset = circumference - (animatedValue / 100) * circumference;

    return (
        <div className="flex flex-col items-center justify-center p-4 card-light">
            <div className="relative" style={{ width: size, height: size / 2 }}>
                <svg width={size} height={size / 2} viewBox={`0 0 ${size} ${size / 2}`} className="overflow-visible">
                    {/* Background track (half) */}
                    <path
                        d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
                        fill="none"
                        stroke="var(--border-light)"
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                    />
                    {/* Animated fill (half) */}
                    <path
                        d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
                        fill="none"
                        stroke={color}
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        className="transition-all duration-1000 ease-out"
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
                    <span className="text-xl font-bold text-text-primary leading-none">
                        {animatedValue.toFixed(1)}
                    </span>
                </div>
            </div>
            <div className="text-center mt-3">
                <p className="text-sm font-semibold text-text-primary">{label}</p>
                {subtext && <p className="text-xs text-text-muted mt-0.5">{subtext}</p>}
            </div>
        </div>
    );
}
