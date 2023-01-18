import style from "./Sidebar.module.css";

// component
import Link from "next/link";
import { ArrowRight } from "react-feather";
import { encode } from "js-base64";

//
import { useEffect, useState } from "react";
import api from "../../../../config/api";

export default function SidebarRight({ DataTrends }) {
  const [trending, setTrending] = useState([]);
  const [tutor, setTutor] = useState([]);

  useEffect(() => {
    setTrending(DataTrends);
    getTutor();
  }, [DataTrends]);

  // mengambil 5 data tutor

  async function getTutor() {
    try {
      const req = await fetch(`${api.api_endpoint}/privat/expert/0/5`, {
        headers: {
          authorization: api.authorization,
        },
      });
      const res = await req.json();
      console.log(res)
      setTutor(res);
    } catch (err) {
      //
    }
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
          {(trending || []).map((items, i) => (
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
        {/* <div className={style.right_box}>
          <div className={style.box_header}>
            <h4>Tutor</h4>
            <small>Siap membantu kamu belajar</small>
          </div>
          {(tutor || []).map((items, i) => (
            <Link
              href={`/privat/detail/${encode(items.profile.id.toString())}`}
              key={i}
            >
              <a className={style.tutor}>
                <img
                  src={items.profile.image}
                  loading="lazy"
                  className={style.tutor_img}
                  alt={items.profile.name}
                />
                <div className={style.tutor_desc}>
                  <h4>{items.profile.name}</h4>
                  <small>{items.profile.keahlian}</small>
                </div>
              </a>
            </Link>
          ))}
          <Link href="/privat">
            <a className={style.tutor_nav}>
              <span>Lihat Selengkapnya</span>
              <ArrowRight color="#363636" size={18} />
            </a>
          </Link>
        </div> */}
      </div>
    </>
  );
}
