/**
 * Empowering components
 * author: yangxi
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormDataContext } from './context'
import { isEmpty, isFunction, isRegExp, isProd, log } from './util'

// default way to get value
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
  // when WrappedComponent is already withFormContext
  if (WrappedComponent._isWithFormContext) {
    !isProd && log.warn(`If you are using the \`Proxy\` components, please check if the prop \`to\`（${WrappedComponent._cname}） is already powered with \`withFormContext\`?`, 'https://github.com/monajs/react-form/issues/2')
    const C = (props) => {
      return (
        <WrappedComponent {...props} {...config} />
      )
    }
    return C
  }

  class FormItemComponent extends Component {
    constructor (props) {
      super(props)
      const { defaultValue, value, bn, verify, verifyMsg } = props

      this.inited = false
      this.id = id++
      this.bn = bn || config.bn
      this.verify = verify || config.verify
      this.verifyMsg = verifyMsg || config.verifyMsg

      this.devWarning()
      this.state = {
        val: value || defaultValue
      }
    }

    compRef = React.createRef()
    reportHandler = null
    verifyReport = null
    cancelWatcher = null
    subscibeStatus = true
    verifyPass = true

    componentWillUnmount () {
      // cancel subscibe when already subscibed
      this.subscibeStatus && this.cancelWatcher && this.cancelWatcher(this.bn)
    }

    devWarning = () => {
      if (isProd) return

      const CompInfo = `{Component: \`${WrappedComponent.name}\`, id: ${this.id}}`
      if (!this.bn) {
        log.warn(`The prop \`bn\` is required with form member (${CompInfo}), but its value is \`undefined\`.`, 'https://github.com/monajs/react-form/issues/6')
        if (this.verify || this.verifyMsg) {
          log.warn(`The prop \`bn\` is missed with Component（${CompInfo}）.If you want to use original Component, then the prop \`verify\` and \`verifyMsg\` is needless.`, 'https://github.com/monajs/react-form/issues/3')
        }
        return
      }
      if (this.verify && !this.verifyMsg) {
        log.warn('The prop `verifyMsg` is required with form member when `verify` is accessed, but its value is `undefined`.', 'https://github.com/monajs/react-form/issues/4')
        return
      }
      if (!this.verify && this.verifyMsg) {
        log.warn('The prop `verifyMsg` is unnecessary with form member when `verify` is not accessed.', 'https://github.com/monajs/react-form/issues/5')
      }
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
        val,
        vm: this,
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
      if (!this.bn) {
        return (
          // if prop `bn` missed, return the origin element
          <WrappedComponent {...this.props} />
        )
      }

      return (
        <FormDataContext.Consumer>
          {(formMessage) => {
            if (!formMessage) {
              !isProd && log.warn('The Component `Form` is necessary as the container, please check if all the form member is wrapped by the `Form`?', 'https://github.com/monajs/react-form/issues/1')
              return <WrappedComponent {...this.props} />
            }
            formMessage = formMessage || {}
            const { report, verify, subscibeReport, cancelWatcher } = formMessage
            if (!this.inited) {
              this.reportHandler = report
              this.cancelWatcher = cancelWatcher
              this.verifyReport = (verifyInfo) => verify(this.bn, verifyInfo)
              this.subscibeStatus = subscibeReport(this.bn, this)
              this.inited = true
            }
            return (
              <WrappedComponent ref={this.compRef} value={val} onChange={this.changeHandler} {...other} />
            )
          }}
        </FormDataContext.Consumer>
      )
    }
  }

  FormItemComponent.propTypes = {
    value: PropTypes.any,
    defaultValue: PropTypes.any,
    bn: PropTypes.string,
    onChange: PropTypes.func,
    verify: PropTypes.any,
    verifyMsg: PropTypes.any
  }

  FormItemComponent._cname = WrappedComponent.name
  FormItemComponent._isWithFormContext = true

  return FormItemComponent
}

export default withFormContext
