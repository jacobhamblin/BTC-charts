import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { SiteNav } from './components'

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
