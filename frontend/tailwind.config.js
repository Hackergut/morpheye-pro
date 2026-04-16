/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        morpheye: {
          DEFAULT: '#41AA8F',
          dark: '#2D7563',
        }
      }
    }
  },
  plugins: []
}
