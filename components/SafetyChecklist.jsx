'use client'
import React, { useEffect, useState } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Info } from 'lucide-react';

const CheckItem = ({ title, status, score, maxScore, description }) => {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        // Animate progress bar fill
        const timer = setTimeout(() => {
            setWidth((score / maxScore) * 100);
        }, 100);
        return () => clearTimeout(timer);
    }, [score, maxScore]);

    let Icon = CheckCircle2;
    let iconColor = 'text-score-excellent';
    let barColor = 'bg-score-excellent';
    let badgeText = 'PASS';
    let badgeColor = 'bg-green-100 text-green-700 border-green-200';

    if (status === 'fail') {
        Icon = XCircle;
        iconColor = 'text-score-danger';
        barColor = 'bg-score-danger';
        badgeText = 'FAIL';
        badgeColor = 'bg-red-100 text-red-700 border-red-200';
    } else if (status === 'warn') {
        Icon = AlertTriangle;
        iconColor = 'text-score-moderate';
        barColor = 'bg-score-moderate';
        badgeText = 'WARN';
        badgeColor = 'bg-amber-100 text-amber-700 border-amber-200';
    }

    return (
        <div className="py-3 border-b border-border-light last:border-0 group">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <Icon className={`w-5 h-5 ${iconColor}`} />
                    <span className="font-medium text-text-primary text-sm flex items-center gap-1.5">
                        {title}
                        <div className="relative flex items-center group-hover:visible">
                            <Info className="w-3.5 h-3.5 text-text-muted cursor-help" />
                            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 p-2 bg-text-primary text-bg-primary text-xs rounded shadow-lg invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                {description}
                                <div className="absolute left-1/2 -translate-x-1/2 top-full -mt-1 w-2 h-2 bg-text-primary rotate-45"></div>
                            </div>
                        </div>
                    </span>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${badgeColor}`}>
                    {badgeText}
                </span>
            </div>
            <div className="flex items-center gap-3">
                <div className="flex-grow h-1.5 bg-bg-secondary rounded-full overflow-hidden">
                    <div
                        className={`h-full ${barColor} transition-all duration-1000 ease-out`}
                        style={{ width: `${width}%` }}
                    />
                </div>
                <span className="text-xs font-mono text-text-secondary w-8 text-right">
                    {score}/{maxScore}
                </span>
            </div>
        </div>
    );
};

export default function SafetyChecklist({ goplusData }) {
    if (!goplusData || Object.keys(goplusData).length === 0) {
        return <div className="text-sm text-text-muted p-4 bg-bg-secondary rounded-xl">No safety data available for this token.</div>;
    }

    const checks = [];

    // 1. Honeypot Check
    const isHoneypot = goplusData.is_honeypot === "1";
    checks.push({
        title: 'Honeypot Vulnerability',
        status: isHoneypot ? 'fail' : 'pass',
        score: isHoneypot ? 0 : 10,
        maxScore: 10,
        description: isHoneypot ? 'This token is a honeypot. You cannot sell it.' : 'Token can be bought and sold normally.'
    });

    // 2. Open Source
    const isOpen = goplusData.is_open_source === "1";
    checks.push({
        title: 'Contract Open Source',
        status: isOpen ? 'pass' : 'fail',
        score: isOpen ? 10 : 0,
        maxScore: 10,
        description: isOpen ? 'Contract code is verified and visible.' : 'Code is hidden. Highly suspicious.'
    });

    // 3. Ownership Renounced
    const hasOwner = goplusData.owner_address && goplusData.owner_address !== "0x0000000000000000000000000000000000000000";
    checks.push({
        title: 'Ownership Renounced',
        status: hasOwner ? 'warn' : 'pass',
        score: hasOwner ? 5 : 10,
        maxScore: 10,
        description: hasOwner ? 'The creator still owns the contract and can alter it.' : 'Ownership renounced. Contract is immutable.'
    });

    // 4. Pausable / Proxy
    const isProxy = goplusData.is_proxy === "1";
    checks.push({
        title: 'Upgradeable Contract',
        status: isProxy ? 'warn' : 'pass',
        score: isProxy ? 4 : 10,
        maxScore: 10,
        description: isProxy ? 'Contract can be upgraded. Mechanics can change.' : 'Contract cannot be swapped out.'
    });

    // 5. Taxes
    const buyTax = parseFloat(goplusData.buy_tax || "0") * 100;
    const sellTax = parseFloat(goplusData.sell_tax || "0") * 100;
    const maxTax = Math.max(buyTax, sellTax);
    let taxStatus = 'pass';
    let taxScore = 10;
    if (maxTax > 10) { taxStatus = 'warn'; taxScore = 5; }
    if (maxTax > 30) { taxStatus = 'fail'; taxScore = 0; }

    checks.push({
        title: 'Trading Taxes',
        status: taxStatus,
        score: taxScore,
        maxScore: 10,
        description: `Buy: ${buyTax.toFixed(1)}% | Sell: ${sellTax.toFixed(1)}%`
    });

    // 6. Liquidity Locked
    let lpLocked = false;
    if (goplusData.lp_holders && goplusData.lp_holders.length > 0) {
        lpLocked = goplusData.lp_holders.some(lp => lp.is_locked === 1 || lp.is_locked === "1");
    }
    checks.push({
        title: 'Liquidity Locked',
        status: lpLocked ? 'pass' : 'warn',
        score: lpLocked ? 10 : 3,
        maxScore: 10,
        description: lpLocked ? 'A significant portion of liquidity is locked.' : 'Liquidity is NOT locked (or undetectable). Rug pull risk.'
    });

    return (
        <div className="flex flex-col">
            {checks.map((check, i) => (
                <CheckItem key={i} {...check} />
            ))}
        </div>
    );
}
