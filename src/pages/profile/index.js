// style
import style from "./css/Profile.module.css";

// component
import Navbar from "../../molekul/navbar";
import Sidebar from "./component/sidebar";
import BoxDiskusi from "../../molekul/BoxDiskusi";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

// api and hook
import api, { authorization } from "../../config/api";
import { useState, useEffect } from "react";

// authorization
import jwt from "jsonwebtoken";
import cookie from "js-cookie";

export default function Profile() {
  const [listDiskusi, setListDiskusi] = useState([]);
  const [user, setUser] = useState({
    id: 0,
    name: "",
  });

  useEffect(() => {
    authorize();
  }, []);

  /**
   * Menangani authorisasi user
   *
   */

  function authorize() {
    jwt.verify(cookie.get("auth_user"), api.jwt_key, (err, decoded) => {
      if (err) {
        window.location.href = "/login";
      } else {
        getUserData(decoded.id);
        setUser(decoded);
      }
    });
  }

  /**
   * mengambil data diskusi berdasarkan user
   */

  async function getUserData(userid) {
    const req = await fetch(
      `${api.api_endpoint}/forum/ambil/user?user_id=${userid}&start=0&end=16`,
      {
        headers: {
          authorization: api.authorization,
        },
      }
    );
    const res = await req.json();
    setListDiskusi(res);
  }
  return (
    <>
      <Head>
        <title>Profile {user.name} - Lapak Belajar</title>
      </Head>
      <Navbar />
      <div className={style.container}>
        <div className="container">
          <div className={style.main}>
            {/* sidebar */}
            <Sidebar />
            {/* main content */}
            <div className={style.main_content}>
              {listDiskusi.length > 0 ? (
                listDiskusi.map((items, i) => (
                  <BoxDiskusi
                    key={i}
                    forum={items.forum}
                    user={items.forum.user}
                    jumlah_response={items.jumlah_response}
                    lampiran={items.media}
                    jawaban={items.jawaban}
                  />
                ))
              ) : (
                <div className={style.null_container}>
                  <Image
                    src="/illustration/null-content.svg"
                    alt="null"
                    width={150}
                    height={180}
                  />
                  <h5>Data masih kosong</h5>
                  <p>Kamu belum mengajukan pertanyaan apapun</p>
                  <Link href="/diskusi">
                    <a className={style.btn_bertanya}>Ajukan Pertanyaan</a>
                  </Link>
                </div>
              )}
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
}
