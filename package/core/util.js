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

export const log = function () {
  console.log(symbol + arguments)
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
