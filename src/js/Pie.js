import React, { Component } from 'react'
import d3 from 'd3'
import '../scss/pie.scss'

const Pie = ({data}) => {
  let w = 400, h = 400, r = Math.min(w, h) / 2, color = d3.scale.category20c()
  let legendRectSize = 18, legendSpacing = 4

  let aggregate = []
  for (let key in data) {
    if (data.hasOwnProperty(key) && key !== "timestamp") {
      let obj = {}
      obj['label'] = data[key]['display_name']
      obj['val'] = data[key]['volume_percent']
      obj['count'] = data[key]['volume_btc']
      obj['enabled'] = true

      aggregate.push(obj)
    }
  }

  let canvas = d3.select('.pie')
    .append("svg")
    .attr("width", w + 150)
    .attr("height", h)
    .append("g")
    .attr("transform", "translate(" + w/2 + "," + h/2 + ")")

  let arc = d3.svg.arc()
    .outerRadius(r)
    .innerRadius(r/2)

  let labelArc = d3.svg.arc()
    .outerRadius(r - 40)
    .innerRadius(r - 40)

  let pie = d3.layout.pie()
    .value(d => d.val)
    .sort(null)

  let path = canvas.selectAll("path")
    .data(pie(aggregate))
    .enter().append("path")
    .attr("d", arc)
    .attr("fill", ((d,i) => color(d.data.label)))
    .each(function(d) {this._current = d})
    .on('mouseover', d => {
    // let total = d3.sum(aggregate.map(d => d.count));
    // let percent = Math.round(1000 * d.data.count / total) / 10;
    // d.transtion().duration(100).style("fill", (d,i) => color(i) * 1.1)
    tooltip.select('.label').html(d.data.label);
    tooltip.select('.count').html(d.data.count);
    tooltip.select('.percent').html(d.data.val + '%');
    tooltip.style('display', 'block');
  });

  path.on('mouseout', function() {
    tooltip.style('display', 'none')
  })

  let legend = canvas.selectAll('.legend')
    .data(color.domain())
    .enter()
    .append('g')
    .attr('class', 'legend')
    .attr('transform', (d, i) => {
      let height = legendRectSize + legendSpacing
      let offset =  height * color.domain().length / 2
      let horz = (w/2) + 20
      let vert = i * height - offset
      return 'translate(' + horz + ',' + vert + ')'
    })

  legend.append("rect")
    .attr("width", legendRectSize)
    .attr("height", legendRectSize)
    .style("fill", color)
    .style("stroke", color)
    .on('click', function(label) {
      let rect = d3.select(this);
      let enabled = true;
      let totalEnabled = d3.sum(aggregate.map(d => (d.enabled) ? 1 : 0));

      if (rect.attr('class') === 'disabled') {
        rect.attr('class', '');
      } else {
        if (totalEnabled < 2) return;
        rect.attr('class', 'disabled');
        enabled = false;
      }

      pie.value(function(d) {
        if (d.label === label) d.enabled = enabled;
        return (d.enabled) ? d.count : 0;
      });

      path = path.data(pie(aggregate));

      path.transition()
        .duration(750)
        .attrTween('d', function(d) {
          let interpolate = d3.interpolate(this._current, d);
          this._current = interpolate(0);
          return function(t) {
            return arc(interpolate(t));
          };
        });
    });

  legend.append('text')
    .attr('x', legendRectSize + legendSpacing)
    .attr('y', legendRectSize + legendSpacing)
    .text(d => d)

  let tooltip = d3.select('.pie')
    .append('div')
    .attr('class', 'tooltip');

  tooltip.append('div')
    .attr('class', 'label');

  tooltip.append('div')
    .attr('class', 'count');

  tooltip.append('div')
    .attr('class', 'percent');

  return (
    <div className="pie">
    </div>
  )
}

export default Pie
