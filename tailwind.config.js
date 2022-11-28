/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./containers/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        noir : "#1A1A1A",
        blanc : "#f2f2f2",
        rose : "#ff0032",
        bleu : "#92d8e0",
        orange : "#ff832b",
        violet : "#6C63FF",
      },
      fontFamily : {
        sans : ["Outfit", "sans-serif"],
        jura : ["Jura", "sans-serif"],
        azonix : ['azonix'],
      },
      dropShadow: {
        "text-sm": "1px 1px 0px rgba(0, 0, 200, 0.90)",
        "text-md": "1px 2px 0px rgba(0, 0, 0, 0.90)",
        "text-lg": "1px 4px 0px rgba(108, 99, 255, 0.90)",
      },
    },
  },
  plugins: [],
}
