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
import collectFormData from './core/collectFormData'

// Why class Component?
// In order to use React.createRef
class Form extends Component {
  constructor () {
    super()
    this.state = {
      formDataContextValue: {
        subscibeReport: this.subscibeReport.bind(this),
        // callback and common data of FormDataContext
        report: (key, val) => collectFormData(this.formData, key, val),
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
    this.verifyHandler(bn, true)
  }

  // subscibe report event
  // return subscibe result
  subscibeReport = (bn, vm) => {
    if (this.itemMap.has(bn)) {
      !isProd && log.warn(`Encountered two form member with the same \`bn\`, \`bn\`: "${bn}" should be unique so that form collect their value correctly.`, 'https://github.com/monajs/react-form/issues/7')
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
      const verifyInfo = Reflect.has(verifyContextValue, verifyItem.key)
        ? verifyContextValue[verifyItem.key]
        : verifyItem.vm.verifyHandler(verifyItem.vm.state.val)
      if (isPlainObject(verifyInfo)) verifyResList.push(verifyInfo)
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
    this.setState((prevState) => {
      const { verifyContextValue = {} } = prevState
      if (verifyInfo === true) {
        delete verifyContextValue[bn]
      } else {
        verifyContextValue[bn] = verifyInfo
      }
      return {
        verifyContextValue: { ...verifyContextValue }
      }
    })
  }

  render () {
    const { formDataContextValue, verifyContextValue } = this.state
    const { children } = this.props

    return (
      <FormDataContext.Provider value={formDataContextValue}>
        <FormVerifyContext.Provider value={verifyContextValue}>
          {children}
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
