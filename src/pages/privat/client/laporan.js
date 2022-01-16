import style from "./css/Laporan.module.css";

// local component
import CenterComponent from "../../../templates/centered";
import PopUp from "../component/PopUp";
import event from "../component/event";

// authorization
import jwt from "jsonwebtoken";
import cookie from "js-cookie";
import api from "../../../config/api";

//
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import HeaderClient from "../component/headerClient";

export default function Laporan() {
  const deskripsiRef = useRef(null);
  // popup settings
  const [position, setPosition] = useState("-200%");
  const [deskripsi, setDeskripsi] = useState("");
  const [tinggiDeskripsi, setTinggiDeskripsi] = useState(200);
  const [kelasId, setKelasId] = useState(0);
  const [userId, setUserId] = useState(0);
  const [matpel, setMatpel] = useState("");
  const [tutorName, setTutorName] = useState("");

  //
  const [submit, setSubmit] = useState(false);
  //
  const [kelas, setKelas] = useState([]);

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
        setUserId(decoded.id);
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
   * Menangani input yang dimasukan user
   * dan juga mengatur tinggi textarea
   */

  function handleDeskripsi(text) {
    const line = text.split("\n").length;
    if (line > 1) {
      const height = line * 20;
      if (height >= 100) {
        setTinggiDeskripsi(height);
      }
    } else {
      setTinggiDeskripsi(200);
    }

    setDeskripsi(text);
  }

  /**
   * Mendengarkan tombol aktivitas di klik
   * jika di klik maka akan menampilkan popup
   */

  function listenActivity() {
    event.subscribe(() => {
      const states = event.getState();
      if (states.type === "laporan-client") {
        setPosition("-200%");
      }
    });
  }

  /**
   * Mengirimkan laporan ke server
   */
  function handleSubmitReport() {
    if (deskripsi.length > 0 && userId !== 0 && kelasId !== 0) {
      setSubmit(true);

      const data = new FormData();
      data.append("kelas_id", kelasId);
      data.append("user_id", userId);
      data.append("laporan", deskripsi);
      data.append("tujuan", "expert");

      fetch(`${api.api_endpoint}/privat/laporan/baru`, {
        headers: {
          authorization: api.authorization,
        },
        method: "POST",
        body: data,
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          setSubmit(false);
          deskripsiRef.current.value = "";

          setPosition("-200%");
          if (res.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Berhasil",
              text: "Laporan berhasil dikirimkan",
            });
          } else {
            Swal.fire({
              icon: "info",
              title: "Perhatian",
              text: `Laporan untuk ${tutorName} di kelas ${matpel} sudah pernah dibuat`,
            });
          }
        })
        .catch((err) => {
          console.warn(err);
        });
    } else {
      setPosition("-200%");
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "semua data wajib diisi",
      });
    }
  }

  return (
    <CenterComponent>
      <Head>
        <title>Laporan Privat</title>
        <meta
          name="description"
          content="Ceritakan pengalaman mu mengenai privat yang telah kamu selesaikan"
        />
      </Head>
      {/*  */}
      <PopUp
        position={position}
        eventName={"laporan-client"}
        className={style.canvas}
      >
        <div className={style.container_laporan}>
          <h4>Buat Laporan</h4>
          <p className={style.sub_header}>
            silahkan tuliskan laporan kelas <strong>{matpel}</strong> bersama{" "}
            <strong>{tutorName} </strong>
            jika sudah menyelsaikan semua kelas
          </p>

          <textarea
            ref={deskripsiRef}
            onChange={(evt) => handleDeskripsi(evt.target.value)}
            className="form-control"
            placeholder="Ceritakan mengenai cara mengajar tutor, apa yang perlu kami perbaiki serta saran dan masukan"
            style={{ height: `${tinggiDeskripsi}px` }}
          ></textarea>
          <button
            type="button"
            onClick={() => handleSubmitReport()}
            className="btn btn-primary btn-sm mt-3"
          >
            {submit ? "loading..." : "kirim"}
          </button>
        </div>
      </PopUp>
      {/*  */}

      <h3 className={style.header_text}>Laporan</h3>
      <p className={style.sub_header}>
        Setelah menyelesaikan semua pertemuan kelas, kirimkan cerita mu mengenai
        pengalaman belajar bersama kami
      </p>

      {/* navigation */}
      <div className={style.privat}>
        <HeaderClient page="laporan" />
      </div>

      {/* main data */}

      {kelas.map((items, i) => (
        <div className={style.box_privat} key={i}>
          <div className={style.section_1}>
            <div className={style.no}>
              <div className={style.no_content}>{i + 1}</div>
            </div>
            <span>Kelas {items.kelas.matpel}</span>
          </div>
          <div className={style.canvas_btn}>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => {
                setPosition("0%");
                setMatpel(items.kelas.matpel);
                setKelasId(items.kelas.id);
                setTutorName(items.kelas.tutor.name);
              }}
            >
              Buat Laporan
            </button>
          </div>
        </div>
      ))}
    </CenterComponent>
  );
}
