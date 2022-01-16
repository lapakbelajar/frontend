import style from "./css/Register.module.css";

// local component
import CenterComponent from "../../../templates/centered";

// global component
import Head from "next/head";

//
import jwt from "jsonwebtoken";
import api, { jwt_key } from "../../../config/api";
//
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function Register({ TutorId }) {
  const [tutorProfile, setTutorProfile] = useState({
    image: "-",
    name: "-",
    school: "-",
    keahlian: "-",
    id: 0,
  });

  // data yang diperlukan untuk melakukan request kelas
  const [jenjang, setJenjang] = useState("-");
  const [jurusan, setJurusan] = useState("-");
  const [kelas, setKelas] = useState("-");
  const [tipe, setTipe] = useState("online");
  const [deskripsi, setDeskripsi] = useState("-");
  const [submit, setSubmit] = useState(false);

  // profile customer / user
  const [user, setUser] = useState({
    image: "-",
    name: "-",
    school: "-",
    keahlian: "-",
    id: 0,
  });

  useEffect(() => {
    jwt.verify(Cookies.get("auth_user"), jwt_key, (err, decoded) => {
      if (err) {
        window.location.href = "/login";
      } else {
        getDetailTutor();
        setUser(decoded);
      }
    });
  }, []);

  // mengambil data lengkap tutor
  async function getDetailTutor() {
    try {
      const req = await fetch(
        `${api.api_endpoint}/authentication/data/${TutorId}`,
        {
          headers: {
            authorization: api.authorization,
          },
        }
      );
      const res = await req.json();
      if (Object.keys(res).length > 0) {
        setTutorProfile(res.credential);
      }
    } catch (err) {
      //
    }
  }

  // melakukan transaksi kelas
  function kirimData(evt) {
    evt.preventDefault();
    if (!submit) {
      setSubmit(true);
      const data = new FormData();
      data.append("jenjang", jenjang);
      data.append("jurusan", jurusan);
      data.append("tipe", tipe);
      data.append("kelas", kelas);
      data.append("deskripsi", deskripsi);
      data.append("id_pelajar", user.id);
      data.append("id_tutor", tutorProfile.id);

      //
      fetch(`${api.api_endpoint}/privat/custom/create`, {
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
          if (res.status === 200) {
            window.location.href = `/privat/custom/jadwal?kelas=${res.id}`;
          }
        })
        .catch((err) => {
          console.warn(err);
        });
    }
  }

  return (
    <CenterComponent>
      {/*  */}
      <Head>
        <title>Buat kelas bersama expert suka - suka</title>
      </Head>
      {/*  */}
      <h5 className={style.main_header}>Tentang Tutor</h5>
      <div className={style.tutor}>
        <img src={tutorProfile.image} alt={tutorProfile.name} />
        <div className={style.tutor_desc}>
          <h4>{tutorProfile.name}</h4>
          <small>Pendidikan</small>
          <span>{tutorProfile.school}</span>
          <small>Bidang</small>
          <span>{tutorProfile.keahlian}</span>
        </div>
      </div>
      <hr />
      <h4 className={style.main_header}>Informasi Kelas</h4>
      <small className={style.secondary_header}>
        Isi data dibawah ini dan sesuaikan dengan kebutuhan belajar mu
      </small>

      {/* form pendaftaran */}
      <div className={style.container_form}>
        <form
          action=""
          onSubmit={(evt) => kirimData(evt)}
          method="POST"
          className="row"
        >
          <div className="col-md-6">
            <label htmlFor="jenjang">Jenjang</label>
            <input
              required
              id="jenjang"
              className="form-control"
              placeholder="Contoh : SMA"
              onChange={(evt) => {
                setJenjang(evt.target.value);
              }}
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="jurusan">Jurusan</label>
            <input
              id="jurusan"
              className="form-control"
              placeholder="Contoh : IPA"
              required
              onChange={(evt) => {
                setJurusan(evt.target.value);
              }}
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="kelas">Kelas</label>
            <input
              id="kelas"
              className="form-control"
              placeholder="Contoh : 10"
              required
              onChange={(evt) => {
                setKelas(evt.target.value);
              }}
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="tipe">Tipe</label>
            <select
              id="tipe"
              className="form-control"
              onChange={(evt) => {
                setTipe(evt.target.value);
              }}
              required
            >
              <option value="online">Online</option>
              <option value="offline">Offline</option>
            </select>
          </div>

          <div className="col-md-12">
            <label htmlFor="deskripsi">Deskripsi</label>
            <textarea
              id="deskripsi"
              className="form-control"
              placeholder="Ceritakan keinginan belajar mu seperti apa secara 
    mendetail disini"
              onChange={(evt) => {
                setDeskripsi(evt.target.value);
              }}
            ></textarea>
            <button type="submit" className="btn btn-primary mt-3">
              {submit ? "loading..." : "Lanjutkan"}
            </button>
          </div>
        </form>
      </div>
      {/*  */}
    </CenterComponent>
  );
}
