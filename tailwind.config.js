/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          cream: '#FBF8F3',
          sand: '#F4ECE1',
          caramel: '#E57200',
          amber: '#D96500',
          espresso: '#231713',
          dark: '#160E0A',
          charcoal: '#3A2E29',
          gold: '#C8A366',
          border: '#E8DEC8'
        }
      },
      fontFamily: {
        serif: ['"Bodoni Moda"', 'serif'],
        display: ['"Cinzel"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      }
    }
  },
  plugins: [],
}
