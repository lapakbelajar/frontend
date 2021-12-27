import style from "./css/Dashboard.module.css";

// component
import CenterComponent from "../../../templates/centered";
import PopUp from "../component/PopUp";
import Profile from "../component/Profile";

//
import Head from "next/head";
import Link from "next/link";

// icon
import { ArrowRight } from "react-feather";

// authorization
import jwt from "jsonwebtoken";
import cookie from "js-cookie";
import api from "../../../config/api";

// state
import { useEffect, useState } from "react";
import event from "../component/event";
import HeaderClient from "../component/headerClient";

export default function Dashboard() {
  const [position, setPosition] = useState("-200%");

  const [kelas, setKelas] = useState([]);
  const [detail, setDetail] = useState([]);

  useEffect(() => {
    listenActivity();
    getUser();
  }, []);

  function getUser() {
    jwt.verify(cookie.get("auth_user"), api.jwt_key, (err, decoded) => {
      if (err) {
        window.location.href = "/login";
      } else {
        getClass(decoded.id);
      }
    });
  }

  async function getClass(userid) {
    try {
      const req = await fetch(`${api.api_endpoint}/privat/byuser/${userid}`, {
        headers: {
          authorization: api.authorization,
        },
      });
      const res = await req.json();
      setKelas(res);
    } catch (err) {
      //
    }
  }

  /**
   * mendapatkan detail kelas
   */

  async function getDetailClass(identitas) {
    try {
      const req = await fetch(
        `${api.api_endpoint}/privat/kelas/detail/${identitas}`,
        {
          headers: {
            authorization: api.authorization,
          },
        }
      );
      const res = await req.json();
      setDetail(res);
    } catch (err) {
      //
    }
  }

  /**
   * Mendengarkan tombol aktivitas di klik
   * jika di klik maka akan menampilkan sidebar
   */

  function listenActivity() {
    event.subscribe(() => {
      const states = event.getState();
      const id = states.id;
      if (states.type === "show_class") {
        setPosition("-200%");
      }
    });
  }

  return (
    <CenterComponent>
      <Head>
        <title>Data kelas privat</title>
      </Head>
      {/* popup */}
      <PopUp
        eventName={"show_class"}
        position={position}
        className={style.popup}
      >
        {Object.keys(detail).length > 0 ? (
          <div className={style.container_popup}>
            <div className={style.box_popup}>
              <Profile
                name={detail.kelas.tutor.name}
                image={detail.kelas.tutor.image}
                education={detail.kelas.tutor.school}
                skils={detail.kelas.tutor.keahlian}
              />

              {/* keterangan kelas */}
              <div className={style.keterangan_kelas}>
                <span className="badge rounded-pill bg-primary">
                  Mata pelajaran {detail.kelas.matpel}
                </span>
                <span className="badge rounded-pill bg-light text-dark">
                  Kelas {detail.kelas.tipe}
                </span>
              </div>

              {/* lokasi atau media */}
              <div className={style.media}>
                <strong className={style.sub_header}>Tempat / Media</strong>
                {detail.kelas.tipe === "online" ? (
                  <a href={detail.kelas.media}>{detail.kelas.media}</a>
                ) : (
                  <p>{detail.kelas.media}</p>
                )}
              </div>
              {/*  */}
            </div>
            <div className={style.box_popup}>
              {detail.jadwal.map((items, i) => (
                <div className={style.box_jadwal} key={i}>
                  <span>
                    {new Date(items.mulai).toLocaleString()} -{" "}
                    {new Date(items.selesai).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          ""
        )}
      </PopUp>
      {/*  */}
      <h3 className={style.header_text}>Data Privat</h3>
      <small className={style.sub_header}>
        Semua data tentang privat mu akan ditampilkan dibawah ini
      </small>

      {/* data privat */}
      <div className={style.privat}>
        <HeaderClient page="index" />
        {kelas.map((items, i) => (
          <div className={style.box_privat} key={i}>
            <div className={style.section_1}>
              <div className={style.no}>
                <div className={style.no_content}>{i + 1}</div>
              </div>
              <span>Kelas {items.kelas.matpel}</span>
            </div>
            {items.diterima === true && items.dibayar === true ? (
              <span className="badge bg-success">aktif</span>
            ) : (
              <span className="badge bg-warning">pending</span>
            )}
            <button
              onClick={() => {
                setPosition("0%");
                getDetailClass(items.kelas.identitas);
              }}
              className={style.btn_detail}
            >
              <ArrowRight color="#ffffff" size={18} />
            </button>
          </div>
        ))}
        {/*  */}
      </div>
    </CenterComponent>
  );
}
