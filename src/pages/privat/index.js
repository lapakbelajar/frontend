import style from "./css/Privat.module.css";

// component
import Navbar from "../../molekul/navbar";
import Head from "next/head";

// local component
import Header from "./component/header";
import BoxLecturers from "./component/BoxLecturers";
import BoxActivity from "./component/BoxActivity";
import PopUp from "./component/PopUp";

// helper
import { encode as bs64encode } from "js-base64";

// icon
import { X } from "react-feather";
import { useEffect, useState, useRef } from "react";

// state management
import event from "./component/event";
import api from "../../config/api";

// authorization
import jwt from "jsonwebtoken";
import cookie from "js-cookie";

export default function Privat({ DataExpert }) {
  // filter
  const wilayahRef = useRef(null);
  const keahlianRef = useRef(null);
  const [position, setPosition] = useState("-200%");
  const [wilayah, setWilayah] = useState("");
  const [keahlian, setKeahlian] = useState("");
  //

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
      switch (states.type) {
        case "show_sidebar":
          setSidebarPosition("0%");
          break;
        case "filter_privat":
          setPosition("-200%");
          break;
        case "show_filter_privat":
          setPosition("0%");
          break;
        default:
        //
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

  /**
   * Mencari data expert berdasarkan keahlian tertentu
   */

  async function filterExpert(evt) {
    evt.preventDefault();

    const req = await fetch(
      `${api.api_endpoint}/privat/byskill/0/15?keahlian=${keahlian}&wilayah=${wilayah}`,
      {
        headers: {
          authorization: api.authorization,
        },
      }
    );
    const res = await req.json();
    setExpert(res);

    if (req.status === 200) {
      wilayahRef.current.value = "";
      keahlianRef.current.value = "";
      setPosition("-200%");
    }
  }

  return (
    <>
      <Head>
        <title>
          Temukan tutor untuk menemani belajar sesuai dengan keinginan mu
        </title>
      </Head>
      <Navbar />

      {/* filter */}
      <PopUp
        eventName="filter_privat"
        position={position}
        className={style.filter}
      >
        <div className={style.container_filter}>
          <h4>Filter</h4>
          <small>Cari tutor sesuai dengan kriteria yang kamu inginkan</small>
          <form
            onSubmit={(evt) => filterExpert(evt)}
            action=""
            className={style.form_filter}
          >
            <label htmlFor="matpel">Mata Pelajaran</label>
            <input
              ref={keahlianRef}
              onChange={(evt) => setKeahlian(evt.target.value)}
              type="text"
              id="matpel"
              className="form-control"
              placeholder="Masukan nama mata pelajaran"
              name="matpel"
            />
            <label htmlFor="wilayah">Wilayah</label>
            <input
              ref={wilayahRef}
              onChange={(evt) => setWilayah(evt.target.value)}
              type="text"
              id="wilayah"
              className="form-control"
              placeholder="Masukan nama wilayah contoh: Bandung"
              name="wilayah"
            />
            <button type="submit" className="btn btn-primary">
              Telusuri
            </button>
          </form>
        </div>
      </PopUp>
      {/*  */}
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
