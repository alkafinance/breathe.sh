import {css, ThemeProvider as FannypackThemeProvider} from 'fannypack'
import {ThemeConfig} from 'fannypack/ts/types'
import App, {Container} from 'next/app'
import Head from 'next/head'
import Router from 'next/router'
import React from 'react'
import {initAnalytics, logPageView} from '../utils/analytics'

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
    textInverted: '#293e6d',
    primary: '#293e6d',
  },
  Input: {
    base: css`
      color: #293e6d;
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
    // Fix duplicate page view events on same page
    // @see https://github.com/zeit/next.js/issues/3322#issuecomment-414070387
    if (typeof window !== 'undefined') {
      const customHistory = [window.location.pathname]

      logPageView()
      Router.events.on('routeChangeComplete', () => {
        if (window.location.pathname !== customHistory[0]) {
          logPageView()
        }
        customHistory.unshift(window.location.pathname)
      })
    }
  }

  render() {
    const {Component, pageProps} = this.props

    return (
      <Container>
        <Head>
          <title>Breathe</title>
          <meta
            name="description"
            content="Take a breathe before jumping into the most stressful parts of the internet"
          />
        </Head>
        <FannypackThemeProvider theme={theme}>
          <Component {...pageProps} />
        </FannypackThemeProvider>
      </Container>
    )
  }
}

export default MyApp
