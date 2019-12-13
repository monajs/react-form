/**
 * webpack server
 * Author: yangxi
 */

const webpack = require('webpack')
const webpackServer = require('webpack-dev-server')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const webpackServerConf = require('./webpack.server.js')
const config = require('./webpack.base')
const appConf = require('./app.conf')
const NODE_ENV = process.env.NODE_ENV

config.mode = 'development'

// Enable sourcemaps for debugging webpack's output.
config.devtool = 'eval-source-map'

Object.assign(config.output, {
  filename: '[name].js',
  chunkFilename: '[id].js',
  publicPath: '/'
})

config.entry.app.unshift('webpack-dev-server/client?http://' + appConf.serverName + ':' + appConf.port + '/', 'webpack/hot/dev-server')

config.module.rules = config.module.rules.concat([
  {
    test: /\.(less|css)$/,
    exclude: /node_modules/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          modules: true,
          localIdentName: '[local]--[hash:base64:6]'
        }
      },
      'postcss-loader',
      {
        loader: 'less-loader',
        options: {
          javascriptEnabled: true
        }
      }]
  },
  // 处理 antd 的css|less 不兼容 css module
  {
    test: /\.(less|css)$/,
    include: /node_modules/,
    exclude: /example/,
    use: [
      'style-loader',
      'css-loader',
      'postcss-loader',
      {
        loader: 'less-loader',
        options: {
          javascriptEnabled: true
        }
      }]
  }
])

const appWebPath = 'http://' + appConf.serverName + ':' + appConf.port

config.plugins = (config.plugins || []).concat([
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new ExtractTextPlugin({
    fallback: 'style-loader',
    filename: '[name].css'
  }),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'index.html',
    env: NODE_ENV
  }),

  new webpack.DefinePlugin({
    DEBUG: true
  }),
  new OpenBrowserPlugin({ url: appWebPath })
])

const compiler = webpack(config)
const webServer = new webpackServer(compiler, webpackServerConf)
webServer.listen(appConf.port, appConf.serverName)
