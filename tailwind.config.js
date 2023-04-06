/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Arial", "sans-serif"],
    },
    extend: {
      screens: {
        xs: "400px",
      },
    },
  },
  plugins: [],
};
