import style from "./Komentar.module.css";
import Image from "next/image";

// state management
import { store } from "../../../../../config/redux/store";
import api from "../../../../../config/api";
import { useEffect, useState } from "react";

export default function Komentar({ IdentitasJawaban }) {
  // menghitung komentar
  const [jumlah, setJumlah] = useState(0);

  useEffect(() => {
    countComments();
  }, []);

  async function countComments() {
    const req = await fetch(
      `${api.api_endpoint}/jawaban/komentar/hitung?jawaban_identitas=${IdentitasJawaban}`,
      {
        headers: {
          authorization: api.authorization,
        },
      }
    );

    const res = await req.json();
    setJumlah(res.jumlah);
  }

  return (
    <div className={style.container}>
      <div></div>
      {/* <button type="button" className={style.btn_action}>
        <Image src="/icon/jempol.svg" alt="jempol" width={27} height={30} />
        <span>10</span>
      </button> */}
      <button
        onClick={() => {
          store.dispatch({
            type: "detail_box_komentar",
            payload: { visibility: true },
          });
        }}
        type="button"
        className={style.btn_action}
      >
        <Image
          src="/icon/komentar-black.svg"
          alt="komentar"
          width={27}
          height={30}
        />
        <span>{jumlah > 0 ? jumlah : "Tambahkan Komentar"}</span>
      </button>
    </div>
  );
}
