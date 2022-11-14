import React from 'react'
import Document, { Head, Main, NextScript, Html } from 'next/document'
import { theme } from './_app'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="theme-color" content={theme.palette.background.default} />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="description" content="Description" />
          <meta name="keywords" content="Keywords" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" type="image/png" href="favicon.ico" />
          <link rel="apple-touch-icon" href="favicon.ico"></link>
          <link
            href="https://fonts.googleapis.com/css2?family=Lato&display=swap"
            rel="stylesheet"
          ></link>
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;1,100;1,200;1,300;1,400&family=Source+Sans+Pro:wght@200;300;400;600&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body style={{ background: theme.palette.background.default }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
