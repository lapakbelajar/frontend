import style from "./css/Privat.module.css";

// component
import Navbar from "../../molekul/navbar";

// local component
import Header from "./component/header";
import BoxLecturers from "./component/BoxLecturers";
import BoxActivity from "./component/BoxActivity";

// helper
import { encode as bs64encode } from "js-base64";

// icon
import { X } from "react-feather";
import { useEffect, useState } from "react";

// state management
import event from "./component/event";
import api from "../../config/api";

// authorization
import jwt from "jsonwebtoken";
import cookie from "js-cookie";

export default function Privat({ DataExpert }) {
  const [defaultDate, onChangeDate] = useState(new Date());
  const [markedDate, setMarkedDate] = useState(["04-12-2021", "05-12-2021"]);

  // data expert
  const [expert, setExpert] = useState([]);
  const [listKelas, setListKelas] = useState([]);
  const [user, setUser] = useState({});

  // sidebar style
  const [sidebarPosition, setSidebarPosition] = useState("-200%");

  useEffect(() => {
    listenActivity();
    setExpert(DataExpert);
    getUser();
  }, []);

  /**
   * Mendengarkan tombol aktivitas di klik
   * jika di klik maka akan menampilkan sidebar
   */

  function listenActivity() {
    event.subscribe(() => {
      const states = event.getState();
      if (states.type === "show_sidebar") {
        setSidebarPosition("0%");
      }
    });
  }

  /**
   *
   *cek apakah user login atau tidak
   */

  function getUser() {
    jwt.verify(cookie.get("auth_user"), api.jwt_key, (err, decoded) => {
      if (!err) {
        getClass(decoded.id);
        setUser(decoded);
      }
    });
  }

  /**
   * Mengambil kelas berdasarkan user
   */

  async function getClass(userid) {
    try {
      const req = await fetch(`${api.api_endpoint}/privat/byuser/${userid}`, {
        headers: {
          authorization: api.authorization,
        },
      });
      const res = await req.json();
      setListKelas(res);
    } catch (err) {
      //
    }
  }

  return (
    <>
      <Navbar />
      <div className={style.canvas}>
        <div className="container">
          {/* content */}
          <div className={style.content}>
            <div className={style.lecturers}>
              {/* headers */}
              <Header User={user} />

              {/* lecturers */}
              {expert.map((items, i) => (
                <BoxLecturers
                  name={items.profile.name}
                  image={items.profile.image}
                  university={items.profile.school}
                  skils={items.profile.keahlian}
                  key={i}
                  start_price={items.harga_awal}
                  id={bs64encode(items.profile.id.toString())}
                />
              ))}
              {/*  */}
            </div>
            <div className={style.sidebar} style={{ left: sidebarPosition }}>
              {/* header */}
              <div className={style.sidebar_header}>
                <button
                  className={style.btn_close}
                  onClick={() => setSidebarPosition("-200%")}
                >
                  <X color="#363636" size={22} />
                  <span>Tutup</span>
                </button>
              </div>
              {/* next activity */}
              <small className={style.sidebar_title}>Kelas mu</small>

              {listKelas.length > 0 ? (
                listKelas.map((items, i) => (
                  <BoxActivity
                    no={i + 1}
                    matpel={items.kelas.matpel}
                    tutor={items.kelas.tutor.name}
                    key={i}
                  />
                ))
              ) : (
                <div className={style.kosong}>
                  <img src="/icon/no-activity.svg" alt="tidak ada aktifitas" />
                  <span>Kosong</span>
                  <small>Kamu belum memilih kelas apapun</small>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
