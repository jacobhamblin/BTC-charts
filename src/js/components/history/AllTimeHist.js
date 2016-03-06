import React, { Component } from 'react'
import Highcharts from 'highcharts'
import ReactHighcharts from 'react-highcharts'
import { getRequest, csvArrToMSAndValue } from '../../utils'


import '../../../scss/components/history/allTimeHist.scss'

class AllTimeHist extends Component {
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
      'https://api.bitcoinaverage.com/history/USD/per_day_all_time_history.csv',
      (csv) => component.processData(csv)
    )
  }

  processData(csv) {
    let arr = csv.split('\n')
    const split = arr.map(row => {
      let noCommas = row.split(',')
      noCommas.splice(1, 2)
      noCommas.splice(2,1)
      return noCommas
    })
    const data = csvArrToMSAndValue(split)

    this.setState({data})
  }

  render() {
    const { colors } = this.props
    let config = {
      chart: {
        zoomType: 'x'
      },
      title: {
        text: 'Since July, 2010'
      },
      xAxis: {
        type: 'datetime',
        title: {
          text: 'Date'
        }
      },
      yAxis: {
        labels: {
          format: '$ {value}'
        },
        title: {
          text: 'Price'
        },
        min: 0
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
              [0, colors[8]],
              [1, Highcharts.Color(colors[8]).setOpacity(0).get('rgba')]
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
      <div className="allTimeHist">
        <ReactHighcharts config={config}/>
      </div>
    )
  }
}

export default AllTimeHist
