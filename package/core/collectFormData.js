/**
 * collect form data
 * delivery to this.formData
 * author: yangxi
 *
 * @example
 * a.b.c or
 * a[0].b.c or
 * a.b[1][0][2].c
 * ...
 */

import { isPlainObject } from './util'

// patern：a[0][1][2]
// limit the length of array, max: 999
const keyChainReg = /^(\w+)((\[[0-9]{1,3}\])+)$/g

const collectFormData = (formData, key, val) => {
  const keyChain = key.split('.')
  const len = keyChain.length
  let d = formData
  keyChain.forEach((k, i) => {
    const keyParseList = keyChainReg.exec(k)
    if (!keyParseList) {
      // handle the patern of json
      if (i === len - 1) {
        d[k] = val
        return
      }
      if (!isPlainObject(d[k])) {
        d[k] = {}
      }
      d = d[k]
    } else {
      // handle the patern of array
      k = keyParseList[1]
      if (!Array.isArray(d[k])) {
        d[k] = []
      }
      d = d[k]
      let items = keyParseList[2] // [0][1][2]
      items = items.substring(1, items.length - 1).split('][') // [0,1,2]
      items.forEach((item, j) => {
        // then end of item array
        if (j === items.length - 1) {
          // the end of chain
          if (i === len - 1) {
            d[item] = val
            return
          }
          // check is already object
          if (!isPlainObject(d[item])) {
            d[item] = {}
          }
          d = d[item]
          return
        }
        if (!Array.isArray(d[item])) {
          d[item] = []
        }
        d = d[item]
      })
    }
  })
}

export default collectFormData
