import React, { Component } from 'react'
import { VolumePie, PriceToVolume, DataShow, Nav } from '../components/exchanges'
import { LoadingPie } from '../components'
import { getRequest } from '../utils'
import '../../scss/pages/exchanges.scss'

class Exchanges extends Component {
  constructor(props) {
    super(props)
    this.state = {
      exchanges: [],
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
  }

  loadData() {
    getRequest(
      'https://api.bitcoinaverage.com/exchanges/USD',
      (response) => {
        let exchanges = JSON.parse(response)
        this.processData(exchanges)
      }
    )
  }

  processData(exchanges) {
    let colors = [
      '#B4F0A8', '#A8F0B4', '#A8F0CC', '#A8F0E4', '#A8E4F0',
      '#A8CCF0', '#A8C0F0', '#A8A8F0', '#C0A8F0', '#D8A8F0',
      '#F0A8F0', '#F0A8D8', '#F0A8C0', '#F0A8A8', '#F0C0A8',
      '#F0D8A8', '#F0F0A8'
    ]
    let timestamp = exchanges['timestamp'], exchangesArr = [], i = 0
    delete exchanges['timestamp']
    for (let key in exchanges) {
      if (parseInt(exchanges[key]['volume_percent']) < 2) {
        delete exchanges[key]
      } else {
        exchanges[key]['color'] = colors[i % colors.length]
        exchangesArr.push(exchanges[key])
      }
      i++
    }

    this.setState({
      exchanges: exchangesArr,
      timestamp,
      selected: exchangesArr[0].display_name
    })
  }

  dataShow() {
    const { exchanges, selected, timestamp } = this.state
    let dataShow = <div className="dataShow"><LoadingPie/></div>

    exchanges.map(exch => {
      if (exch.display_name === selected) {
        dataShow = <DataShow data={exch} timestamp={timestamp}/>
      }
    })

    return dataShow
  }

  render() {
    let dataShow = this.dataShow()
    const { exchanges, selected } = this.state
    let volumePie = (
      <div className="volumePie">
        <LoadingPie/>
      </div>
    )
    let priceToVolume = (
      <div className="priceToVolume">
        <LoadingPie/>
      </div>
    )

    if (this.state.exchanges.length > 0) {
      volumePie = (
        <VolumePie
          changeSelected={this.changeSelected}
          data={exchanges}
          selected={selected}
        />
      )
      priceToVolume = (
        <PriceToVolume
          changeSelected={this.changeSelected}
          data={exchanges}
          selected={selected}
        />
      )
    }

    return (
      <div>
        <header>
          <Nav
            exchanges={exchanges}
            changeSelected={this.changeSelected}
            selected={selected}
          />
        </header>
        <section>
          {dataShow}
          {volumePie}
        </section>
        {priceToVolume}
      </div>
    )
  }
}

export default Exchanges
