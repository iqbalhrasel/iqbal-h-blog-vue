/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif']
      },
      colors: {
        bgDeep: '#1F2235',
        bgLight: '#24263B',
        greenColor: '#819067'
      }
    },
  },
  plugins: [],
}

