import {ThemeProvider as FannypackThemeProvider} from 'fannypack'
import {ThemeConfig} from 'fannypack/ts/types'
import App, {Container} from 'next/app'
import Head from 'next/head'
import React from 'react'
import preval from 'preval.macro'

const icons = preval`
  const fs = require('fs')
  const path = require('path')
  const globby = require('globby')
  const svgson = require('svgson')

  const pathsFromSvg = node => {
    let paths = []

    if (node.name === 'path') {
      paths.push(node.attributes.d)
    } else if (node.children && Array.isArray(node.children)) {
      node.children.forEach(child => {
        paths.push(...pathsFromSvg(child))
      })
    }

    return paths
  }

  module.exports = globby
    .sync(path.resolve(__dirname, '../assets/icons/**/*.svg'))
    .reduce((acc, filepath) => {
      const svg = svgson.parseSync(fs.readFileSync(filepath, 'utf8'))

      const viewBoxSize = svg.attributes.viewBox
        .split(' ')
        .slice(2, 4)
        .map(Number)
      const paths = pathsFromSvg(svg)

      return {
        ...acc,
        [path.parse(filepath).name]: {
          viewBoxWidth: viewBoxSize[0],
          viewBoxHeight: viewBoxSize[1],
          paths,
        },
      }
    }, {})
`

const theme: ThemeConfig = {
  palette: {
    text: '#899cc7',
    textInverted: '#fff',
    primary: '#293e6d',
  },
  global: {
    fontFamily: `'Avenir Next', Avenir, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`,
    fontSize: 18,
  },
  Icon: {
    icons,
  },
}

class MyApp extends App {
  render() {
    const {Component, pageProps} = this.props

    return (
      <Container>
        <Head>
          <title>Breathe</title>
        </Head>
        <FannypackThemeProvider theme={theme}>
          <Component {...pageProps} />
        </FannypackThemeProvider>
      </Container>
    )
  }
}

export default MyApp
