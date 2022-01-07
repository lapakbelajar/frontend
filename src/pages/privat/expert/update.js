import style from "../css/Baru.module.css";

// component
import CenterComponent from "../../../templates/centered";
import Head from "next/head";
//
import { ArrowRight } from "react-feather";

// authorization
import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import cookie from "js-cookie";
import api, { jwt_key } from "../../../config/api";

export default function KursusUpdate({ DataPrivat }) {
  const [tipe, setTipe] = useState("-");
  const [jenjang, setJenjang] = useState("-");
  const [jurusan, setJurusan] = useState("-");
  const [kelas, setKelas] = useState("-");
  const [matpel, setMatpel] = useState("-");
  const [media, setMedia] = useState("-");
  const [deskripsi, setDeskripsi] = useState("-");
  const [user, setUser] = useState({
    id: 0,
  });

  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    getUser();
    if (Object.keys(DataPrivat).length > 0) {
      setJenjang(DataPrivat.kelas.jenjang);
      setJurusan(DataPrivat.kelas.jurusan);
      setKelas(DataPrivat.kelas.kelas);
      setMatpel(DataPrivat.kelas.matpel);
      setMedia(DataPrivat.kelas.media);
      setDeskripsi(DataPrivat.kelas.deskripsi);
    } else {
      window.location.href = "/privat";
    }
  }, []);

  function getUser() {
    jwt.verify(cookie.get("auth_user"), jwt_key, (err, decoded) => {
      if (err) {
        window.location.href = "/login";
      } else {
        setUser(decoded);
      }
    });
  }

  /**
   * Mengirimkan data ke server
   */

  function handleSubmit() {
    if (!submit) {
      setSubmit(true);
      const data = new FormData();
      data.append("matpel", matpel);
      data.append("jenjang", jenjang);
      data.append("jurusan", jurusan);
      data.append("kelas", kelas);
      data.append("tipe", tipe);
      data.append("media", media);
      data.append("deskripsi", deskripsi);
      data.append("identitas", DataPrivat.kelas.identitas);

      fetch(`${api.api_endpoint}/privat/kelas/update`, {
        headers: {
          authorization: api.authorization,
        },
        method: "PUT",
        body: data,
      })
        .then((res) => {
          setSubmit(false);
          return res.json();
        })
        .then((final) => {
          if (final.status === 200) {
            window.location.href = `/privat/jadwal/${final.identitas}`;
          }
        })
        .catch((err) => {
          console.warn(err);
        });
    }
  }

  return (
    <CenterComponent>
      <Head>
        <title>Edit Kelas Privat</title>
        <meta
          name="description"
          content="Buat kelas privat bargikan ilmu mu dan jadikan indonesia lebih cerdas"
        />
      </Head>
      <div className={style.container_input}>
        <div className={style.data}>
          <label>Jejang</label>
          <input
            defaultValue={jenjang}
            onChange={(evt) => setJenjang(evt.target.value)}
            type="text"
            className="form-control"
            id="jenjang"
            placeholder="Contoh : SMA"
          />
        </div>
        <div className={style.data}>
          <label>Jurusan</label>
          <input
            onChange={(evt) => setJurusan(evt.target.value)}
            type="text"
            className="form-control"
            id="jurusan"
            placeholder="Contoh : IPA"
            defaultValue={jurusan}
          />
        </div>
        <div className={style.data}>
          <label>Kelas</label>
          <input
            onChange={(evt) => setKelas(evt.target.value)}
            type="text"
            className="form-control"
            id="kelas"
            placeholder="Contoh : 10"
            defaultValue={kelas}
          />
        </div>
      </div>
      <div className={style.container_input}>
        <div className={style.data}>
          <label htmlFor="matpel">Mata pelajaran</label>
          <input
            onChange={(evt) => setMatpel(evt.target.value)}
            type="text"
            className="form-control"
            id="matpel"
            placeholder="Contoh : Matematika"
            defaultValue={matpel}
          />
        </div>
        <div className={style.data}>
          <label>Tipe Kelas</label>
          <select
            onChange={(evt) => setTipe(evt.target.value)}
            className="form-control"
          >
            <option>Pilih Tipe</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>
        </div>
      </div>

      {tipe !== "-" ? (
        tipe === "online" ? (
          <div className={style.data}>
            <label htmlFor="link">Media</label>
            <input
              onChange={(evt) => setMedia(evt.target.value)}
              type="url"
              className="form-control"
              placeholder="Masukan link media pembelajaran contoh : zoom, gmeet, skype"
              defaultValue={media}
            />
          </div>
        ) : (
          <div className={style.data}>
            <label htmlFor="alamat">Alamat</label>
            <textarea
              onChange={(evt) => setMedia(evt.target.value)}
              id="alamat"
              className="form-control"
              placeholder="Tuliskan alamat lengkap pertemuan"
              defaultValue={media}
            ></textarea>
          </div>
        )
      ) : (
        ""
      )}

      <div className={style.data}>
        <label htmlFor="deskripsi">Deskripsi</label>
        <textarea
          onChange={(evt) => setDeskripsi(evt.target.value)}
          id="deskripsi"
          className="form-control"
          placeholder="Masukan deskripsi tentang kelas ini"
          defaultValue={DataPrivat.kelas.deskripsi || ""}
        ></textarea>
      </div>
      <button
        onClick={() => handleSubmit()}
        type="button"
        className="btn btn-primary"
      >
        <span style={{ fontSize: 14, marginRight: 12 }}>
          {submit ? "loading..." : "simpan & lanjutkan ke jadwal"}
        </span>
        <ArrowRight color="#ffffff" size={14} />
      </button>
    </CenterComponent>
  );
}
