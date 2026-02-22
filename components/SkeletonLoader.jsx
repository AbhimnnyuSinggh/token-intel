import React from 'react';

export default function SkeletonLoader({ type = 'card' }) {
    if (type === 'card') {
        return (
            <div className="card-light p-4 animate-pulse h-full">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-border-light"></div>
                    <div>
                        <div className="h-4 w-24 bg-border-light rounded mb-2"></div>
                        <div className="h-3 w-12 bg-border-light rounded"></div>
                    </div>
                </div>
                <div className="mt-8">
                    <div className="flex justify-between items-end mb-3">
                        <div className="h-6 w-20 bg-border-light rounded"></div>
                        <div className="h-4 w-12 bg-border-light rounded"></div>
                    </div>
                    <div className="h-8 w-full bg-border-light rounded mt-2"></div>
                </div>
            </div>
        );
    }

    if (type === 'gauge') {
        return (
            <div className="animate-pulse flex justify-center items-center w-[200px] h-[200px] bg-border-light rounded-full border-8 border-bg-secondary"></div>
        );
    }

    if (type === 'table') {
        return (
            <div className="w-full animate-pulse">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="flex gap-4 p-4 border-b border-border-light items-center">
                        <div className="w-6 h-6 bg-border-light rounded"></div>
                        <div className="w-8 h-8 rounded-full bg-border-light"></div>
                        <div className="w-32 h-4 bg-border-light rounded flex-grow"></div>
                        <div className="w-20 h-4 bg-border-light rounded"></div>
                        <div className="w-16 h-4 bg-border-light rounded"></div>
                        <div className="w-24 h-6 bg-border-light rounded-full"></div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="animate-pulse bg-border-light rounded h-full w-full"></div>
    );
}
