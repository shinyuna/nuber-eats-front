const colors = require('tailwindcss/colors');

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      sm: { min: '320px', max: '767px' },
      md: { min: '768px', max: '1023px' },
      lg: { max: '1279px' },
      xl: { max: '1535px' },
    },
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
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
