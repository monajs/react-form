/**
 * Empowering form UI
 * author: yangxi
 */

import React from 'react'
import PropTypes from 'prop-types'
import { FormVerifyContext } from './context'
import { isFunction } from './util'

function withVerifyContext (WrappedComponent) {

  const Component = (props) => {
    const { bn = '', ...other } = props

    if (!bn) {
      return (<WrappedComponent {...other} />)
    }

    const getVerifyMsg = (verifyInfo = {}) => {
      const verify = verifyInfo[bn] || {}
      const { verifyMsg } = verify
      if (!verifyMsg) return
      if (typeof verifyMsg === 'string' || typeof verifyMsg === 'number') return '' + verifyMsg
      if (isFunction(verifyMsg)) return '' + verifyMsg(verify)
    }

    return (
      <FormVerifyContext.Consumer>
        {(verifyInfo) => {
          if (!verifyInfo) {
            return (<WrappedComponent {...other} />)
          }
          return (
            <WrappedComponent verifyMsg={getVerifyMsg(verifyInfo)} {...other} />
          )
        }}
      </FormVerifyContext.Consumer>
    )
  }

  Component.propTypes = {
    bn: PropTypes.string
  }

  return Component
}

export default withVerifyContext
