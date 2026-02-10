/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Neumorphic washer-inspired palette
        neu: {
          bg: "#E8ECEF",
          surface: "#E8ECEF",
          light: "#FFFFFF",
          dark: "#C8CCD0",
          deeper: "#B8BCC0",
        },
        sage: {
          50: "#F0F5F0",
          100: "#DAE5DA",
          200: "#B8CEB8",
          300: "#8FB38F",
          400: "#6B9A6B",
          500: "#4A7D4A",
          600: "#3D663D",
          700: "#2F4F2F",
          800: "#223822",
          900: "#152215",
        },
        washer: {
          panel: "#E3E8EB",
          display: "#D5DDE2",
          accent: "#7BAA7B",
          indicator: "#6B9A6B",
          chrome: "#C0C8CC",
          glass: "#CBD5DA",
        },
        // Dark mode surfaces
        dark: {
          bg: "#1A1D21",
          surface: "#22262B",
          elevated: "#2A2F35",
          border: "#363B42",
        },
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
        display: ["Orbitron", "monospace"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        // Neumorphic shadows - light mode
        "neu-flat":
          "6px 6px 12px #C8CCD0, -6px -6px 12px #FFFFFF",
        "neu-raised":
          "8px 8px 16px #C8CCD0, -8px -8px 16px #FFFFFF",
        "neu-pressed":
          "inset 4px 4px 8px #C8CCD0, inset -4px -4px 8px #FFFFFF",
        "neu-subtle":
          "3px 3px 6px #C8CCD0, -3px -3px 6px #FFFFFF",
        "neu-button":
          "4px 4px 8px #C8CCD0, -4px -4px 8px #FFFFFF",
        // Dark mode neumorphic
        "neu-dark-flat":
          "6px 6px 12px #14171A, -6px -6px 12px #2E333A",
        "neu-dark-raised":
          "8px 8px 16px #14171A, -8px -8px 16px #2E333A",
        "neu-dark-pressed":
          "inset 4px 4px 8px #14171A, inset -4px -4px 8px #2E333A",
        "neu-dark-subtle":
          "3px 3px 6px #14171A, -3px -3px 6px #2E333A",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        "spin-slow": "spin 8s linear infinite",
        "pulse-dot": "pulseDot 2s ease-in-out infinite",
        "drum-spin": "drumSpin 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        drumSpin: {
          "0%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(180deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
};
