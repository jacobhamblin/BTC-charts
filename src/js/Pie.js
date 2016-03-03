import React, { Component } from 'react'
import Highcharts from 'highcharts'
import ReactHighcharts from 'react-highcharts'

import '../scss/pie.scss'

const Pie = ({data}) => {
  let aggregate = []
  for (let key in data) {
    if (data.hasOwnProperty(key) && key !== "timestamp") {
      let obj = {}
      obj['name'] = data[key]['display_name']
      obj['y'] = data[key]['volume_percent']
      aggregate.push(obj)
    }
  }

  let config =
    {
      chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
      },
      title: {
          text: 'Current Market Share of major exchanges'
      },
      tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
          pie: {
              allowPointSelect: true,
              cursor: 'pointer',
          }
      },
      series: [{
          name: 'Market Volume',
          colorByPoint: true,
          data: aggregate
      }]
    };

  return (
    <ReactHighcharts config={config}/>
  )

}

export default Pie
