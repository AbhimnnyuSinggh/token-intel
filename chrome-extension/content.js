async function injectScore() {
    // Extract coin slug from CoinGecko URL
    const match = window.location.pathname.match(/\/en\/coins\/([^\/]+)/);
    if (!match) return;
    const slug = match[1];

    console.log(`[Token Intel] Found CoinGecko page for: ${slug}`);

    // Create UI container
    const container = document.createElement('div');
    container.id = 'token-intel-injector';
    container.innerHTML = `
        <div class="ti-header">
            <span class="ti-logo">🔍 Token Intel</span>
            <span class="ti-loading">Analyzing...</span>
        </div>
        <div class="ti-body" id="ti-content">
            <div class="ti-pulse"></div>
        </div>
    `;

    // Inject floating UI
    document.body.appendChild(container);

    try {
        // Fetch data from Next.js API
        const res = await fetch(`http://localhost:3000/api/token/${slug}`);
        if (!res.ok) throw new Error('Failed to fetch');

        const data = await res.json();
        const score = data.report.scores.combined;

        let color = '#F59E0B'; // Moderate
        if (score >= 80) color = '#10B981'; // Excellent
        if (score < 40) color = '#EF4444'; // Danger

        document.getElementById('ti-content').innerHTML = `
            <div class="ti-score-circle" style="border-color: ${color}; color: ${color};">
                ${score}
            </div>
            <div class="ti-details">
                <div class="ti-stat">Health: <strong style="color: #F3F4F6">${data.report.scores.health}</strong></div>
                <div class="ti-stat">Safety: <strong style="color: #F3F4F6">${data.report.scores.safety}</strong></div>
            </div>
            <a href="http://localhost:3000/token/${slug}" target="_blank" class="ti-btn">View Full Report</a>
        `;
        document.querySelector('.ti-loading').innerText = 'Complete';

    } catch (e) {
        document.getElementById('ti-content').innerHTML = `
            <div class="ti-error">Score unavailable for this token.</div>
            <p style="font-size:12px;color:#9CA3AF;margin-top:8px">Ensure Token Intel local dev server is running on port 3000.</p>
        `;
        document.querySelector('.ti-loading').innerText = 'Error';
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectScore);
} else {
    injectScore();
}
