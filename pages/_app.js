import "../styles/globals.css";
import "../styles/nprogress.css";
import "plyr-react/dist/plyr.css";

import Router from "next/router";
import nProgress from "nprogress";

nProgress.configure({ showSpinner: false });

Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
