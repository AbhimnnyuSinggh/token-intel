export const revalidate = 3600;

export async function generateStaticParams() {
    const topTokens = [
        'bitcoin', 'ethereum', 'tether', 'bnb', 'solana',
        'usdc', 'xrp', 'dogecoin', 'toncoin', 'cardano'
    ];

    return topTokens.map((id) => ({
        id,
    }));
}

export async function generateMetadata({ params }) {
    try {
        const id = params?.id;

        // 🛡️ SAFE fallback
        if (!id || typeof id !== 'string') {
            return {
                title: "Token Analysis | Token Intel",
                description: "View token safety score and analysis on Token Intel.",
            };
        }

        const name = id.charAt(0).toUpperCase() + id.slice(1);

        return {
            title: `${name} Safety Score & Fundamental Analysis | Token Intel`,
            description: `Check the live smart contract safety score, health index, alerts, and market data for ${name} on Token Intel.`,
            openGraph: {
                title: `${name} Safety Score | Token Intel`,
                description: `Live fundamental analysis and vulnerability scanner for ${name}.`,
                siteName: 'Token Intel',
            },
            twitter: {
                card: 'summary_large_image',
                title: `${name} on Token Intel`,
                description: `Is ${name} safe? View the full safety and health report on Token Intel.`
            }
        };

    } catch (error) {
        // 🛡️ FINAL fallback (never crash build)
        return {
            title: "Token Intel",
            description: "Token analysis platform",
        };
    }
}

export default function TokenLayout({ children }) {
    return children;
}