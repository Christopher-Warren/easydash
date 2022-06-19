module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: { extend: {} },
  plugins: [
    require('tailwindcss-children'),
    require('@tailwindcss/aspect-ratio'),
  ],
  darkMode: 'class',
}
