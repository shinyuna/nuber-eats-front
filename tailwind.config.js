const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{js, jsx, ts, tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        trueGray: colors.trueGray,
        lime: colors.lime,
        lightblue: colors.lightBlue,
        uber: {
          light: '#DFF0D8',
          DEFAULT: '#5fb70a',
          dark: '#3e981f',
        },
      },
      zIndex: {
        '-1': '-1',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
