import React, { Component } from 'react'
import d3 from 'd3'

class Pie extends Component {
  constructor(props) {
    super(props)
    this.state = {
      exchanges: props.exchanges
    }
  }

  assembleChart() {
    const data = this.state.exchanges

    let w = 400, h = 400, r = 200, color = d3.scale.category20c()

    let aggregate = []
    for (let key in data) {
      if (data.hasOwnProperty(key) && key !== "timestamp") {
        let obj = {}
        obj['label'] = key['display_name']
        obj['val'] = key['volume_percent']
      }
    }

    let vis = d3.select('.pie')
      .append("svg:svg")
      .data([aggregate])
      .attr("width", w)
      .attr("height", h)
      .append("svg:g")
      .attr("transform", "translate(" + r + "," + r + ")")

    let arc = d3.svg.arc()
      .outerRadius(r)

    let pie = d3.layout.pie()
      .data(pie)
      .enter()
      .append("svg:g")
      .attr("class", "slice")

    arcs.append("svg:path")
      .attr("fill", (d, i) => color(i))
      .attr("d", arc)

    arcs.append("svg:text")
      .attr("transform", (d) => {
        d.innerRadius = 0
        d.outerRadius = r
        return "translate(" + arc.centroud(d) + ")"
      })
      .attr("text-anchor", "middle")
      .text((d,i) => data[i].label)
  }

  render() {
    return (
      <div className="pie">
        {this.assembleChart()}
      </div>
    )
  }
}

export default Pie
