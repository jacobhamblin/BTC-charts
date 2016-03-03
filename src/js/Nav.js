import React, { Component } from 'react'
import '../scss/nav.scss'


const Nav = ({exchanges, changeSelected}) => {
  let names = Object.keys(exchanges)
    .slice(0, Object.keys(exchanges).length - 1)

  return (
    <nav>
      <ul>
        {names.map(name => (
          <li onClick={e => changeSelected(name)}>
            {name}
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Nav;
