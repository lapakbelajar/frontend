import style from "./Navbar.module.css";

// component
import Image from "next/image";
import Link from "next/link";

// icon
import {
  Search,
  Menu,
  X,
  Bell,
  MessageCircle,
  User,
  Book,
  PenTool,
} from "react-feather";
import { useEffect, useRef, useState } from "react";

// authorization
import api, { jwt_key, api_endpoint, authorization } from "../../config/api";
import cookie from "js-cookie";
import { isUserLogin } from "../../pages/home/helper";

export default function Navbar({ page }) {
  const linkRef = useRef(null);
  const inputQuerRef = useRef(null);

  const [auth, setAuth] = useState({ login: false, user: {} });
  const [notification, setNotification] = useState([]);
  const [query, setQuery] = useState("");

  const [notifikasi, setNotif] = useState(0);
  const [poin, setPoin] = useState(0);

  useEffect(() => {
    handleSidebar();

    // mengani user
    const userCheck = isUserLogin(cookie.get("auth_user"), jwt_key);
    if (userCheck.login) {
      jumlahPoint(userCheck.user.id);
      setAuth(userCheck);
      getNotif(userCheck.user.id);
    }
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

  /**
   * Mengambil jumlah point
   */

  async function jumlahPoint(userid) {
    try {
      const req = await fetch(
        `${api.api_endpoint}/authentication/poin?user_id=${userid}`,
        {
          headers: {
            authorization: api.authorization,
          },
        }
      );

      const res = await req.json();
      setPoin(res.poin);
    } catch (err) {
      //
    }
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

  /**
   * Menangani user logout
   */

  function handleLogOut() {
    cookie.set("auth_user", {}, { expires: 0, path: "/" });
    window.location.href = "/diskusi";
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
              <div className={style.section_nav}>
                <Link href="/diskusi">
                  <a
                    className={
                      page === "diskusi"
                        ? style.active_nav_link
                        : style.nav_link
                    }
                  >
                    Diskusi
                  </a>
                </Link>
                <Link href="/privat">
                  <a
                    className={
                      page === "privat" ? style.active_nav_link : style.nav_link
                    }
                  >
                    Privat
                  </a>
                </Link>
              </div>
              {auth.login ? (
                <div className={style.nav_profile}>
                  {/* kolom poin */}
                  <Link href="/poin">
                    <a className={style.points}>
                      <img src="/icon/coin-small.svg" alt="coin" />
                      <span>{poin.toLocaleString()}</span>
                    </a>
                  </Link>

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
              <a
                className={
                  page === "diskusi" ? style.active_nav_link : style.nav_link
                }
              >
                <MessageCircle color="#c4c4c4" size={18} />
                <span>Diskusi</span>
              </a>
            </Link>
            <Link href="/privat">
              <a
                className={
                  page === "privat" ? style.active_nav_link : style.nav_link
                }
              >
                <PenTool color="#c4c4c4" size={18} />
                <span>Privat</span>
              </a>
            </Link>
            <Link href="/soon">
              <a
                className={
                  page === "artikel" ? style.active_nav_link : style.nav_link
                }
              >
                <Book color="#c4c4c4" size={18} />
                <span>Artikel</span>
              </a>
            </Link>
          </div>
          {auth.login ? (
            <span onClick={() => handleLogOut()} className={style.logout}>
              Log out
            </span>
          ) : (
            ""
          )}
          {/*  */}
        </div>
        <div></div>
      </section>
    </>
  );
}
