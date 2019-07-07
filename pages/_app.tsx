import {ThemeProvider as FannypackThemeProvider} from 'fannypack'
import App, {Container} from 'next/app'
import Head from 'next/head'
import React from 'react'

class MyApp extends App {
  render() {
    const {Component, pageProps} = this.props

    return (
      <Container>
        <Head>
          <title>Breathe</title>
        </Head>
        <FannypackThemeProvider>
          <Component {...pageProps} />
        </FannypackThemeProvider>
      </Container>
    )
  }
}

export default MyApp
