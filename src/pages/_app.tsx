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
        <script 
          src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js" 
        />
        <script 
          src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"
        />
        <script 
          src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"
        />
        <title>OWASP Risk Assessment Calculator v2021</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
