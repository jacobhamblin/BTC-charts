import React, { Component } from 'react'
import { markdownToHTML } from '../utils'
import ReadMe from '../../../README.md'

const About = () => {
  const html = markdownToHTML(ReadMe)

  return (
    <div className="about">
      <span className="markdown-body"
        dangerouslySetInnerHTML={{__html: html}}>
      </span>
    </div>
  )
}

export default About
