import React, { Component } from 'react'
import '../scss/dataShow.scss'

const DataShow = ({data}) => {
  return (
    <div className="dataShow">
      <h2><a href={data.display_URL}>{data.display_name}</a></h2>
      <ul>
        <li>ask: {data.rates.ask}</li>
        <li>bid: {data.rates.bid}</li>
        <li>last: {data.rates.last}</li>
      </ul>
      <ul>
        <li>Volume: {data.volume_btc}</li>
        <li>Portion of all BTC Transactions: {data.volume_percent}%</li>
      </ul>
    </div>
  )
}

export default DataShow;
