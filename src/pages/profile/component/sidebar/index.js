import style from "../../css/Profile.module.css";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className={style.sidebar}>
      <Link href="/profile">
        <a className={style.box_sidebar}>Pertanyaan</a>
      </Link>
      {/* <Link href="/profile/diikuti">
        <a className={style.box_sidebar}>Diskusi yang kamu ikuti</a>
      </Link> */}
      <Link href="/profile/pengaturan">
        <a className={style.box_sidebar}>Pengaturan</a>
      </Link>
    </div>
  );
}
