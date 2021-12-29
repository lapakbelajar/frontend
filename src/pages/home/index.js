// component
import Head from "next/head";
import Navbar from "./component/Navbar";
import OnBoarding from "./component/OnBoarding";
import Fitur from "./component/Fitur";
import Footer from "./component/Footer";
import { useEffect, useState } from "react";

// authentication
import cookie from "js-cookie";
import { jwt_key } from "../../config/api";

// helper
import { isUserLogin } from "./helper";

export default function Home() {
  const [auth, setAuth] = useState({
    login: false,
    user: {},
  });

  useEffect(() => {
    const user = isUserLogin(cookie.get("auth_user"), jwt_key);
    setAuth(user);
  }, []);

  return (
    <>
      <Head>
        <title>
          Tempat untuk berbagi pengetahuan dan juga mempertemukan pelajaran
          dengan tutor yang ahli di bidangnya
        </title>
        <meta
          name="description"
          content="lapak belajar adalah website yang menyediakan layanan
belajar online bagi pelajar SMA/SMK untuk
lebih mudah memahami materi pembelajaran
dengan efektif dan efisien"
        />
      </Head>
      <Navbar User={auth} />
      <OnBoarding />
      <Fitur />
      <Footer />
    </>
  );
}
