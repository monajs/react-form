/**
 * Empowering components
 * author: yangxi
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormDataContext } from './context'
import { isEmpty, isFunction, isRegExp } from './util'

// default Type to get value
const DefaultWayToGetValue = (val) => val

let id = 0

/**
 * Form item component wrap
 * with form context
 * @param WrappedComponent
 * @param getValue
 * @param config
 * @returns {function(*)}
 */
const withFormContext = (WrappedComponent, getValue = DefaultWayToGetValue, config = {}) => {

  class ResComponent extends Component {
    constructor (props) {
      super(props)
      const { defaultValue, value, bn, verify, verifyMsg } = props

      this.id = id++
      this.bn = bn || config.bn
      this.verify = verify || config.verify
      this.verifyMsg = verifyMsg || config.verifyMsg
      this.state = {
        val: value || defaultValue
      }
    }

    compRef = React.createRef()
    reportHandler = null
    verifyReport = null
    cancelWatcher = null
    verifyPass = true

    componentWillUnmount () {
      this.cancelWatcher && this.cancelWatcher(this.bn)
    }

    // subscibe report handler
    subscibeHandler = () => {
      if (!this.reportHandler || !this.bn) return
      const { val } = this.state

      this.reportHandler(this.bn, val)
    }

    reset = () => {
      const { value, defaultValue } = this.props

      // reset verify info
      if (!this.verifyPass) {
        this.verifyPass = true
        this.verifyReport(true)
      }

      // reset value
      this.setState({
        val: value || defaultValue
      })
    }

    verifyHandler = (val) => {
      if (!this.verify || !this.bn) return

      const baseInfo = {
        id: this.id,
        item: this.compRef,
        val,
        verifyMsg: this.verifyMsg
      }

      const c = () => {
        this.verifyPass = false
      }

      if (this.verify === true && isEmpty(val)) {
        c()
        const verifyInfo = {
          ...baseInfo,
          isEmptyVerify: true
        }
        this.verifyReport(verifyInfo)
        return verifyInfo

      }

      if (isRegExp(this.verify) && !this.verify.test(val)) {
        c()
        const verifyInfo = {
          ...baseInfo,
          isRegVerify: true
        }
        this.verifyReport(verifyInfo)
        return verifyInfo
      }

      if (isFunction(this.verify) && !this.verify(val)) {
        c()
        const verifyInfo = {
          ...baseInfo,
          isFunctionVerify: true
        }
        this.verifyReport(verifyInfo)
        return verifyInfo
      }

      if (!this.verifyPass) {
        this.verifyPass = true
        this.verifyReport(true)
      }
      return true
    }

    changeHandler = (e) => {
      const { onChange } = this.props
      const compVal = getValue(e)
      this.setState(() => ({
        val: compVal
      }))
      this.verifyHandler(compVal)
      onChange && onChange(e, compVal)
    }

    render () {

      /* eslint-disable no-unused-vars */
      const { bn, defaultValue, value, onChange, verify, verifyMsg, ...other } = this.props
      /* eslint-disable no-unused-vars */

      const { val } = this.state
      if (!this.bn) return (
        // if prop `bn` missed, return the origin element
        <WrappedComponent {...this.props} />
      )

      return (
        <FormDataContext.Consumer>
          {({ report, verify, subscibeReport, cancelWatcher }) => {
            this.reportHandler = report
            this.cancelWatcher = cancelWatcher
            this.verifyReport = (verifyInfo) => verify(this.bn, verifyInfo)
            subscibeReport(this.bn, this)
            return (
              <WrappedComponent ref={this.compRef} value={val} onChange={this.changeHandler} {...other} />
            )
          }}
        </FormDataContext.Consumer>
      )
    }
  }

  ResComponent.propTypes = {
    value: PropTypes.any,
    defaultValue: PropTypes.any,
    bn: PropTypes.string,
    onChange: PropTypes.func,
    verify: PropTypes.any,
    verifyMsg: PropTypes.any
  }

  return ResComponent
}

export default withFormContext
