console.log()
const BABEL_ENV = process.env.BABEL_ENV

let config

if (BABEL_ENV === 'package') {
  config = {
    'presets': [
      '@babel/preset-react',
      '@babel/preset-env'
    ],
    'plugins': [
      '@babel/plugin-proposal-class-properties'
    ]
  }
} else {
  config = {
    'presets': [
      '@babel/preset-react',
      '@babel/preset-env',
      '@babel/preset-flow'
    ],
    'plugins': [
      [
        'import',
        {
          'libraryName': 'antd',
          'libraryDirectory': 'es',
          'style': 'css'
        }
      ],
      '@monajs/babel-plugin-react-css-modules',
      'transform-react-jsx-img-import',
      'react-hot-loader/babel',
      'jsx-control-statements',
      'transform-object-assign',
      'dynamic-import-webpack',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-transform-runtime'
    ]
  }
}
module.exports = config
