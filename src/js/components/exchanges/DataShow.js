import React, { Component } from 'react'
import '../../../scss/components/exchanges/dataShow.scss'

const DataShow = ({data, color}) => {
  let style = {
    color: color
  }

  return (
    <div className="dataShow">
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
          <td>% of all BTC Transactions</td>
          <td>{data.volume_percent}</td>
        </tr>
      </tbody>
    </table>
    </div>
  )
}

export default DataShow;
