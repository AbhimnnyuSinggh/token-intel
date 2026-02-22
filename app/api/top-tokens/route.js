import { NextResponse } from 'next/server';
import { getTopTokens } from '@/lib/api';
import { calculateHealthScore, getScoreLabel } from '@/lib/scoring';

export const revalidate = 300; // Cache for 5 minutes

export async function GET(request) {
    try {
        const limitParams = new URL(request.url).searchParams.get('limit');
        let limit = 100;
        if (limitParams) {
            limit = parseInt(limitParams, 10);
        }
        const data = await getTopTokens(limit);

        // Process list to include estimated health scores based on market data
        const results = data.map((coin) => {
            // Construct mock coinGeckoData structure for scoring
            const mockDataForScoring = {
                market_data: {
                    market_cap: { usd: coin.market_cap },
                    fully_diluted_valuation: { usd: coin.fully_diluted_valuation },
                    total_volume: { usd: coin.total_volume },
                    current_price: { usd: coin.current_price },
                    ath: { usd: coin.ath },
                    atl: { usd: coin.atl },
                    price_change_percentage_24h: coin.price_change_percentage_24h,
                    circulating_supply: coin.circulating_supply,
                    max_supply: coin.max_supply,
                    total_supply: coin.total_supply
                }
            };
            const healthScore = calculateHealthScore(mockDataForScoring);

            return {
                id: coin.id,
                name: coin.name,
                symbol: coin.symbol,
                image: coin.image,
                current_price: coin.current_price,
                market_cap: coin.market_cap,
                market_cap_rank: coin.market_cap_rank,
                price_change_percentage_24h: coin.price_change_percentage_24h,
                healthScore,
                healthLabel: getScoreLabel(healthScore)
            }
        });

        return NextResponse.json({ results });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch top tokens', results: [] });
    }
}
