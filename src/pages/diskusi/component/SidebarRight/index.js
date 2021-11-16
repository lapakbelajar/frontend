import style from "./Sidebar.module.css";

// component
import Link from "next/link";
import api from "../../../../config/api";
import { useEffect, useState } from "react";

export default function SidebarRight() {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    getTrends();
  }, []);

  /**
   * fungsi dibawah ini digunakan untuk mengambil data trending
   */

  function getTrends() {
    fetch(`${api.api_endpoint}/forum/stats/ambil`, {
      headers: {
        authorization: api.authorization,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((final) => {
        setTrending(final);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <div className={style.sidebar_right}>
        {/* hangat dibicarakan */}
        <div className={style.right_box}>
          <div className={style.box_header}>
            <h4>Hangat Dibicarakan</h4>
          </div>

          {/*  */}
          {trending.map((items, i) => (
            <div className={style.content_box} key={i}>
              <Link href={`/diskusi/detail/${items.identitas}`}>
                <a className={style.link_box}>
                  {items.pertanyaan.length > 25
                    ? `${items.pertanyaan.slice(0, 25)}...`
                    : items.pertanyaan}
                </a>
              </Link>
              <small>{items.anonim ? "oleh anonim" : items.user.name}</small>
            </div>
          ))}
        </div>

        {/* diskusi user */}
        <div className={style.right_box}>
          <div className={style.box_header}>
            <h4>Diskusi Mu</h4>
          </div>

          {/*  */}
          <div className={style.content_box}>
            <Link href="/">
              <a className={style.link_box}>Ujian SBMTPN 2022</a>
            </Link>
            <small>22 respon</small>
          </div>
          <div className={style.content_box}>
            <Link href="/">
              <a className={style.link_box}>Try Out SBMPTN</a>
            </Link>
            <small>22 respon</small>
          </div>
        </div>
      </div>
    </>
  );
}
