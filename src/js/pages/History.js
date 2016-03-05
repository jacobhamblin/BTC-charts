import React, { Component } from 'react'
import getReq from '../util/getReq.js'
import TodaySpline from '../components/history/TodaySpline.js'
import AllTimeSpline from '../components/history/AllTimeSpline.js'

class History extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todayCSV: null,
      allTimeCSV: null
    }
  }

  componentDidMount() {
    this.loadData()
  }

  loadData() {
    const component = this

    getReq(
      'https://api.bitcoinaverage.com/history/USD/per_minute_24h_sliding_window.csv',
      (csv) => component.setState({todayCSV: csv})
    )
    getReq(
      'https://api.bitcoinaverage.com/history/USD/per_day_all_time_history.csv',
      (csv) => component.setState({allTimeCSV: csv})
    )
  }

  render() {

    return (
      <div>
        History
        <TodaySpline data={this.state.todayCSV}/>
        <AllTimeSpline data={this.state.allTimeCSV}/>
      </div>

    )
  }
}

export default History
