<div align="center">

# 🔍 Token Intel

### **Know Before You Buy.**

AI-powered safety scans and fundamental analysis for every crypto token.  
One score. Every token. Real data.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://docker.com/)
[![DevSecOps](https://img.shields.io/badge/DevSecOps-Pipeline-green?style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/features/actions)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

<br/>

[**Live Demo →**](https://tokenintel.vercel.app) &nbsp;&nbsp;|&nbsp;&nbsp; [**Telegram Bot →**](#-telegram-bot) &nbsp;&nbsp;|&nbsp;&nbsp; [**Chrome Extension →**](#-chrome-extension)

<br/>

<img src="https://img.shields.io/badge/status-active-success?style=flat-square" />
<img src="https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square" />

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [API Integrations](#-api-integrations)
- [Scoring Engine](#-scoring-engine)
- [Telegram Bot](#-telegram-bot)
- [Chrome Extension](#-chrome-extension)
- [DevSecOps Pipeline](#%EF%B8%8F-devsecops-pipeline)
- [Docker Deployment](#-docker-deployment)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌐 Overview

**Token Intel** is a comprehensive crypto token analysis platform that combines smart contract security scanning with fundamental market health analysis. Paste any token name, symbol, or contract address and get an instant, data-driven report that tells you whether a token is safe to invest in.

Unlike tools that only check for honeypots, Token Intel goes deeper — analyzing holder concentration, DEX liquidity depth, market dynamics, developer activity, supply economics, and price strength to produce a holistic **Safety Score** and **Health Score** for any token across multiple chains.

---

## ✨ Features

### 🛡️ Core Analysis
| Feature | Description |
|---------|-------------|
| **Safety Score** | Smart contract security audit powered by GoPlus — honeypot detection, hidden owners, tax analysis, proxy contracts, and more |
| **Health Score** | Fundamental analysis using CoinGecko data — market cap, volume ratios, price strength, developer activity, supply health |
| **Combined Score** | Weighted composite score (40% safety + 60% health) with plain-English explanations |
| **AI Brief** | Natural language summary explaining what the scores mean and what to watch out for |

### 🔎 Discovery & Research
| Feature | Description |
|---------|-------------|
| **Instant Search** | Debounced autocomplete search across thousands of tokens with live results |
| **Trending Tokens** | Real-time trending tokens from CoinGecko displayed on the homepage |
| **Top 100 Tokens** | Browse the top 100 tokens by market cap with scores and rankings |
| **Token Compare** | Side-by-side comparison of two tokens across all metrics |

### 📊 Portfolio & Tracking
| Feature | Description |
|---------|-------------|
| **Watchlist** | Save tokens to a personal watchlist stored in localStorage |
| **Portfolio Scanner** | Analyze your entire portfolio's safety and health at a glance |
| **Token Detail Pages** | Deep-dive analysis with interactive charts, radar diagrams, and holder breakdowns |

### 🧩 Multi-Platform
| Platform | Description |
|----------|-------------|
| **Web App** | Full-featured Next.js application with responsive design |
| **Telegram Bot** | `/scan` command for instant token analysis in any Telegram chat |
| **Chrome Extension** | Score injection directly onto CoinGecko token pages |

---

## 🏗 Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                             │
│                                                                  │
│   ┌──────────────┐  ┌──────────────┐  ┌───────────────────┐     │
│   │   Next.js    │  │  Telegram    │  │ Chrome Extension  │     │
│   │   Web App    │  │    Bot       │  │ (CoinGecko Inject)│     │
│   └──────┬───────┘  └──────┬───────┘  └────────┬──────────┘     │
└──────────┼─────────────────┼───────────────────┼────────────────┘
           │                 │                   │
           ▼                 ▼                   ▼
┌──────────────────────────────────────────────────────────────────┐
│                     NEXT.JS API ROUTES                           │
│                                                                  │
│   /api/search    /api/trending    /api/token/[id]               │
│   /api/top-tokens    /api/ai-brief    /api/portfolio            │
└──────────────────────────────┬───────────────────────────────────┘
                               │
           ┌───────────────────┼───────────────────┐
           ▼                   ▼                   ▼
┌────────────────┐  ┌────────────────┐  ┌────────────────┐
│   CoinGecko    │  │    GoPlus      │  │  DexScreener   │
│   Market Data  │  │   Security     │  │  DEX Pairs     │
└────────────────┘  └────────────────┘  └────────────────┘
                               │
                               ▼
                    ┌────────────────┐
                    │   DefiLlama   │
                    │      TVL      │
                    └────────────────┘
```

---

## 🛠 Tech Stack

### Frontend
- **[Next.js 16](https://nextjs.org/)** — React framework with App Router, server components, and API routes
- **[React 18](https://react.dev/)** — Component-based UI with hooks
- **[Tailwind CSS 3.4](https://tailwindcss.com/)** — Utility-first styling with custom design tokens
- **[Recharts](https://recharts.org/)** — Interactive charts and data visualization
- **[Lucide React](https://lucide.dev/)** — Beautiful, consistent icon set
- **[next-themes](https://github.com/pacocoursey/next-themes)** — Theme management with system preference detection

### Backend & APIs
- **Next.js API Routes** — Serverless API endpoints
- **CoinGecko API** — Market data, trending tokens, search, and price charts
- **GoPlus Security API** — Smart contract security analysis (EVM + Solana)
- **DexScreener API** — DEX pair data and liquidity information
- **DefiLlama API** — Protocol TVL data

### DevOps & Security
- **Docker** — Containerized deployment with multi-stage builds
- **GitHub Actions** — Full DevSecOps CI/CD pipeline
- **Trivy** — Container vulnerability scanning
- **Gitleaks** — Secret detection in source code
- **Hadolint** — Dockerfile linting
- **ESLint** — Code quality enforcement

### Design System
- **Typography** — Inter (sans-serif) + JetBrains Mono (monospace)
- **Color Palette** — Ivory/terracotta aesthetic with charcoal text hierarchy
- **Components** — Custom card system, score gauges, radar charts, and donut charts

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ (recommended: 20 LTS)
- **npm**, **yarn**, **pnpm**, or **bun**

### Installation

```bash
# Clone the repository
git clone https://github.com/AbhimnnyuSinggh/token-intel.git
cd token-intel

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Environment Variables

No API keys are required for basic functionality — Token Intel uses the free tiers of CoinGecko and GoPlus. For the Telegram bot, set:

```env
# telegram-bot/.env
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
API_BASE_URL=http://localhost:3000/api
```

---

## 🔌 API Integrations

### CoinGecko (Market Data)
| Endpoint | Usage |
|----------|-------|
| `/search` | Token search with autocomplete |
| `/coins/{id}` | Detailed token data (market, tickers, dev data) |
| `/coins/{id}/market_chart` | Price chart data (7D/30D/90D) |
| `/search/trending` | Top trending tokens |
| `/coins/markets` | Top tokens by market cap |

### GoPlus Security (Smart Contract Audit)
| Endpoint | Usage |
|----------|-------|
| `/token_security/{chainId}` | EVM token security data |
| `/solana/token_security` | Solana token security data |

**Supported Chains:** Ethereum, BSC, Polygon, Arbitrum, Base, Optimism, Solana

### DexScreener (DEX Data)
| Endpoint | Usage |
|----------|-------|
| `/latest/dex/tokens/{address}` | DEX pair data and liquidity |

### DefiLlama (DeFi Data)
| Endpoint | Usage |
|----------|-------|
| `/protocol/{name}` | Total Value Locked (TVL) |

---

## 🧮 Scoring Engine

### Safety Score (0–100)

Starts at **100** and deducts points for red flags found in the smart contract:

| Check | Deduction | Risk Level |
|-------|-----------|------------|
| 🍯 Honeypot detected | -40 | 🔴 Critical |
| 💀 Self-destruct capability | -25 | 🔴 Critical |
| 👤 Hidden owner | -20 | 🔴 Critical |
| 💰 Owner can change balances | -20 | 🔴 Critical |
| 🖨 Mintable (unlimited supply) | -15 | 🟡 High |
| 🔒 Not open source | -15 | 🟡 High |
| 🔁 Can take back ownership | -15 | 🟡 High |
| 🔄 Proxy (upgradeable) | -10 | 🟡 Medium |
| 💸 High sell tax (>10%) | -15 | 🟡 Medium |
| 💸 High buy tax (>10%) | -10 | 🟡 Medium |
| 📊 Top holder >50% | -20 | 🔴 Critical |
| 🔓 LP not locked | -10 | 🟡 Medium |

### Health Score (0–100)

Additive scoring across five categories:

| Category | Max Points | Metrics |
|----------|------------|---------|
| 📈 Market Metrics | 25 | Market cap size, FDV ratio, volume/mcap ratio |
| 💪 Price Strength | 25 | ATH distance, 24h/7d/30d trends, volatility |
| 💧 Liquidity & Exchanges | 20 | Ticker count, major exchange listings |
| 👨‍💻 Development Activity | 15 | GitHub commits (4w), repository stars |
| 🏦 Supply Health | 15 | Circulating/max supply ratio, token age |

### Combined Score

```
Combined = (Safety × 0.4) + (Health × 0.6)
```

Safety is weighted at 40% because a token with a dangerous smart contract makes health metrics irrelevant.

### Score Labels

| Score Range | Label |
|-------------|-------|
| 80–100 | ✅ **Strong** |
| 60–79 | 🟢 **Moderate** |
| 40–59 | 🟡 **Caution** |
| 20–39 | 🟠 **Risky** |
| 0–19 | 🔴 **Danger** |

---

## 🤖 Telegram Bot

A standalone Telegram bot that connects to the Token Intel API for instant analysis from any chat.

### Setup

```bash
cd telegram-bot
npm install
TELEGRAM_BOT_TOKEN=your_token npm start
```

### Commands

| Command | Description |
|---------|-------------|
| `/start` | Welcome message and usage instructions |
| `/scan <token>` | Instantly scan any token and get safety + health scores |

### Example

```
/scan solana

━━━━━━━━━━━━━━━━━━━━━━━
Solana (SOL) Analysis
Price: $142.50 (+3.2%)
Market Cap: $67.2B

OVERALL SCORE: 82/100

✅ Safety Score: 95/100
🟢 Health Score: 74/100
━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 🧩 Chrome Extension

Injects Token Intel scores directly onto CoinGecko coin pages as a floating widget.

### Features
- Auto-detects the token from the CoinGecko URL
- Displays combined score with color-coded circle (green/yellow/red)
- Shows safety and health breakdowns
- Links to the full report on Token Intel

### Installation (Developer Mode)
1. Open `chrome://extensions/`
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select the `chrome-extension/` directory
5. Visit any CoinGecko coin page (e.g., `coingecko.com/en/coins/bitcoin`)

> **Note:** The extension requires the Token Intel dev server running on `localhost:3000` for local development, or can be configured to point to the production URL.

---

## 🛡️ DevSecOps Pipeline

Token Intel uses a comprehensive CI/CD pipeline with security scanning at every stage:

```
┌─────────────────────────────────────────────────────────┐
│                    Push to main                          │
└────────────────────────┬────────────────────────────────┘
                         │
          ┌──────────────┼──────────────┐
          ▼              ▼              ▼
   ┌────────────┐ ┌───────────┐ ┌────────────┐
   │   Code     │ │  Secrets  │ │ Dependency  │
   │  Quality   │ │   Scan    │ │   Scan      │
   │  (ESLint)  │ │(Gitleaks) │ │ (npm audit) │
   └─────┬──────┘ └─────┬─────┘ └──────┬─────┘
         │               │              │
         └───────────────┼──────────────┘
                         │
                  ┌──────┴──────┐
                  │  Docker     │
                  │  Lint       │
                  │  (Hadolint) │
                  └──────┬──────┘
                         │
                  ┌──────┴──────┐
                  │  Build &    │
                  │  Push Image │
                  │  (DockerHub)│
                  └──────┬──────┘
                         │
                  ┌──────┴──────┐
                  │   Trivy     │
                  │   Image     │
                  │   Scan      │
                  └──────┬──────┘
                         │
                  ┌──────┴──────┐
                  │  Deploy to  │
                  │   Server    │
                  └─────────────┘
```

### Pipeline Stages

| Stage | Tool | Purpose |
|-------|------|---------|
| Code Quality | ESLint | Static code analysis and linting |
| Secrets Scan | Gitleaks | Detect hardcoded secrets and API keys |
| Dependency Scan | npm audit | Find vulnerable dependencies |
| Docker Lint | Hadolint | Dockerfile best practices |
| Build & Push | Docker | Build container and push to DockerHub |
| Image Scan | Trivy | Container vulnerability scanning |
| Deploy | SSH/Docker | Pull and deploy to production server |

---

## 🐳 Docker Deployment

### Quick Start with Docker Compose

```bash
docker compose up -d
```

This pulls the latest image from DockerHub and runs Token Intel on port `3000`.

### Build Locally

```bash
# Build the image
docker build -t token-intel .

# Run the container
docker run -p 3000:3000 token-intel
```

### DockerHub

```bash
docker pull abhimnyusingh/token-intel:latest
```

---

## 📁 Project Structure

```
token-intel/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── ai-brief/            #   AI-generated analysis brief
│   │   ├── portfolio/           #   Portfolio scanner endpoint
│   │   ├── search/              #   Token search with autocomplete
│   │   ├── token/               #   Full token analysis report
│   │   ├── top-tokens/          #   Top 100 tokens by market cap
│   │   └── trending/            #   Trending tokens
│   ├── compare/                  # Token comparison page
│   ├── portfolio/                # Portfolio scanner page
│   ├── pro/                      # Pro features page
│   ├── token/[id]/              # Dynamic token detail page
│   ├── top-tokens/              # Top tokens listing page
│   ├── watchlist/               # Personal watchlist page
│   ├── globals.css              # Design system & CSS variables
│   ├── layout.js                # Root layout with theme provider
│   └── page.js                  # Homepage with search & trending
│
├── components/                   # Reusable React Components
│   ├── AIBrief.jsx              # AI analysis summary widget
│   ├── DualHealthRadar.jsx      # Dual radar chart comparison
│   ├── Footer.jsx               # Site footer
│   ├── HealthRadar.jsx          # Health score radar visualization
│   ├── HolderDonut.jsx          # Token holder distribution chart
│   ├── MiniGauge.jsx            # Compact score gauge
│   ├── Navbar.jsx               # Navigation bar
│   ├── PriceChart.jsx           # Interactive price chart
│   ├── SafetyChecklist.jsx      # Safety checks breakdown
│   ├── ScoreBars.jsx            # Score bar visualizations
│   ├── ScoreGauge.jsx           # Large circular score gauge
│   ├── SkeletonLoader.jsx       # Loading state skeletons
│   ├── ThemeProvider.jsx        # Dark/light theme wrapper
│   ├── ThemeToggle.jsx          # Theme toggle button
│   ├── TokenCard.jsx            # Token preview card
│   └── TokenUnlocks.jsx         # Token unlock schedule
│
├── lib/                          # Core Business Logic
│   ├── api.js                   # External API clients
│   ├── scoring.js               # Safety & Health scoring engine
│   └── watchlist.js             # Watchlist localStorage manager
│
├── chrome-extension/             # Chrome Extension
│   ├── manifest.json            # Extension manifest (v3)
│   ├── content.js               # CoinGecko page injector
│   ├── popup.html               # Extension popup UI
│   └── styles.css               # Injected widget styles
│
├── telegram-bot/                 # Telegram Bot
│   ├── bot.js                   # Bot logic with /scan command
│   └── package.json             # Bot dependencies
│
├── .github/workflows/           # CI/CD Pipeline
│   ├── devsecops-pipeline.yml   # Orchestrator workflow
│   ├── code-quality.yml         # ESLint checks
│   ├── secrets-scan.yml         # Gitleaks scanning
│   ├── dependency-scan.yml      # npm audit
│   ├── docker-lint.yml          # Hadolint
│   ├── build-push.yml           # Docker build & push
│   ├── trivy-scan.yml           # Container scanning
│   └── deploy-to-server.yml     # Production deployment
│
├── Dockerfile                    # Production container
├── docker-compose.yml            # Docker Compose config
├── tailwind.config.js            # Tailwind configuration
├── next.config.mjs               # Next.js configuration
└── package.json                  # Project dependencies
```

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow the existing code style (ESLint config provided)
- Use the design system variables defined in `globals.css`
- Add components to the `components/` directory
- Add API integrations to `lib/api.js`
- Update scoring logic in `lib/scoring.js`

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with ❤️ for the crypto community**

[⬆ Back to Top](#-token-intel)

</div>
