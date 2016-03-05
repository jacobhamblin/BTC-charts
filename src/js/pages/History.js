import React, { Component } from 'react'
import getReq from '../util/getReq.js'
import TodayHist from '../components/history/TodayHist.js'
import AllTimeSpline from '../components/history/AllTimeSpline.js'

class History extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todayData: null,
      allTimeData: null
    }
  }

  componentDidMount() {
    this.loadData()
  }

  processAllTime(csv) {
    let arr = csv.split('\r\n')
    const data = arr.map(row => row.split(',').splice(0, 2))

    this.setState({allTimeData: data})
  }

  processToday(csv) {
    let arr = csv.split('\r\n')
    const data = arr.map(row => row.split(','))

    this.setState({todayData: data})
  }

  loadData() {
    const component = this
    getReq(
      'https://api.bitcoinaverage.com/history/USD/per_minute_24h_sliding_window.csv',
      (csv) => component.processToday(csv)
    )
    getReq(
      'https://api.bitcoinaverage.com/history/USD/per_day_all_time_history.csv',
      (csv) => component.processAllTime(csv)
    )
  }

  render() {
    const todayHist = (this.state.todayData ? <TodayHist data={this.state.todayData}/> : null)
    const allTimeSpline = (this.state.allTimeData ? <AllTimeSpline data={this.state.allTimeData}/> : null)

    return (
      <div>
        History
        {todayHist}
        {allTimeSpline}
      </div>

    )
  }
}

export default History
