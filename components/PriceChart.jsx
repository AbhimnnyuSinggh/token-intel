'use client'
import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function PriceChart({ prices = [] }) {
    const data = useMemo(() => {
        return prices.map((pricePair) => ({
            date: new Date(pricePair[0]).toLocaleString(),
            price: pricePair[1],
        }));
    }, [prices]);

    if (prices.length === 0) {
        return <div className="h-48 flex items-center justify-center text-text-muted">No price data available</div>;
    }

    const isPositive = data[data.length - 1].price >= data[0].price;
    const color = isPositive ? 'var(--score-excellent)' : 'var(--score-poor)';

    // Custom tooltip
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-bg-primary border border-border-light p-3 rounded-lg shadow-sm font-mono text-sm">
                    <p className="text-text-muted mb-1 text-xs">{payload[0].payload.date}</p>
                    <p className="text-text-primary font-bold">
                        ${payload[0].value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="h-48 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                    <defs>
                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                            <stop offset="95%" stopColor={color} stopOpacity={0} />
                        </linearGradient>
                        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                            <circle cx="2" cy="2" r="1" fill="var(--border-light)" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />

                    <XAxis dataKey="date" hide />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                        type="monotone"
                        dataKey="price"
                        stroke={color}
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorPrice)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
