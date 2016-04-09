import React, { Component } from 'react'
import Highcharts from 'highcharts'
import ReactHighcharts from 'react-highcharts'
import { getRequest, csvArrToMSAndValue } from '../../utils'
import { LoadingPie } from '../'
import '../../../scss/components/history/timeline.scss'

class Timeline extends Component {
  constructor(props) {
    super(props)
    this.state = {
      today: null,
      allTime: null,
      selected: 'today'
    }
    this.switchSelected = this.switchSelected.bind(this)
  }

  componentDidMount() {
    this.loadData()
  }

  loadData() {
    getRequest(
      'https://api.bitcoinaverage.com/history/USD/per_minute_24h_sliding_window.csv',
      (csv) => this.processToday(csv)
    )
    getRequest(
      'https://api.bitcoinaverage.com/history/USD/per_day_all_time_history.csv',
      (csv) => this.processAllTime(csv)
    )
  }

  processToday(csv) {
    let arr = csv.split('\r\n')
    let split = arr.map(row => row.split(','))
    const data = csvArrToMSAndValue(split)

    this.setState({today: data})
  }

  processAllTime(csv) {
    let arr = csv.split('\n')
    const split = arr.map(row => {
      let noCommas = row.split(',')
      noCommas.splice(1, 2)
      noCommas.splice(2, 1)
      return noCommas
    })
    const data = csvArrToMSAndValue(split)

    this.setState({allTime: data})
  }

  render() {
    const { selected, allTime, today } = this.state
    const { colors } = this.props
    let title = (selected === 'today' ? 'Past 24 Hours' : 'Since July, 2010')
    const data = this.state[selected]
    const notSelected = (selected === 'today' ? 'all time' : 'today')
    let color = (selected === 'today' ? 3 : 8)
    let min = (selected === 'today' ? null : 0)
    const config = {
      chart: {
        zoomType: 'x'
      },
      title: {
        text: title
      },
      xAxis: {
        type: 'datetime',
        title: {
          text: 'Time'
        }
      },
      yAxis: {
        labels: {
          format: '$ {value}'
        },
        title: {
          text: 'Price'
        },
        min
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        area: {
          fillColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
            },
            stops: [
              [0, colors[3]],
              [1, Highcharts.Color(colors[color]).setOpacity(0).get('rgba')]
            ]
          },
          marker: {
            radius: 2
          },
          lineWidth: 1,
          states: {
            hover: {
              lineWidth: 1
            }
          },
          threshold: null
        }
      },

      series: [{
        type: 'area',
        name: 'USD to BTC',
        data
      }]
    }
    const chart = (data ? <ReactHighcharts config={config}/> : <LoadingPie/>)

    return (
      <div className="timeline">
        <button onClick={this.switchSelected} style={{borderBottom: '4px solid ' + colors[color]}}>
          {notSelected}
        </button>
        {chart}
      </div>
    )
  }

  switchSelected() {
    const { selected } = this.state
    const newSelection = (selected === 'today' ? 'allTime' : 'today')
    this.setState({
      selected: newSelection
    })
  }
}

export default Timeline
