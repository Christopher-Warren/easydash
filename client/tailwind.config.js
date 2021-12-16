module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  // mode: 'jit',
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      outline: {
        purple: '2px solid #8b5cf6',
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
    },
  },
  plugins: [],
}
