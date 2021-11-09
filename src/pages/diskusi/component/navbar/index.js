import style from "./Navbar.module.css";

// component
import Image from "next/image";
import Link from "next/link";

// icon
import { Search, Menu, X } from "react-feather";
import { useEffect, useState } from "react";

export default function Navbar() {
  useEffect(() => {
    handleSidebar();
  }, []);
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
              <Image
                src="/logo/lapakbelajar_real.png"
                alt="lapak belajar"
                width={33}
                height={25}
              />
              {/* icon search untuk tampilan mobile */}
              <Link href="/telusuri">
                <a className={style.search_mobile}>
                  <Search size={18} color="#696969" />
                </a>
              </Link>
              {/*  */}
              <form action="" method="GET" className={style.search}>
                <input
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
              <Link href="/">
                <a className={style.btn_ask}>Ajukan Pertanyaan</a>
              </Link>

              <Link href="/">
                <a className={style.btn_login}>Login</a>
              </Link>
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
            <Link href="/">
              <a className={style.link_sidebar}>SMA</a>
            </Link>
            <Link href="/">
              <a className={style.link_sidebar}>SMK</a>
            </Link>
          </div>
          <div className={style.topik}>
            <strong>Mata Pelajaran</strong>
            <Link href="/">
              <a className={style.link_sidebar}>Matematika</a>
            </Link>
            <Link href="/">
              <a className={style.link_sidebar}>Geografi</a>
            </Link>
            <Link href="/">
              <a className={style.link_sidebar}>Akuntansi</a>
            </Link>
            <Link href="/">
              <a className={style.link_sidebar}>Seni Budaya</a>
            </Link>
          </div>
          {/*  */}
        </div>
        <div></div>
      </section>
    </>
  );
}
