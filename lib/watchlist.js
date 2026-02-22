'use client'
import { useState, useEffect } from 'react';

export function useWatchlist() {
    const [watchlist, setWatchlist] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('token_intel_watchlist');
        if (stored) {
            try {
                setWatchlist(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse watchlist", e);
            }
        }
        setIsLoaded(true);
    }, []);

    const toggleWatchlist = (tokenId) => {
        let newList;
        if (watchlist.includes(tokenId)) {
            newList = watchlist.filter(id => id !== tokenId);
        } else {
            newList = [...watchlist, tokenId];
            // Simulate Email Alert Setting
            console.log(`Email alerts activated for ${tokenId}`);
        }
        setWatchlist(newList);
        localStorage.setItem('token_intel_watchlist', JSON.stringify(newList));
    };

    const isInWatchlist = (tokenId) => {
        return watchlist.includes(tokenId);
    };

    return { watchlist, isLoaded, toggleWatchlist, isInWatchlist };
}
