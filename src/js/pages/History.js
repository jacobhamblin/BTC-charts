import React, { Component } from 'react'
import { TodayHist, AllTimeHist } from '../components/history'
import '../../scss/pages/history.scss'

const History = () => {
  const colors = [
    '#B4F0A8', '#A8F0B4', '#A8F0CC', '#A8F0E4', '#A8E4F0',
    '#A8CCF0', '#A8C0F0', '#A8A8F0', '#C0A8F0', '#D8A8F0',
    '#F0A8F0', '#F0A8D8', '#F0A8C0', '#F0A8A8'
  ]

  return (
    <div className="history">
      <h2>History - USD to BTC</h2>
      <div className="charts">
        <TodayHist
        colors={colors}/>
        <AllTimeHist
        colors={colors}/>
      </div>
    </div>
  )
}

export default History
