import {css, ThemeProvider as FannypackThemeProvider} from 'fannypack'
import {ThemeConfig} from 'fannypack/ts/types'
import App, {Container} from 'next/app'
import Head from 'next/head'
import Router from 'next/router'
import React from 'react'
import {initAnalytics, logPageView} from '../core/analytics'

const theme: ThemeConfig = {
  global: {
    fontFamily: `'Avenir Next', Avenir, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`,
    fontSize: 18,
    base: css`
      a {
        color: inherit;
      }
    `,
  },
  palette: {
    text: '#fff',
    textInverted: '#899cc7',
    primary: '#293e6d',
  },
  Input: {
    base: css`
      color: #899cc7;
      border-color: #000;
    `,
  },
  Toast: {
    placement: 'bottom',
    base: css`
      color: #435a6f;
    `,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any,
}

class MyApp extends App {
  componentDidMount() {
    initAnalytics()
    logPageView()
    if (Router.router) {
      Router.events.on('routeChangeComplete', logPageView)
    }
  }

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
