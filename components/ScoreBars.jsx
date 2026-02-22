'use client'
import React, { useEffect, useState } from 'react';

const Bar = ({ label, score, colorVar }) => {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setWidth(score); // score is 0-100
        }, 100);
        return () => clearTimeout(timer);
    }, [score]);

    return (
        <div className="mb-3">
            <div className="flex justify-between text-sm font-medium mb-1.5">
                <span className="text-text-primary">{label}</span>
                <span className="font-mono text-text-secondary">{score}/100</span>
            </div>
            <div className="h-2.5 w-full bg-bg-secondary rounded-full overflow-hidden">
                <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${width}%`, backgroundColor: `var(${colorVar})` }}
                />
            </div>
        </div>
    );
};

export default function ScoreBars({ safety = 0, health = 0, combined = 0 }) {

    const getColor = (s) => {
        if (s >= 80) return '--score-excellent';
        if (s >= 60) return '--score-good';
        if (s >= 40) return '--score-moderate';
        if (s >= 20) return '--score-poor';
        return '--score-danger';
    };

    return (
        <div className="flex flex-col mt-4">
            <Bar label="Safety" score={safety} colorVar={getColor(safety)} />
            <Bar label="Health" score={health} colorVar={getColor(health)} />
            <div className="mt-2 pt-2 border-t border-border-light">
                <Bar label="Combined" score={combined} colorVar={getColor(combined)} />
            </div>
        </div>
    );
}
