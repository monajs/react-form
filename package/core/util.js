export const isEmpty = (val) => {
  if (typeof val === 'string') {
    return !val
  }
  if (typeof val === 'number') {
    return val !== 0 && !val
  }
  if (val instanceof Array) {
    return val.length === 0
  }
  if (val instanceof Object) {
    return Object.keys(val).length === 0
  }
  return !val
}

export const isFunction = (arg) => {
  return arg instanceof Function
}

export const isRegExp = (arg) => {
  return arg instanceof RegExp
}

export const isProd = process.env.NODE_ENV === 'production'

const symbol = '[@monajs/react-form] '

export const log = {
  warn: function (msg) {
    console.error(symbol + 'Warning: ' + msg)
  },
  info: function (msg) {
    console.log(symbol + arguments)
  }
}

export const performance = {
  start: function () {
    const [key, ...other] = arguments
    console.time(symbol + key, ...other)
  },
  end: function () {
    const [key, ...other] = arguments
    console.timeEnd(symbol + key, ...other)
  }
}

export const getValue = (e = {}) => e.target.value

/**
 * get real type
 *
 * @example
 * _typeof({}) // object
 * _typeof([]) // array
 * _typeof('') // string
 * _typeof(1) // number
 * _typeof(null) // null
 * _typeof(undefined) // undefined
 *
 */
export const _typeof = (obj) => {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
}

/**
 * check is object. response will be boolean
 */
export const isPlainObject = (obj) => {
  return _typeof(obj) === 'object'
}
