import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import Header from './Header.js'
import Nav from './Nav.js'
import Pie from './Pie.js'
import Timestamp from './Timestamp.js'
// import DataShow from './DataShow.js'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      exchanges: {},
      selected: null,
      timestamp: null
    }
    this.changeSelected = this.changeSelected.bind(this)
  }

  componentDidMount() {
    this.loadData()
  }

  changeSelected(string) {
    this.setState({
      selected: string
    })
    console.log(this.state.timestamp)
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
    let timestamp = exchanges['timestamp']
    let negligibleExchanges = [
      'bitkonan', 'bitex', 'hitbtc', 'rocktrading', 'cointrader', 'bitquick',
      'independentreserve', 'loyalbit', 'quadrigacx', 'campbx', 'timestamp'
    ]
    negligibleExchanges.map( exch => delete exchanges[exch] )

    this.setState({
      exchanges: exchanges,
      timestamp: timestamp
    })
  }

  render() {
    // let selectedExchangeData, DataShow
    // for (let key in this.state.exchanges) {
    //   if (this.state.exchanges[key]['display_name'] === this.state.selected) {
    //     selectedExchangeData = this.state.exchanges[key]
    //     DataShow = <DataShow data={selectedExchangeData}/>
    //   }
    // }

    return (
      <div>
        <Header>
          <h2>graphet</h2>
          <Nav
            exchanges={this.state.exchanges}
            changeSelected={this.changeSelected}
            selected={this.state.selected}
            colors={this.colors}
          />
          <Timestamp timestamp={this.state.timestamp}/>
        </Header>

        <Pie
          changeSelected={this.changeSelected}
          data={this.state.exchanges}
          selected={this.state.selected}
        />

        {this.props.children}
      </div>
    )
  }
}

ReactDOM.render(
  <App/>,
  document.querySelector('#root')
);
