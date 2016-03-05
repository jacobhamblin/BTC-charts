import React, { Component } from 'react'
import Highcharts from 'highcharts'
import ReactHighcharts from 'react-highcharts'

import '../../../scss/components/history/allTimeHist.scss'

const AllTimeHist = ({data, colors}) => {
  window.data = data;

  let config = {
    chart: {
      zoomType: 'x'
    },
    title: {
      text: 'BTC Price since July, 2010'
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
      data: data
    }]
  }

  return (
    <div className="allTimeHist">
      <ReactHighcharts config={config}/>
    </div>
  )
}

export default AllTimeHist
