/**
 * webpack base service
 * Author: yangxi
 */

const path = require('path')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const NODE_ENV = process.env.NODE_ENV

module.exports = {
  entry: {
    app: ['./src/app.jsx']
  },
  output: {},

  resolve: {
    extensions: ['.js', '.jsx', '.json', 'index.jsx'],
    modules: [
      path.resolve('node_modules')
    ],
    alias: {
      '@': path.resolve('src'),
      '@monajs/react-form': path.resolve('package/index.jsx')
    }
  },

  resolveLoader: {
    modules: ['node_modules']
  },

  optimization: {},

  module: {
    rules: [{
      enforce: 'pre', // pre check
      test: /\.(js|jsx)$/,
      loader: 'eslint-loader',
      exclude: /node_modules/,
      include: [path.resolve('src')],
      options: {
        // formatter: require('eslint-friendly-formatter'),
        emitWarning: false
      }
    }, {
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
      include: [path.resolve('src'), path.resolve('package')],
      options: {
        // This is a feature of `babel-loader` for webpack (not Babel itself).
        // It enables caching results in ./node_modules/.cache/babel-loader/
        // directory for faster rebuilds.
        cacheDirectory: NODE_ENV === 'dev'
      }
    }, {
      test: /\.(eot|woff2?|ttf|svg)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: path.posix.join(NODE_ENV === 'dev' ? '' : '/', 'fonts/[name].[hash:7].[ext]')
          }
        }
      ]
    }, {
      test: /\.(png|jpg|gif)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: path.posix.join(NODE_ENV === 'dev' ? '' : '/', 'imgs/[name].[hash:7].[ext]')
          }
        }
      ]
    }]
  },

  plugins: [
    new StyleLintPlugin({
      // 正则匹配想要lint监测的文件
      files: ['src/style/*.less', 'src/views/**/*.less']
    })
  ]
}
