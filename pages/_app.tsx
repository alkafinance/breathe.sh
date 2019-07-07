import {ThemeProvider as FannypackThemeProvider} from 'fannypack'
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
  },
  Icon: {
    icons: {
      link: {
        viewBoxWidth: 32,
        viewBoxHeight: 32,
        paths: [
          'M28,13.5v5A4.5,4.5,0,0,1,23.5,23h-7A4.5,4.5,0,0,1,12,18.5V15a1,1,0,0,1,1-1h1a1,1,0,0,1,1,1v3.5A1.5,1.5,0,0,0,16.5,20h7A1.5,1.5,0,0,0,25,18.5v-5A1.5,1.5,0,0,0,23.5,12H21.86035a.49994.49994,0,0,1-.4743-.34186l-.66669-2A.5.5,0,0,1,21.19373,9H23.5A4.5,4.5,0,0,1,28,13.5ZM10.614,20.34186A.49994.49994,0,0,0,10.13965,20H8.5A1.5,1.5,0,0,1,7,18.5v-5A1.5,1.5,0,0,1,8.5,12h7A1.5,1.5,0,0,1,17,13.5V17a1,1,0,0,0,1,1h1a1,1,0,0,0,1-1V13.5A4.5,4.5,0,0,0,15.5,9h-7A4.5,4.5,0,0,0,4,13.5v5A4.5,4.5,0,0,0,8.5,23h2.30627a.5.5,0,0,0,.47437-.65814Z',
        ],
      },
      circleRight: {
        viewBoxWidth: 32,
        viewBoxHeight: 32,
        paths: [
          'M16,4A12,12,0,1,0,28,16,12.01312,12.01312,0,0,0,16,4Zm6.31647,12.82153-5.74628,3.98853A1,1,0,0,1,15,19.98853V18H11a1,1,0,0,1-1-1V15a1,1,0,0,1,1-1h4V12.01147a1,1,0,0,1,1.57019-.82153l5.74628,3.98853A1.00005,1.00005,0,0,1,22.31647,16.82153Z',
        ],
      },
    },
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
