import style from "./Sidebar.module.css";

// component
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SidebarLeft({ Data }) {
  const [matpel, setMatpel] = useState([]);
  const [topik, setTopik] = useState([]);

  useEffect(() => {
    createMatpel(Data);
  }, []);

  /**
   * fungsi dibawah ini digunakan untuk membuat sebuah mata pelajaran
   * dari data yang dikrimkan server
   */

  function createMatpel(Metadata = []) {
    Metadata.slice(0, 15).forEach((items) => {
      setMatpel([...matpel, items.forum.jurusan]);
      setTopik([...topik, items.forum.jenjang]);
    });
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
        <strong>MATA PELAJARAN</strong>
        {matpel.map((items, i) => (
          <Link href={`/diskusi/jurusan/${items}`} key={i}>
            <a className={style.link_sidebar}>{items}</a>
          </Link>
        ))}
      </div>
    </div>
  );
}
