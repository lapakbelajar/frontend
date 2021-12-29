import style from "./css/Survey.module.css";

// icon
import { ArrowRight } from "react-feather";

import Head from "next/head";
import Link from "next/link";
// life cycle
import { useRef, useState } from "react";
import api from "../../config/api";

export default function SurveyKetiga() {
  const linkRef = useRef(null);
  const [jawaban, setJawaban] = useState("");
  const [jawabanCustom, setJawabanCustom] = useState(false);
  const [submit, setSubmit] = useState(false);

  // mengirimkan jawaban ke server

  function handleSubmit() {
    if (jawaban.length > 0 && jawaban !== "lainnya") {
      setSubmit(true);

      const data = new FormData();
      data.append("pertanyaan", 3);
      data.append("jawaban", jawaban);

      fetch(`${api.api_endpoint}/survey/create`, {
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
          // jika sukses form akan dibersihkan dan diarahkan ke halaman selanjutnya

          if (res.status === 200) {
            setJawaban("");
            linkRef.current.click();
          }
        })
        .catch((err) => {
          console.warn(err);
        });
    }
  }

  return (
    <div className={style.container}>
      <Head>
        <title>Survey Fitur Privat</title>
      </Head>
      <div className="container">
        <div className={style.canvas}>
          <div className={style.box}>
            <h4>Halaman ke 3 dari 3</h4>
            <p>Darimana kamu mengetahui lapak belajar ?</p>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                onChange={() => {
                  setJawaban("sosial-media");
                  setJawabanCustom(false);
                }}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                Sosial Media
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                onChange={() => {
                  setJawaban("tim-lapak-belajar");
                  setJawabanCustom(false);
                }}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                Tim Lapak Belajar
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="internet"
                onChange={() => {
                  setJawaban("internet");
                  setJawabanCustom(false);
                }}
              />
              <label className="form-check-label" htmlFor="internet">
                Internet ( Google, Bing, Duck Duck go )
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="teman"
                onChange={() => {
                  setJawaban("teman");
                  setJawabanCustom(false);
                }}
              />
              <label className="form-check-label" htmlFor="teman">
                Teman
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="lainnya"
                onChange={() => {
                  setJawaban("lainnya");
                  setJawabanCustom(true);
                }}
              />
              <label className="form-check-label" htmlFor="lainnya">
                Lainnya
              </label>
            </div>

            {/* input lainnya */}
            {jawabanCustom ? (
              <input
                onChange={(evt) => setJawaban(evt.target.value)}
                type="text"
                className={style.input}
                placeholder="darimana kah kamu mengetahui nya ?"
              />
            ) : (
              ""
            )}

            <div className={style.col_btn}>
              <button
                onClick={() => handleSubmit()}
                type="button"
                className={style.btn_next}
                disabled={submit}
              >
                <span>{submit ? "Loading..." : "Selesai"}</span>
                <ArrowRight color="#ffffff" size={18} />
              </button>
            </div>
          </div>
          <div className={style.box}>
            <Link href="/survey/selesai">
              <a ref={linkRef}></a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
