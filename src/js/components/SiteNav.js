import React, { Component } from 'react'
import '../../scss/components/siteNav.scss'
import { Link } from 'react-router'

const SiteNav = () => {
  return (
    <nav>
      <ul>
        <li><Link to={'/exchanges'}>Exchanges</Link></li>
        <li><Link to={'/history'}>History</Link></li>
        <li><Link to={'/'}>Home</Link></li>
      </ul>
    </nav>
  )
}

export default SiteNav
