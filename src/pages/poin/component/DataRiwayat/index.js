import style from "../../css/Poin.module.css";
import Link from "next/link";

export default function DataRiwayat({ waktu, user, pertanyaan, identitas }) {
  return (
    <div className={style.box_riwayat}>
      {/* header */}
      <div className={style.riwayat_header}>
        <div className={style.dotted}></div>
        <div className={style.waktu_riwayat}>
          <span>{waktu}</span>
        </div>
      </div>
      {/* body */}
      <Link href={`/diskusi/detail/${identitas}`}>
        <a className={style.body}>
          <div className={style.is_body}>
            <strong>Membantu menjawab pertanyaan {user}</strong>
            <span>
              {pertanyaan.length >= 120
                ? `${pertanyaan.slice(0, 120)}...`
                : pertanyaan}
            </span>
          </div>
        </a>
      </Link>
      {/*  */}
    </div>
  );
}
