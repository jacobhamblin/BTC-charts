import React, { Component } from 'react'
import '../../../scss/components/exchanges/nav.scss'

const Nav = ({exchanges, changeSelected, selected}) => {
  let i = 0
  return (
    <nav className="exchanges">
      <ul>
        {exchanges.map(name => (
          <li
            className={name.display_name === selected ? "selected" : ""}
            style={{borderColor: name.color}}
            onClick={e => changeSelected(name.display_name)}
            key={i++}
          >
            {name.display_name}
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Nav;
