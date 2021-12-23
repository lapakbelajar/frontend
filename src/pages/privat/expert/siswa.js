import style from "./css/Siswa.module.css";

// local component
import Profile from "../component/Profile";
import DashboardTemplates from "./templates/main";
import PopUp from "../component/PopUp";
import event from "../component/event";
import Swal from "sweetalert2";

//
import Head from "next/head";

// authorization
import jwt from "jsonwebtoken";
import cookie from "js-cookie";
import api from "../../../config/api";
import { useEffect, useRef, useState } from "react";

export default function Siswa() {
  // popup
  const deskripsiRef = useRef(null);

  const [position, setPosition] = useState("-200%");
  const [deskripsi, setDeskripsi] = useState("");
  const [tinggiDeskripsi, setTinggiDeskripsi] = useState(200);
  const [submit, setSubmit] = useState(false);

  const [userId, setUserId] = useState(0);
  const [kelasId, setKelasId] = useState(0);
  const [userName, setUserName] = useState("");

  //
  const [user, setUser] = useState({
    id: 0,
  });

  const [listUser, setListUser] = useState([]);

  useEffect(() => {
    getUser();
    listenActivity();
  }, []);

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
      if (states.type === "close-laporan-expert") {
        setPosition("-200%");
      } else if (states.type === "show-laporan-expert") {
        setPosition("0%");
        setKelasId(states.kelasId);
        setUserId(states.userId);
        setUserName(states.userName);
      }
    });
  }

  function getUser() {
    jwt.verify(cookie.get("auth_user"), api.jwt_key, (err, decoded) => {
      if (err) {
        window.location.href = "/login";
      } else {
        setUser(decoded);
        getStudents(decoded.id);
      }
    });
  }

  /**
   * Mengambil list siswa
   */

  async function getStudents(userid) {
    try {
      const req = await fetch(
        `${api.api_endpoint}/privat/expert/class/student/${userid}`,
        {
          headers: {
            authorization: api.authorization,
          },
        }
      );
      const res = await req.json();
      setListUser(res);
    } catch (err) {
      //
      console.warn(err);
    }
  }

  /**
   * Mengirimkan data ke server
   *
   */

  function kirimLaporan() {
    if (deskripsi.length > 0 && kelasId !== 0 && userId !== 0) {
      setSubmit(true);

      const data = new FormData();
      data.append("kelas_id", kelasId);
      data.append("user_id", userId);
      data.append("laporan", deskripsi);
      data.append("tujuan", "siswa");

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

            // update data user
            getStudents();
          } else {
            Swal.fire({
              icon: "info",
              title: "Perhatian",
              text: `Laporan untuk ${userName} sudah pernah dibuat`,
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
        text: "Data wajib diisi",
      });
    }
  }

  return (
    <DashboardTemplates>
      <Head>
        <title>Data Murid</title>
      </Head>

      {/* popup */}
      <PopUp
        position={position}
        eventName={"close-laporan-expert"}
        className={style.canvas}
      >
        <div className={style.container_laporan}>
          <h4>Buat Laporan</h4>
          <p className={style.sub_header}>
            Silahkan tuliskan laporan tentang <strong>{userName}</strong> jika
            sudah menyelsaikan semua kelas
          </p>

          <textarea
            ref={deskripsiRef}
            onChange={(evt) => handleDeskripsi(evt.target.value)}
            className="form-control"
            placeholder="Ceritakan mengenai perkembangan, kendala dan lain sebagainya"
            style={{ height: `${tinggiDeskripsi}px` }}
          ></textarea>
          <button
            onClick={() => kirimLaporan()}
            type="button"
            className="btn btn-primary btn-sm mt-3"
          >
            {submit ? "loading..." : "Kirim"}
          </button>
        </div>
      </PopUp>
      {/*  */}
      {listUser.map((items, i) => (
        <div style={{ marginTop: 20 }} key={i}>
          <Profile
            name={items.siswa.user.name}
            education={items.siswa.user.school}
            image={items.siswa.user.image}
            skils={items.siswa.user.jurusan}
            page="siswa"
            UserId={items.siswa.user.id}
            KelasId={items.siswa.kelas}
            JumlahLaporan={items.laporan}
          />
        </div>
      ))}
    </DashboardTemplates>
  );
}
