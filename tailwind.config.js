const colors = require('tailwindcss/colors');

module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './components/**/*.{js,ts,jsx,tsx}',
      './pages/**/*.{js,ts,jsx,tsx}',
    ],
    options: {
      safelist: [/border+?/, /bg+?/, /ring+?/, /text+?/],
    },
  },
  darkMode: 'class', // 'media' || 'class'
  theme: {
    colors: {
      gray: colors.gray,
      red: colors.red,
      blue: colors.blue,
      lightBlue: colors.lightBlue,
      black: colors.black,
      white: colors.white,
      green: colors.green,
    },
    extend: {
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
  plugins: [require('@tailwindcss/typography')],
};
