import {ThemeProvider as FannypackThemeProvider, css} from 'fannypack'
import {ThemeConfig} from 'fannypack/ts/types'
import App, {Container} from 'next/app'
import Head from 'next/head'
import React from 'react'

const theme: ThemeConfig = {
  palette: {
    text: '#899cc7',
    textInverted: '#fff',
    primary: '#293e6d',
  },
  global: {
    fontFamily: `'Avenir Next', Avenir, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`,
    fontSize: 18,
    base: css`
      a:-webkit-any-link {
        color: inherit;
      }
    `,
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
