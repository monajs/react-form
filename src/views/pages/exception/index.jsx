import React from 'react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import { Button } from 'antd'
import './index.less'

const exceptionConfigs = {
  '403': {
    img: require('./assets/403.svg'),
    code: '403',
    text: '抱歉，你无权访问该页面'
  },
  '404': {
    img: require('./assets/404.svg'),
    code: '404',
    text: '抱歉，你访问的页面不存在'
  },
  '500': {
    img: require('./assets/500.svg'),
    code: '500',
    text: '抱歉，服务器出错了'
  }
}

const Exception = (props) => {
  const { type = '404' } = props
  const config = exceptionConfigs[type] || {}
  const { img = '', code = '', text = '' } = config

  const backHome = () => {
    props.history.push('/home')
  }

  return (
    <div className='exception flex-center'>
      <img className='img' src={img} alt='' />
      <section>
        <h1 className='code'>{code}</h1>
        <div className='text'>{text}</div>
        <Button onClick={backHome} type='primary'>返回首页</Button>
      </section>
    </div>
  )
}

Exception.propTypes = {
  type: PropTypes.string,
  history: PropTypes.object
}

export default withRouter(Exception)
