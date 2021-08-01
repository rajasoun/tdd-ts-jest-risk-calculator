import type { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
        />
        <title>OWASP Risk Assessment Calculator v2021</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
