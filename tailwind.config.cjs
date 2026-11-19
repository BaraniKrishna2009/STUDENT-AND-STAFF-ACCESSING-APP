// tailwind.config.cjs
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // enable class-based dark mode
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0A1128',
        primary: '#1D4ED8', // blue
        secondary: '#7C3AED', // violet
        accent: '#F5F5F5', // white/near-white
      },
      borderRadius: {
        xl: '1rem',
      },
      boxShadow: {
        soft: '0 4px 6px rgba(0,0,0,0.1)',
      },
    },
  },
  plugins: [],
};
