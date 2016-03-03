import React, { Component } from 'react'
import Highcharts from 'highcharts'
import ReactHighcharts from 'react-highcharts'

import '../scss/pie.scss'

const Pie = ({data, changeSelected, selected}) => {
  const appChangeSelected = changeSelected
  let aggregate = []
  for (let key in data) {
    if (data.hasOwnProperty(key) && key !== "timestamp") {
      let obj = {}
      obj['name'] = data[key]['display_name']
      obj['y'] = data[key]['volume_percent']
      if (obj['name'] === selected) {
        obj['selected'] = true
        obj['sliced'] = true
      }
      aggregate.push(obj)
    }
  }

  let config =
    {
      chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie',
      },
      colors: [
        '#AAFF99', '#99FFAA', '#99FFCC', '#99FFEE', '#99EEFF',
        '#99CCFF', '#99AAFF', '#AA99FF', '#CC99FF', '#EE99FF', 
        '#FF99EE', '#FF99CC', '#FF99AA', '#FF9999'
      ],
      title: {
          text: 'Market Share of Major Exchanges'
      },
      tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
          pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              innerSize: 100
          }
      },
      series: [{
          name: 'Market Share',
          colorByPoint: true,
          data: aggregate,
          point: {
            events: {
              click: function (e) {
                appChangeSelected(this.name);
              }
            }
          }
      }]
    };

  return (
    <div className="pie">
      <ReactHighcharts config={config}/>
    </div>
  )

}

export default Pie
