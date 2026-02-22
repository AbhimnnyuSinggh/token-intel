'use client'
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ScoreGauge from '@/components/ScoreGauge';
import SafetyChecklist from '@/components/SafetyChecklist';
import HealthRadar from '@/components/HealthRadar';
import PriceChart from '@/components/PriceChart';
import HolderDonut from '@/components/HolderDonut';
import ScoreBars from '@/components/ScoreBars';
import MiniGauge from '@/components/MiniGauge';
import SkeletonLoader from '@/components/SkeletonLoader';
import { getTokenPriceChart } from '@/lib/api';

export default function TokenReportPage() {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [prices, setPrices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadData() {
            try {
                setLoading(true);
                // Fetch report and chart in parallel
                const [reportRes, chartRes] = await Promise.all([
                    fetch(`/api/token/${id}`),
                    getTokenPriceChart(id, 7)
                ]);

                if (!reportRes.ok) throw new Error('Failed to load report');
                const reportJson = await reportRes.json();
                setData(reportJson.report);
                setPrices(chartRes.prices || []);
            } catch (err) {
                console.error(err);
                setError('Could not analyze token. It may not exist or APIs are rate-limited.');
            } finally {
                setLoading(false);
            }
        }
        if (id) loadData();
    }, [id]);

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">
                <SkeletonLoader type="card" />
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    <div className="md:col-span-7"><SkeletonLoader type="card" /></div>
                    <div className="md:col-span-5"><SkeletonLoader type="card" /></div>
                </div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-24 text-center">
                <div className="text-4xl mb-4">⚠️</div>
                <h2 className="text-2xl font-bold mb-2">Analysis Failed</h2>
                <p className="text-text-secondary">{error}</p>
            </div>
        );
    }

    const { scores, marketData, securityData, dexData } = data;
    const isPositive = marketData.change24h >= 0;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">

            {/* 1. Header & Main Score Card */}
            <div className="card-light p-6 md:p-8 relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute -top-24 -right-24 w-[300px] h-[300px] bg-accent-glow rounded-full blur-[100px] pointer-events-none"></div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                    <div className="flex-1 text-center md:text-left">
                        <div className="flex flex-col md:flex-row items-center gap-4 mb-4 justify-center md:justify-start">
                            {data.image ? (
                                <img src={data.image} alt={data.name} className="w-16 h-16 rounded-full shadow-md border border-border-light bg-bg-secondary p-1" />
                            ) : (
                                <div className="w-16 h-16 rounded-full bg-border-light"></div>
                            )}
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-text-primary leading-tight">{data.name} <span className="text-text-muted text-2xl font-normal">({data.symbol})</span></h1>
                                <div className="text-sm font-mono text-text-secondary mt-1">
                                    Rank #{marketData.marketCapRank || 'N/A'} • {data.platformId ? `${data.platformId} Network` : 'Native Blockchain'}
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 grid grid-cols-2 max-w-sm mx-auto md:mx-0 gap-8">
                            <div>
                                <div className="text-text-muted text-sm font-semibold uppercase tracking-wide">Current Price</div>
                                <div className="text-2xl font-bold text-text-primary">${marketData.price.toLocaleString(undefined, { maximumFractionDigits: 6 })}</div>
                            </div>
                            <div>
                                <div className="text-text-muted text-sm font-semibold uppercase tracking-wide">24h Change</div>
                                <div className={`text-2xl font-bold ${isPositive ? 'text-score-excellent' : 'text-score-danger'}`}>
                                    {isPositive ? '+' : ''}{marketData.change24h.toFixed(2)}%
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-shrink-0 flex flex-col items-center bg-bg-secondary p-8 rounded-3xl border border-border-light shadow-inner">
                        <div className="text-xs font-bold text-text-muted uppercase tracking-[0.2em] mb-4">Combined Score</div>
                        <ScoreGauge score={scores.combined} size={180} />
                        <div className="w-full mt-6">
                            <ScoreBars safety={scores.safety} health={scores.health} combined={scores.combined} />
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* LEFT COLUMN: Safety & Health Splashes (60%) */}
                <div className="lg:col-span-7 space-y-8">
                    <div className="card-light overflow-hidden">
                        <div className="bg-bg-secondary px-6 py-4 border-b border-border-light flex justify-between items-center">
                            <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">🛡️ Safety Analysis</h2>
                            <span className={`px-2 py-0.5 rounded text-sm font-bold ${scores.safety >= 80 ? 'bg-green-100 text-green-700 border border-green-200' : (scores.safety <= 40 ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-amber-100 text-amber-700 border border-amber-200')}`}>
                                {scores.safety}/100
                            </span>
                        </div>
                        <div className="p-6">
                            {data.contractAddress ? (
                                <SafetyChecklist goplusData={securityData} />
                            ) : (
                                <div className="text-center py-8 text-text-secondary">
                                    This is a native blockchain token (like BTC or equivalent). Smart contract risks do not apply in the same way. Scored as 100/100 safe.
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="card-light overflow-hidden">
                        <div className="bg-bg-secondary px-6 py-4 border-b border-border-light flex justify-between items-center">
                            <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">📊 Health Analysis</h2>
                            <span className={`px-2 py-0.5 rounded text-sm font-bold ${scores.health >= 80 ? 'bg-green-100 text-green-700 border border-green-200' : (scores.health <= 40 ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-amber-100 text-amber-700 border border-amber-200')}`}>
                                {scores.health}/100
                            </span>
                        </div>
                        <div className="p-6">
                            <HealthRadar score={scores.health} reportData={data} />
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Quick Stats & Charts (40%) */}
                <div className="lg:col-span-5 space-y-8">
                    <div className="card-light overflow-hidden">
                        <div className="bg-bg-secondary px-6 py-4 border-b border-border-light">
                            <h2 className="text-lg font-bold text-text-primary">Quick Stats</h2>
                        </div>
                        <div className="p-6">
                            <dl className="grid grid-cols-2 gap-x-4 gap-y-6">
                                <div>
                                    <dt className="text-xs text-text-muted uppercase tracking-wider mb-1">Market Cap</dt>
                                    <dd className="font-semibold text-text-primary">${(marketData.marketCap || 0).toLocaleString()}</dd>
                                </div>
                                <div>
                                    <dt className="text-xs text-text-muted uppercase tracking-wider mb-1">Volume 24h</dt>
                                    <dd className="font-semibold text-text-primary">${(marketData.volume24h || 0).toLocaleString()}</dd>
                                </div>
                                <div>
                                    <dt className="text-xs text-text-muted uppercase tracking-wider mb-1">FDV</dt>
                                    <dd className="font-semibold text-text-primary">${(marketData.fdv || 0).toLocaleString()}</dd>
                                </div>
                                <div>
                                    <dt className="text-xs text-text-muted uppercase tracking-wider mb-1">Max Supply</dt>
                                    <dd className="font-semibold text-text-primary">{marketData.maxSupply ? marketData.maxSupply.toLocaleString() : '∞'}</dd>
                                </div>
                                <div>
                                    <dt className="text-xs text-text-muted uppercase tracking-wider mb-1">ATH</dt>
                                    <dd className="font-semibold text-text-primary">${(marketData.ath || 0).toLocaleString()} <span className="text-xs text-score-danger ml-1 font-normal">(-{(((marketData.ath - marketData.price) / marketData.ath) * 100).toFixed(0)}%)</span></dd>
                                </div>
                                <div>
                                    <dt className="text-xs text-text-muted uppercase tracking-wider mb-1">ATL</dt>
                                    <dd className="font-semibold text-text-primary">${(marketData.atl || 0).toLocaleString()}</dd>
                                </div>
                            </dl>
                            <div className="mt-8">
                                <h3 className="text-xs text-text-muted uppercase tracking-wider mb-4 border-t border-border-light pt-4">7 Day Price History</h3>
                                <PriceChart prices={prices} />
                            </div>
                        </div>
                    </div>

                    {securityData && securityData.holders && (
                        <div className="card-light overflow-hidden">
                            <div className="bg-bg-secondary px-6 py-4 border-b border-border-light">
                                <h2 className="text-lg font-bold text-text-primary">Holder Distribution</h2>
                            </div>
                            <div className="p-6">
                                <HolderDonut holders={securityData.holders} />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* 3. Detailed Metrics (MiniGauges) */}
            <h3 className="text-2xl font-bold text-text-primary pt-8 border-t border-border-light">Market Overview</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                <MiniGauge
                    value={Math.min(100, (marketData.volume24h / (marketData.marketCap || 1)) * 500)} // Mock scaled mapping
                    label="Vol/MC Ratio"
                    subtext={(marketData.volume24h / (marketData.marketCap || 1)).toFixed(3)}
                    color={marketData.volume24h / (marketData.marketCap || 1) > 0.1 ? 'var(--score-excellent)' : 'var(--score-moderate)'}
                />
                <MiniGauge
                    value={Math.min(100, ((marketData.price - marketData.atl) / (marketData.ath - marketData.atl || 1)) * 100)}
                    label="Recovery"
                    subtext="From ATL to ATH"
                    color="var(--score-good)"
                />
                <MiniGauge
                    value={Math.min(100, (marketData.circulatingSupply / (marketData.maxSupply || marketData.totalSupply || marketData.circulatingSupply)) * 100)}
                    label="Circulating"
                    subtext={`${(100 * marketData.circulatingSupply / (marketData.maxSupply || marketData.circulatingSupply || 1)).toFixed(0)}% Uploaded`}
                    color="var(--chart-3)"
                />
                <MiniGauge
                    value={scores.health}
                    label="Health Index"
                    subtext="Overall strength"
                    color={scores.health > 70 ? 'var(--score-excellent)' : 'var(--score-moderate)'}
                />
            </div>

        </div>
    );
}
