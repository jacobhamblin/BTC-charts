import React, { Component } from 'react'
import { TodayHist, AllTimeHist } from '../components/history'
import { getRequest } from '../utils'

class History extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todayData: null,
      allTimeData: null
    }
    this.colors = [
      '#B4F0A8', '#A8F0B4', '#A8F0CC', '#A8F0E4', '#A8E4F0',
      '#A8CCF0', '#A8C0F0', '#A8A8F0', '#C0A8F0', '#D8A8F0',
      '#F0A8F0', '#F0A8D8', '#F0A8C0', '#F0A8A8'
    ]
  }

  componentDidMount() {
    this.loadData()
  }

  csvArrToMSAndValue(arr) {
    let data = arr.slice(1, arr.length - 1)
    let aggregate = []
    data.map(dateAndValue => {
      let dateAndTime = dateAndValue[0].split(' ')
      let dateArr = dateAndTime[0].split('-').map(d => parseInt(d))
      let hms = dateAndTime[1].split(':')
      let row = []
      row.push(Date.UTC(
        dateArr[0], dateArr[1] - 1, dateArr[2],
        hms[0], hms[1], hms[2]
      ))
      row.push(parseFloat(dateAndValue[1]))
      aggregate.push(row)
    })

    return aggregate
  }

  processAllTime(csv) {
    let arr = csv.split('\n')
    const split = arr.map(row => {
      let noCommas = row.split(',')
      noCommas.splice(1, 2)
      noCommas.splice(2,1)
      return noCommas
    })

    const data = this.csvArrToMSAndValue(split)

    window.allTimeData = data
    this.setState({allTimeData: data})
  }

  processToday(csv) {
    let arr = csv.split('\r\n')
    let split = arr.map(row => row.split(','))

    const data = this.csvArrToMSAndValue(split)

    this.setState({todayData: data})
  }

  loadData() {
    const component = this
    getRequest(
      'https://api.bitcoinaverage.com/history/USD/per_minute_24h_sliding_window.csv',
      (csv) => component.processToday(csv)
    )
    getRequest(
      'https://api.bitcoinaverage.com/history/USD/per_day_all_time_history.csv',
      (csv) => component.processAllTime(csv)
    )
  }

  render() {
    const todayHist = (
      this.state.todayData ?
      <TodayHist
      data={this.state.todayData}
      colors={this.colors}/> :
      null
    )
    const allTimeHist = (
      this.state.allTimeData ?
      <AllTimeHist
      data={this.state.allTimeData}
      colors={this.colors}/> :
      null
    )

    return (
      <div>
        History
        {todayHist}
        {allTimeHist}
      </div>

    )
  }
}

export default History
