import style from "./css/Baru.module.css";

// component
import CenterComponent from "../../templates/centered";
import PopUp from "./component/PopUp";
import Head from "next/head";

// icon
import { Calendar, Trash, Edit3 } from "react-feather";

//
import { useState, useEffect, useRef } from "react";
import event from "./component/event";
import api, { jwt_key } from "../../config/api";

// authorization
import jwt from "jsonwebtoken";
import cookie from "js-cookie";
import { encode } from "js-base64";

//
import moment from "moment";
import "moment/locale/id";

export default function JadwalKelas({ IdKelas }) {
  const hargaRef = useRef(null);

  //
  const [position, setPosition] = useState("-200%");
  const [user, setUser] = useState({
    id: 0,
  });

  const [startDate, setStartDate] = useState("-");
  const [endDate, setEndDate] = useState("-");
  const [price, setPrice] = useState(0);
  const [jadwal, setJadwal] = useState([]);

  // update
  const [update, setUpdate] = useState(false);
  const [updatedId, setUpdatedId] = useState("");

  useEffect(() => {
    listenActivity();
    authorization();
  }, []);

  function authorization() {
    jwt.verify(cookie.get("auth_user"), jwt_key, (err, decoded) => {
      if (err) {
        window.location.href = "/login";
      } else {
        setUser(decoded);
        getSchedule(IdKelas);
      }
    });
  }

  /**
   * Mengambil data jadwal
   */

  async function getSchedule(id) {
    const req = await fetch(`${api.api_endpoint}/privat/jadwal/get/${id}`, {
      headers: {
        authorization: api.authorization,
      },
    });

    const res = await req.json();
    setJadwal(res);
  }

  /**
   * Mendengarkan tombol aktivitas di klik
   * jika di klik maka akan menampilkan sidebar
   */

  function listenActivity() {
    event.subscribe(() => {
      const states = event.getState();
      if (states.type === "close_popup") {
        setPosition("-200%");
      }
    });
  }

  function jadwalBaru() {
    const data = new FormData();
    data.append("identitas_kelas", IdKelas);
    data.append("waktu_mulai", startDate);
    data.append("waktu_selesai", endDate);
    data.append("harga", price);

    fetch(`${api.api_endpoint}/privat/jadwal`, {
      method: "POST",
      headers: {
        authorization: api.authorization,
      },
      body: data,
    })
      .then((res) => {
        return res.json();
      })
      .then((final) => {
        getSchedule(IdKelas);
        setPosition("-200%");
      })
      .catch((err) => {
        console.warn(err);
      });
  }

  function updateJadwal() {
    const data = new FormData();
    data.append("id", updatedId);
    data.append("waktu_mulai", startDate);
    data.append("waktu_selesai", endDate);
    data.append("harga", price);

    fetch(`${api.api_endpoint}/privat/jadwal/update`, {
      method: "PUT",
      headers: {
        authorization: api.authorization,
      },
      body: data,
    })
      .then((res) => {
        return res.json();
      })
      .then((final) => {
        getSchedule(IdKelas);
        setPosition("-200%");
      })
      .catch((err) => {
        console.warn(err);
      });
  }

  // mengirimkan data ke server
  function handleSubmit() {
    if (update) {
      updateJadwal();
    } else {
      jadwalBaru();
    }
  }

  /**
   * Menghapus tanggal dari server
   */

  async function deleteSchedule(id) {
    try {
      const req = await fetch(
        `${api.api_endpoint}/privat/jadwal/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            authorization: api.authorization,
          },
        }
      );

      getSchedule(IdKelas);
    } catch (err) {
      console.warn(err);
    }
  }

  return (
    <CenterComponent>
      <Head>
        <title>Tentukan Jadwal Pertemuan dengan Pelajar</title>
      </Head>
      {/* popup */}
      <PopUp
        eventName={"close_popup"}
        position={position}
        className={style.popup}
      >
        <div className={style.container_popup}>
          <h4 style={{ fontSize: 14, fontWeight: 700, margin: 0 }}>
            Tentukan Jadwal
          </h4>
          <small style={{ fontSize: 12 }}>
            Tentukan waktu kapan kelas akan dimulai dan selesai
          </small>
          <hr />

          <div className={style.container_input}>
            <div className={style.data}>
              <label htmlFor="mulai">Mulai</label>
              <input
                onChange={(evt) => setStartDate(evt.target.value)}
                id="mulai"
                type="datetime-local"
                className="form-control"
              />
            </div>
            <div className={style.data}>
              <label htmlFor="selesai">Selesai</label>
              <input
                onChange={(evt) => setEndDate(evt.target.value)}
                id="selesai"
                type="datetime-local"
                className="form-control"
              />
            </div>
          </div>
          <div className={style.container_input}>
            <div className={style.data}>
              <label htmlFor="harga">Harga</label>
              <input
                ref={hargaRef}
                onChange={(evt) => setPrice(evt.target.value)}
                id="harga"
                type="number"
                className="form-control"
                placeholder="Masukan harga kursus untuk tanggal yang anda pilih"
              />
            </div>
          </div>
          <br />
          <button
            onClick={() => setPosition("-200%")}
            style={{ fontSize: 14, fontWeight: 400 }}
            className="btn btn-secondary"
          >
            Batal
          </button>
          <button
            onClick={() => handleSubmit()}
            type="button"
            className="ml-3 btn btn-primary"
            style={{ fontSize: 14, fontWeight: 600, marginLeft: 10 }}
          >
            Simpan
          </button>
        </div>
      </PopUp>
      {/*  */}

      <h4 style={{ fontSize: 18, fontWeight: 700 }}>Jadwal</h4>
      <small style={{ display: "block" }}>
        Buatlah jadwal untuk pertemuan dengan pelajar
      </small>

      <button
        onClick={() => {
          setPosition("0%");
          setUpdate(false);
        }}
        className="btn btn-success mt-5"
        type="button"
      >
        <Calendar color="#ffffff" size={14} />
        <span style={{ fontSize: 14, marginLeft: 10 }}>Tambahkan Jadwal</span>
      </button>

      <hr />

      <div className={style.list}>
        {jadwal.map((items, i) => (
          <div className={style.box_privat} key={i}>
            <div className={style.section_1}>
              <div className={style.no}>
                <div className={style.no_content}>{i + 1}</div>
              </div>
              <div className={style.box_body}>
                <p>
                  {moment(new Date(items.mulai)).format("llll")} -{" "}
                  {moment(new Date(items.selesai)).format("LTS")}
                </p>
              </div>
            </div>
            <div>
              <button
                onClick={() => {
                  setPosition("0%");
                  setUpdatedId(items.id);
                  setPrice(items.harga);
                  setUpdate(true);
                  hargaRef.current.value = items.harga;
                }}
                type="button"
                className="btn btn-sm btn-warning"
              >
                <Edit3 color="#ffffff" size={18} />
              </button>
              <button
                onClick={() => deleteSchedule(items.id)}
                type="button"
                className="btn btn-sm btn-danger m-3"
              >
                <Trash color="#ffffff" size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="btn btn-primary"
        style={{ fontSize: 14, fontWeight: 700, height: 45 }}
        onClick={() =>
          (window.location.href = `/privat/detail/${encode(
            user.id.toString()
          )}`)
        }
      >
        Publikasikan
      </button>
    </CenterComponent>
  );
}
