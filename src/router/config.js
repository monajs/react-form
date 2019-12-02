import React from 'react'
import { Redirect } from 'react-router-dom'
import Exception from '@/views/pages/exception/index'
import Home from '@/views/pages/home'

const Exception404 = () => <Exception type='404' />

const NoMatch404 = () => <Redirect to='/exception/404' />

export default {
  routes: [
    {
      path: '/',
      exact: true,
      component: Home,
      meta: {
        subTitle: '首页',
        title: '首页'
      }
    },
    {
      path: '/home',
      exact: true,
      component: Home,
      meta: {
        subTitle: '首页',
        title: '首页'
      }
    },
    {
      path: '/exception/404',
      exact: true,
      component: Exception404
    },
    {
      path: '/*',
      render: NoMatch404
    }
  ]
}
