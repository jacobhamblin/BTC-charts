import React, { Component } from 'react'
import '../scss/nav.scss'

const Nav = ({exchanges, changeSelected, selected, colors}) => {
  let names = [], i = 0;
  for (let key in exchanges) {
    names.push(exchanges[key]['display_name'])
  }

  return (
    <nav>
      <ul>
        {names.map(name => (
          <li
            className={name === selected ? "selected" : ""}
            onClick={e => changeSelected(name)}
            key={i++}
          >
            {name}
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Nav;
