/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        charcoal: "#121212",
        bone: "#F5F5F0",
        copper: "#D35400",
        gold: "#C5A059",
        smoke: "#1E1E1E",
        ash: "#2A2A2A",
      },
      fontFamily: {
        heading: ["Oswald", "sans-serif"],
        body: ["Inter", "sans-serif"],
        script: ["Great Vibes", "cursive"],
      },
    },
  },
  plugins: [],
};