// component
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
      <Navbar User={auth} />
      <OnBoarding />
      <Fitur />
      <Footer />
    </>
  );
}
