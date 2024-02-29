/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./containers/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        dark: "rgba(0, 0, 0, 0.5) 0px 2px 10px 4px",
      },
      colors: {
        noir: "#1A1A1A",
        blanc: "#f2f2f2",
        rose: "#ff0032",
        bleu: "#92d8e0",
        orange: "#ff832b",
        violet: "#6C63FF",
        fauxblack: "#191617",
        fauxblack2: "#100d0e",
        apello: "rgba(230, 150, 0, 1.0)",
        bwhite: "rgba(255, 255, 255, 0.2)",
      },
      fontFamily: {
        sans: ["Outfit", "sans-serif"],
        jura: ["Jura", "sans-serif"],
        azonix: ["azonix"],
      },
      dropShadow: {
        apello: "1px 4px 0px rgba(230, 150, 0, 1.0)",
        "text-sm": "1px 1px 0px rgba(0, 0, 200, 0.90)",
        "text-md": "1px 2px 0px rgba(0, 0, 0, 0.90)",
        "text-lg": "1px 4px 0px rgba(108, 99, 255, 0.90)",
      },
      animation: {
        "bounce-slow": "bounce 5s ease-in-out infinite",
        "bounce-float": "floating 3s ease-in-out infinite",
      },
      keyframes: {
        floating: {
          "0%, 100%": { transform: "translatey(0)" },
          "50%": { transform: "translatey(3%)" },
        },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
      gridTemplateColumns: {
        // Simple 16 column grid
        mobile: "repeat(auto-fit,minmax(269px,350px))",
      },
      padding: {
        "1/2": "50%",
        full: "100%",
      },
    },
  },
  plugins: [],
};
