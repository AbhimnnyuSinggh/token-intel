import { NextResponse } from 'next/server';
import { searchTokens } from '@/lib/api';

export const revalidate = 300; // Cache for 5 minutes

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
        return NextResponse.json({ error: 'Query parameter "q" is required' }, { status: 400 });
    }

    try {
        const data = await searchTokens(query);
        // Format response to match spec
        const results = (data.coins || []).slice(0, 10).map((coin) => ({
            id: coin.id,
            name: coin.name,
            symbol: coin.symbol,
            marketCapRank: coin.market_cap_rank,
            thumb: coin.thumb,
            large: coin.large,
        }));
        return NextResponse.json({ results });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to search tokens' }, { status: 500 });
    }
}
