import style from "./css/Profile.module.css";

// component
import Sidebar from "./component/sidebar";
import Navbar from "../../molekul/navbar";
import Head from "next/head";

// authentication
import cookie from "js-cookie";
import { jwt_key } from "../../config/api";

// helper
import { isUserLogin } from "../home/helper";

// hook
import { useEffect, useState } from "react";
import { updateProfile } from "./helper";

export default function Pengaturan() {
  const [auth, setAuth] = useState({
    login: false,
    user: {
      id: 0,
      name: "",
      school: "",
    },
  });

  // user info
  const [nama, setNama] = useState("-");
  const [sekolah, setSekolah] = useState("-");
  const [jurusan, setJurusan] = useState("-");
  const [posisi, setPosisi] = useState("-");

  //
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const checkUser = isUserLogin(cookie.get("auth_user"), jwt_key);
    if (checkUser.login) {
      setAuth(checkUser);
      setNama(checkUser.user.name);
      setSekolah(checkUser.user.school);
      setJurusan(checkUser.user.jurusan);
      setPosisi(checkUser.user.accountType);
    } else {
      window.location.href = "/login";
    }
  }, []);

  // refresh token callback
  function refreshToken(token) {
    cookie.set("auth_user", token, { expires: 30, path: "/" });
  }

  return (
    <>
      <Head>
        <title>Pengaturan Profile</title>
      </Head>
      <Navbar />
      <div className={style.container}>
        <div className="container">
          <div className={style.main}>
            {/* sidebar */}
            <Sidebar />
            {/* main content */}
            <div className={style.main_content}>
              <div className={style.pengaturan}>
                {success ? (
                  <small className={style.succes_alert}>
                    Data berhasil diperbarui
                  </small>
                ) : (
                  ""
                )}
                <label htmlFor="#nama">Nama</label>
                <input
                  onChange={(evt) => {
                    setNama(evt.target.value);
                    setSuccess(false);
                  }}
                  id="nama"
                  type="text"
                  className={"form-control"}
                  placeholder="Nama Lengkap"
                  defaultValue={nama}
                />
                <label htmlFor="#institusi">Sekolah / Kampus</label>
                <input
                  onChange={(evt) => {
                    setSekolah(evt.target.value);
                    setSuccess(false);
                  }}
                  id="institusi"
                  type="text"
                  className={"form-control"}
                  placeholder="Nama institusi contoh : Universitas Indonesia"
                  defaultValue={sekolah}
                />
                <label htmlFor="#jurusan">Jurusan</label>
                <input
                  onChange={(evt) => {
                    setJurusan(evt.target.value);
                    setSuccess(false);
                  }}
                  id="jurusan"
                  type="text"
                  className={"form-control"}
                  placeholder="Jurusan contoh: IPA, IPS"
                  defaultValue={jurusan}
                />

                <label htmlFor="#posisi">
                  Posisi{" "}
                  {posisi === "-" ? (
                    <strong style={{ fontStyle: "italic" }}>
                      ( kamu belum mengisi data ini )
                    </strong>
                  ) : (
                    <span className="badge bg-success">
                      kamu telah memilih sebagai {posisi}
                    </span>
                  )}
                </label>
                <select
                  defaultValue={posisi === "-" ? "pelajar" : posisi}
                  onChange={(evt) => setPosisi(evt.target.value)}
                  id="posisi"
                  className={"form-control"}
                >
                  <option value="pelajar">Pelajar</option>
                  <option value="expert">Expert</option>
                </select>
                <button
                  onClick={() => {
                    updateProfile(
                      nama,
                      sekolah,
                      jurusan,
                      posisi,
                      auth.user.id,
                      setSuccess,
                      refreshToken
                    );
                  }}
                  type="button"
                  className={style.btn_save}
                >
                  simpan
                </button>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
}
