'use client'
import React, { useState } from 'react';
import { Search, ArrowRightLeft } from 'lucide-react';
import SkeletonLoader from '@/components/SkeletonLoader';
import ScoreBars from '@/components/ScoreBars';
import DualHealthRadar from '@/components/DualHealthRadar';

function TokenSearchBox({ label, onSelect, selectedToken }) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = async (e) => {
        const value = e.target.value;
        setQuery(value);
        if (value.trim().length < 2) {
            setResults([]);
            return;
        }
        setIsSearching(true);
        try {
            const res = await fetch(`/api/search?q=${encodeURIComponent(value)}`);
            const data = await res.json();
            setResults(data.results || []);
        } catch (err) {
            console.error(err);
        }
        setIsSearching(false);
    };

    if (selectedToken) {
        return (
            <div className="card-light p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img src={selectedToken.image || selectedToken.thumb} alt={selectedToken.name} className="w-10 h-10 rounded-full" />
                    <div>
                        <div className="font-bold text-text-primary">{selectedToken.name}</div>
                        <div className="text-sm text-text-secondary uppercase">{selectedToken.symbol}</div>
                    </div>
                </div>
                <button onClick={() => onSelect(null)} className="btn-ghost text-sm">Change</button>
            </div>
        );
    }

    return (
        <div className="relative w-full">
            <label className="block text-sm font-semibold text-text-secondary mb-2 uppercase tracking-wide">{label}</label>
            <div className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={handleSearch}
                    placeholder="Search token..."
                    className="w-full bg-bg-secondary border border-border-light rounded-xl pl-10 pr-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
                />
                <Search className="absolute left-3 top-3.5 h-4 w-4 text-text-muted" />
                {isSearching && (
                    <div className="absolute right-3 top-3.5 w-4 h-4 border-2 border-accent-primary border-t-transparent rounded-full animate-spin"></div>
                )}
            </div>
            {results.length > 0 && query && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-bg-primary border border-border-light rounded-xl shadow-xl overflow-hidden z-20 max-h-60 overflow-y-auto">
                    {results.map((token) => (
                        <div
                            key={token.id}
                            className="flex items-center gap-3 p-3 hover:bg-bg-secondary cursor-pointer border-b border-border-light last:border-0"
                            onClick={() => {
                                setQuery('');
                                setResults([]);
                                onSelect(token);
                            }}
                        >
                            <img src={token.thumb} alt={token.name} className="w-6 h-6 rounded-full" />
                            <div>
                                <div className="font-semibold text-sm text-text-primary">{token.name}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default function ComparePage() {
    const [token1, setToken1] = useState(null);
    const [token2, setToken2] = useState(null);
    const [data1, setData1] = useState(null);
    const [data2, setData2] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleCompare = async () => {
        if (!token1 || !token2) return;
        setLoading(true);
        try {
            const [res1, res2] = await Promise.all([
                fetch(`/api/token/${token1.id}`),
                fetch(`/api/token/${token2.id}`)
            ]);

            if (res1.ok && res2.ok) {
                const j1 = await res1.json();
                const j2 = await res2.json();
                setData1(j1.report);
                setData2(j2.report);
            }
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Compare Tokens</h1>
                <p className="text-text-secondary text-lg">Analyze safety and health metrics side-by-side.</p>
            </div>

            <div className="card-light p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 items-center">
                    <TokenSearchBox
                        label="Token A"
                        selectedToken={token1}
                        onSelect={(t) => {
                            setToken1(t);
                            setData1(null);
                        }}
                    />
                    <div className="hidden md:flex justify-center items-center w-12 h-12 rounded-full bg-bg-secondary border border-border-light text-text-muted mt-6">
                        <ArrowRightLeft size={20} />
                    </div>
                    <TokenSearchBox
                        label="Token B"
                        selectedToken={token2}
                        onSelect={(t) => {
                            setToken2(t);
                            setData2(null);
                        }}
                    />
                </div>

                <div className="mt-8 text-center">
                    <button
                        onClick={handleCompare}
                        disabled={!token1 || !token2 || loading}
                        className="btn-primary w-full md:w-auto md:px-12 py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Analyzing...' : 'Compare Tokens'}
                    </button>
                </div>
            </div>

            {loading && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <SkeletonLoader type="card" />
                    <SkeletonLoader type="card" />
                </div>
            )}

            {!loading && data1 && data2 && (
                <div className="space-y-8 animate-in fade-in duration-500">
                    {/* Head to Head Comparison */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Token 1 Summary */}
                        <div className="card-light p-6 text-center">
                            <h2 className="text-2xl font-bold mb-6 flex justify-center items-center gap-3">
                                <img src={data1.image} alt="" className="w-8 h-8 rounded-full" />
                                {data1.name}
                            </h2>
                            <div className="text-5xl font-bold mb-2 text-text-primary">
                                {data1.scores.combined}
                            </div>
                            <div className="text-sm uppercase tracking-wide text-text-muted mb-8">Combined Score</div>
                            <ScoreBars safety={data1.scores.safety} health={data1.scores.health} combined={data1.scores.combined} />
                        </div>

                        {/* Token 2 Summary */}
                        <div className="card-light p-6 text-center">
                            <h2 className="text-2xl font-bold mb-6 flex justify-center items-center gap-3">
                                <img src={data2.image} alt="" className="w-8 h-8 rounded-full" />
                                {data2.name}
                            </h2>
                            <div className="text-5xl font-bold mb-2 text-text-primary">
                                {data2.scores.combined}
                            </div>
                            <div className="text-sm uppercase tracking-wide text-text-muted mb-8">Combined Score</div>
                            <ScoreBars safety={data2.scores.safety} health={data2.scores.health} combined={data2.scores.combined} />
                        </div>
                    </div>

                    {/* Data Table Comparison */}
                    <div className="card-light overflow-hidden">
                        <div className="bg-bg-secondary px-6 py-4 border-b border-border-light">
                            <h3 className="text-lg font-bold">Market Stats</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-border-light">
                                        <th className="p-4 text-text-secondary font-semibold">Metric</th>
                                        <th className="p-4 text-text-primary font-bold text-right">{data1.name}</th>
                                        <th className="p-4 text-text-primary font-bold text-right">{data2.name}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-border-light">
                                        <td className="p-4 text-text-secondary">Price</td>
                                        <td className="p-4 text-right font-mono">${(data1.marketData.price || 0).toLocaleString()}</td>
                                        <td className="p-4 text-right font-mono">${(data2.marketData.price || 0).toLocaleString()}</td>
                                    </tr>
                                    <tr className="border-b border-border-light">
                                        <td className="p-4 text-text-secondary">Market Cap</td>
                                        <td className="p-4 text-right font-mono">${(data1.marketData.marketCap || 0).toLocaleString()}</td>
                                        <td className="p-4 text-right font-mono">${(data2.marketData.marketCap || 0).toLocaleString()}</td>
                                    </tr>
                                    <tr className="border-b border-border-light">
                                        <td className="p-4 text-text-secondary">24h Volume</td>
                                        <td className="p-4 text-right font-mono">${(data1.marketData.volume24h || 0).toLocaleString()}</td>
                                        <td className="p-4 text-right font-mono">${(data2.marketData.volume24h || 0).toLocaleString()}</td>
                                    </tr>
                                    <tr className="border-b border-border-light">
                                        <td className="p-4 text-text-secondary">24h Change</td>
                                        <td className={`p-4 text-right font-mono ${data1.marketData.change24h >= 0 ? 'text-score-excellent' : 'text-score-danger'}`}>{data1.marketData.change24h?.toFixed(2)}%</td>
                                        <td className={`p-4 text-right font-mono ${data2.marketData.change24h >= 0 ? 'text-score-excellent' : 'text-score-danger'}`}>{data2.marketData.change24h?.toFixed(2)}%</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="card-light overflow-hidden">
                        <div className="bg-bg-secondary px-6 py-4 border-b border-border-light">
                            <h3 className="text-lg font-bold">Health Metrics Comparison</h3>
                        </div>
                        <div className="p-6">
                            <DualHealthRadar data1={data1} data2={data2} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
