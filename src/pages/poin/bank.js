import style from "./css/Poin.module.css";

// component
import Head from "next/head";

// icon
import { ArrowRight, ArrowLeft } from "react-feather";
import { useEffect, useState } from "react";

// authorization
import api, { jwt_key, api_endpoint, authorization } from "../../config/api";
import jwt from "jsonwebtoken";
import cookie from "js-cookie";

export default function Bank() {
  // user
  const [user, setUser] = useState({
    id: 0,
    name: ",",
  });

  //
  const [nama, setNama] = useState("");
  const [bank, setBank] = useState("");
  const [norek, setNorek] = useState("");

  // alert
  const [submit, setSubmit] = useState(false);
  const [failed, setFailed] = useState(false);
  const [success, setSucess] = useState(false);
  const [failedMsg, setFailedMsg] = useState("");

  useEffect(() => {
    getUser();
  }, []);

  /**
   *
   * Mendapatkan data diri user dari json web token
   */

  function getUser() {
    jwt.verify(cookie.get("auth_user"), jwt_key, (err, decoded) => {
      if (err) {
        window.location.href = "/login";
      } else {
        setUser(decoded);
      }
    });
  }

  //
  async function handleSubmit(evt) {
    try {
      evt.preventDefault();
      if (user.id !== 0) {
        setSubmit(true);
        const data = new FormData();
        data.append("user_id", user.id);
        data.append("media", bank);
        data.append("keterangan", nama);
        data.append("informasi", norek);

        const req = await fetch(`${api_endpoint}/transaksi/poin`, {
          method: "POST",
          headers: {
            authorization: authorization,
          },
          body: data,
        });

        const res = await req.json();

        console.log(res);
        if (req.status === 200) {
          setSucess(true);
          setSubmit(false);
        } else {
          setFailed(true);
          setFailedMsg(res.pesan);
          setSubmit(false);
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <Head>
        <title>Metode Pembayaran Bank</title>
      </Head>
      <div
        className={style.container}
        style={{ backgroundColor: "white", marginTop: 0, paddingTop: "100px" }}
      >
        <div className={style.canvas}>
          {/* tombol kembali */}
          <div
            onClick={() => window.history.back()}
            className={style.metode_header}
          >
            <ArrowLeft color="#696969" size={22} />
            <span>Kembali</span>
          </div>
          {/*  */}
          <h4 className={style.text_metode}>Pilih Metode Pembayaran</h4>
          <small className={style.sub_header}>
            Penarikan akan dilakukan maksimal 2x24 jam
          </small>

          {/* pesan error */}
          {failed ? (
            <div className={style.error}>
              <div className={style.error_header}>
                <strong>Gagal</strong>
              </div>
              <div className={style.error_msg}>
                <p>{failedMsg}</p>
              </div>
            </div>
          ) : (
            ""
          )}

          {success ? (
            <div className={style.success}>
              <div className={style.success_header}>
                <strong>Berhasil</strong>
              </div>
              <div className={style.success_msg}>
                <p>
                  Dana akan secepatnya kami kirimkan dan kamu hanya tinggal
                  tunggu notifikasi saja
                </p>
              </div>
            </div>
          ) : (
            ""
          )}

          {/* form */}
          <form
            action=""
            onSubmit={(evt) => {
              handleSubmit(evt);
            }}
            method="POST"
            className={style.form}
          >
            <label htmlFor="#nama">Nama Lengkap</label>
            <input
              autoFocus
              id="nama"
              type="text"
              className="form-control"
              placeholder="Masukan nama lengkap mu"
              onChange={(evt) => {
                setNama(evt.target.value);
                setSubmit(false);
                setSucess(false);
                setFailed(false);
              }}
            />
            <label htmlFor="#bank">Nama Bank</label>
            <input
              id="bank"
              type="text"
              className="form-control"
              placeholder="Nama Bank contoh : BCA, BRI"
              onChange={(evt) => setBank(evt.target.value)}
            />
            <label htmlFor="#norek">Nomor Rekening</label>
            <input
              id="norek"
              type="text"
              className="form-control"
              placeholder="Masukan nomor rekening"
              onChange={(evt) => {
                setNorek(evt.target.value);
                setSubmit(false);
                setSucess(false);
                setFailed(false);
              }}
            />
            <button className="btn btn-primary" type="submit">
              {submit ? "loading..." : "Kirim"}
            </button>
          </form>
          {/*  */}
        </div>
      </div>
    </>
  );
}
