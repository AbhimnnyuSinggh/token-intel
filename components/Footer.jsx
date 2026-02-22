export default function Footer() {
    return (
        <footer className="bg-bg-dark-section py-12 border-t border-border-dark mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-2xl">🔍</span>
                            <span className="font-bold text-xl bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                                Token Intel
                            </span>
                        </div>
                        <p className="text-text-onDarkMuted text-sm max-w-sm">
                            AI-powered crypto intelligence. We analyze on-chain data, tokenomics, and market signals to give you clear, actionable insights in seconds.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-text-onDark font-semibold mb-4">Product</h4>
                        <ul className="space-y-2 text-sm text-text-onDarkMuted">
                            <li><a href="/" className="hover:text-accent-primary transition-colors">Safety Scans</a></li>
                            <li><a href="/top-tokens" className="hover:text-accent-primary transition-colors">Top Tokens</a></li>
                            <li><a href="#" className="hover:text-accent-primary transition-colors">API</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-text-onDark font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm text-text-onDarkMuted">
                            <li><a href="#" className="hover:text-accent-primary transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-accent-primary transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-border-dark">
                    <p className="text-text-onDarkMuted text-xs leading-relaxed text-center">
                        ⚠️ <strong>Disclaimer:</strong> Token Intel provides data-driven analysis for educational purposes only. This is <strong>NOT financial advice</strong>. Scores are computed from publicly available on-chain and market data and may not reflect all risks. Always Do Your Own Research (DYOR) before making any investment decisions. We are not responsible for any financial losses. Past performance does not guarantee future results. Cryptocurrency investments carry high risk of loss.
                    </p>
                    <p className="text-text-onDarkMuted text-xs text-center mt-6">
                        © {new Date().getFullYear()} Token Intel. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
