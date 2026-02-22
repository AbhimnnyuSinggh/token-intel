/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-primary": "var(--bg-primary)",
        "bg-secondary": "var(--bg-secondary)",
        "bg-dark-section": "var(--bg-dark-section)",
        "bg-card": "var(--bg-dark-card)",

        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-muted": "var(--text-muted)",
        "text-onDark": "var(--text-on-dark)",
        "text-onDarkMuted": "var(--text-on-dark-muted)",

        "score-excellent": "var(--score-excellent)",
        "score-good": "var(--score-good)",
        "score-moderate": "var(--score-moderate)",
        "score-poor": "var(--score-poor)",
        "score-danger": "var(--score-danger)",

        "accent-primary": "var(--accent-primary)",
        "accent-hover": "var(--accent-primary-hover)",
        "accent-glow": "var(--accent-glow)",

        "border-light": "var(--border-light)",
        "border-dark": "var(--border-dark)",

        "chart-1": "var(--chart-1)",
        "chart-2": "var(--chart-2)",
        "chart-3": "var(--chart-3)",
        "chart-4": "var(--chart-4)",
        "chart-5": "var(--chart-5)",
      },
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
      },
    },
  },
  plugins: [],
};
