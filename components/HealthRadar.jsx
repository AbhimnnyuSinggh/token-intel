'use client'
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts';

export default function HealthRadar({ score, reportData }) {
    // Construct metrics for the 5 axes requested in spec
    // 1. Market Metrics
    // 2. Price Strength
    // 3. Liquidity Depth
    // 4. Development
    // 5. Supply Health
    // We mock the 1-10 scores here based on the components from HealthScore (as that function returns a single number natively, we extract estimates for visuals)

    const mdata = reportData?.marketData || {};
    const fdvRatio = mdata.marketCap > 0 && mdata.fdv > 0 ? mdata.fdv / mdata.marketCap : 1;
    const marketScore = fdvRatio > 5 ? 2 : (fdvRatio > 2 ? 5 : 9);

    const dropPercent = mdata.ath > 0 ? ((mdata.ath - mdata.price) / mdata.ath) * 100 : 100;
    const priceScore = dropPercent < 20 ? 9 : (dropPercent < 50 ? 6 : 3);

    const tickCount = reportData?.dexData?.pairs?.length || 0;
    const liqScore = tickCount > 10 ? 9 : (tickCount > 2 ? 6 : 3);

    const commits = reportData?.devData?.commit_count_4_weeks || 0;
    const devScore = commits > 50 ? 9 : (commits > 5 ? 5 : 2);

    const circRatio = mdata.maxSupply > 0 ? mdata.circulatingSupply / mdata.maxSupply : 0.5;
    const supplyScore = circRatio > 0.8 ? 9 : (circRatio > 0.3 ? 6 : 2);

    const data = [
        { subject: 'Market', A: marketScore, fullMark: 10 },
        { subject: 'Price', A: priceScore, fullMark: 10 },
        { subject: 'Liquidity', A: liqScore, fullMark: 10 },
        { subject: 'Dev', A: devScore, fullMark: 10 },
        { subject: 'Supply', A: supplyScore, fullMark: 10 },
    ];

    let color = 'var(--score-moderate)';
    if (score >= 80) color = 'var(--score-excellent)';
    else if (score >= 60) color = 'var(--score-good)';
    else if (score < 40) color = 'var(--score-danger)';

    return (
        <div className="w-full h-[280px]">
            <ResponsiveContainer width="100%" height={280}>
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                    <PolarGrid stroke="var(--border-light)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
                    <Tooltip
                        contentStyle={{ backgroundColor: 'var(--bg-primary)', borderRadius: '8px', border: '1px solid var(--border-light)' }}
                        formatter={(value) => [`${value}/10`, 'Score']}
                    />
                    <Radar
                        name="Health"
                        dataKey="A"
                        stroke={color}
                        fill={color}
                        fillOpacity={0.4}
                        animationDuration={1500}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}
