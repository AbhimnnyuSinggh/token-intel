export async function searchTokens(query) {
    try {
        const res = await fetch(`https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(query)}`);
        if (!res.ok) return { coins: [] };
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("CoinGecko search error:", error);
        return { coins: [] };
    }
}

export async function getTokenDetails(id) {
    try {
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=true&community_data=true&developer_data=true&sparkline=false`);
        if (!res.ok) return null;
        return await res.json();
    } catch (error) {
        console.error("CoinGecko details error:", error);
        return null;
    }
}

export async function getTokenPriceChart(id, days = 7) {
    try {
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`);
        if (!res.ok) return { prices: [] };
        return await res.json();
    } catch (error) {
        console.error("CoinGecko chart error:", error);
        return { prices: [] };
    }
}

export async function getTrendingTokens() {
    try {
        const res = await fetch('https://api.coingecko.com/api/v3/search/trending');
        if (!res.ok) return { coins: [] };
        return await res.json();
    } catch (error) {
        console.error("CoinGecko trending error:", error);
        return { coins: [] };
    }
}

export async function getTopTokens(limit = 100) {
    try {
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`);
        if (!res.ok) return [];
        return await res.json();
    } catch (error) {
        console.error("CoinGecko top tokens error:", error);
        return [];
    }
}

// ─── GoPlus API ────────────────────────────────────────────────────────

const PLATFORM_TO_CHAIN_ID = {
    'ethereum': '1',
    'binance-smart-chain': '56',
    'polygon-pos': '137',
    'arbitrum-one': '42161',
    'base': '8453',
    'optimistic-ethereum': '10',
};

export async function getGoPlusSecurity(contractAddress, platformId) {
    try {
        if (platformId === 'solana') {
            const res = await fetch(`https://api.gopluslabs.io/api/v1/solana/token_security?contract_addresses=${contractAddress}`);
            if (!res.ok) return null;
            const data = await res.json();
            return data.result?.[contractAddress.toLowerCase()] || null;
        }

        const chainId = PLATFORM_TO_CHAIN_ID[platformId] || '1'; // Default to ETH
        const res = await fetch(`https://api.gopluslabs.io/api/v1/token_security/${chainId}?contract_addresses=${contractAddress}`);
        if (!res.ok) return null;
        const data = await res.json();
        return data.result?.[contractAddress.toLowerCase()] || null;
    } catch (error) {
        console.error("GoPlus security error:", error);
        return null;
    }
}

// ─── DexScreener API ────────────────────────────────────────────────────────

export async function getDexScreenerPairs(address) {
    try {
        const res = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${address}`);
        if (!res.ok) return { pairs: [] };
        return await res.json();
    } catch (error) {
        console.error("DexScreener error:", error);
        return { pairs: [] };
    }
}

// ─── DefiLlama API ────────────────────────────────────────────────────────

export async function getDefiLlamaTVL(protocolName) {
    try {
        // Normalizing protocol name (this might need fuzzy mapping in a real app)
        const normalized = protocolName.toLowerCase().replace(/\s+/g, '-');
        const res = await fetch(`https://api.llama.fi/protocol/${normalized}`);
        if (!res.ok) return null;
        return await res.json();
    } catch (error) {
        console.error("DefiLlama error:", error);
        return null;
    }
}
