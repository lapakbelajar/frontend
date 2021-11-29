import style from "../../css/Poin.module.css";
import Link from "next/link";

export default function DataRiwayat() {
  return (
    <div className={style.box_riwayat}>
      {/* header */}
      <div className={style.riwayat_header}>
        <div className={style.dotted}></div>
        <div className={style.waktu_riwayat}>
          <span>20 november 2021</span>
        </div>
      </div>
      {/* body */}
      <Link href="/">
        <a className={style.body}>
          <div className={style.is_body}>
            <strong>Membantu menjawab pertanyaan anonim</strong>
            <span>
              bagaimana cara mendapatkan nilai terbaik pada waktu ujian nasional
            </span>
          </div>
        </a>
      </Link>
      {/*  */}
    </div>
  );
}
