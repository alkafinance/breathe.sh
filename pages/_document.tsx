import parseHtml from 'html-react-parser'
import Document, {
  Head,
  Html,
  Main,
  NextDocumentContext,
  NextScript,
} from 'next/document'
import preval from 'preval.macro'
import {ServerStyleSheet} from 'fannypack'
import React from 'react'

const faviconsHtml = preval`
  module.exports = require('fs').readFileSync(require.resolve('../static/favicons.html'), 'utf8').replace(/\\n/g, '')
`

class MyDocument extends Document {
  static async getInitialProps(ctx: NextDocumentContext) {
    const sheet = new ServerStyleSheet()

    const originalRenderPage = ctx.renderPage
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
      })

    const initialProps = await Document.getInitialProps(ctx)

    return {
      ...initialProps,
      styles: [...(initialProps.styles as any), ...sheet.getStyleElement()],
    }
  }

  render() {
    return (
      <Html lang="en-US">
        <Head>
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="Breathe!" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
        </Head>
        <Head>{parseHtml(faviconsHtml)}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
