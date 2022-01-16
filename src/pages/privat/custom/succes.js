import style from "./css/Jadwal.module.css";
import Link from "next/link";

export default function KelasSukses() {
  return (
    <div className={style.centered}>
      <div className={style.centered_canvas}>
        <img
          src="https://cdn.lapakbelajar.com/content/61df79b1f0f7b.svg"
          alt="berhasil"
        />
        <h4>Pemesanan Berhasil</h4>
        <p>
          Kamu hanya perlu menunggu persetujuan tutor dan melanjutkan ke
          pembayaran yang akan kami informasikan melalui email kamu
        </p>
        <Link href="/privat/data/khusus">
          <a className="btn btn-primary mt-3" style={{ fontSize: "14px" }}>
            Kembali
          </a>
        </Link>
      </div>
    </div>
  );
}
