import React, { Component } from 'react'
import Highcharts from 'highcharts'
import ReactHighcharts from 'react-highcharts'

import '../../../scss/components/history/todaySpline.scss'

const TodaySpline = ({data}) => {
  const config = {
    chart: {
      type: 'spline'
    },
    data: {
      csv: data
    },
    title: {
      text: 'Average Price, 24 Hours',
    },
    yAxis: {
      title: {
        text: 'USD'
      }
    }
  }

  return (
    <div className="todaySpline">
      <ReactHighcharts config={config}/>
    </div>
  )
}


export default TodaySpline
