import "../styles/globals.css";
import "../styles/nprogress.css";
import "plyr-react/dist/plyr.css";

import Router from "next/router";
import nProgress from "nprogress";

nProgress.configure({ showSpinner: false });

Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);

import Script from "next/script";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script
        strategy="lazyOnload"
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-LKBCHCP6QB"
      />
      <Script id="ga-analytics">
        {` window.dataLayer = window.dataLayer || []; function gtag()
        {dataLayer.push(arguments)}
        gtag('js', new Date()); gtag('config', 'G-LKBCHCP6QB'); `}
      </Script>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
