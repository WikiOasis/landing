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
        bg: "#0F0F0F",
        bg2: "#131313",
        line: "#1A1A1A",
        text: "#E6E6E6",
        muted: "#9A9A9A",
        accent: "#3A86FF",
      },
    },
  },
} satisfies Config;
