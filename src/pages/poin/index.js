import style from "./css/Poin.module.css";

// component
import Navbar from "../../molekul/navbar";
import Image from "next/image";
import Link from "next/link";

// arrow
import { ArrowRight } from "react-feather";
import PoinNav from "./component/nav";
import DataRiwayat from "./component/DataRiwayat";
import DataPenarikan from "./component/DataPenarikan";

// state management
import { store } from "./component/states";
import { useEffect, useState } from "react";

export default function Poin() {
  const [riwayat, setRiwayat] = useState(true);

  useEffect(() => {
    listenDatachange();
  }, []);

  /**
   * Mendengarkan event navigasi di klik
   *
   */
  function listenDatachange() {
    store.subscribe(() => {
      const state = store.getState();
      if (state.type === "riwayat") {
        setRiwayat(true);
      } else {
        setRiwayat(false);
      }
    });
  }

  return (
    <>
      <Navbar />
      <div className={style.container}>
        <div className={style.canvas}>
          {/* tombol pengajuan pencairan */}
          <Link href="/pembayaran/metode">
            <a className={style.btn_pencairan}>
              <span>Ajukan Pencarian Uang</span>
              <ArrowRight color="#ffffff" size={18} />
            </a>
          </Link>
          {/* personal information */}
          <div className={style.info}>
            <div className={style.box_info}>
              <Image
                src="/icon/coin-large.svg"
                alt="coin"
                width={35}
                height={35}
              />
              <small className={style.title}>Total Poin</small>
              <h3 className={style.value}>230</h3>
              <small className={style.keterangan}>estimasi Rp. 250,000</small>
            </div>

            <div className={style.box_info}>
              <Image
                src="/icon/coin-chat.svg"
                alt="coin"
                width={35}
                height={35}
              />
              <small className={style.title}>Total Kontribusi</small>
              <h3 className={style.value}>20</h3>
              <small className={style.keterangan}>pertanyaan</small>
            </div>

            <div className={style.box_info}>
              <Image
                src="/icon/coin-arrow.svg"
                alt="coin"
                width={35}
                height={35}
              />
              <small className={style.title}>Total Penarikan</small>
              <h3 className={style.value}>3</h3>
              <small className={style.keterangan}>Penarikan</small>
            </div>
          </div>

          {/* navigasi */}
          <PoinNav />
          {/* riwayat menjawab */}
          {riwayat ? <DataRiwayat /> : <DataPenarikan />}
          {/*  */}
        </div>
      </div>
    </>
  );
}
