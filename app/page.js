'use client'
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import TokenCard from '@/components/TokenCard';

export default function Home() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [trending, setTrending] = useState([]);
  const [isLoadingTrending, setIsLoadingTrending] = useState(true);

  useEffect(() => {
    // Fetch trending tokens on load
    fetch('/api/trending')
      .then(res => res.json())
      .then(data => {
        setTrending(data.results || []);
        setIsLoadingTrending(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoadingTrending(false);
      });
  }, []);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.results || []);
      } catch (err) {
        console.error(err);
      }
      setIsSearching(false);
    }, 300); // 300ms debounce
    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (id) => {
    router.push(`/token/${id}`);
  };

  return (
    <div className="flex flex-col min-h-screen">

      {/* Hero Section */}
      <section className="bg-bg-dark-section py-20 md:py-32 flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-primary opacity-5 blur-[150px] rounded-full pointer-events-none"></div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-onDark mb-6 tracking-tight max-w-4xl leading-tight">
          Know Before You Buy
        </h1>
        <p className="text-xl text-text-onDarkMuted mb-12 max-w-2xl font-light">
          One score. Every token. Real data. Paste any token name or contract address for an instant, AI-powered safety and health analysis.
        </p>

        <div className="w-full max-w-2xl relative z-10 group">
          <div className="absolute inset-0 bg-accent-primary opacity-20 blur-xl rounded-2xl group-focus-within:opacity-40 transition-opacity duration-300"></div>
          <div className="relative flex items-center bg-bg-card rounded-2xl border border-border-dark p-2 shadow-2xl">
            <Search className="w-6 h-6 text-text-muted ml-4" />
            <input
              type="text"
              className="w-full bg-transparent border-none text-text-onDark px-4 py-4 text-lg focus:outline-none placeholder:text-text-muted"
              placeholder="Paste token name, symbol or contract..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="btn-primary py-3 px-8 text-lg hidden sm:block">
              Scan
            </button>
          </div>

          {/* Autocomplete Dropdown */}
          {results.length > 0 && query.length >= 2 && (
            <div className="absolute top-full mt-2 w-full bg-bg-card border border-border-dark rounded-xl shadow-2xl overflow-hidden z-20">
              {results.slice(0, 5).map(token => (
                <div
                  key={token.id}
                  className="px-6 py-4 border-b border-border-dark last:border-0 hover:bg-bg-dark-section cursor-pointer flex items-center gap-4 transition-colors text-left"
                  onClick={() => handleSelect(token.id)}
                >
                  {token.thumb ? (
                    <img src={token.thumb} alt={token.name} className="w-8 h-8 rounded-full bg-bg-secondary p-0.5" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-border-dark"></div>
                  )}
                  <div>
                    <div className="font-semibold text-text-onDark">{token.name}</div>
                    <div className="text-sm text-text-muted">{token.symbol.toUpperCase()}</div>
                  </div>
                  {token.marketCapRank && (
                    <div className="ml-auto text-xs text-text-muted font-mono">Rank #{token.marketCapRank}</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-12 text-sm text-text-muted flex items-center gap-4 font-mono">
          <span>Trusted by 10,000+ scans</span>
          <span className="w-1.5 h-1.5 rounded-full bg-border-dark"></span>
          <span>Over 5,000 tokens analyzed</span>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-text-primary mb-4">How It Works</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">Three simple steps to protect your investments and find the best opportunities in the market.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-light p-8 text-center">
              <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">1. Search Token</h3>
              <p className="text-text-secondary">Enter any token name, symbol, or paste the smart contract address. We auto-detect the chain instantly.</p>
            </div>
            <div className="card-light p-8 text-center">
              <div className="w-16 h-16 bg-green-50 text-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🛡️</span>
              </div>
              <h3 className="text-xl font-bold mb-3">2. Safety Score</h3>
              <p className="text-text-secondary">We scan the smart contract for honeypots, hidden taxes, and top holder centralization to prevent rug pulls.</p>
            </div>
            <div className="card-light p-8 text-center">
              <div className="w-16 h-16 bg-purple-50 text-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">📊</span>
              </div>
              <h3 className="text-xl font-bold mb-3">3. Health Score</h3>
              <p className="text-text-secondary">We analyze on-chain liquidity depth, 30D volume, and market dynamics to judge the token&apos;s fundamental health.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-16 bg-bg-secondary border-y border-border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-text-primary">Trending Tokens</h2>
              <p className="text-text-secondary mt-2">The most searched tokens in the last 24 hours.</p>
            </div>
          </div>

          {isLoadingTrending ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <div key={i} className="h-[200px] bg-border-light animate-pulse rounded-2xl"></div>)}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {trending.slice(0, 8).map(token => (
                <TokenCard key={token.id} token={token} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Us */}
      <section className="py-24 bg-bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-text-primary mb-12">The Most Comprehensive Scan</h2>
          <div className="overflow-x-auto rounded-2xl border border-border-light shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-bg-secondary text-text-primary">
                  <th className="p-4 font-semibold border-b border-border-light">Feature</th>
                  <th className="p-4 font-semibold border-b border-border-light text-center text-accent-primary">Token Intel</th>
                  <th className="p-4 font-semibold border-b border-border-light text-center text-text-muted">Others</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[
                  ['Smart Contract Security Check', '✅', '✅'],
                  ['Honeypot & Tax Detection', '✅', '✅'],
                  ['Holder Concentration Analysis', '✅', '❌'],
                  ['DEX Liquidity Depth Scoring', '✅', '❌'],
                  ['Fundamental Market Health', '✅', '❌'],
                  ['Plain-English Explanations', '✅', '❌']
                ].map((row, i) => (
                  <tr key={i} className="border-b border-border-light last:border-0 hover:bg-bg-secondary/50 transition-colors">
                    <td className="p-4 text-text-secondary font-medium">{row[0]}</td>
                    <td className="p-4 text-center text-lg">{row[1]}</td>
                    <td className="p-4 text-center text-lg opacity-50">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

    </div>
  );
}
