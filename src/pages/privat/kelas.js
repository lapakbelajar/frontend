import style from "./css/Kelas.module.css";

// component
import Profile from "./component/Profile";
import PopUp from "./component/PopUp";
import event from "./component/event";
import Head from "next/head";

// templates
import CenterComponent from "../../templates/centered";
import { useEffect, useState } from "react";

// authorization
import jwt from "jsonwebtoken";
import cookie from "js-cookie";
import api from "../../config/api";

// helper
import { kirimEmail } from "../../config/message";
import Swal from "sweetalert2";

export default function Kelas({ KelasDetail, JadwalKelas }) {
  const [popUp, setPopup] = useState("-200%");
  const [textHeight, setTextHeight] = useState(150);

  // data kelas
  const [catatan, setCatatan] = useState("");
  const [jadwal, setJadwal] = useState([]);
  const [totalHarga, setTotalHarga] = useState(0);

  // navigation setting
  const [jadwalKelas, setJadwalKelas] = useState(false);

  useEffect(() => {
    if (Object.keys(KelasDetail).length > 0) {
      setJadwal(JadwalKelas);

      // menjumlahkan semua harga
      let sum = 0;
      JadwalKelas.forEach((items) => {
        sum += items.harga;
        setTotalHarga(sum);
      });

      //
      listenEvent();
    } else {
      window.location.href = "/privat";
    }
  }, []);

  /**
   * Mengangni text catatan
   * 1. mengubah tinggi textarea berdasarkan jumlah bari baru * 20px
   */

  function handleNotes(text) {
    setCatatan(text);
    const lines = text.split("\n");
    if (lines.length > 1) {
      const baris_baru = lines.length * 20;
      if (baris_baru > 150 && baris_baru <= 400) {
        setTextHeight(baris_baru);
      }
    } else {
      setTextHeight(150);
    }
  }

  /**
   * Mendengarkan event dari redux yang akan mentriger untuk menyembunyikan
   * popup
   */

  function listenEvent() {
    event.subscribe(() => {
      const states = event.getState();
      if (states.type === "close_popup") {
        setPopup("-200%");
      }
    });
  }

  /**
   * Melakukan pemesanan
   */

  function kirimData() {
    jwt.verify(cookie.get("auth_user"), api.jwt_key, (err, decoded) => {
      if (err) {
        window.location.href = "/login";
      } else {
        const data = new FormData();
        data.append("user_id", decoded.id);
        data.append("kelas_id", KelasDetail.id);
        data.append("harga", totalHarga);
        data.append("catatan", catatan);

        fetch(`${api.api_endpoint}/privat/invoice/create`, {
          method: "POST",
          headers: {
            authorization: api.authorization,
          },
          body: data,
        })
          .then((res) => {
            if (res.status === 202) {
              setPopup("-200%");
              Swal.fire({
                icon: "warning",
                title: "Gagal",
                text: "Kamu sudah pernah mengambil kelas ini",
              });
            } else {
              return res.json();
            }
          })
          .then((res) => {
            // kirim notifikasi ke email
            const msg = `Pemesanan kelas privat mata pelajaran ${KelasDetail.matpel} bersama ${KelasDetail.tutor.name} berhasil dilakukan silahkan lanjutkan ke pembayaran dan transfer biayanya dengan cara klik tautan dibawah ini \n\n${window.location.origin}/privat/invoice/${res.identitas}`;
            kirimEmail(
              decoded.id,
              `Tagihan pembayaran kelas ${KelasDetail.matpel} bersama ${KelasDetail.tutor.name}`,
              msg
            );

            //
            window.location.href = "/privat/success";
          })
          .catch((err) => {
            console.error(err);
          });
      }
    });
  }

  return (
    <CenterComponent>
      <Head>
        <title>
          Privat kelas {KelasDetail.matpel} - {KelasDetail.tutor.name}
        </title>
        <meta name="description" content={KelasDetail.deskripsi} />
      </Head>
      <PopUp position={popUp} className={style.popup} eventName={"close_popup"}>
        <div className={style.container_popup}>
          <strong className={style.secondary_header}>Catatan</strong>
          <textarea
            placeholder="Tambahkan catatan contohnya seperti request materi atau kurikulum"
            className={`form-control`}
            style={{
              resize: "none",
              height: `${textHeight}px`,
              fontSize: 14,
              padding: 20,
            }}
            onChange={(evt) => handleNotes(evt.target.value)}
          ></textarea>
          <button
            type="button"
            className={style.btn_order}
            style={{ marginTop: 30 }}
            onClick={() => kirimData()}
          >
            Lanjutkan
          </button>
        </div>
      </PopUp>
      <Profile
        image={KelasDetail.tutor.image}
        name={KelasDetail.tutor.name}
        education={KelasDetail.tutor.school}
        skils={KelasDetail.tutor.keahlian}
      />

      {/* navigasi */}
      <div className={style.nav}>
        <span
          onClick={() => setJadwalKelas(false)}
          className={jadwalKelas !== true ? style.active_link : style.link_nav}
        >
          Info Penting
        </span>
        <span
          onClick={() => setJadwalKelas(true)}
          className={jadwalKelas ? style.active_link : style.link_nav}
        >
          Jadwal
        </span>
      </div>

      {/* informasi detail kelas */}
      <div className={jadwalKelas !== true ? style.info_kelas : style.hide}>
        <table>
          <tr>
            <td>Mata Pelajaran</td>
            <td>:</td>
            <td>{KelasDetail.matpel}</td>
          </tr>
          <tr>
            <td>Tipe Kelas</td>
            <td>:</td>
            <td>{KelasDetail.tipe}</td>
          </tr>
          <tr>
            <td>Jenjang</td>
            <td>:</td>
            <td>{KelasDetail.jenjang}</td>
          </tr>
          <tr>
            <td>Kelas</td>
            <td>:</td>
            <td>{KelasDetail.kelas}</td>
          </tr>
        </table>
      </div>

      {/* informasi jadwal */}
      <div className={jadwalKelas ? style.jadwal : style.hide}>
        {jadwal.map((items, i) => (
          <div className={style.jadwal_kelas} key={i}>
            <span>
              {new Date(items.mulai).toLocaleString()} -{" "}
              {new Date(items.selesai).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
      {/*  */}

      <hr />
      <div className={style.info}>
        <small>Biaya</small>
        <div className={style.keterangan}>
          <h3>Rp. {JadwalKelas[0].harga.toLocaleString() || "-"}</h3>
          <small>/ hari</small>
        </div>
      </div>

      <div className={style.info}>
        <small>Pertemuan</small>
        <div className={style.keterangan}>
          <h3>{jadwal.length.toLocaleString()}</h3>
          <small>kali pertemuan</small>
        </div>
      </div>

      <div className={style.info}>
        <small>Total</small>
        <div className={style.keterangan}>
          <h3>Rp. {totalHarga.toLocaleString()}</h3>
        </div>
      </div>

      <button
        onClick={() => {
          setPopup("0%");
        }}
        type="button"
        className={style.btn_order}
      >
        Ambil Kelas
      </button>

      <hr />

      <strong className={style.secondary_header}>Deskripsi</strong>
      <p>{KelasDetail.deskripsi}</p>
    </CenterComponent>
  );
}
