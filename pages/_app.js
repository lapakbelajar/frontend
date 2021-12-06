import "../styles/globals.css";

// progress bar style
import "../styles/nprogress.css";

// swipper style
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// calendar style
import "react-calendar/dist/Calendar.css";

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
        src="https://www.googletagmanager.com/gtag/js?id=G-TZTJNFJ1MR"
      />
      <Script id="ga-analytics">
        {`window.dataLayer = window.dataLayer || []; function gtag()
        {dataLayer.push(arguments)}
        gtag('js', new Date()); gtag('config', 'G-TZTJNFJ1MR');`}
      </Script>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
