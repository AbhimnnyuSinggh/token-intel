'use client'
import React, { useEffect, useState } from 'react';

export default function ScoreGauge({ score = 0, size = 200 }) {
    const [animatedScore, setAnimatedScore] = useState(0);

    useEffect(() => {
        // Animate score from 0 to value over 1.5s
        const duration = 1500;
        const steps = 60;
        const interval = duration / steps;
        const increment = score / steps;

        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= score) {
                setAnimatedScore(score);
                clearInterval(timer);
            } else {
                setAnimatedScore(current);
            }
        }, interval);

        return () => clearInterval(timer);
    }, [score]);

    // Determine color and label based on score value
    let color = 'var(--score-danger)'; // < 20
    let label = 'Danger';
    let stopColor = '#991B1B';

    if (score >= 80) {
        color = 'var(--score-excellent)';
        stopColor = '#059669';
        label = 'Strong';
    } else if (score >= 60) {
        color = 'var(--score-good)';
        stopColor = '#2563EB';
        label = 'Moderate';
    } else if (score >= 40) {
        color = 'var(--score-moderate)';
        stopColor = '#D97706';
        label = 'Caution';
    } else if (score >= 20) {
        color = 'var(--score-poor)';
        stopColor = '#DC2626';
        label = 'Risky';
    }

    const strokeWidth = size * 0.08;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    // Arc calculation (fill from 0 to percentage)
    const offset = circumference - (animatedScore / 100) * circumference;

    return (
        <div className="relative flex flex-col items-center justify-center font-inter" style={{ width: size, height: size }}>

            {/* Glow effect */}
            <div
                className="absolute transition-all duration-1000 ease-out"
                style={{
                    width: '70%', height: '70%',
                    background: color,
                    borderRadius: '50%',
                    filter: 'blur(40px)',
                    opacity: 0.15,
                }}
            />

            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
                <defs>
                    <linearGradient id="score-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor={stopColor} />
                        <stop offset="100%" stopColor={color} />
                    </linearGradient>
                </defs>

                {/* Background Track */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="var(--border-light)"
                    strokeWidth={strokeWidth}
                    className="opacity-50"
                />

                {/* Animated Arc */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="url(#score-gradient)"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    className="transition-all duration-[1500ms] ease-out"
                />
            </svg>

            {/* Center Text */}
            <div className="absolute flex flex-col items-center justify-center">
                <span className="font-bold text-text-primary tabular-nums" style={{ fontSize: size * 0.25, lineHeight: 1 }}>
                    {Math.round(animatedScore)}
                </span>
                <span className="text-text-secondary font-medium uppercase tracking-wide" style={{ fontSize: size * 0.08, marginTop: '4px' }}>
                    {label}
                </span>
            </div>
        </div>
    );
}
