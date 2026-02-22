import Link from 'next/link';
import { Search, Star, Sparkles } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 bg-[#FAFAF7]/90 backdrop-blur-md border-b border-border-light">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="flex items-center gap-2">
                            <span className="text-2xl">🔍</span>
                            <span className="font-bold text-xl text-text-primary tracking-tight">
                                Token Intel
                            </span>
                        </Link>
                    </div>
                    <div className="hidden md:flex space-x-8 items-center">
                        <Link href="/" className="text-text-secondary hover:text-text-primary transition-colors font-medium">
                            Home
                        </Link>
                        <Link href="/top-tokens" className="text-text-secondary hover:text-text-primary transition-colors font-medium">
                            Top Tokens
                        </Link>
                        <Link href="/compare" className="text-text-secondary hover:text-text-primary transition-colors font-medium">
                            Compare
                        </Link>
                        <Link href="/portfolio" className="text-text-secondary hover:text-text-primary transition-colors font-medium">
                            Portfolio
                        </Link>
                        <Link href="/pro" className="text-accent-primary hover:text-accent-primary-hover transition-colors font-bold flex items-center gap-1">
                            <Sparkles size={16} /> Pro
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative hidden md:block w-64">
                            <input
                                type="text"
                                placeholder="Search token..."
                                className="w-full bg-white border border-border-light rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent text-text-primary shadow-sm"
                            />
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-text-muted" />
                        </div>
                        <Link href="/watchlist" className="p-2 rounded-xl bg-white text-text-secondary hover:text-accent-primary transition-colors border border-border-light flex items-center justify-center shadow-sm hover:shadow-md">
                            <Star size={20} />
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
