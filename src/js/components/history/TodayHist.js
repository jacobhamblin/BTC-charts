import React, { Component } from 'react'
import Highcharts from 'highcharts'
import ReactHighcharts from 'react-highcharts'
import '../../../scss/components/history/todayHist.scss'


const TodayHist = ({data}) => {
  data = data.slice(1, data.length)

  window.data = data

  const config = {
    chart: {
      zoomType: 'x'
    },
    title: {
      text: 'BTC Price in the last 24 Hours'
    },
    xAxis: {
      type: 'datetime'
    },
    yAxis: {
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
            [0, Highcharts.getOptions().colors[0]],
            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
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
      name: 'USD to EUR',
      data: data
    }]
  }



  return (
    <div className="todayHist">
      <ReactHighcharts config={config}/>
    </div>
  )
}


export default TodayHist
