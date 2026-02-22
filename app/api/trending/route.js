import { NextResponse } from 'next/server';
import { getTrendingTokens } from '@/lib/api';

export const revalidate = 300; // Cache for 5 minutes

export async function GET() {
    try {
        const data = await getTrendingTokens();
        const results = (data.coins || []).map((item) => ({
            id: item.item.id,
            name: item.item.name,
            symbol: item.item.symbol,
            thumb: item.item.thumb,
            marketCapRank: item.item.market_cap_rank,
            price: item.item.data?.price || null,
            change24h: item.item.data?.price_change_percentage_24h?.usd || 0,
        }));
        return NextResponse.json({ results });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch trending tokens', results: [] });
    }
}
