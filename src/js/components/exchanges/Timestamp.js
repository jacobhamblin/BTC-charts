import React, { Component } from 'react'
import '../../../scss/components/exchanges/timestamp.scss'

function processTimestamp(timestamp) {
  let str
  let seconds = (new Date().getTime() - Date.parse(timestamp)) * 0.001;

  return parseInt(seconds)
}

class Timestamp extends Component {
  constructor(props) {
    super(props)
    let timePassed = processTimestamp(props.timestamp)
    this.state = { timePassed }
    this.tick = this.tick.bind(this)
  }

  tick() {
    this.setState({timePassed: this.state.timePassed + 1})
  }

  componentDidMount() {
    this.interval = setInterval(this.tick, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  makeString() {
    let str
    if (this.state.timePassed > 60) {
      let min = parseInt(this.state.timePassed/60)
      str = (min > 1 ? min + ' minutes' : 'a minute')
    } else {
      str = this.state.timePassed + ' seconds'
    }

    return `As of ${str} ago`
  }

  render () {
    return (
      <div className="timestamp">
        <p>{this.makeString()}</p>
      </div>
    )
  }
}

export default Timestamp
