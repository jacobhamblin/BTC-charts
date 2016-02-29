import React, { Component } from 'react'
import '../scss/nav.scss'


const Nav = ({exchanges}) => {
  let names = Object.keys(exchanges)
    .slice(0, Object.keys(exchanges).length - 1)

  let aggregate = []
  for (let i = 0; i < names.length; i++) {
    aggregate.push(<li>{names[i]}</li>)
  }

  return (
    <nav>
      <ul>
        {aggregate}
      </ul>
    </nav>  
  )
}

export default Nav;
