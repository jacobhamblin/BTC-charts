import React, { Component } from 'react'
import Highcharts from 'highcharts'
import ReactHighcharts from 'react-highcharts'

import '../../../scss/components/history/allTimeSpline.scss'

const AllTimeHist = ({data}) => {
  data = data.slice(1, data.length)

  return (
    <div className="allTimeHist">
    </div>
  )
}

export default AllTimeHist
