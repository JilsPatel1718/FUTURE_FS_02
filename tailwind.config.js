import { defineConfig } from "tailwindcss";

export default defineConfig({
  content: ["./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Inter'", "ui-sans-serif", "system-ui"],
      },
      animation: {
        fade: "fadeIn 0.5s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0px)" },
        },
      },
    },
  },
  plugins: [],
});

