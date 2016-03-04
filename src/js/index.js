import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'
import SiteNav from './components/SiteNav.js'
import Home from './pages/Home.js'
import Exchanges from './pages/Exchanges.js'
import History from './pages/History.js'
import NoMatch from './NoMatch.js'

import '../scss/index.scss'

class App extends Component {
  render() {
    return (
      <div className="app">
        <header>
          <SiteNav/>
        </header>
        {this.props.children}
      </div>
    )
  }
}

export default App

ReactDOM.render(
  (
    <Router history={browserHistory}>
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
