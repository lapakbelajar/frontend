import style from "../../css/Poin.module.css";
import Link from "next/link";

export default function DataPenarikan() {
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
            <div className={style.deskripsi}>
              <strong>Menarik 200 poin ( Rp. 50,000 )</strong>
              <span>Melakukan penarikan melalui DANA</span>
            </div>
            <div className={style.status}>
              <span className="badge bg-warning text-dark">pending</span>
            </div>
          </div>
        </a>
      </Link>
      {/*  */}
    </div>
  );
}
