# Token Intel Telegram Bot

This is the official Telegram Bot for Token Intel. It connects directly to your deployment's API to fetch real-time safety and health scores for any token.

## Setup

1. Get a bot token from [@BotFather](https://t.me/BotFather) on Telegram.
2. Install dependencies: `npm install`
3. Run the bot by pointing it to your deployed Vercel API:

```bash
TELEGRAM_BOT_TOKEN="your_telegram_token" API_BASE_URL="https://tokenintel.vercel.app/api" node bot.js
```

Or for local development:
```bash
TELEGRAM_BOT_TOKEN="your_telegram_token" node bot.js
```
