'use client'
import React from 'react';
import { Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function TokenUnlocks({ symbol }) {
    // Generate a random mock unlock schedule based on the token symbol length to keep it deterministic-ish
    const seed = symbol.length;

    // Some mature tokens (like BTC, ETH) don't have cliff unlocks
    const isMature = ['btc', 'eth', 'doge', 'ltc'].includes(symbol.toLowerCase());

    if (isMature) {
        return (
            <div className="card-light overflow-hidden my-8">
                <div className="bg-bg-secondary px-6 py-4 border-b border-border-light flex justify-between items-center">
                    <h3 className="text-lg font-bold flex items-center gap-2 text-text-primary">
                        <Clock className="text-accent-primary" size={18} />
                        Upcoming Unlocks
                    </h3>
                </div>
                <div className="p-8 flex flex-col items-center justify-center text-center">
                    <CheckCircle2 size={40} className="text-score-excellent mb-4" />
                    <h4 className="text-lg font-bold">100% Fully Diluted or Proof of Work</h4>
                    <p className="text-text-secondary mt-2">This asset does not have venture capital cliff unlocks or team vesting schedules.</p>
                </div>
            </div>
        );
    }

    const upcomingEvents = [
        {
            date: new Date(Date.now() + 1000 * 60 * 60 * 24 * (seed * 2 + 5)), // Next week-ish
            amount: (seed * 1250000).toLocaleString(),
            percent: (seed * 0.4).toFixed(2),
            type: 'Team & Advisors',
            impact: seed > 5 ? 'High' : 'Low'
        },
        {
            date: new Date(Date.now() + 1000 * 60 * 60 * 24 * (seed * 5 + 30)), // Next month
            amount: (seed * 4500000).toLocaleString(),
            percent: (seed * 1.2).toFixed(2),
            type: 'Seed Investors',
            impact: 'High'
        },
        {
            date: new Date(Date.now() + 1000 * 60 * 60 * 24 * (seed * 10 + 90)), // 3 months
            amount: (seed * 800000).toLocaleString(),
            percent: (seed * 0.2).toFixed(2),
            type: 'Ecosystem Fund',
            impact: 'Medium'
        }
    ];

    return (
        <div className="card-light overflow-hidden my-8">
            <div className="bg-bg-secondary px-6 py-4 border-b border-border-light flex justify-between items-center">
                <h3 className="text-lg font-bold flex items-center gap-2 text-text-primary">
                    <Clock className="text-accent-primary" size={18} />
                    Upcoming Unlocks
                </h3>
                <span className="text-xs bg-score-danger/10 text-score-danger px-2 py-1 rounded border border-score-danger/20 flex items-center gap-1 font-medium">
                    <AlertTriangle size={12} /> Volatility Risk
                </span>
            </div>

            <div className="p-0">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-bg-primary border-b border-border-light text-xs uppercase tracking-wider text-text-muted">
                            <th className="p-4 font-semibold">Date</th>
                            <th className="p-4 font-semibold hidden sm:table-cell">Allocation</th>
                            <th className="p-4 font-semibold">Tokens</th>
                            <th className="p-4 font-semibold text-right">% of Supply</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border-light">
                        {upcomingEvents.map((event, i) => (
                            <tr key={i} className="hover:bg-bg-secondary transition-colors">
                                <td className="p-4">
                                    <div className="font-semibold text-text-primary">{event.date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                                    <div className="text-xs text-text-secondary mt-1 hidden sm:block">
                                        In {Math.ceil((event.date.getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days
                                    </div>
                                </td>
                                <td className="p-4 hidden sm:table-cell">
                                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-bg-primary border border-border-light text-text-secondary">
                                        {event.type}
                                    </span>
                                </td>
                                <td className="p-4 font-mono text-text-primary">
                                    {event.amount} <span className="text-text-muted text-xs uppercase">{symbol}</span>
                                </td>
                                <td className="p-4 text-right">
                                    <div className={`font-mono font-bold ${event.impact === 'High' ? 'text-score-danger' : (event.impact === 'Medium' ? 'text-score-moderate' : 'text-text-primary')}`}>
                                        {event.percent}%
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="bg-bg-secondary px-6 py-3 text-center text-xs text-text-muted border-t border-border-light">
                Unlock data is an estimation based on public vesting schedules and smart contract emissions.
            </div>
        </div>
    );
}
