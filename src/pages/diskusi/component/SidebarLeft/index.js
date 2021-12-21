import style from "./Sidebar.module.css";

// component
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SidebarLeft({ Data }) {
  const [matpel, setMatpel] = useState([]);
  const [topik, setTopik] = useState([]);

  useEffect(() => {
    createMatpel(Data);
  }, [Data]);

  /**
   * fungsi dibawah ini digunakan untuk membuat sebuah mata pelajaran
   * dari data yang dikrimkan server
   */

  function createMatpel(Metadata = []) {
    if (Metadata.length > 0) {
      let matpel = [];
      let topik = [];

      Metadata.slice(0, 15).forEach((items) => {
        // memasukan data mata pelajaran jika belum dimasukan
        if (!matpel.includes(items.forum.jurusan)) {
          matpel.push(items.forum.jurusan);
        }

        // memasukan data topik jika belum dimasukan
        if (!topik.includes(items.forum.jenjang)) {
          topik.push(items.forum.jenjang);
        }
      });
      setMatpel(matpel);
      setTopik(topik);
    }
  }

  return (
    <div className={style.sidebar_left}>
      <div className={style.topik}>
        <strong>TOPIK</strong>
        {topik.map((items, i) => (
          <Link href={`/diskusi/jenjang/${items}`} key={i}>
            <a className={style.link_sidebar}>{items}</a>
          </Link>
        ))}
      </div>
      <div className={style.topik}>
        <strong>JURUSAN</strong>
        {matpel.map((items, i) => (
          <Link href={`/diskusi/jurusan/${items}`} key={i}>
            <a className={style.link_sidebar}>{items}</a>
          </Link>
        ))}
      </div>
    </div>
  );
}
