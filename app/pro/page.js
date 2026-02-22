import React from 'react';
import { Sparkles, Check, Zap, ScrollText, BellRing, Mail } from 'lucide-react';
import Link from 'next/link';

export default function ProPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-glow text-accent-primary font-medium text-sm mb-6 border border-accent-primary/20">
                    <Sparkles size={16} /> Token Intel Pro
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                    See what others miss.
                </h1>
                <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
                    Unlock AI-driven investment briefs, real-time alert emails, and deep portfolio scanning. Stay ahead of the market for less than a cup of coffee.
                </p>
            </div>

            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Free Tier */}
                <div className="card-light p-8 opacity-80 border-dashed">
                    <h3 className="text-2xl font-bold mb-2">Free</h3>
                    <div className="text-4xl font-bold mb-6">$0<span className="text-lg text-text-secondary font-normal">/mo</span></div>

                    <ul className="space-y-4 mb-8">
                        <li className="flex items-center gap-3 text-text-secondary">
                            <Check size={20} className="text-score-excellent" />
                            <span>Unlimited Token Scans</span>
                        </li>
                        <li className="flex items-center gap-3 text-text-secondary">
                            <Check size={20} className="text-score-excellent" />
                            <span>Smart Contract Safety Ratings</span>
                        </li>
                        <li className="flex items-center gap-3 text-text-secondary">
                            <Check size={20} className="text-score-excellent" />
                            <span>Basic Health Score</span>
                        </li>
                        <li className="flex items-center gap-3 text-text-secondary opacity-50">
                            <span className="w-5 h-5 rounded-full border border-border-light flex items-center justify-center text-xs"></span>
                            <span>No AI Executive Summaries</span>
                        </li>
                        <li className="flex items-center gap-3 text-text-secondary opacity-50">
                            <span className="w-5 h-5 rounded-full border border-border-light flex items-center justify-center text-xs"></span>
                            <span>No Watchlist Email Alerts</span>
                        </li>
                    </ul>

                    <Link href="/" className="btn-ghost w-full block text-center border border-border-light">
                        Current Plan
                    </Link>
                </div>

                {/* Pro Tier */}
                <div className="card-light p-8 relative ring-2 ring-accent-primary transform md:-translate-y-4 bg-gradient-to-b from-bg-primary to-accent-glow/30">
                    <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-accent-primary text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg">
                        Most Popular
                    </div>

                    <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                        <Sparkles className="text-accent-primary" /> Pro
                    </h3>
                    <div className="text-4xl font-bold mb-2 text-text-primary">$4.99<span className="text-lg text-text-secondary font-normal">/mo</span></div>
                    <p className="text-sm text-text-secondary mb-6">Billed monthly. Cancel anytime.</p>

                    <ul className="space-y-4 mb-8">
                        <li className="flex items-center gap-3 font-medium">
                            <Check size={20} className="text-accent-primary" />
                            <span>Everything in Free</span>
                        </li>
                        <li className="flex items-center gap-3 font-medium">
                            <ScrollText size={20} className="text-accent-primary" />
                            <span>Instant AI Investment Briefs</span>
                        </li>
                        <li className="flex items-center gap-3 font-medium">
                            <Mail size={20} className="text-accent-primary" />
                            <span>Watchlist Breakout Email Alerts</span>
                        </li>
                        <li className="flex items-center gap-3 font-medium">
                            <Zap size={20} className="text-accent-primary" />
                            <span>Portfolio Wallet Scanner <span className="text-xs bg-score-moderate/20 text-score-moderate px-2 py-0.5 rounded ml-2">Coming Soon</span></span>
                        </li>
                    </ul>

                    <button className="btn-primary w-full py-3 text-lg font-semibold shadow-xl shadow-accent-primary/20">
                        Upgrade with Stripe
                    </button>
                    <p className="text-center text-xs text-text-muted mt-4">Demo only. Stripe integration mocked for MVP.</p>
                </div>
            </div>

            <div className="mt-24 text-center">
                <h2 className="text-2xl font-bold mb-8">Trusted by serious degens.</h2>
                <div className="flex flex-wrap justify-center gap-8 opacity-50 grayscale">
                    <div className="font-mono text-xl font-bold">BINANCE</div>
                    <div className="font-mono text-xl font-bold">COINBASE</div>
                    <div className="font-mono text-xl font-bold">KRAKEN</div>
                    <div className="font-mono text-xl font-bold">OKX</div>
                </div>
            </div>
        </div>
    );
}
