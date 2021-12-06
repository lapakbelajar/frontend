import style from "./css/Pengaturan.module.css";

// component
import DashboardTemplates from "./templates/main";
import Head from "next/head";

// icon
import { Camera } from "react-feather";

// authorization
import api from "../../../config/api";
import jwt from "jsonwebtoken";
import cookie from "js-cookie";
import { useEffect, useRef, useState } from "react";

export default function Pengaturan() {
  const fileRef = useRef(null);
  const [user, setUser] = useState({
    id: 0,
    name: "",
    image: "",
    school: "",
    keahlian: "",
    jurusan: "",
  });

  //
  const [name, setName] = useState("");
  const [university, setUniversity] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [keahlian, setKeahlian] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const [images, setImages] = useState([]);

  const [submit, setSubmit] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    getUser();
  }, []);

  function getUser() {
    jwt.verify(cookie.get("auth_user"), api.jwt_key, (err, decoded) => {
      if (err) {
        window.location.href = "/login";
      } else {
        setUser(decoded);
        setName(decoded.name);
        setUniversity(decoded.school);
        setJurusan(decoded.jurusan);
        setKeahlian(decoded.keahlian);
        setPreviewImage(decoded.image);
      }
    });
  }

  //
  function handleSubmit() {
    setSubmit(true);
    const data = new FormData();
    data.append("user_id", user.id);
    data.append("nama", name);
    data.append("pendidikan", university);
    data.append("jurusan", jurusan);
    data.append("keahlian", keahlian);

    if (images.length > 0) {
      // upload gambar
      const gambar = new FormData();
      gambar.append("media", images[0]);

      fetch(`${api.file}/upload.php`, {
        method: "POST",
        body: gambar,
      })
        .then((res) => {
          return res.json();
        })
        .then(async (hasil) => {
          data.append("image", `${api.file}${api.file_path}${hasil.filename}`);
          const kirim = await fetch(
            `${api.api_endpoint}/authentication/tutor/update`,
            {
              headers: {
                authorization: api.authorization,
              },
              method: "PUT",
              body: data,
            }
          );
          const response = await kirim.json();
          // simpan cookie baru
          jwt.sign(
            response,
            api.jwt_key,
            { expiresIn: "30 days" },
            (err, encoded) => {
              if (!err) {
                cookie.set("auth_user", encoded, { expires: 30, path: "/" });
              }
            }
          );
          //
          setSubmit(false);
          setSuccess(true);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      fetch(`${api.api_endpoint}/authentication/tutor/update`, {
        headers: {
          authorization: api.authorization,
        },
        method: "PUT",
        body: data,
      })
        .then((res) => {
          return res.json();
        })
        .then((final) => {
          jwt.sign(
            final,
            api.jwt_key,
            { expiresIn: "30 days" },
            (err, encoded) => {
              if (!err) {
                cookie.set("auth_user", encoded, { expires: 30, path: "/" });
              }
            }
          );
          setSubmit(false);
          setSuccess(true);
        })
        .catch((err) => {
          console.warn(err);
        });
    }
  }

  /**
   * membaca file gambar menjadi sebuah binary
   */

  function readImage(files) {
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(files);
  }

  return (
    <DashboardTemplates>
      <Head>
        <title>Edit Profile</title>
      </Head>
      {success ? (
        <div className="alert alert-success" role="alert">
          Profile berhasil diperbarui
        </div>
      ) : (
        ""
      )}
      <input
        onChange={(evt) => {
          setImages(evt.target.files);
          readImage(evt.target.files[0]);
        }}
        type="file"
        ref={fileRef}
        style={{ display: "none" }}
      />
      <strong className={style.main_header}>Foto Profile</strong>
      <div className={style.container_img}>
        <img src={previewImage} className={style.img_preview} />
        <button
          onClick={() => fileRef.current.click()}
          type="button"
          className={style.btn_upload}
        >
          <Camera size={14} color="#ffffff" />
        </button>
      </div>

      <div className={style.form}>
        <label htmlFor="nama" className={style.main_header}>
          Nama Lengkap
        </label>
        <input
          onChange={(evt) => {
            setName(evt.target.value);
            setSuccess(false);
          }}
          defaultValue={name}
          id="nama"
          className="form-control"
          placeholder="Masukan nama lengkap anda"
        />
        <label htmlFor="pendidikan" className={style.main_header}>
          Universitas / Pendidikan Terakhir
        </label>
        <input
          onChange={(evt) => {
            setUniversity(evt.target.value);
            setSuccess(false);
          }}
          defaultValue={user.school}
          id="pendidikan"
          className="form-control"
          placeholder="Contoh : Universitas Sebelas Maret"
        />
        <label htmlFor="jurusan" className={style.main_header}>
          Jurusan
        </label>
        <input
          onChange={(evt) => {
            setJurusan(evt.target.value);
            setSuccess(false);
          }}
          defaultValue={user.jurusan}
          id="jurusan"
          className="form-control"
          placeholder="Contoh : Ekonomi Syariah"
        />
        <label htmlFor="keahlian" className={style.main_header}>
          keahlian
        </label>
        <input
          onChange={(evt) => {
            setKeahlian(evt.target.value);
            setSuccess(false);
          }}
          defaultValue={user.keahlian}
          id="keahlian"
          className="form-control"
          placeholder="Contoh : Biologi, Ekonomi, Bahasa Inggris"
        />
      </div>
      <button
        onClick={() => handleSubmit()}
        type="button"
        className="btn btn-primary"
      >
        {submit ? "loading.." : "Simpan"}
      </button>
    </DashboardTemplates>
  );
}
