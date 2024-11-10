/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#D5FFCC',
        formbackground: '#EBFEEB',
        darkgreen: '#034A06',
        semidarkgreen: '#047009',

      },
      boxShadow: {
        resetPass: '0px 0px 0px 1000px rgba(0,0,0,0.5)',
      }
    },
  },
  plugins: [],
}

