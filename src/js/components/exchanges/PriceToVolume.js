import React, { Component } from 'react'
import Highcharts from 'highcharts'
import ReactHighcharts from 'react-highcharts'
import '../../../scss/components/exchanges/priceToVolume.scss'

const PriceToVolume = ({data, changeSelected, selected}) => {
  let aggregate = [], names = [], volumes = [], prices = []
  data.map(exch => {
    let volume = {}
    let pricesObj = {}
    if (exch['display_name'] === selected) {
      volume['selected'] = true
      pricesObj['selected'] = true
    }
    volume['y'] = exch['volume_btc']
    pricesObj['y'] = exch['rates']['last']
    volume['color'] = exch['color']
    let states = {
      select: {
        color: exch['color']
      }
    }
    volume['states'] = states
    pricesObj['color'] = '#333333'

    volumes.push(volume)
    prices.push(pricesObj)
    names.push(exch['display_name'])
  })

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
              borderWidth: 5,
              borderColor: '#777777'
            }
        }
      },
      column: {
        cursor: 'pointer',
      },
      line: {
        animation: false,
        color: '#BBBBBB',
        cursor: "pointer",
        marker: {
          fillColor: '#AAAAAA'
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
            changeSelected(this.category);
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
            changeSelected(this.category);
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
