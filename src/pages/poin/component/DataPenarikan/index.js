import style from "../../css/Poin.module.css";
import Link from "next/link";

export default function DataPenarikan({ waktu, judul, media, terbayar }) {
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
      <Link href="/">
        <a className={style.body}>
          <div className={style.is_body}>
            <div className={style.deskripsi}>
              <strong>{judul}</strong>
              <span>Melakukan penarikan melalui {media}</span>
            </div>
            <div className={style.status}>
              {terbayar ? (
                <span className="badge bg-success text-dark">berhasil</span>
              ) : (
                <span className="badge bg-warning text-dark">pending</span>
              )}
            </div>
          </div>
        </a>
      </Link>
      {/*  */}
    </div>
  );
}
