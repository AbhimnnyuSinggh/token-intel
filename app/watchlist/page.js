'use client'
import React, { useEffect, useState } from 'react';
import { useWatchlist } from '@/lib/watchlist';
import TokenCard from '@/components/TokenCard';
import SkeletonLoader from '@/components/SkeletonLoader';
import Link from 'next/link';
import { Star, BellRing } from 'lucide-react';

export default function WatchlistPage() {
    const { watchlist, isLoaded } = useWatchlist();
    const [tokens, setTokens] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadWatchlist() {
            if (!isLoaded) return;

            if (!watchlist || watchlist.length === 0) {
                setTokens([]);
                setLoading(false);
                return;
            }

            setLoading(true);
            try {
                const results = await Promise.all(
                    watchlist.map(id => fetch(`/api/token/${id}`).then(res => res.json()))
                );

                // Format for TokenCard
                const formatted = results.filter(r => r.report).map(r => ({
                    id: r.report.id,
                    name: r.report.name,
                    symbol: r.report.symbol,
                    thumb: r.report.image,
                    price: r.report.marketData?.price,
                    price_change_percentage_24h: r.report.marketData?.change24h,
                    healthScore: r.report.scores?.combined,
                    healthLabel: 'Combined'
                }));

                setTokens(formatted);
            } catch (e) {
                console.error(e);
            }
            setLoading(false);
        }

        loadWatchlist();
    }, [watchlist, isLoaded]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 space-y-8 min-h-[60vh]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 border-b border-border-light pb-6">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <Star className="text-accent-primary fill-accent-primary" size={28} />
                        Your Watchlist
                    </h1>
                    <p className="text-text-secondary mt-2">Track your favorite tokens and receive email alerts on major changes.</p>
                </div>

                <button className="btn-primary flex items-center gap-2 w-fit">
                    <BellRing size={18} /> Manage Email Alerts
                </button>
            </div>

            {loading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <SkeletonLoader type="card" />
                    <SkeletonLoader type="card" />
                    <SkeletonLoader type="card" />
                </div>
            )}

            {!loading && tokens.length === 0 && (
                <div className="text-center py-20 card-light border-dashed">
                    <Star className="mx-auto text-text-muted mb-4 opacity-50" size={64} />
                    <h2 className="text-2xl font-bold mb-2">Your watchlist is empty</h2>
                    <p className="text-text-secondary mb-8 max-w-md mx-auto">Search for tokens and click the star icon on their report page to add them here.</p>
                    <Link href="/" className="btn-primary inline-flex">
                        Browse Tokens
                    </Link>
                </div>
            )}

            {!loading && tokens.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {tokens.map(token => (
                        <div key={token.id} className="h-40">
                            <TokenCard token={token} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
