import React, { Component } from 'react'
import Highcharts from 'highcharts'
import ReactHighcharts from 'react-highcharts'
import '../../../scss/components/exchanges/volumePie.scss'

const VolumePie = ({data, changeSelected, selected, colors}) => {
  const appChangeSelected = changeSelected
  let aggregate = []
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
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
          type: 'pie'
      },
      colors: colors,
      title: {
          text: 'Market Share'
      },
      tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
          pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              innerSize: 100,
              dataLabels: {
                style: {
                  fontWeight: "100",
                  fontSize: "12px",
                  color: "#777777"
                }
              }
          }
      },
      series: [{
          name: 'Market Share',
          colorByPoint: true,
          data: aggregate,
          point: {
            events: {
              click: function (e) {
                e.preventDefault()
                appChangeSelected(this.name);
              }
            }
          }
      }]
    };

  return (
    <div className="volumePie">
      <ReactHighcharts config={config}/>
    </div>
  )

}

export default VolumePie
