/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        taskiq: {
          bg: '#faf9f8',
          surface: '#f4f3f3',
          muted: '#e8f3f2',
          border: '#d8dddc',
          ink: '#1a1c1c',
          soft: '#5a6665',
          primary: '#416463',
          'primary-dark': '#2f4f4e',
          secondary: '#9cc3c1',
        },
      },
      boxShadow: {
        taskiq: '0 16px 36px rgba(26, 28, 28, 0.08)',
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
      },
    },
  },
  plugins: [],
};