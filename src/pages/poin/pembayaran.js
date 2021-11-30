import style from "./css/Poin.module.css";

// component
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

// icon
import { ArrowRight, ArrowLeft } from "react-feather";

export default function Pembayaran() {
  return (
    <>
      <Head>
        <title>Pilih Metode Penarikan</title>
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
          <div className={style.kolom_metode}>
            {/*  */}
            <Link href="/pembayaran/bank">
              <a className={style.box_info}>
                <Image
                  src="/icon/metode-bank.svg"
                  alt="coin"
                  width={35}
                  height={35}
                />
                <small className={style.title}>Transfer Bank</small>
                <span className={style.value_text}>
                  Uang akan dikirim ke rekening bank kamu
                </span>
                <small className={style.pilih}>
                  <strong>pilih</strong>
                  <ArrowRight color="#363636" size={18} />
                </small>
              </a>
            </Link>

            <Link href="/pembayaran/dana">
              <a className={style.box_info}>
                <Image
                  src="/icon/metode-dana.png"
                  alt="coin"
                  width={74}
                  height={41}
                />
                <small className={style.title}>DANA</small>
                <span className={style.value_text}>
                  Uang akan dikirimkan ke akun dana kamu
                </span>
                <small className={style.pilih}>
                  <strong>pilih</strong>
                  <ArrowRight color="#363636" size={18} />
                </small>
              </a>
            </Link>

            <Link href="/pembayaran/pulsa">
              <a className={style.box_info}>
                <Image
                  src="/icon/metode-pulsa.svg"
                  alt="coin"
                  width={35}
                  height={35}
                />
                <small className={style.title}>Pulsa Seluler</small>
                <span className={style.value_text}>
                  Poin akan ditukarkan dengan pulsa
                  <br />
                </span>
                <small className={style.pilih}>
                  <strong>pilih</strong>
                  <ArrowRight color="#363636" size={18} />
                </small>
              </a>
            </Link>

            {/*  */}
          </div>
        </div>
      </div>
    </>
  );
}
