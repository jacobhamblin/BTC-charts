import React, { Component } from 'react'
import Highcharts from 'highcharts'
import ReactHighcharts from 'react-highcharts'
import '../../../scss/components/exchanges/priceToVolume.scss'

const PriceToVolume = ({data, changeSelected, selected, colors}) => {
  const appChangeSelected = changeSelected
  let aggregate = [], names = [], volumes = [], prices = [], i = 0
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      let volume = {}
      let pricesObj = {}
      if (data[key]['display_name'] === selected) {
        volume['selected'] = true
        pricesObj['selected'] = true
      }
      volume['y'] = data[key]['volume_btc']
      pricesObj['y'] = data[key]['rates']['last']
      volume['color'] = colors[i]
      pricesObj['color'] = '#333333'

      volumes.push(volume)
      prices.push(pricesObj)
      names.push(data[key]['display_name'])
      i++
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
      categories: names,
      crosshair: true
    }],
    yAxis: [{
      labels: {
        format: '$ {value}',
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
      series: {
        marker: {
          states: {
            select: {
              fill: '#FFDE3C',
            }
          }
        },
        states: {
            select: {
              color: '#FFDE3C',
              borderWidth: 0,
              borderColor: '#FFDE3C'
            }
        }
      },
      column: {
        cursor: 'pointer',
      },
      line: {
        animation: false,
        color: '#aaaaaa',
        cursor: "pointer",
        marker: {
          fillColor: '#777777'
        }
      }
    },
    series: [{
      name: 'Volume',
      type: 'column',
      yAxis: 1,
      data: volumes,
      tooltip: {
        valueSuffix: ' BTC'
      },
      point: {
        events: {
          click: function (e) {
            e.preventDefault()
            appChangeSelected(this.category);
          }
        }
      }
    }, {
      name: 'Current Price',
      type: 'line',
      data: prices,
      tooltip: {
        valueSuffix: ' USD'
      },
      point: {
        events: {
          click: function (e) {
            e.preventDefault()
            appChangeSelected(this.category);
          }
        }
      }
    }]
  }



  return (
    <div className="priceToVolume">
      <ReactHighcharts config={config}/>
    </div>
  )
}

export default PriceToVolume;
