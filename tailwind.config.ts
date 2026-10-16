import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  // Light theme only. "class" keeps the OS dark-mode setting from switching any styles.
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // GTA Washer & Dryer Rentals, "midnight and starlight": a calm blue for every action, midnight
        // for the header and dark bands, a warm starlight page. Apple-like: quiet colour, white
        // cards, the photos do the work. (The names brand/mint/gold/action are kept from earlier
        // themes so every component keeps working; only the values changed.)
        brand: {
          DEFAULT: "#3A6EA5", // calm blue: buttons, links, the price (5.4:1 on white)
          dark: "#232A35", // midnight: header, footer, dark bands
          mint: "#EDE6DA", // starlight tint for panels
          "mint-strong": "#E0D6C5",
        },
        // The call-to-action colour: the same calm blue, white text.
        action: {
          DEFAULT: "#3A6EA5",
          light: "#2F5C8C", // hover: a shade deeper
        },
        gold: {
          DEFAULT: "#9CC3F5", // soft sky: icons and badges on midnight; never as text on light
          dark: "#86B3EC",
        },
        paper: "#F4EEE4", // page background, starlight
        ink: {
          DEFAULT: "#1F2530", // body text
          soft: "#4A505B",
          muted: "#5C5F66", // small print, 5.7:1 on the page
        },
        line: "#E2D9CB", // hairlines and card borders
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
        display: ["Inter", "system-ui", "-apple-system", "sans-serif"],
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
