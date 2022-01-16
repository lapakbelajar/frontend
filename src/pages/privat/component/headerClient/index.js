import style from "./Header.module.css";

import Link from "next/link";

export default function HeaderClient({ page }) {
  return (
    <div className={style.nav_dashboard}>
      <Link href="/privat/data">
        <a className={page === "index" ? style.active_links : style.nav_links}>
          Kelas
        </a>
      </Link>
      <Link href="/privat/data/khusus">
        <a className={page === "khusus" ? style.active_links : style.nav_links}>
          Kelas Khusus
        </a>
      </Link>
      <Link href="/privat/data/laporan">
        <a
          className={page === "laporan" ? style.active_links : style.nav_links}
        >
          Laporan
        </a>
      </Link>
      <Link href="/privat/data/tagihan">
        <a
          className={page === "tagihan" ? style.active_links : style.nav_links}
        >
          Tagihan
        </a>
      </Link>
    </div>
  );
}
