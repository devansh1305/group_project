// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "bsky-primary": "var(--bsky-bg-primary)",
        "bsky-secondary": "var(--bsky-bg-secondary)",
        "bsky-tertiary": "var(--bsky-bg-tertiary)",
        "bsky-text": {
          primary: "var(--bsky-text-primary)",
          secondary: "var(--bsky-text-secondary)",
          muted: "var(--bsky-text-muted)",
        },
        "bsky-accent": {
          blue: "var(--bsky-accent-blue)",
          purple: "var(--bsky-accent-purple)",
          teal: "var(--bsky-accent-teal)",
        },
        "bsky-border": "var(--bsky-border)",
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
      },
    },
  },
  plugins: [],
};
