'use client'
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';

export default function HolderDonut({ holders = [] }) {
    if (holders.length === 0) {
        return <div className="h-[250px] flex items-center justify-center text-text-muted">No holder data available</div>;
    }

    // Parse GoPlus holders array into top 10 vs others
    let top10Percent = 0;
    let othersPercent = 100;

    holders.slice(0, 10).forEach(h => {
        top10Percent += parseFloat(h.percent || 0) * 100;
    });
    othersPercent -= top10Percent;

    const data = [
        { name: 'Top 10 Holders', value: top10Percent },
        { name: 'Others', value: Math.max(0, othersPercent) }
    ];

    const COLORS = ['var(--chart-1)', 'var(--chart-4)'];

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-bg-primary border border-border-light p-2 rounded shadow-sm text-sm">
                    <p className="font-semibold" style={{ color: payload[0].payload.fill }}>{payload[0].name}</p>
                    <p>{payload[0].value.toFixed(2)}%</p>
                </div>
            );
        }
        return null;
    };

    const isHighConcentration = top10Percent > 50;

    return (
        <div className="flex flex-col items-center">
            <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={2}
                            dataKey="value"
                            stroke="none"
                            animationDuration={1500}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <RechartsTooltip content={<CustomTooltip />} />
                        <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {isHighConcentration && (
                <div className="mt-2 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 border border-red-200">
                    <span>⚠️</span> High Concentration Warning
                </div>
            )}
        </div>
    );
}
