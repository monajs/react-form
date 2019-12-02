/**
 * default form wrap
 * author: yangxi
 */

import React from 'react'
import PropTypes from 'prop-types'
import Form from '@monajs/react-form'
import { Row, Col } from 'antd'
import './index.less'

const DefaultFormWrap = (props) => {
  const {
    children = null,
    verifyMsg = '',
    required = false,
    label = '',
    desc = '',
    error = '',
    className = '',
    span = 6
  } = props

  return (
    <Row className={['page-form-item', className]}>
      <Col className={['label', { 'required': required }]} span={span}>{label}</Col>
      <Col className='content' span={24 - span}>
        {children}
        <If condition={error || verifyMsg}>
          <div className='error'>{error || verifyMsg}</div>
        </If>
        <If condition={!error && !verifyMsg && desc}>
          <div className='desc' dangerouslySetInnerHTML={{ __html: desc }} />
        </If>
      </Col>
    </Row>
  )

}

DefaultFormWrap.propTypes = {
  required: PropTypes.bool,
  span: PropTypes.number,
  label: PropTypes.string,
  desc: PropTypes.string,
  verifyMsg: PropTypes.string,
  error: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node
}

export default Form.withVerifyContext(DefaultFormWrap)
