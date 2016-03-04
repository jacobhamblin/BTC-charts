import React, { Component } from 'react'

import Header from './Header.js'
import Nav from './Nav.js'
import Pie from './Pie.js'
import Line from './Line.js'
import Timestamp from './Timestamp.js'
import DataShow from './DataShow.js'
import '../scss/app.scss'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      exchanges: {},
      selected: null,
      timestamp: null
    }
    this.changeSelected = this.changeSelected.bind(this)
    this.colors = [
      '#B4F0A8', '#A8F0B4', '#A8F0CC', '#A8F0E4', '#A8E4F0',
      '#A8CCF0', '#A8C0F0', '#A8A8F0', '#C0A8F0', '#D8A8F0',
      '#F0A8F0', '#F0A8D8', '#F0A8C0', '#F0A8A8'
    ]
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

  dataShow() {
    let selectedExchangeData, dataShow, color, i = 0
    for (let key in this.state.exchanges) {
      if (this.state.exchanges[key]['display_name'] === this.state.selected) {
        selectedExchangeData = this.state.exchanges[key]
        color = this.colors[i]
        dataShow = <DataShow
          data={selectedExchangeData}
          color={color} />
      }
      i++
    }

    return dataShow
  }

  render() {
    let dataShow = this.dataShow()

    return (
      <div>
        <Header>
          <h2>graphet</h2>
          <Nav
            exchanges={this.state.exchanges}
            changeSelected={this.changeSelected}
            selected={this.state.selected}
          />
          <Timestamp timestamp={this.state.timestamp}/>
        </Header>
        <section>
          <Pie
            changeSelected={this.changeSelected}
            data={this.state.exchanges}
            selected={this.state.selected}
            colors={this.colors}
          />
          {dataShow}
        </section>
        <Line
          changeSelected={this.changeSelected}
          data={this.state.exchanges}
          selected={this.state.selected}
          colors={this.colors}
        />
        {this.props.children}
      </div>
    )
  }
}

export default App
