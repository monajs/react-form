/**
 * Relax your code
 * Slim down your form
 * author: yangxi
 */

import React, { Component } from 'react'
import { FormDataContext, FormVerifyContext } from './core/context'
import { isProd, performance, log, isPlainObject } from './core/util'
import PropTypes from 'prop-types'
import Proxy from './proxy'
import withVerifyContext from './core/withVerifyContext'
import withFormContext from './core/withFormContext'

// patern：a[0][1][2]
// limit the length of array, max: 999
const keyChainReg = /^(\w+)((\[[0-9]{1,3}\])+)$/g

// Why class Component?
// In order to use React.createRef
class Form extends Component {
  constructor () {
    super()
    this.state = {
      formDataContextValue: {
        subscibeReport: this.subscibeReport.bind(this),
        // callback and common data of FormDataContext
        report: this.collectFormData.bind(this),
        verify: this.verifyHandler.bind(this),
        cancelWatcher: this.cancelWatcher.bind(this)
      },
      verifyContextValue: {}
    }
  }

  // cancel watcher
  // form member unMount
  cancelWatcher = (bn) => {
    this.itemMap.delete(bn)
    this.verifyBnWithOrder = this.verifyBnWithOrder.filter((v) => v.key !== bn)
    this.setState((prevState) => ({
      verifyContextValue: {
        ...prevState.verifyContextValue || {},
        [bn]: {}
      }
    }))
  }

  // subscibe report event
  // return subscibe result
  subscibeReport = (bn, vm) => {
    if (this.itemMap.has(bn)) {
      !isProd && log.warn(`Encountered two form member with the same \`bn\`, \`bn\`: "${bn}" should be unique so that form collect their value correctly.`)
      return false
    }
    this.itemMap.set(bn, vm)
    if (vm.verify) this.verifyBnWithOrder.push({ key: bn, vm })
    return true
  }

  // form member map
  itemMap = new Map()

  // save the order of form member
  verifyBnWithOrder = []

  // data source
  formData = {}

  // return verifyInfo
  getVerifyInfo = () => {
    const { verifyContextValue } = this.state
    const verifyResList = []
    this.verifyBnWithOrder.forEach((verifyItem) => {
      if (Reflect.has(verifyContextValue, verifyItem.key)) {
        const verifyInfo = verifyContextValue[verifyItem.key]
        if (verifyInfo !== null) verifyResList.push(verifyInfo)
      } else {
        const verifyInfo = verifyItem.vm.verifyHandler(verifyItem.vm.state.val)
        if (verifyInfo !== true) verifyResList.push(verifyInfo)
      }
    })
    return verifyResList
  }

  // reset all form members
  reset = () => {
    this.formData = {}
    for (const vm of this.itemMap.values()) {
      vm && vm.reset && vm.reset()
    }
  }

  // return form data
  getFormData = () => {
    // reset formData
    this.formData = {}
    !isProd && performance.start('collect formData')

    for (const vm of this.itemMap.values()) {
      vm && vm.subscibeHandler && vm.subscibeHandler()
    }
    !isProd && performance.end('collect formData')
    return this.formData
  }

  // collect verify info
  verifyHandler = (bn, verifyInfo) => {
    // true means pass
    this.setState((prevState) => ({
      verifyContextValue: {
        ...prevState.verifyContextValue || {},
        [bn]: verifyInfo === true ? null : verifyInfo
      }
    }))
  }

  // collect form data
  // suppot key chain
  // like a.b.c or a[0].b.c or a.b[1][0][2].c
  collectFormData = (key, val) => {
    const keyChain = key.split('.')
    const len = keyChain.length
    let d = this.formData
    keyChain.forEach((k, i) => {
      const keyParseList = keyChainReg.exec(k)
      if (!keyParseList) {
        // handle the patern of json
        if (i === len - 1) {
          d[k] = val
          return
        }
        if (!d[k]) {
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

  render () {
    const { formDataContextValue, verifyContextValue } = this.state
    const { children } = this.props

    return (
      <FormDataContext.Provider value={formDataContextValue}>
        <FormVerifyContext.Provider value={verifyContextValue}>
          <React.Fragment>
            {children}
          </React.Fragment>
        </FormVerifyContext.Provider>
      </FormDataContext.Provider>
    )
  }
}

Form.propTypes = {
  children: PropTypes.any
}

Form.FormDataContext = FormDataContext

Form.FormVerifyContext = FormVerifyContext

Form.Proxy = Proxy

Form.withFormContext = withFormContext

Form.withVerifyContext = withVerifyContext

export default Form
