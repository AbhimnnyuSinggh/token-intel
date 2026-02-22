'use client'
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';

function getMetrics(reportData) {
    if (!reportData) return { marketScore: 0, priceScore: 0, liqScore: 0, devScore: 0, supplyScore: 0 };
    const mdata = reportData.marketData || {};
    const fdvRatio = mdata.marketCap > 0 && mdata.fdv > 0 ? mdata.fdv / mdata.marketCap : 1;
    const marketScore = fdvRatio > 5 ? 2 : (fdvRatio > 2 ? 5 : 9);

    const dropPercent = mdata.ath > 0 ? ((mdata.ath - mdata.price) / mdata.ath) * 100 : 100;
    const priceScore = dropPercent < 20 ? 9 : (dropPercent < 50 ? 6 : 3);

    const tickCount = reportData.dexData?.pairs?.length || 0;
    const liqScore = tickCount > 10 ? 9 : (tickCount > 2 ? 6 : 3);

    const commits = reportData.devData?.commit_count_4_weeks || 0;
    const devScore = commits > 50 ? 9 : (commits > 5 ? 5 : 2);

    const circRatio = mdata.maxSupply > 0 ? mdata.circulatingSupply / mdata.maxSupply : 0.5;
    const supplyScore = circRatio > 0.8 ? 9 : (circRatio > 0.3 ? 6 : 2);

    return { marketScore, priceScore, liqScore, devScore, supplyScore };
}

export default function DualHealthRadar({ data1, data2 }) {
    const metrics1 = getMetrics(data1);
    const metrics2 = getMetrics(data2);

    const data = [
        { subject: 'Market', A: metrics1.marketScore, B: metrics2.marketScore, fullMark: 10 },
        { subject: 'Price', A: metrics1.priceScore, B: metrics2.priceScore, fullMark: 10 },
        { subject: 'Liquidity', A: metrics1.liqScore, B: metrics2.liqScore, fullMark: 10 },
        { subject: 'Dev', A: metrics1.devScore, B: metrics2.devScore, fullMark: 10 },
        { subject: 'Supply', A: metrics1.supplyScore, B: metrics2.supplyScore, fullMark: 10 },
    ];

    return (
        <div className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height={400}>
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                    <PolarGrid stroke="var(--border-light)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
                    <Tooltip
                        contentStyle={{ backgroundColor: 'var(--bg-primary)', borderRadius: '8px', border: '1px solid var(--border-light)', color: 'var(--text-primary)' }}
                        formatter={(value, name) => [`${value}/10`, name === 'A' ? data1?.name : data2?.name]}
                    />
                    <Legend formatter={(value) => <span className="text-text-primary font-medium ml-2">{value === 'A' ? data1?.name : data2?.name}</span>} />
                    <Radar
                        name="A"
                        dataKey="A"
                        stroke="var(--chart-1)"
                        fill="var(--chart-1)"
                        fillOpacity={0.4}
                        animationDuration={1500}
                    />
                    <Radar
                        name="B"
                        dataKey="B"
                        stroke="var(--chart-2)"
                        fill="var(--chart-2)"
                        fillOpacity={0.4}
                        animationDuration={1500}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}
