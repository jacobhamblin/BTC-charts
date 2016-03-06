import React, { Component } from 'react'
import Highcharts from 'highcharts'
import ReactHighcharts from 'react-highcharts'
import { getRequest, csvArrToMSAndValue } from '../../utils'
import '../../../scss/components/history/todayHist.scss'


class TodayHist extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null
    }
  }

  componentDidMount() {
    this.loadData()
  }

  loadData() {
    const component = this
    getRequest(
      'https://api.bitcoinaverage.com/history/USD/per_minute_24h_sliding_window.csv',
      (csv) => component.processData(csv)
    )
  }

  processData(csv) {
    let arr = csv.split('\r\n')
    let split = arr.map(row => row.split(','))
    const data = csvArrToMSAndValue(split)

    this.setState({data})
  }

  render() {
    const { colors } = this.props
    const config = {
      chart: {
        zoomType: 'x'
      },
      title: {
        text: 'Past 24 Hours'
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
        }
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
              [1, Highcharts.Color(colors[3]).setOpacity(0).get('rgba')]
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
        data: this.state.data
      }]
    }
    const chart = (this.state.data ? <ReactHighcharts config={config}/> : null)

    return (
      <div className="todayHist">
        {chart}
      </div>
    )
  }
}


export default TodayHist
