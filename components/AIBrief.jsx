'use client'
import React, { useState, useEffect } from 'react';
import { Sparkles, Lock } from 'lucide-react';

export default function AIBrief({ tokenData }) {
    const [brief, setBrief] = useState(null);
    const [loading, setLoading] = useState(false);
    const [unlocked, setUnlocked] = useState(false); // Simulate Pro tier unlock

    // Ensure initial load generates a brief automatically when unlocked
    useEffect(() => {
        if (unlocked && !brief && !loading) {
            generateBrief();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [unlocked]);

    const generateBrief = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/ai-brief', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    tokenName: tokenData.name,
                    scores: tokenData.scores,
                    marketData: tokenData.marketData
                })
            });
            const data = await res.json();
            setBrief(data.text);
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    };

    if (!unlocked) {
        return (
            <div className="card-light overflow-hidden bg-white border border-border-light relative my-8">
                {/* Clean background instead of Sparkles */}
                <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-gradient-to-br from-[#FAFAF7] to-white"></div>

                <div className="p-8 text-center relative z-10 flex flex-col items-center justify-center min-h-[200px]">
                    <div className="w-16 h-16 bg-bg-primary rounded-full shadow-md flex items-center justify-center mb-4 border border-border-light">
                        <Lock className="text-accent-primary" size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-text-primary mb-2 flex items-center gap-2">
                        <Sparkles className="text-score-moderate" /> AI Investment Brief
                    </h3>
                    <p className="text-text-secondary max-w-lg mb-6">
                        Unlock an instant, LLM-generated executive summary analyzing {tokenData.name}&apos;s smart contract security, health metrics, and market momentum.
                    </p>
                    <button
                        onClick={() => setUnlocked(true)}
                        className="bg-accent-primary hover:bg-accent-primary-hover text-white flex items-center gap-2 px-6 py-3 font-semibold text-lg rounded-xl transition-colors shadow-sm"
                    >
                        Unlock Pro Feature
                    </button>
                    <p className="text-xs text-text-muted mt-4">Part of the $4.99/mo subscription. (Click to skip paywall in test mode)</p>
                </div>
            </div>
        );
    }

    return (
        <div className="card-light overflow-hidden my-8">
            <div className="bg-[#FAFAF7] px-6 py-4 border-b border-border-light flex justify-between items-center">
                <h3 className="text-lg font-bold flex items-center gap-2 text-text-primary">
                    <Sparkles className="text-accent-primary" size={18} />
                    AI Executive Summary
                </h3>
                {loading || !brief ? (
                    <button
                        onClick={generateBrief}
                        disabled={loading}
                        className="text-sm bg-accent-primary hover:bg-accent-primary-hover text-white px-4 py-1.5 rounded-lg transition-colors disabled:opacity-50 font-medium"
                    >
                        {loading ? 'Analyzing Data...' : 'Regenerate Brief'}
                    </button>
                ) : (
                    <span className="text-xs font-mono text-score-excellent font-bold bg-green-50 px-2 py-1 rounded border border-green-200">Ready</span>
                )}
            </div>

            <div className="p-6">
                {!brief && !loading && (
                    <div className="text-center py-12 text-text-secondary">
                        Click &quot;Regenerate Brief&quot; to analyze {tokenData.name}.
                    </div>
                )}

                {loading && (
                    <div className="space-y-4 py-4 animate-pulse">
                        <div className="h-4 bg-border-light rounded w-3/4"></div>
                        <div className="h-4 bg-border-light rounded w-full"></div>
                        <div className="h-4 bg-border-light rounded w-5/6"></div>
                        <div className="h-4 bg-border-light rounded w-1/2 mt-6"></div>
                        <div className="h-4 bg-border-light rounded w-full"></div>
                        <div className="h-4 bg-border-light rounded w-4/5"></div>
                    </div>
                )}

                {brief && !loading && (
                    <div className="prose prose-sm md:prose-base max-w-none prose-p:text-text-secondary xl:prose-p:leading-relaxed prose-headings:text-text-primary prose-strong:text-text-primary prose-ul:text-text-secondary">
                        {brief.split('\\n').map((line, i) => {
                            if (line.startsWith('###')) return <h3 key={i} className="text-lg font-bold mt-4 mb-2">{line.replace('###', '')}</h3>;
                            if (line.startsWith('**')) return <h4 key={i} className="font-bold text-text-primary mt-4 mb-1">{line.replace(/\\*\\*/g, '')}</h4>;
                            if (line.startsWith('*')) {
                                const parts = line.substring(1).split('**');
                                return <ul key={i} className="my-1"><li className="ml-4 list-disc">{parts.map((p, j) => j % 2 === 1 ? <strong key={j} className="text-text-primary">{p}</strong> : p)}</li></ul>;
                            }
                            if (line.trim() === '') return <br key={i} />;
                            return <p key={i} className="mb-2 leading-relaxed">{line}</p>;
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
