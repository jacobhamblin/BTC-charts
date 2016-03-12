import React, { Component } from 'react'
import Highcharts from 'highcharts'
import ReactHighcharts from 'react-highcharts'
import '../../../scss/components/exchanges/volumePie.scss'

const VolumePie = ({data, changeSelected, selected}) => {
  let aggregate = []
  data.map((exch, i) => {
    let obj = {}
    obj['name'] = exch['display_name']
    obj['y'] = exch['volume_percent']
    obj['color'] = exch['color']
    if (obj['name'] === selected) {
      obj['selected'] = true
      obj['sliced'] = true
    }
    aggregate[(data.length - 1) - i] = obj
  })


  let config =
    {
      chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
      },
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
          data: aggregate,
          point: {
            events: {
              click: function (e) {
                e.preventDefault()
                changeSelected(this.name);
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
