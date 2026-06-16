import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Mapped to Figma variables (light/dark modes via CSS vars)
        background: "var(--background)",
        "background-alt": "var(--background-alt)",
        body: "var(--body-text)",
        title: "var(--title-text)",
        button: "var(--button)",
        "button-text": "var(--button-text)",
        line: "var(--line)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-noto-serif)", "ui-serif", "Georgia", "serif"],
      },
    },
  },
} satisfies Config;
