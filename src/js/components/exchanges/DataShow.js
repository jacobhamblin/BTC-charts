import React, { Component } from 'react'
import '../../../scss/components/exchanges/dataShow.scss'
import { Timestamp } from '../exchanges'

const DataShow = ({data, color, timestamp}) => {
  let style = {
    color: color
  }

  return (
    <div className="dataShow">
      <div className="tableContainer">
        <table>
          <thead>
            <tr>
              <td>
                <a href={data.display_URL} style={style}>{data.display_name}</a>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ask:</td>
              <td>{data.rates.ask}</td>
            </tr>
            <tr>
              <td>bid:</td>
              <td>{data.rates.bid}</td>
            </tr>
            <tr>
              <td>last:</td>
              <td>{data.rates.last}</td>
            </tr>
            <tr>
              <td>Volume:</td>
              <td>{data.volume_btc}</td>
            </tr>
            <tr>
              <td>Total Volume %:</td>
              <td>{data.volume_percent}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Timestamp timestamp={timestamp}/>
    </div>
  )
}

export default DataShow;
