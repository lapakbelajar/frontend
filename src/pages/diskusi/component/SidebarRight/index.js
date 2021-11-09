import style from "./Sidebar.module.css";

// component
import Link from "next/link";

export default function SidebarRight() {
  return (
    <>
      <div className={style.sidebar_right}>
        {/* hangat dibicarakan */}
        <div className={style.right_box}>
          <div className={style.box_header}>
            <h4>Hangat Dibicarakan</h4>
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
