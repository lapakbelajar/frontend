import style from "../css/Dashboard.module.css";

// component
import CenterComponent from "../../../../templates/centered";
import Link from "next/link";

export default function DashboardTemplates({ children }) {
  return (
    <CenterComponent>
      <h3 className={style.header_text}>Data Privat</h3>
      <small className={style.sub_header}>
        Semua data tentang privat mu akan ditampilkan dibawah ini
      </small>

      {/* navigation */}
      <div className={style.nav}>
        <Link href="/privat/dashboard">
          <a className={style.link_nav}>Privat</a>
        </Link>
        <Link href="/privat/dashboard/persetujuan">
          <a className={style.link_nav}>Menunggu Persetujuan</a>
        </Link>
        <Link href="/privat/dashboard/siswa">
          <a className={style.link_nav}>Siswa</a>
        </Link>
        <Link href="/privat/dashboard/pengaturan">
          <a className={style.link_nav}>Pengaturan</a>
        </Link>
      </div>

      {children}
    </CenterComponent>
  );
}
