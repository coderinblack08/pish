const colors = require('tailwindcss/colors');

module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './components/**/*.{js,ts,jsx,tsx}',
      './pages/**/*.{js,ts,jsx,tsx}',
    ],
  },
  darkMode: 'class', // 'media' || 'class'
  theme: {
    extend: {
      colors,
      fontFamily: {
        serif: ['Lora', 'serif'],
        sans: ['Lato', 'sans-serif'],
      },
      width: {
        '11/10': '110vw',
      },
      translate: {
        '-1/10': '-10%',
      },
      borderWidth: {
        6: '6px',
      },
      maxHeight: {
        '4xl': '1024px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
