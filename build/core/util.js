const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const glob = require('glob')
const deepExtend = require('deep-extend')
require('console.table')

function log (message = '', type, timestamp = true) {
	const date = new Date()
	const hours = date.getHours()
	const minutes = date.getMinutes()
	const seconds = date.getSeconds()

	console.log(timestamp ? chalk.gray(`[${hours}:${minutes}:${seconds}]`) : '', type ? chalk[type](message) : message)
}

log.success = (message) => {
	log(message, 'green')
}

log.error = (message, error) => {
	log(message, 'red')
	error && console.error(error)
}

log.info = (message) => {
	log(message, 'yellow')
}

log.line = (num = 1) => {
	console.log(' '.padEnd(num, '\n'))
}

log.table = (list) => {
	list = list.map(item => {
		let firstKey = true
		for (const key in item) {
			if (firstKey) {
				item[key] = chalk.cyan(item[key])
			} else {
				item[key] = chalk.gray(item[key])
			}
			firstKey = false
		}

		return item
	})
	console.table(list)
}

function getViews () {
	const chunks = []

	const _path = './src/views'
	glob.sync(_path + '/**/*.js', {
		matchBase: true
	}).forEach(function (entry) {
		const label = entry.replace('./src/views/', '').replace('/index.js', '')
		chunks.push(label)
	})
	return chunks
}

// 获取配置
function getConfig (configPath) {
	try {
		fs.accessSync(configPath, fs.constants.F_OK | fs.constants.W_OK)
	} catch (error) {
		return {}
	}
	return require(configPath)
}

// 保存配置
function saveConfig (config, configPath) {
	let originalConfig = getConfig(configPath)
	config = deepExtend(originalConfig, config)
	const stream = fs.createWriteStream(configPath)
	stream.end(JSON.stringify(config, null, '  '))
}

module.exports = {
	log,
	getViews,
	getConfig,
	saveConfig,
	// 绘制字节码
	renderAscii () {
		const ascii = fs.readFileSync(path.resolve(__dirname, './ascii-monajs.txt'))
		log('', null, false)
		log(ascii, 'green', false)
		log('', null, false)
	}
}
