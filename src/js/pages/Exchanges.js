import React, { Component } from 'react'
import { VolumePie, PriceToVolume, DataShow, Nav } from '../components/exchanges'
import { getRequest } from '../utils'
import '../../scss/pages/exchanges.scss'

class Exchanges extends Component {
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
  }

  loadData() {
    const component = this

    getRequest(
      'https://api.bitcoinaverage.com/exchanges/USD',
      function(reponse) {
        let exchanges = JSON.parse(reponse)
        component.processData(exchanges)
      }
    )
  }

  processData(exchanges) {
    let timestamp = exchanges['timestamp']
    delete exchanges['timestamp']
    for (let key in exchanges) {
      if (parseInt(exchanges[key]['volume_percent']) < 3) delete exchanges[key]
    }

    this.setState({
      exchanges: exchanges,
      timestamp: timestamp
    })
  }

  dataShow() {
    let selectedExchangeData, color, i = 0, dataShow = <div className="dataShow"></div>
    for (let key in this.state.exchanges) {
      if (this.state.exchanges[key]['display_name'] === this.state.selected) {
        selectedExchangeData = this.state.exchanges[key]
        color = this.colors[i]
        dataShow = <DataShow
          data={selectedExchangeData}
          color={color}
          timestamp={this.state.timestamp}/>
      }
      i++
    }

    return dataShow
  }

  render() {
    let dataShow = this.dataShow()

    return (
      <div>
        <header>
          <Nav
            exchanges={this.state.exchanges}
            changeSelected={this.changeSelected}
            selected={this.state.selected}
          />
        </header>
        <section>
          {dataShow}
          <VolumePie
            changeSelected={this.changeSelected}
            data={this.state.exchanges}
            selected={this.state.selected}
            colors={this.colors}
          />
        </section>
        <PriceToVolume
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

export default Exchanges
