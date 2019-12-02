/**
 * webpack build service
 * Author: yangxi
 */

const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const fs = require('fs-extra')
const config = require('./webpack.base')
const { outputFile, publicPath } = require('./app.conf')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const { log, renderAscii } = require('./core/util')
const Spinner = require('./core/spinner')
const NODE_ENV = process.env.NODE_ENV

config.mode = 'production'

Object.assign(config.output, {
  filename: 'js/[name].[chunkhash].js',
  chunkFilename: 'js/[id].[chunkhash].js',
  publicPath: `${publicPath}/static`,
  path: path.resolve(`${outputFile}/static`)
})

Object.assign(config.optimization || {}, {
  splitChunks: {
    cacheGroups: {
      //打包重复出现的代码
      vendor: {
        name: 'commons',
        chunks: 'initial',
        minChunks: 2,
        maxInitialRequests: 5, // The default limit is too small to showcase the effect
        minSize: 0
      }
    }
  }
})

config.module.rules = config.module.rules.concat([
  {
    test: /\.(less|css)$/,
    exclude: /node_modules/,
    use: ExtractTextPlugin.extract({
      use: [
        {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[local]--[hash:base64:6]'
          }
        },
        'postcss-loader',
        'less-loader']
    })
  },
  // 处理 antd 的css|less 不兼容 css module
  {
    test: /\.(less|css)$/,
    exclude: /src/,
    include: /node_modules/,
    use: ExtractTextPlugin.extract({
      use: [
        'css-loader',
        'postcss-loader',
        'less-loader']
    })
  }
])

config.plugins = [].concat([
  new CleanWebpackPlugin({
    cleanOnceBeforeBuildPatterns: [path.resolve(`${outputFile}`)]
  })
], config.plugins || [], [
  new webpack.DefinePlugin({
    DEBUG: false,
    'process.env': {
      NODE_ENV: '"production"'
    }
  }),
  //想看包文件的情况，可以打开
  // new BundleAnalyzerPlugin(),
  new ExtractTextPlugin({
    filename: 'css/[name].[chunkhash].css',
    allChunks: true
  }),
  new HtmlWebpackPlugin({
    filename: `../index.html`,
    template: 'index.html',
    chunks: ['app', 'commons'],
    env: NODE_ENV
  })
])

const spinner = new Spinner('Building...')
spinner.start()
webpack(config, (err, stats) => {
  spinner.stop()
  if (err) throw err

  log.info(stats.toString({
    colors: true
  }))

  if (stats.hasErrors()) {
    log.error('Build failed with errors.\n')
    process.exit(1)
  }
  renderAscii()
  log.success('Build success!\n')
})

