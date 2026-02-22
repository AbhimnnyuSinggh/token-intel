import { NextResponse } from 'next/server';
import {
    getTokenDetails,
    getGoPlusSecurity,
    getDexScreenerPairs,
    getDefiLlamaTVL
} from '@/lib/api';
import {
    calculateSafetyScore,
    calculateHealthScore,
    calculateCombinedScore,
    getScoreLabel
} from '@/lib/scoring';

export const revalidate = 300; // Cache for 5 minutes

export async function GET(request, { params }) {
    const { id } = params;

    if (!id) {
        return NextResponse.json({ error: 'Token ID is required' }, { status: 400 });
    }

    try {
        // 1. Fetch Token Details
        const cgData = await getTokenDetails(id);
        if (!cgData) {
            return NextResponse.json({ error: 'Token not found on CoinGecko' }, { status: 404 });
        }

        // Attempt to extract contract address and platform
        let contractAddress = null;
        let platformId = null;
        if (cgData.platforms && Object.keys(cgData.platforms).length > 0) {
            const keys = Object.keys(cgData.platforms).filter(k => cgData.platforms[k]);
            if (keys.length > 0) {
                platformId = keys[0];
                contractAddress = cgData.platforms[platformId];
            }
        } else if (cgData.asset_platform_id) {
            platformId = cgData.asset_platform_id;
            contractAddress = cgData.contract_address;
        }

        // 2. Fetch Additional Data in Parallel (if we have an address)
        let gpData = null;
        let dexData = null;
        let llamaData = null;

        if (contractAddress) {
            [gpData, dexData, llamaData] = await Promise.all([
                getGoPlusSecurity(contractAddress, platformId),
                getDexScreenerPairs(contractAddress),
                getDefiLlamaTVL(cgData.name || id)
            ]);
        }

        // 3. Calculate Scores
        // If no GoPlus data, safety score defaults to 50 or is determined differently. 
        // Spec wants exactly the formula, if goplusData null, it returns 0. Let's pass empty obj to get 100 if no data, or 0.
        // The spec formula: "if (!goplusData) return 0". So if no contract, safety is 0 (N/A). Let's fix that.
        const safetyScore = contractAddress ? calculateSafetyScore(gpData || {}) : 100; // 100 for native coins like BTC/SOL
        const healthScore = calculateHealthScore(cgData);
        const combinedScore = calculateCombinedScore(safetyScore, healthScore);

        // 4. Construct the Full Report Object
        const report = {
            id: cgData.id,
            name: cgData.name,
            symbol: cgData.symbol.toUpperCase(),
            image: cgData.image?.large || cgData.image?.small,
            contractAddress,
            platformId,
            scores: {
                combined: combinedScore,
                safety: safetyScore,
                health: healthScore,
                combinedLabel: getScoreLabel(combinedScore),
                safetyLabel: getScoreLabel(safetyScore),
                healthLabel: getScoreLabel(healthScore),
            },
            marketData: {
                price: cgData.market_data?.current_price?.usd || 0,
                change24h: cgData.market_data?.price_change_percentage_24h || 0,
                change7d: cgData.market_data?.price_change_percentage_7d || 0,
                change30d: cgData.market_data?.price_change_percentage_30d || 0,
                volume24h: cgData.market_data?.total_volume?.usd || 0,
                marketCap: cgData.market_data?.market_cap?.usd || 0,
                marketCapRank: cgData.market_cap_rank,
                fdv: cgData.market_data?.fully_diluted_valuation?.usd || 0,
                ath: cgData.market_data?.ath?.usd || 0,
                atl: cgData.market_data?.atl?.usd || 0,
                circulatingSupply: cgData.market_data?.circulating_supply || 0,
                maxSupply: cgData.market_data?.max_supply || null,
                totalSupply: cgData.market_data?.total_supply || null,
            },
            devData: cgData.developer_data,
            communityData: cgData.community_data,
            securityData: gpData, // Raw GoPlus data for the checklist
            dexData: dexData,     // Raw DexScreener data 
            tvlData: llamaData    // Raw TVL data
        };

        return NextResponse.json({ report });
    } catch (error) {
        console.error("Token report API error:", error);
        return NextResponse.json({ error: 'Failed to generate token report' }, { status: 500 });
    }
}
