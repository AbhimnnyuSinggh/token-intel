'use client'
import Link from 'next/link';

export default function TokenCard({ token, rank }) {
    const { id, name, symbol, image, thumb, current_price, price, price_change_percentage_24h, change24h, healthScore, healthLabel } = token;

    // Normalize data depending on whether it came from trending or markets API
    const displayPrice = current_price || price || 0;
    const displayChange = price_change_percentage_24h || change24h || 0;
    const displayImage = image || thumb;

    const isPositive = displayChange >= 0;

    // Default to 50 if no score available (e.g. trending)
    const score = healthScore || 50;
    let scoreColor = 'var(--score-moderate)';

    if (score >= 80) scoreColor = 'var(--score-excellent)';
    else if (score >= 60) scoreColor = 'var(--score-good)';
    else if (score < 40) scoreColor = 'var(--score-danger)';
    else if (score < 60) scoreColor = 'var(--score-moderate)';

    const formatPrice = (p) => {
        if (p < 0.01) return `$${p.toFixed(6)}`;
        return `$${p.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    return (
        <Link href={`/token/${id}`}>
            <div className="card-light p-4 h-full flex flex-col group cursor-pointer relative overflow-hidden">
                {rank && (
                    <div className="absolute top-2 right-2 text-xs font-mono text-text-muted bg-bg-secondary px-2 py-0.5 rounded-full border border-border-light">
                        #{rank}
                    </div>
                )}
                <div className="flex items-center gap-3 mb-4">
                    {displayImage ? (
                        <img src={displayImage} alt={name} className="w-10 h-10 rounded-full border border-border-light shadow-sm" />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-bg-secondary border border-border-light flex items-center justify-center text-text-primary mb-1 shadow-sm">
                            {symbol[0]}
                        </div>
                    )}
                    <div>
                        <h3 className="font-semibold text-text-primary text-base line-clamp-1 leading-tight group-hover:text-accent-primary transition-colors">{name}</h3>
                        <span className="text-text-secondary text-xs uppercase font-semibold tracking-wide">{symbol}</span>
                    </div>
                </div>

                <div className="mt-auto">
                    <div className="flex justify-between items-end mb-3">
                        <div className="text-lg font-semibold text-text-primary">
                            {formatPrice(displayPrice)}
                        </div>
                        <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                            {isPositive ? '▲' : '▼'} {Math.abs(displayChange).toFixed(2)}%
                        </div>
                    </div>

                    {healthScore !== undefined && (
                        <div className="flex items-center gap-2 mt-2 pt-3 border-t border-border-light border-dashed">
                            <span className="text-xs text-text-secondary font-medium">Health</span>
                            <div className="flex items-center gap-1.5 ml-auto bg-bg-secondary px-2 py-1 rounded-md border border-border-light">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: scoreColor }}></div>
                                <span className="text-sm font-bold text-text-primary">{score}</span>
                                <span className="text-xs text-text-muted capitalize">
                                    {healthLabel || 'Score'}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
}
