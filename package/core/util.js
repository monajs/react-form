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

const symbol = function (type = 'log') {
  console.log(`%c ----------- @monajs/react-form/${type} ----------- `, 'color: #048ffd; font-weight: bold; font-size: 12px')
}

export const log = function () {
  symbol()
  console.log(arguments)
}

export const performance = {
  start: function () {
    symbol('performance')
    console.time(...arguments)
  },
  end: function () {
    console.timeEnd(...arguments)
  }
}

export const getValue = (e = {}) => e.target.value
