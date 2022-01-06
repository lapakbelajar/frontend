import style from "./css/Profile.module.css";

// component
import Sidebar from "./component/sidebar";
import Navbar from "../../molekul/navbar";
import Head from "next/head";

// authentication
import cookie from "js-cookie";
import api, { jwt_key } from "../../config/api";

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
  const [userId, setUserID] = useState(0);

  // user info
  const [nama, setNama] = useState("-");
  const [sekolah, setSekolah] = useState("-");
  const [jurusan, setJurusan] = useState("-");
  const [posisi, setPosisi] = useState("-");
  const [nohp, setNohp] = useState("-");
  const [bank, setBank] = useState("-");
  const [norek, setNorek] = useState("-");

  //
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const checkUser = isUserLogin(cookie.get("auth_user"), jwt_key);
    if (checkUser.login) {
      setAuth(checkUser);
      setUserID(checkUser.user.id);
      getUserDetail(checkUser.user.id);
    } else {
      window.location.href = "/login";
    }
  }, []);

  // mendapatkan detail user
  async function getUserDetail(userid) {
    try {
      const req = await fetch(
        `${api.api_endpoint}/authentication/data/${userid}`,
        {
          headers: {
            authorization: api.authorization,
          },
        }
      );

      const res = await req.json();

      // update data
      setAuth(res.credential);
      setNama(res.credential.name);
      setSekolah(res.credential.school);
      setJurusan(res.credential.jurusan);
      setPosisi(res.credential.accountType);

      //
      if (res.finance.length > 0) {
        setBank(res.finance[0].bank);
        setNorek(res.finance[0].norek);
        setNohp(res.finance[0].nohp);
      }
    } catch (err) {
      //
    }
  }

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
                  <option value="expert">Tutor Privat</option>
                  <option value="expert-diskusi">Tutor Diskusi</option>
                </select>

                <hr />
                <label htmlFor="#nohp">
                  Nomor hp{" "}
                  <i>( format +62-nomorhp, contoh : +6281373819212 )</i>
                </label>
                <input
                  onChange={(evt) => {
                    setNohp(
                      evt.target.value
                        .replace(/[^\w\s]|_/g, "")
                        .replace(/\s+/g, " ")
                    );
                    setSuccess(false);
                  }}
                  id="nohp"
                  type="text"
                  className={"form-control"}
                  placeholder="Masuk nomor telepon conth : +6281373819212"
                  defaultValue={nohp}
                />

                <label htmlFor="#bank">Bank</label>
                <input
                  onChange={(evt) => {
                    setBank(evt.target.value);
                    setSuccess(false);
                  }}
                  id="bank"
                  type="text"
                  className={"form-control"}
                  placeholder="Nama bank contoh : BCA, BRI, BNI"
                  defaultValue={bank}
                />
                <label htmlFor="#norek">Nomor Rekening</label>
                <input
                  onChange={(evt) => {
                    setNorek(evt.target.value);
                    setSuccess(false);
                  }}
                  id="norek"
                  type="text"
                  className={"form-control"}
                  placeholder="Masuk nomor rekening"
                  defaultValue={norek}
                />
                <button
                  onClick={() => {
                    updateProfile(
                      nama,
                      sekolah,
                      jurusan,
                      posisi,
                      userId,
                      nohp,
                      bank,
                      norek,
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
