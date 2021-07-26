import type {AppProps} from 'next/app';

const MyApp = ({Component, pageProps}: AppProps) => {
  return <Component {...pageProps} />;
};

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async ctx => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(ctx)
//
//   return { ...appProps }
// }

export default MyApp;
