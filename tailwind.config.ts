import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#f3eee7",
        ink: "#1a1a15",
        coffee: "#5b4638",
        chocolate: "#2b211b",
        cream: "#fff9f0",
        veil: "rgba(255,255,255,0.05)"
      },
      fontFamily: {
        display: ["Georgia", "Times New Roman", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      backdropBlur: {
        "3xl": "64px"
      },
      boxShadow: {
        glass: "0 24px 80px rgba(26,26,21,0.12)",
        button: "0 16px 42px rgba(26,26,21,0.16)"
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.22, 1, 0.36, 1)"
      },
      keyframes: {
        breathe: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.035)" }
        },
        scan: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" }
        }
      },
      animation: {
        breathe: "breathe 5.5s ease-in-out infinite",
        scan: "scan 5s linear infinite"
      }
    }
  },
  plugins: []
};

export default config;
