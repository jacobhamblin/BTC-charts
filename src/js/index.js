import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import Header from './Header.js'
import Nav from './Nav.js'
import Pie from './Pie.js'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      exchanges: {},
      selected: null
    }
  }

  componentDidMount() {
    this.loadData()
  }

  loadData() {
    const component = this
    const request = new XMLHttpRequest()
    request.open('GET', 'https://api.bitcoinaverage.com/exchanges/USD', true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        window.exch = JSON.parse(request.responseText)
        let exchanges = JSON.parse(request.responseText)

        component.processData(exchanges)

      } else {
        console.log('We reached our target server, but it returned an error')
      }
    };

    request.onerror = function() {
      console.log('There was a connection error of some sort')
    };

    request.send();
  }

  processData(exchanges) {
    delete exchanges.bitkonan
    delete exchanges.bitex
    delete exchanges.hitbtc
    delete exchanges.rocktrading
    delete exchanges.cointrader
    delete exchanges.bitquick
    delete exchanges.independentreserve
    delete exchanges.loyalbit
    delete exchanges.quadrigacx

    this.setState({
      exchanges: exchanges
    })
    console.log(exchanges)
  }

  render() {
    return (
      <div>
        <Header>
          <h2>graphet</h2>
          <Nav exchanges={this.state.exchanges}/>
        </Header>

        <Pie data={this.state.exchanges}/>

        {this.props.children}
      </div>
    )
  }
}

ReactDOM.render(
  <App>Hello, World!</App>,
  document.querySelector('#root')
);
