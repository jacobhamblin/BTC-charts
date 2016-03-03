import React, { Component } from 'react'
import rd3, { PieChart } from 'react-d3'
import '../scss/pie.scss'

const Pie = ({data}) => {
  let aggregate = []
  for (let key in data) {
    if (data.hasOwnProperty(key) && key !== "timestamp") {
      let obj = {}
      obj['label'] = data[key]['display_name']
      obj['value'] = data[key]['volume_percent']
      aggregate.push(obj)
    }
  }

  return (
    <PieChart
      data={aggregate}
      width={400}
      height={400}
      radius={200}
      innerRadius={100}
      sectorBorderColor="white"
      delay={100}
      title="Pie Chart"
    />
  )

}

export default Pie
