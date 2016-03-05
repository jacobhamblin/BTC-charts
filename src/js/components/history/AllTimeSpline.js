import React, { Component } from 'react'
import Highcharts from 'highcharts'
import ReactHighcharts from 'react-highcharts'

import '../../../scss/components/history/allTimeSpline.scss'

const AllTimeSpline = ({data}) => {
  data = data.slice(1, data.length)

  return (
    <div className="allTimeSpline">
    </div>
  )
}

export default AllTimeSpline
