'use client'
import Link from 'next/link';
import { Search } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 bg-bg-primary/80 backdrop-blur-md border-b border-border-light">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="flex items-center gap-2">
                            <span className="text-2xl">🔍</span>
                            <span className="font-bold text-xl bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent">
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
                        <Link href="#" className="text-text-secondary hover:text-text-primary transition-colors font-medium">
                            About
                        </Link>
                    </div>
                    <div className="flex items-center">
                        <div className="relative hidden md:block w-64">
                            <input
                                type="text"
                                placeholder="Search token..."
                                className="w-full bg-bg-secondary border border-border-light rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent"
                            />
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-text-muted" />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
