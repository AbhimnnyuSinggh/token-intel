const { Telegraf } = require('telegraf');
const fetch = require('node-fetch');

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || 'YOUR_BOT_TOKEN_HERE';
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000/api';

const bot = new Telegraf(BOT_TOKEN);

bot.start((ctx) => {
    ctx.reply(
        '👋 Welcome to Token Intel Bot!\n\n' +
        'Send me any token symbol or name to get an instant safety and health analysis.\n' +
        'Example: /scan solana'
    );
});

bot.command('scan', async (ctx) => {
    const query = ctx.message.text.split(' ').slice(1).join(' ');
    if (!query) return ctx.reply('Please provide a token name. Example: /scan pepecash');

    const msg = await ctx.reply(`🔍 Scanning ${query}...`);

    try {
        const searchRes = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}`);
        const searchData = await searchRes.json();
        const tokens = searchData.results;

        if (!tokens || tokens.length === 0) {
            return ctx.telegram.editMessageText(ctx.chat.id, msg.message_id, undefined,
                `❌ Could not find any token matching "${query}".`
            );
        }

        const token = tokens[0];

        ctx.telegram.editMessageText(ctx.chat.id, msg.message_id, undefined,
            `🔄 Found ${token.name}. Analyzing smart contracts...`
        );

        const reportRes = await fetch(`${API_BASE_URL}/token/${token.id}`);
        const reportData = await reportRes.json();

        if (!reportData.report) throw new Error('Failed to generate report');

        const r = reportData.report;
        const scores = r.scores;

        const isSafe = scores.safety >= 80;
        const safetyEmoji = isSafe ? '✅' : (scores.safety > 50 ? '⚠️' : '🚨');
        const healthEmoji = scores.health >= 70 ? '🟢' : (scores.health > 40 ? '🟡' : '🔴');

        const message = `
*${r.name} (${r.symbol.toUpperCase()}) Analysis*
*Price:* $${r.marketData.price.toLocaleString(undefined, { maximumFractionDigits: 6 })} (${r.marketData.change24h > 0 ? '+' : ''}${r.marketData.change24h?.toFixed(2)}%)
*Market Cap:* $${r.marketData.marketCap?.toLocaleString() || 'N/A'}

*OVERALL SCORE: ${scores.combined}/100*

${safetyEmoji} *Safety Score:* ${scores.safety}/100
${healthEmoji} *Health Score:* ${scores.health}/100

[View Full Detailed Report](https://tokenintel.vercel.app/token/${token.id})
        `.trim();

        ctx.telegram.editMessageText(ctx.chat.id, msg.message_id, undefined, message, {
            parse_mode: 'Markdown',
            disable_web_page_preview: true
        });

    } catch (error) {
        console.error(error);
        ctx.telegram.editMessageText(ctx.chat.id, msg.message_id, undefined,
            `⚠️ Error analyzing token. Our nodes might be rate-limited or the token is unsupported.`
        );
    }
});

bot.launch().then(() => {
    console.log('[Token Intel Bot] Started successfully.');
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
