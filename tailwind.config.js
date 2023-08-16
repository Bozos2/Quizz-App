/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      gradientColorStops: {
        sport1: "#2196F3",
        sport2: "#0D47A1",
        general1: "#FC5C7D",
        general2: "#6A82FB",
        animals1: "#D4AF37",
        animals2: "#BFAF81",
        mythology1: "#FF3D00",
        mythology2: "#FF6E40",
        geography1: "#9796F0",
        geography2: "#FBC7D4",
        history1: "#8C6239",
        history2: "#4E3620",
        politics1: "#9E9E9E",
        politics2: "#616161",
        science1: " #86C166",
        science2: "#4B8D4C",
        film1: "#C61327",
        film2: "#8A0B17",
        music1: "#9C27B0",
        music2: "#6A1B7A",
        books1: "#A79171",
        books2: "#71563E",
      },
    },
  },
  plugins: [],
};
