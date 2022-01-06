import style from "./Sidebar.module.css";

// component
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SidebarLeft({ Data }) {
  const [matpel, setMatpel] = useState([]);
  const [jurusan, setJurusan] = useState([]);
  const [topik, setTopik] = useState([]);

  useEffect(() => {
    createJurusan(Data);
  }, [Data]);

  /**
   * fungsi dibawah ini digunakan untuk membuat sebuah mata pelajaran
   * dari data yang dikrimkan server
   */

  function createJurusan(Metadata = []) {
    if (Metadata.length > 0) {
      let jurusan = [];
      let topik = [];
      let matpel = [];

      Metadata.slice(0, 15).forEach((items) => {
        // memasukan data mata pelajaran jika belum dimasukan
        if (!jurusan.includes(items.forum.jurusan)) {
          jurusan.push(items.forum.jurusan);
        }

        // memasukan data topik jika belum dimasukan
        if (!topik.includes(items.forum.jenjang)) {
          topik.push(items.forum.jenjang);
        }

        // memasukan matpel jika belum dimasukan
        if (!matpel.includes(items.forum.matpel)) {
          matpel.push(items.forum.matpel);
        }
      });
      setMatpel(matpel);
      setJurusan(jurusan);
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
        {jurusan.map((items, i) => (
          <Link href={`/diskusi/jurusan/${items}`} key={i}>
            <a className={style.link_sidebar}>{items}</a>
          </Link>
        ))}
      </div>
      <div className={style.topik}>
        <strong>MATA PELAJARAN</strong>
        {matpel.map((items, i) => (
          <Link href={`/diskusi/matpel/${items}`} key={i}>
            <a className={style.link_sidebar}>{items}</a>
          </Link>
        ))}
      </div>
    </div>
  );
}
