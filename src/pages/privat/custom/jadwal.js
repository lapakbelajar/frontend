import style from "./css/Jadwal.module.css";
import custom_style from "./css/Register.module.css";

// local component
import CenterComponent from "../../../templates/centered";

// global component
import Head from "next/head";
import moment from "moment";
import "moment/locale/id";

// icon
import { Calendar } from "react-feather";
import Jadwal from "../../../atom/jadwal";

// life cycle
import { broker } from "../../../config/broker";
import { useEffect, useRef, useState } from "react";
import api from "../../../config/api";
import Link from "next/link";

export default function JadwalKelas({ KelasId }) {
  const dateRef = useRef(null);
  const startRef = useRef(null);
  const endRef = useRef(null);

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    listenEvent();
    ambilJadwal();
  }, []);

  const [listSchedule, setListSchedle] = useState([]);

  // mengambil data jadwal berdasarkan kelas yang didaftarkan sebelumnya
  async function ambilJadwal() {
    try {
      const req = await fetch(
        `${api.api_endpoint}/privat/custom/jadwal/${KelasId}`,
        {
          headers: {
            authorization: api.authorization,
          },
        }
      );
      const res = await req.json();
      setListSchedle(res);
    } catch (err) {
      //
    }
  }

  // mengirimkan jadwal ke server
  function kirimData(evt) {
    evt.preventDefault();

    // mengambil zona waktu
    const zona = new Date(date)
      .toString()
      .split("(")[1]
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");

    //
    const data = new FormData();
    data.append("tanggal", new Date(date).toISOString());
    data.append("mulai", start);
    data.append("selesai", end);
    data.append("zona", zona);
    data.append("identitas_kelas", KelasId);

    // mengirimkan data
    fetch(`${api.api_endpoint}/privat/custom/jadwal`, {
      method: "POST",
      headers: {
        authorization: api.authorization,
      },
      body: data,
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        dateRef.current.value = "";
        startRef.current.value = "";
        endRef.current.value = "";
        ambilJadwal();
      })
      .catch((err) => {
        console.warn(err);
      });
  }

  // mendengarkan event delete jadwal
  function listenEvent() {
    broker.subscribe(() => {
      const states = broker.getState();
      if (states.type === "delete_schedule") {
        ambilJadwal();
      }
    });
  }

  return (
    <CenterComponent>
      <Head>
        <title>Pilih Jadwal Se-suka mu</title>
      </Head>

      <h4 className={custom_style.main_header}>Tentukan Jadwal</h4>
      <small className={custom_style.secondary_header}>
        Buatlah jadwal untuk pertemuan dengan tutor mu
      </small>

      <button
        type="button"
        className="btn btn-success mt-5"
        data-bs-toggle="modal"
        data-bs-target="#jadwalModal"
      >
        <Calendar color="#ffffff" size={18} />
        <span style={{ fontSize: "14px", fontWeight: 700, marginLeft: "10px" }}>
          Tambahkan Jadwal
        </span>
      </button>

      <hr />

      {/* menambahkan jadwal */}
      <div
        className="modal fade"
        id="jadwalModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <form
          action=""
          onSubmit={(evt) => kirimData(evt)}
          method="POST"
          className="modal-dialog"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Tambahkan Jadwal
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className={style.jadwal_form}>
                <label htmlFor="">Tanggal</label>
                <input
                  ref={dateRef}
                  required
                  type="date"
                  className="form-control"
                  onChange={(evt) => {
                    setDate(evt.target.value);
                  }}
                />
              </div>
              <div className={style.jadwal_form}>
                <label htmlFor="">Waktu Mulai</label>
                <input
                  ref={startRef}
                  required
                  type="time"
                  className="form-control"
                  onChange={(evt) => {
                    setStart(evt.target.value);
                  }}
                />
              </div>
              <div className={style.jadwal_form}>
                <label htmlFor="waktu-selesai">Waktu Selesai</label>
                <input
                  ref={endRef}
                  onChange={(evt) => {
                    setEnd(evt.target.value);
                  }}
                  required
                  id="waktu-selesai"
                  type="time"
                  className="form-control"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Batal
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Simpan
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* list jadwal */}
      {listSchedule.map((items, i) => (
        <Jadwal
          moment={moment}
          edit={true}
          tanggal={items.tanggal}
          key={i}
          jam={`${items.mulai}-${items.selesai}`}
          id={items.id}
          zona={items.zona}
        />
      ))}

      <Link href="/privat/custom/success">
        <a className="btn btn-primary mt-3">Kirim</a>
      </Link>
      {/*  */}
    </CenterComponent>
  );
}
