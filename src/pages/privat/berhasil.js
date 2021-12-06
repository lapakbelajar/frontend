import style from "./css/Berhasil.module.css";

// component
import Link from "next/link";

export default function Berhasil() {
  return (
    <div className={style.container}>
      <div className={style.canvas}>
        <img src="/icon/success.svg" alt="success" />
        <h4>Berhasil</h4>
        <p>
          Pemesanan mu berhasil, kamu hanya perlu mengunggu persetujuan tutor
          untuk memulai privat dan akan kami konfirmasi melalui email kamu
        </p>
        <Link href="/privat">
          <a className="btn btn-primary btn-block">Kembali</a>
        </Link>
      </div>
    </div>
  );
}
