/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ffab00",
        grey:'#D1D8E1',
        "dark-background":'#333333'
      },
    },
  },
  plugins: [],
};
