import parseHtml from 'html-react-parser'
import Document, {
  Head,
  Html,
  Main,
  DocumentContext,
  NextScript,
} from 'next/document'
import preval from 'preval.macro'
import {ServerStyleSheet} from 'fannypack'
import React from 'react'

const faviconsHtml = preval`
  module.exports = require('fs').readFileSync(require.resolve('../static/favicons.html'), 'utf8').replace(/\\n/g, '')
`

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()

    const originalRenderPage = ctx.renderPage
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
      })

    const initialProps = await Document.getInitialProps(ctx)

    return {
      ...initialProps,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      styles: [...(initialProps.styles as any), ...sheet.getStyleElement()],
    }
  }

  render() {
    return (
      <Html lang="en-US">
        <Head>
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
                !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t,e){var n=document.createElement("script");n.type="text/javascript";n.async=!0;n.src="https://cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(n,a);analytics._loadOptions=e};analytics.SNIPPET_VERSION="4.1.0";
                analytics.load('7hkseJWshimitYRUgCMZEEz9YEy1nqOB');
                }}();
              `,
            }}
          />
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
