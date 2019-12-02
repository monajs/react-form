/**
 * form proxy
 * author: yangxi
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withFormContext from './core/withFormContext'

class Proxy extends Component {
  constructor (props) {
    super(props)
    const { bn, verify, verifyMsg, getValue, to } = this.props
    // avoid withFormContext API exec many times
    this.C = withFormContext(to, getValue, {
      bn,
      verify,
      verifyMsg
    })
  }

  render () {
    /* eslint-disable no-unused-vars */
    const { bn, verify, verifyMsg, children, getValue, to, ...other } = this.props
    /* eslint-disable no-unused-vars */
    const C = this.C

    return (
      <C {...other}>
        {children}
      </C>
    )
  }
}

Proxy.propTypes = {
  to: PropTypes.elementType.isRequired,
  getValue: PropTypes.func,
  bn: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  verify: PropTypes.any,
  verifyMsg: PropTypes.any,
  children: PropTypes.node
}

export default Proxy
