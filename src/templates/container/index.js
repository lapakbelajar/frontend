import React, { useState } from "react";
import style from "./style/Container.module.css";

// component
import { SidebarLeft, Navbar, SidebarRight, Search } from "../../molekul";

// authorization
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";
import api from "../../config/api";

export default function Container({ children }) {
  const [user, setUser] = useState([]);
  const [login, setLogin] = useState(false);

  useState(() => {
    getUser();
  }, []);

  function getUser() {
    jwt.verify(Cookies.get("auth_user"), api.jwt_key, (err, decoded) => {
      if (err) {
        setLogin(false);
      } else {
        setUser(decoded);
        setLogin(true);
      }
    });
  }

  return (
    <div className={style.container}>
      {/* navbar for mobile view */}
      <Navbar Login={login} />

      {/* left sidebar */}
      <SidebarLeft />

      {/* middle content */}
      <div className={style.content}>
        {/* search bar */}
        <Search />

        {/* content */}
        <div className={style.core_content}>{children}</div>
      </div>

      {/* sidebar kanan */}
      <SidebarRight />
    </div>
  );
}
