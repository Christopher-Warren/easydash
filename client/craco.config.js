try {
  console.log(require('tailwindcss'), 'AUTOPREF:' + require('autoprefixer'))
} catch (error) {
  console.log(error)
}

module.exports = {
  style: {
    postcss: {
      plugins: [],
    },
  },
}
