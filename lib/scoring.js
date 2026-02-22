export function calculateSafetyScore(goplusData) {
    let score = 100; // Start at 100, deduct for issues

    if (!goplusData) return 0; // Failsafe

    // CRITICAL CHECKS (high deduction)
    if (goplusData.is_honeypot === "1") score -= 40;        // Can't sell = scam
    if (goplusData.is_open_source === "0") score -= 15;     // Hidden code = suspicious
    if (goplusData.is_proxy === "1") score -= 10;           // Upgradeable = risky
    if (goplusData.is_mintable === "1") score -= 15;        // Can print tokens = inflation risk
    if (goplusData.hidden_owner === "1") score -= 20;       // Hidden owner = scam signal
    if (goplusData.can_take_back_ownership === "1") score -= 15; // Owner can steal
    if (goplusData.selfdestruct === "1") score -= 25;       // Can destroy contract
    if (goplusData.owner_change_balance === "1") score -= 20; // Owner can arbitrarily change balances

    // TAX CHECKS (medium deduction)
    const buyTax = parseFloat(goplusData.buy_tax || "0") * 100;
    const sellTax = parseFloat(goplusData.sell_tax || "0") * 100;
    if (buyTax > 10) score -= 10;
    if (sellTax > 10) score -= 15;  // High sell tax is worse
    if (buyTax > 30 || sellTax > 30) score -= 20; // Extreme tax

    // HOLDER CONCENTRATION CHECK
    if (goplusData.holders && goplusData.holders.length > 0) {
        const topHolderPercent = parseFloat(goplusData.holders[0]?.percent || "0") * 100;
        if (topHolderPercent > 50) score -= 20;
        else if (topHolderPercent > 30) score -= 10;
        else if (topHolderPercent > 15) score -= 5;
    }

    // LP (Liquidity Pool) CHECK
    if (goplusData.lp_holders && goplusData.lp_holders.length > 0) {
        // some GoPlus answers are 1/0 integers
        const lpLocked = goplusData.lp_holders.some(lp => lp.is_locked === 1 || lp.is_locked === "1");
        if (!lpLocked) score -= 10; // Liquidity not locked
    }

    return Math.max(0, Math.min(100, score)); // Clamp 0-100
}

export function calculateHealthScore(coinGeckoData) {
    let score = 0;
    if (!coinGeckoData || !coinGeckoData.market_data) return 0; // Failsafe

    // 1. MARKET METRICS (max 25 points)
    const marketCap = coinGeckoData.market_data?.market_cap?.usd || 0;
    const fdv = coinGeckoData.market_data?.fully_diluted_valuation?.usd || 0;

    // Market cap size score
    if (marketCap > 10_000_000_000) score += 10;      // >$10B = established
    else if (marketCap > 1_000_000_000) score += 8;   // >$1B = large
    else if (marketCap > 100_000_000) score += 6;      // >$100M = mid
    else if (marketCap > 10_000_000) score += 4;       // >$10M = small
    else if (marketCap > 1_000_000) score += 2;        // >$1M = micro
    else score += 0;                                    // <$1M = nano

    // FDV to Market Cap ratio (lower is better — less dilution ahead)
    const fdvRatio = (marketCap > 0 && fdv > 0) ? fdv / marketCap : 1;
    if (fdvRatio <= 1.2) score += 10;      // Almost fully diluted
    else if (fdvRatio <= 2) score += 7;
    else if (fdvRatio <= 5) score += 4;
    else if (fdvRatio <= 10) score += 2;
    else score += 0;                        // Heavy future dilution

    // Volume to Market Cap ratio (healthy trading activity)
    const volume24h = coinGeckoData.market_data?.total_volume?.usd || 0;
    const volRatio = marketCap > 0 ? volume24h / marketCap : 0;
    if (volRatio > 0.1) score += 5;        // >10% daily volume = very active
    else if (volRatio > 0.05) score += 4;
    else if (volRatio > 0.01) score += 3;
    else if (volRatio > 0.005) score += 2;
    else score += 0;                        // Very low activity

    // 2. PRICE STRENGTH (max 25 points)
    const currentPrice = coinGeckoData.market_data?.current_price?.usd || 0;
    const ath = coinGeckoData.market_data?.ath?.usd || 0;
    const atl = coinGeckoData.market_data?.atl?.usd || 0;

    // Distance from ATH (being near ATH = strong, but not over-extended)
    const athDropPercent = ath > 0 ? ((ath - currentPrice) / ath) * 100 : 100;
    if (athDropPercent < 10) score += 8;         // Near ATH — strong momentum
    else if (athDropPercent < 30) score += 10;   // Healthy — not at peak but strong
    else if (athDropPercent < 50) score += 7;    // Moderate pullback
    else if (athDropPercent < 75) score += 4;    // Deep correction
    else score += 1;                              // >75% from ATH — very weak

    // Price change metrics
    const change24h = coinGeckoData.market_data?.price_change_percentage_24h || 0;
    const change7d = coinGeckoData.market_data?.price_change_percentage_7d || 0;
    const change30d = coinGeckoData.market_data?.price_change_percentage_30d || 0;

    // 30-day trend (most important)
    if (change30d > 20) score += 5;
    else if (change30d > 0) score += 4;
    else if (change30d > -10) score += 3;
    else if (change30d > -30) score += 1;
    else score += 0;

    // 7-day trend
    if (change7d > 10) score += 4;
    else if (change7d > 0) score += 3;
    else if (change7d > -5) score += 2;
    else score += 1;

    // 24h stability (extreme moves either way = volatile)
    if (Math.abs(change24h) < 3) score += 3;    // Stable
    else if (Math.abs(change24h) < 10) score += 2;
    else score += 1;                              // Very volatile

    // 3. LIQUIDITY & EXCHANGE PRESENCE (max 20 points)
    const tickers = coinGeckoData.tickers?.length || 0;
    if (tickers > 50) score += 10;
    else if (tickers > 20) score += 8;
    else if (tickers > 10) score += 5;
    else if (tickers > 3) score += 3;
    else score += 1;

    // Listed on major exchanges
    const majorExchanges = ['binance', 'coinbase', 'kraken', 'okx', 'bybit'];
    const onMajor = coinGeckoData.tickers?.filter(t =>
        majorExchanges.some(ex => t.market?.identifier?.includes(ex))
    ).length || 0;
    if (onMajor >= 3) score += 10;
    else if (onMajor >= 2) score += 7;
    else if (onMajor >= 1) score += 4;
    else score += 0;

    // 4. DEVELOPMENT ACTIVITY (max 15 points)
    const devData = coinGeckoData.developer_data;
    if (devData) {
        const commits4w = devData.commit_count_4_weeks || 0;
        if (commits4w > 100) score += 10;
        else if (commits4w > 50) score += 8;
        else if (commits4w > 20) score += 5;
        else if (commits4w > 5) score += 3;
        else score += 0;

        const stars = devData.stars || 0;
        if (stars > 5000) score += 5;
        else if (stars > 1000) score += 4;
        else if (stars > 100) score += 2;
        else score += 0;
    }

    // 5. SUPPLY HEALTH (max 15 points)
    const circulating = coinGeckoData.market_data?.circulating_supply || 0;
    const maxSupply = coinGeckoData.market_data?.max_supply;

    if (maxSupply && maxSupply > 0) {
        const circulatingRatio = circulating / maxSupply;
        if (circulatingRatio > 0.9) score += 10;      // >90% circulating = minimal dilution
        else if (circulatingRatio > 0.7) score += 7;
        else if (circulatingRatio > 0.5) score += 5;
        else if (circulatingRatio > 0.3) score += 3;
        else score += 1;                                // <30% circulating = heavy future supply
    } else {
        score += 5; // No max supply defined (like ETH) — neutral
    }

    // Token age bonus
    const genesisDate = coinGeckoData.genesis_date;
    if (genesisDate) {
        const ageInDays = (Date.now() - new Date(genesisDate).getTime()) / (1000 * 60 * 60 * 24);
        if (ageInDays > 1825) score += 5;   // >5 years = very established
        else if (ageInDays > 730) score += 4; // >2 years
        else if (ageInDays > 365) score += 3; // >1 year
        else if (ageInDays > 90) score += 1;  // >3 months
        else score += 0;                       // Very new
    }

    return Math.max(0, Math.min(100, score)); // Clamp 0-100
}

export function calculateCombinedScore(safetyScore, healthScore) {
    // Safety weighted more heavily (40%) because a scam token's health doesn't matter
    return Math.round(safetyScore * 0.4 + healthScore * 0.6);
}

// Utility to derive text label from score
export function getScoreLabel(score) {
    if (score >= 80) return "Strong";
    if (score >= 60) return "Moderate";
    if (score >= 40) return "Caution";
    if (score >= 20) return "Risky";
    return "Danger";
}
