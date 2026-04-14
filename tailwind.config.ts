import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		fontSize: {
			xs: "0.75rem",
			sm: "0.875rem",
			base: "1rem",
			h6: "1.25rem",
			h5: "1.5rem",
			h4: "2rem",
			h3: "2.25rem",
			h2: "2.5rem",
			h1: "3rem",
			"display-sm": "2rem",
			"display-md": "2.5rem",
			"display-lg": "3.5rem",
		},
		extend: {
			colors: {
				surface: "#121416",
				"surface-lowest": "#0e1012",
				"surface-low": "#1a1c1e",
				"surface-container": "#1e2022",
				"surface-high": "#282a2c",
				"surface-highest": "#2e3032",
				"primary-lime": "#caf300",
				"on-primary": "#121416",
				"on-surface": "#e8eaed",
				"on-surface-muted": "#9aa0a6",
			},
			fontFamily: {
				display: ["var(--font-space-grotesk)", "sans-serif"],
				body: ["var(--font-inter)", "sans-serif"],
				sans: ["var(--font-inter)", "sans-serif"],
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
				"primary-shimmer": "linear-gradient(135deg, #ffffff 0%, #caf300 100%)",
			},
			gridTemplateColumns: {
				"auto-fill-200": "repeat(auto-fill, minmax(200px, 1fr))",
				"auto-fit-200": "repeat(auto-fit, minmax(200px, 1fr))",
				"auto-fill-220": "repeat(auto-fill, minmax(220px, 1fr))",
			},
			boxShadow: {
				ambient: "0 0 32px rgba(176, 213, 0, 0.08)",
			},
		},
	},
	plugins: [],
};
export default config;
