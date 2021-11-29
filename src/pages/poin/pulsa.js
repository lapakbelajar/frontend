import style from "./css/Poin.module.css";

// component
import Head from "next/head";

// icon
import { ArrowRight, ArrowLeft } from "react-feather";

export default function Pulsa() {
  return (
    <>
      <Head>
        <title>Metode Pembayaran Pulsa</title>
      </Head>
      <div
        className={style.container}
        style={{ backgroundColor: "white", marginTop: 0, paddingTop: "100px" }}
      >
        <div className={style.canvas}>
          {/* tombol kembali */}
          <div
            onClick={() => window.history.back()}
            className={style.metode_header}
          >
            <ArrowLeft color="#696969" size={22} />
            <span>Kembali</span>
          </div>
          {/*  */}
          <h4 className={style.text_metode}>Pilih Metode Pembayaran</h4>
          <small className={style.sub_header}>
            Penarikan akan dilakukan maksimal 2x24 jam
          </small>

          {/* form */}
          <form action="" method="POST" className={style.form}>
            <label htmlFor="#nama">Nama Lengkap</label>
            <input
              autoFocus
              id="nama"
              type="text"
              className="form-control"
              placeholder="Masukan nama lengkap mu"
            />
            <label htmlFor="#norek">Nomor Handphone</label>
            <input
              id="norek"
              type="text"
              className="form-control"
              placeholder="Masukan nomor hp kamu"
            />
            <button className="btn btn-primary" type="submit">
              Kirim
            </button>
          </form>
          {/*  */}
        </div>
      </div>
    </>
  );
}
