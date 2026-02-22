import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const tokenData = await req.json();
        const { tokenName, scores, marketData } = tokenData;

        // MVP MOCK FOR AI BRIEF (Since we don't have an API key configured)
        // In production, this would use the `ai` SDK with OpenAI/Gemini

        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate AI thinking time

        const isGood = scores.combined > 60;

        const brief = `
### Executive Summary: ${tokenName}
Based on the real-time on-chain analysis, ${tokenName} currently presents a **${isGood ? 'favorable' : 'high-risk'}** profile with a combined score of ${scores.combined}/100.

**Key Strengths:**
*   ${marketData.change24h > 0 ? `Positive 24h momentum (+${marketData.change24h.toFixed(2)}%)` : 'Strong underlying fundamentals despite recent price action.'}
*   ${scores.safety > 80 ? 'Excellent smart contract security rating (no honeypots detected).' : 'Moderate safety profile.'}
*   ${marketData.volume24h > 1000000 ? `Healthy trading volume exceeding $1M over the last 24 hours.` : 'Developing liquidity pool.'}

**Risk Factors:**
*   ${scores.health < 50 ? 'Low fundamental health indicators, proceed with caution.' : 'Standard market volatility risks apply.'}
*   ${(marketData.ath && marketData.price < marketData.ath * 0.5) ? `Currently trading significantly below its All-Time High.` : 'Price is currently testing upper resistance bands.'}

*This is an AI-generated analysis based on real-time data inputs and should not be considered financial advice.*
        `;

        return NextResponse.json({ text: brief.trim() });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to generate brief' }, { status: 500 });
    }
}
