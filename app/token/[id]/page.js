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
import AIBrief from '@/components/AIBrief';
import TokenUnlocks from '@/components/TokenUnlocks';
import { getTokenPriceChart } from '@/lib/api';
import { useWatchlist } from '@/lib/watchlist';
import { Star } from 'lucide-react';

export default function TokenReportPage() {
    const params = useParams();
    const id = params?.id || null;

    const [data, setData] = useState(null);
    const [prices, setPrices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { watchlist, toggleWatchlist } = useWatchlist();

    useEffect(() => {
        async function loadData() {
            try {
                if (!id) return;

                setLoading(true);

                const [reportRes, chartRes] = await Promise.all([
                    fetch(`/api/token/${id}`),
                    getTokenPriceChart(id, 7)
                ]);

                if (!reportRes.ok) throw new Error('Failed to load report');

                const reportJson = await reportRes.json();

                setData(reportJson?.report || null);
                setPrices(chartRes?.prices || []);
            } catch (err) {
                console.error(err);
                setError('Could not analyze token.');
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, [id]);

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">
                <SkeletonLoader type="card" />
            </div>
        );
    }

    if (error || !data) {
        return <div className="text-center py-20">Error loading token</div>;
    }

    const scores = data?.scores || {};
    const marketData = data?.marketData || {};
    const securityData = data?.securityData || {};

    const safeSymbol = data?.symbol || 'T';
    const safeName = data?.name || 'Token';

    const isPositive = (marketData?.change24h ?? 0) >= 0;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">

            <h1 className="text-3xl font-bold flex items-center gap-2">
                {safeName}
                <span className="text-gray-500">({safeSymbol})</span>

                <button onClick={() => toggleWatchlist(data?.id)}>
                    <Star className={watchlist.includes(data?.id) ? "fill-yellow-500" : ""} />
                </button>
            </h1>

            {/* Safe symbol fallback */}
            <div className="text-4xl mt-4">
                {safeSymbol?.charAt(0) || 'T'}
            </div>

            <div className="mt-6">
                <ScoreGauge score={scores?.combined ?? 0} />
            </div>

            <div className="mt-6">
                <PriceChart prices={prices || []} />
            </div>

            <div className="mt-6">
                <div>Price: ${marketData?.price ?? 0}</div>
                <div>
                    Change:
                    <span className={isPositive ? 'text-green-500' : 'text-red-500'}>
                        {(marketData?.change24h ?? 0).toFixed(2)}%
                    </span>
                </div>
            </div>

            {securityData?.holders && (
                <HolderDonut holders={securityData.holders} />
            )}

            <AIBrief tokenData={data} />
            <TokenUnlocks symbol={safeSymbol} />

        </div>
    );
}