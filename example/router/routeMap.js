import React from 'react'
import { Route, Switch } from 'react-router-dom'
import routeConfig from './config'

const { routes = [] } = routeConfig

const RouteMap = () => {
  return (
    <Switch>
      <For each='route' index='index' of={routes}>
        <Route key={`route_${index}`} {...route} />
      </For>
    </Switch>
  )
}

export default RouteMap
