import style from "./Navbar.module.css";

// component
import Image from "next/image";
import Link from "next/link";

// icon
import { Search, Menu, X, Bell } from "react-feather";
import { useEffect, useRef, useState } from "react";

// authorization
import api, { jwt_key, api_endpoint, authorization } from "../../config/api";
import cookie from "js-cookie";
import { isUserLogin } from "../../pages/home/helper";

export default function Navbar() {
  const linkRef = useRef(null);
  const inputQuerRef = useRef(null);

  const [auth, setAuth] = useState({ login: false, user: {} });
  const [notification, setNotification] = useState([]);
  const [query, setQuery] = useState("");

  const [notifikasi, setNotif] = useState(0);

  useEffect(() => {
    handleSidebar();

    // mengani user
    const userCheck = isUserLogin(cookie.get("auth_user"), jwt_key);
    setAuth(userCheck);
    getNotif(userCheck.user.id);
  }, []);

  /**
   * mendapatkan data notifikasi dari server
   */

  async function getNotif(userid) {
    const req = await fetch(`${api_endpoint}/notifikasi/get/hitung/${userid}`, {
      headers: {
        authorization: authorization,
      },
    });
    const res = await req.json();
    setNotif(res.jumlah);
  }

  /*
  * Memunculkan sidebar
  ? mengganti class sidebar yang lama dengan yang baru
  */

  const [showSidebar, setShowSidebar] = useState(false);

  function handleSidebar() {
    const overlay = document.querySelector("#overlay-sidebar");

    window.addEventListener("click", (evt) => {
      if (evt.target === overlay) {
        setShowSidebar(false);
      }
    });
  }

  /**
   * Menangani ketika user melakukan pencarian
   */

  function handleSubmit(evt) {
    evt.preventDefault();
    linkRef.current.click();
    inputQuerRef.current.value = "";
  }

  return (
    <>
      <nav className={style.navbar}>
        <div className="container">
          <div className={style.canvas}>
            {/* section brand dan pencarian */}
            <div className={style.section_1}>
              <button
                onClick={() => setShowSidebar(true)}
                className={style.btn_navbar}
              >
                <Menu color="#363636" size={18} />
              </button>
              <Link href="/diskusi">
                <a className={style.container_brand}>
                  <Image
                    src="/logo/lapakbelajar_real.png"
                    alt="lapak belajar"
                    width={33}
                    height={33}
                  />
                </a>
              </Link>
              {/* icon search untuk tampilan mobile */}
              <Link href="/diskusi/search/-">
                <a className={style.search_mobile}>
                  <Search size={18} color="#696969" />
                </a>
              </Link>
              {/*  */}
              <form
                action=""
                onSubmit={(evt) => handleSubmit(evt)}
                method="GET"
                className={style.search}
              >
                <Link href={`/diskusi/search/${query}`}>
                  <a style={{ display: "none" }} ref={linkRef}></a>
                </Link>
                <input
                  ref={inputQuerRef}
                  onChange={(evt) => setQuery(evt.target.value)}
                  type="text"
                  name="query"
                  placeholder="Telusuri apapun disini"
                />
                <button className={style.btn_transparent} type="submit">
                  <Search color="#696969" size={18} />
                </button>
              </form>
            </div>
            <div className={style.section_2}>
              <Link href="/diskusi">
                <a className={style.btn_ask}>Ajukan Pertanyaan</a>
              </Link>
              {auth.login ? (
                <div className={style.nav_profile}>
                  <Link href="/notifikasi">
                    <a className={style.notification}>
                      <Bell color="#363636" size={22} />
                      {notifikasi > 0 ? (
                        <div className={style.dotted}>
                          {notifikasi > 9 ? "9+" : notifikasi}
                        </div>
                      ) : (
                        ""
                      )}
                    </a>
                  </Link>
                  <Link href="/profile">
                    <a className={style.image_profile}>
                      <img src={auth.user.image} alt={auth.user.name} />
                    </a>
                  </Link>
                </div>
              ) : (
                <>
                  <Link href="/login">
                    <a className={style.btn_login}>Login</a>
                  </Link>
                </>
              )}
            </div>
            {/*  */}
          </div>
        </div>
      </nav>

      {/* sidebar */}
      <section
        className={style.sidebar}
        style={{ left: showSidebar ? "0%" : "-100%" }}
        id="overlay-sidebar"
      >
        <div className={style.sidebar_menu}>
          {/* header */}
          <div className={style.sidebar_header}>
            <Image
              src="/logo/lapakbelajar_real.png"
              alt="lapak belajar"
              width={32}
              height={32}
            />
            <button
              onClick={() => setShowSidebar(false)}
              type="button"
              className={style.btn_transparent}
            >
              <X color="#363636" size={18} />
            </button>
          </div>

          {/* menu */}
          <div className={style.topik}>
            <strong>Topik</strong>
            <Link href="/diskusi">
              <a>Diskusi</a>
            </Link>
            <Link href="/">
              <a>Privat</a>
            </Link>
            <Link href="/">
              <a>Artikel</a>
            </Link>
          </div>
          {/*  */}
        </div>
        <div></div>
      </section>
    </>
  );
}
