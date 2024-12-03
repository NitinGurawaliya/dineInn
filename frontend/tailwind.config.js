/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'custom-green-light': '#c6e2b3',
      },
      container: {
        center: true,
        padding: "2rem",
      },
    },
  },
  plugins: [],
}