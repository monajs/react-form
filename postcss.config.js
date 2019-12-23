module.exports = {
  parser: 'postcss-less',
  plugins: {
    'postcss-import': {},
    'postcss-cssnext': {
      browserslist: [
        '> 1%',
        'last 2 versions'
      ],
      features: {
        customProperties: false
      }
    }
  }
}
