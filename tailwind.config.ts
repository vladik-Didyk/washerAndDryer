import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  // Light theme only. "class" keeps the OS dark-mode setting from switching any styles.
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // GTA Washer & Dryer Rentals: trustworthy blue for the brand, sunny orange for every
        // "do it now" button, a warm white page. (The names brand/mint/gold are kept from the
        // first, green theme so every component keeps working; only the values changed.)
        brand: {
          DEFAULT: "#2357D8", // royal blue, primary (6.5:1 on white)
          dark: "#102A6E", // navy: footer, text on tints
          mint: "#EAF1FF", // light blue tint for panels
          "mint-strong": "#D3E2FF",
        },
        // The call-to-action colour: orange buttons with navy text (5:1).
        action: {
          DEFAULT: "#FF7A1A",
          light: "#FF8F3D", // hover: lighter, so the navy text keeps its contrast
        },
        gold: {
          DEFAULT: "#FFC93C", // sunshine accent: badges, icons on blue; never as text on light
          dark: "#F5B521",
        },
        paper: "#FFFBF5", // page background, warm white
        ink: {
          DEFAULT: "#141B33", // body text, navy-black
          soft: "#3C4560",
          muted: "#5D6680", // small print, 5.8:1 on paper
        },
        line: "#E9E3D8", // hairlines and card borders
      },
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        display: ["Poppins", "Inter", "system-ui", "sans-serif"],
      },
      keyframes: {
        "rise-in": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "disc-in": {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        // Machine drawing changing type (widgets/machine-showcase): turns edge-on, the drawing
        // swaps, turns back to face front.
        "machine-flip": {
          "0%": { transform: "rotateY(0deg)", animationTimingFunction: "ease-in" },
          "50%": { transform: "rotateY(90deg)" },
          "50.01%": { transform: "rotateY(-90deg)", animationTimingFunction: "ease-out" },
          "100%": { transform: "rotateY(0deg)" },
        },
      },
      animation: {
        // The type drawing animates in on load; the machine-showcase animation then moves the machines
        // between the five types.
        "disc-in": "disc-in 0.6s cubic-bezier(0.2, 0.7, 0.2, 1) both",
        "rise-in": "rise-in 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) 0.12s both",
        "fade-in": "fade-in 0.5s ease-out 0.55s both",
        "machine-flip": "machine-flip 0.76s linear both",
      },
    },
  },
  plugins: [],
} satisfies Config;
