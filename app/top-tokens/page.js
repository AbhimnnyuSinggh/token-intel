'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function TopTokensPage() {
    const [tokens, setTokens] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/top-tokens?limit=100')
            .then(res => res.json())
            .then(data => {
                setTokens(data.results || []);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const formatPrice = (p) => {
        if (p < 0.01) return `$${p.toFixed(6)}`;
        return `$${p.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    const formatCap = (cap) => {
        if (cap >= 1e9) return `$${(cap / 1e9).toFixed(2)}B`;
        if (cap >= 1e6) return `$${(cap / 1e6).toFixed(2)}M`;
        return `$${cap.toLocaleString()}`;
    };

    const getScoreColor = (score) => {
        if (score >= 80) return 'text-green-700 bg-green-100 border border-green-200';
        if (score >= 60) return 'text-blue-700 bg-blue-100 border border-blue-200';
        if (score >= 40) return 'text-amber-700 bg-amber-100 border border-amber-200';
        return 'text-red-700 bg-red-100 border border-red-200';
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-10">
                <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-3">Top 100 Tokens</h1>
                <p className="text-text-secondary">Cryptocurrency tokens ranked by market cap, including live Health scores.</p>
            </div>

            <div className="card-light overflow-x-auto">
                <table className="w-full text-left border-collapse whitespace-nowrap">
                    <thead>
                        <tr className="bg-bg-secondary text-text-secondary text-sm border-b border-border-light">
                            <th className="p-4 font-semibold">Rank</th>
                            <th className="p-4 font-semibold">Token</th>
                            <th className="p-4 font-semibold text-right">Price</th>
                            <th className="p-4 font-semibold text-right">24h Change</th>
                            <th className="p-4 font-semibold text-right">Market Cap</th>
                            <th className="p-4 font-semibold text-center hidden md:table-cell">Health Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            // Skeleton rows
                            Array.from({ length: 10 }).map((_, i) => (
                                <tr key={i} className="border-b border-border-light">
                                    <td className="p-4"><div className="h-4 w-6 bg-border-light rounded animate-pulse"></div></td>
                                    <td className="p-4 flex flex-col gap-2">
                                        <div className="h-5 w-32 bg-border-light rounded animate-pulse"></div>
                                        <div className="h-3 w-12 bg-border-light rounded animate-pulse"></div>
                                    </td>
                                    <td className="p-4"><div className="h-4 w-16 bg-border-light rounded animate-pulse ml-auto"></div></td>
                                    <td className="p-4"><div className="h-4 w-12 bg-border-light rounded animate-pulse ml-auto"></div></td>
                                    <td className="p-4"><div className="h-4 w-20 bg-border-light rounded animate-pulse ml-auto"></div></td>
                                    <td className="p-4"><div className="h-6 w-16 bg-border-light rounded-full animate-pulse mx-auto"></div></td>
                                </tr>
                            ))
                        ) : (
                            tokens.map((token) => {
                                const isPositive = token.price_change_percentage_24h >= 0;
                                return (
                                    <tr key={token.id} className="border-b border-border-light last:border-0 hover:bg-bg-secondary transition-colors group">
                                        <td className="p-4 text-text-muted font-mono text-sm">{token.market_cap_rank}</td>
                                        <td className="p-4">
                                            <Link href={`/token/${token.id}`} className="flex items-center gap-3">
                                                <img src={token.image} alt={token.name} className="w-8 h-8 rounded-full" />
                                                <div>
                                                    <div className="font-semibold text-text-primary group-hover:text-accent-primary transition-colors">{token.name}</div>
                                                    <div className="text-xs text-text-muted uppercase font-medium mt-0.5">{token.symbol}</div>
                                                </div>
                                            </Link>
                                        </td>
                                        <td className="p-4 text-right font-medium text-text-primary">
                                            {formatPrice(token.current_price)}
                                        </td>
                                        <td className={`p-4 text-right font-medium text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                                            {isPositive ? '▲' : '▼'} {Math.abs(token.price_change_percentage_24h || 0).toFixed(2)}%
                                        </td>
                                        <td className="p-4 text-right text-text-secondary font-medium">
                                            {formatCap(token.market_cap)}
                                        </td>
                                        <td className="p-4 text-center hidden md:table-cell">
                                            <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-bold ${getScoreColor(token.healthScore)}`}>
                                                {token.healthScore} <span className="font-normal opacity-70 ml-1">{token.healthLabel}</span>
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
