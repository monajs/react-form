import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import RouteMap from './routeMap'

const RouterEntry = () => {
  return (
    <Router basename=''>
      <RouteMap />
    </Router>
  )
}

export default hot(module)(RouterEntry)
