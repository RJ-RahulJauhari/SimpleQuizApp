/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        1:"#0093E9",
        2:"#80D0C7",
        3:"#5EFCE8",
        4:"#736EFE"
      }
    },
  },
  plugins: [],
}