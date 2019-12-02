/**
 * webpack server config
 * Author: yangxi
 */

const path = require('path')

const serverConf = {
  contentBase: path.resolve(__dirname, '../src'),
  progress: false,
  hot: true,
  inline: true,
  proxy: {},
  disableHostCheck: true, // 不检查主机的应用程序容易受到DNS重新绑定攻击
  historyApiFallback: true,
  stats: {
    colors: true
  }
}

module.exports = serverConf

