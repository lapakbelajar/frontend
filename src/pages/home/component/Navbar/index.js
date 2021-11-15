import style from "./Navbar.module.css";

// component
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// icon
import { Bell, X, Menu } from "react-feather";

// authentication
import { jwt_key } from "../../../../config/api";
import cookie from "js-cookie";

// helper
import { isUserLogin } from "../../helper";

export default function Navbar(props) {
  // references
  const navRef = useRef(null);

  // state
  const [scrolled, setScroll] = useState(false);

  // user
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState({
    name: "",
    image: "",
    id: 0,
  });

  // notification
  const [notif, setNotif] = useState([]);

  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    styleNavbar();

    // user handler
    const userCheck = isUserLogin(cookie.get("auth_user"), jwt_key);
    setLogin(userCheck.login);
    setUser(userCheck.user);
  }, []);

  /*
  * Mengganti style navbar ketika di scroll
  ? pada waktu scroll tepat di atas maka style transparan
  ? dan waktu di scroll ke bawah style tidak transparan
  */

  function styleNavbar() {
    // mengubah style navbar ketika di scroll
    window.addEventListener("scroll", () => {
      if (window.scrollY > 0) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });

    // menghilangkan sidebar saat overlay sidebar di klik
    const overlay = document.querySelector("#overlay-sidebar");
    window.addEventListener("click", (evt) => {
      if (evt.target === overlay) {
        setShowSidebar(false);
      }
    });
  }

  return (
    <>
      <nav
        ref={navRef}
        className={scrolled ? style.nav_scrolled : style.navbar}
      >
        <div className={style.container}>
          <div className={style.brand}>
            <button
              onClick={() => setShowSidebar(true)}
              className={style.btn_close}
              type="button"
            >
              <Menu color={scrolled ? "#363636" : "#ffffff"} size={18} />
            </button>
            <h3>Lapak Belajar.</h3>
          </div>
          <div className={style.link}>
            <Link href="/diskusi">
              <a className={style.nav_link}>Diskusi</a>
            </Link>
            <Link href="/">
              <a className={style.nav_link}>Blog</a>
            </Link>
            <Link href="/">
              <a className={style.nav_link}>Privat</a>
            </Link>
          </div>
          <div className={style.auth}>
            {/* component tidak login */}

            {login ? (
              <div className={style.login_user}>
                <Link href="/profile">
                  <a className={style.notifikasi}>
                    <Bell color={scrolled ? "#363636" : "#ffffff"} size={22} />
                    {notif.length > 0 ? (
                      <div className={style.keterangan}>
                        <small>{notif.length > 9 ? "9+" : notif.length}</small>
                      </div>
                    ) : (
                      ""
                    )}
                  </a>
                </Link>
                <img
                  src="https://cdn.pixabay.com/photo/2020/08/11/15/23/tree-5480239_960_720.jpg"
                  alt=""
                />
              </div>
            ) : (
              <Link href="/login">
                <a className={style.login}>login</a>
              </Link>
            )}
            {/*  */}
          </div>
        </div>
      </nav>

      {/* sidebar tampilan mobile */}
      <section
        className={style.sidebar}
        style={{ left: showSidebar ? "0%" : "-100%" }}
        id="overlay-sidebar"
      >
        <div className={style.content}>
          {/* header */}
          <div className={style.sidebar_header}>
            <h4>Lapak Belajar.</h4>
            <button
              onClick={() => setShowSidebar(false)}
              type="button"
              className={style.btn_close}
            >
              <X color="#363636" size={22} />
            </button>
          </div>

          {/* link navigasi */}
          <div className={style.link_mobile}>
            <Link href="/">
              <a>Diskusi</a>
            </Link>
            <Link href="/">
              <a>Privat</a>
            </Link>
            <Link href="/">
              <a>Artikel</a>
            </Link>
          </div>
          <div></div>
          {/*  */}
        </div>
        <div></div>
      </section>
    </>
  );
}
