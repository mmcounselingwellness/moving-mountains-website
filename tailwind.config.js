/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],
  theme: {
    extend: {
      fontFamily: {
        raleway: ["Raleway", "sans-serif"],
        fraunces: ["Fraunces", "serif"], 
      },
      colors: {
        custom: "#FFF9F0",
        heading: "#406B6A",
        primary: "#D36139",
        secondary: "#DE9278",
      },
    },
  },
  plugins: [],
};
