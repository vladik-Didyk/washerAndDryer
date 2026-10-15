/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  // Light theme only. "class" keeps the OS dark-mode setting from switching any styles.
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // GTA Washer & Dryer Rentals brand, taken from the logo.
        brand: {
          DEFAULT: "#0B5B47", // deep green, primary
          dark: "#073F32",
          mint: "#E6F0EB", // light green tint for panels
          "mint-strong": "#CFE3D9",
        },
        gold: {
          DEFAULT: "#F2B33D", // accent; never as text on light backgrounds
          dark: "#E0A12B",
        },
        paper: "#FAF8F2", // page background
        ink: {
          DEFAULT: "#14211D", // body text
          soft: "#3D4A45",
          muted: "#5E6A64", // small print, still 5:1 on paper
        },
        line: "#E3DED1", // hairlines and card borders
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
        // Machine drawing changing type (MachineTypesAnimation.jsx): turns edge-on, the drawing
        // swaps, turns back to face front.
        "machine-flip": {
          "0%": { transform: "rotateY(0deg)", animationTimingFunction: "ease-in" },
          "50%": { transform: "rotateY(90deg)" },
          "50.01%": { transform: "rotateY(-90deg)", animationTimingFunction: "ease-out" },
          "100%": { transform: "rotateY(0deg)" },
        },
      },
      animation: {
        // The type drawing animates in on load; MachineTypesAnimation then moves the machines
        // between the five types.
        "disc-in": "disc-in 0.6s cubic-bezier(0.2, 0.7, 0.2, 1) both",
        "rise-in": "rise-in 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) 0.12s both",
        "fade-in": "fade-in 0.5s ease-out 0.55s both",
        "machine-flip": "machine-flip 0.76s linear both",
      },
    },
  },
  plugins: [],
};
