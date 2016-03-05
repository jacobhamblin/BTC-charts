import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link, browserHistory, useRouterHistory, IndexRoute } from 'react-router'
import { createHashHistory } from 'history'
import { Home, Exchanges, History } from './pages'
import App from './App.js'
import NoMatch from './NoMatch.js'

const history = useRouterHistory(createHashHistory)({ queryKey: false })

ReactDOM.render(
  (
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="exchanges" component={Exchanges}/>
        <Route path="history" component={History}/>
      </Route>
      <Route path="*" component={NoMatch}/>
    </Router>
  ),
  document.querySelector('#root')
);
