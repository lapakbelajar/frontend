import style from "./css/Poin.module.css";

// component
import Navbar from "../../molekul/navbar";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

// arrow
import { ArrowRight, PlusCircle } from "react-feather";
import PoinNav from "./component/nav";
import DataRiwayat from "./component/DataRiwayat";
import DataPenarikan from "./component/DataPenarikan";

// state management
import { store } from "./component/states";
import { useEffect, useState } from "react";

// authorization
import jwt from "jsonwebtoken";
import cookie from "js-cookie";
import api, { jwt_key } from "../../config/api";

//
import { timeAgo } from "../../molekul/Time";

export default function Poin() {
  // user data
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState({
    id: 0,
    name: "",
  });

  // user financial
  const [riwayat, setRiwayat] = useState(true);
  const [finance, setFinance] = useState({
    poin: 0,
    kontribusi: 0,
    penarikan: 0,
  });

  // user contribution
  const [kontribusi, setKontribusi] = useState([]);
  const [startPoint, setStartPoint] = useState(0);
  const [endPoint, setEndPoint] = useState(15);

  // penarikan dana
  const [penarikanDana, setPenarikanDana] = useState([]);
  const [startDana, setStartDana] = useState(0);
  const [endDana, setEndDana] = useState(15);

  useEffect(() => {
    listenDatachange();
    Authorization();
  }, []);

  /**
   * authorisasi
   */

  function Authorization() {
    jwt.verify(cookie.get("auth_user"), jwt_key, (err, decoded) => {
      if (err) {
        setLogin(false);
        window.location.href = "/login";
      } else {
        setLogin(true);
        setUser(decoded);
        getFinance(decoded.id);
        getContribute(decoded.id);
        getPenarikanDana(decoded.id);
      }
    });
  }

  /**
   * mendapatkan data finansial user
   */

  async function getFinance(userid) {
    try {
      const req = await fetch(
        `${api.api_endpoint}/authentication/finansial?user_id=${userid}`,
        {
          headers: {
            authorization: api.authorization,
          },
        }
      );

      const res = await req.json();
      setFinance(res);
    } catch (err) {
      //
    }
  }

  /**
   * Mendapatkan data kontribusi user
   */

  async function getContribute(userid) {
    try {
      const req = await fetch(
        `${api.api_endpoint}/authentication/kontribusi/${startPoint}/${endPoint}?user_id=${userid}`,
        {
          headers: {
            authorization: api.authorization,
          },
        }
      );
      const res = await req.json();
      setKontribusi(res);
    } catch (err) {
      //
    }
  }

  /**
   * Mengambil history penarikan data user
   */

  async function getPenarikanDana(userid) {
    try {
      const req = await fetch(
        `${api.api_endpoint}/transaksi/get/0/15?user_id=${userid}`,
        {
          headers: {
            authorization: api.authorization,
          },
        }
      );
      const res = await req.json();
      setPenarikanDana(res);
    } catch (err) {
      //
    }
  }

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

  /**
   * Mendapatkan lebih banyak data
   */

  // mengambil lebih data riwayat kontribusi
  async function getMoreContribute() {
    try {
      const start = startPoint + 15;
      const end = endPoint + 15;
      const req = await fetch(
        `${api.api_endpoint}/authentication/kontribusi/${start}/${end}?user_id=${user.id}`,
        {
          headers: {
            authorization: api.authorization,
          },
        }
      );
      const res = await req.json();

      if (res.length > 0) {
        const data_baru = kontribusi.concat(res);
        setKontribusi(data_baru);
        setStartPoint(start);
        setEndPoint(end);
      }
    } catch (err) {
      //
      console.error(err);
    }
  }

  // mendapatkan lebih banyak data riwayat penarikan
  async function getMorePenarikan() {
    try {
      const start = startDana + 15;
      const end = endDana + 15;
      const req = await fetch(
        `${api.api_endpoint}/transaksi/get/${start}/${end}?user_id=${user.id}`,
        {
          headers: {
            authorization: api.authorization,
          },
        }
      );
      const res = await req.json();
      if (res.length > 0) {
        const data_baru = penarikanDana.concat(res);
        setPenarikanDana(data_baru);
        setStartDana(start);
        setEndDana(end);
      }
    } catch (err) {
      //
      console.error(err);
    }
  }

  return (
    <>
      <Head>
        <title>Keterangan Finansial mu</title>
      </Head>
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
              <h3 className={style.value}>{finance.poin.toLocaleString()}</h3>
              <small className={style.keterangan}>
                estimasi Rp.{" "}
                {((finance.poin.toLocaleString() / 10) * 2000).toLocaleString()}
              </small>
            </div>

            <div className={style.box_info}>
              <Image
                src="/icon/coin-chat.svg"
                alt="coin"
                width={35}
                height={35}
              />
              <small className={style.title}>Total Kontribusi</small>
              <h3 className={style.value}>
                {finance.kontribusi.toLocaleString()}
              </h3>
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
              <h3 className={style.value}>
                {finance.penarikan.toLocaleString()}
              </h3>
              <small className={style.keterangan}>Penarikan</small>
            </div>
          </div>

          {/* navigasi */}
          <PoinNav />
          {/* riwayat menjawab */}
          {riwayat ? (
            <>
              {kontribusi.map((items, i) => (
                <DataRiwayat
                  waktu={timeAgo.format(new Date(items.forum.waktu))}
                  pertanyaan={items.forum.pertanyaan}
                  user={items.forum.anonim ? "anonim" : items.forum.user.name}
                  identitas={items.forum.identitas}
                  key={i}
                />
              ))}
              <div className={style.container_more}>
                <button
                  onClick={() => getMoreContribute()}
                  type="button"
                  className={style.load_more}
                >
                  <PlusCircle color="#363663" size={22} />
                  <span>Muat lebih banyak</span>
                </button>
              </div>
            </>
          ) : (
            <>
              {penarikanDana.map((items, i) => (
                <DataPenarikan
                  key={i}
                  waktu={timeAgo.format(new Date(items.waktu))}
                  judul={`Mencairkan ${
                    items.poin
                  } ( Rp. ${items.nominal.toLocaleString()})`}
                  media={items.media}
                  terbayar={items.terbayar}
                />
              ))}
              <div className={style.container_more}>
                <button
                  onClick={() => getMorePenarikan()}
                  type="button"
                  className={style.load_more}
                >
                  <PlusCircle color="#363663" size={22} />
                  <span>Muat lebih banyak</span>
                </button>
              </div>
            </>
          )}
          {/*  */}
        </div>
      </div>
    </>
  );
}
