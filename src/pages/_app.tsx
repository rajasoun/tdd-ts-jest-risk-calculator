import type { AppProps } from 'next/app'
import Head from 'next/head'
import Script from 'next/script'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
        />
        <Script
          strategy="lazyOnload"
          src="https://code.jquery.com/jquery-3.6.0.min.js"
        />
        <Script
          strategy="lazyOnload"
          src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"
        />
        <title>OWASP Risk Assessment Calculator v2021</title>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
