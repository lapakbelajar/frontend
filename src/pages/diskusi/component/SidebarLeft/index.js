import style from "./Sidebar.module.css";

// component
import Link from "next/link";

export default function SidebarLeft() {
  return (
    <div className={style.sidebar_left}>
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
    </div>
  );
}
