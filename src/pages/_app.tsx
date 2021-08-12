import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css';

if (typeof window !== "undefined") {
  require("jquery");
  require("bootstrap");
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <title>OWASP Risk Assessment Calculator v2021</title>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
