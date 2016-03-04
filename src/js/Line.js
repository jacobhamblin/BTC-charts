import React, { Component } from 'react'
import Highcharts from 'highcharts'
import ReactHighcharts from 'react-highcharts'

import '../scss/line.scss'

const Line = ({data, changeSelected, selected}) => {
  const appChangeSelected = changeSelected
  let aggregate = []
  let exchangeNames = []
  let exchangeVolumes = []
  let exchangePrices = []
  for (let key in data) {
    if (data.hasOwnProperty(key) && key !== "timestamp") {
      let obj = {}
      exchangeNames.push(data[key]['display_name'])
      exchangeVolumes.push(data[key]['volume_btc'])
      exchangePrices.push(data[key]['rates']['last'])
    }
  }

  let config = {
    chart: {
      zoomType: 'xy'
    },
    title: {
      text: 'Current Price and Trade Volume per Exchange'
    },
    xAxis: [{
      categories: exchangeNames,
      crosshair: true
    }],
    yAxis: [{
      labels: {
        format: '${value}',
        style: {
          color: Highcharts.getOptions().colors[1]
        }
      },
      title: {
        text: 'Current Price',
        style: {
          color: Highcharts.getOptions().colors[1]
        }
      }
    }, {
      title: {
        text: 'Volume',
        style: {
          color: Highcharts.getOptions().colors[0]
        }
      },
      labels: {
        format: '{value} BTC',
        style: {
          color: Highcharts.getOptions().colors[0]
        }
      },
      opposite: true
    }],
    tooltip: {
      shared: true
    },
    plotOptions: {
      column: {
        cursor: 'pointer'
      }
    },
    series: [{
      name: 'Volume',
      type: 'column',
      yAxis: 1,
      data: exchangeVolumes,
      tooltip: {
        valueSuffix: ' BTC'
      },
      point: {
        events: {
          click: function (e) {
            appChangeSelected(this.category);
          }
        }
      }
    }, {
      name: 'Current Price',
      type: 'column',
      data: exchangePrices,
      tooltip: {
        valueSuffix: ' USD'
      },
      point: {
        events: {
          click: function (e) {
            appChangeSelected(this.category);
          }
        }
      }
    }]
  }



  return (
    <div className="line">
      <ReactHighcharts config={config}/>
    </div>
  )
}

export default Line;
