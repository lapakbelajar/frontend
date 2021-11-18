import style from "./css/Notifikasi.module.css";

// component
import Navbar from "../../molekul/navbar";
import NotificationBox from "./component/notif";
import Head from "next/head";

// authentication & authorization
import jwt from "jsonwebtoken";
import cookie from "js-cookie";
import api, { jwt_key } from "../../config/api";
import { useEffect, useState } from "react";

// time
import { timeAgo } from "../../molekul/Time";

export default function Notifikasi() {
  const [notifikasi, setNotifikasi] = useState([]);
  const [user, setUser] = useState({
    id: 0,
    nama: "",
  });

  useEffect(() => {
    authenticate();
  }, []);

  /**
   * digunakan untuk melakukan authentikasi
   */

  function authenticate() {
    jwt.verify(cookie.get("auth_user"), jwt_key, (err, decoded) => {
      if (err) {
        window.location.href = "/login";
      } else {
        setUser(decoded);
        getNotif(decoded.id);
      }
    });
  }

  /**
   * mengambil data notifikasi
   */

  async function getNotif(userid) {
    const req = await fetch(`${api.api_endpoint}/notifikasi/get/${userid}`, {
      headers: {
        authorization: api.authorization,
      },
    });

    const res = await req.json();
    setNotifikasi(res);
  }

  return (
    <>
      <Head>
        <title>Notifikasi</title>
      </Head>
      <Navbar />
      <div className={style.container}>
        <div className={style.canvas}>
          {/* box notifikasi */}
          {notifikasi.map((items, i) => (
            <NotificationBox
              user={items.pengirim}
              pesan={items.pesan}
              waktu={timeAgo.format(new Date(items.waktu))}
              tautan={items.tautan}
              anonim={items.anonim}
              id={items.id}
              key={i}
            />
          ))}
          {/*  */}
        </div>
      </div>
    </>
  );
}
