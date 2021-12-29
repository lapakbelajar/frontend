import style from "./css/Survey.module.css";

// icon
import { ArrowRight } from "react-feather";

// component
import Link from "next/link";
import Head from "next/head";

// life cycle
import { useRef, useState } from "react";
import api from "../../config/api";

export default function SurveyKedua() {
  const linkRef = useRef(null);

  const textAreaRef = useRef(null);

  const [jawaban, setJawaban] = useState("");
  const [submit, setSubmit] = useState(false);

  // mengirimkan jawaban ke server

  function handleSubmit() {
    if (jawaban.length > 0) {
      setSubmit(true);

      const data = new FormData();
      data.append("pertanyaan", 2);
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
          console.log(res);
          setSubmit(false);
          // jika sukses form akan dibersihkan dan diarahkan ke halaman selanjutnya
          if (res.status === 200) {
            textAreaRef.current.value = "";
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
            <h4>Halaman ke 2 dari 3</h4>
            <p>
              Jika kamu pernah melihat fitur privat di lapak belajar, boleh kah
              kami mengetahui bagaimana pendapat mu tentang fitur tersebut, jika
              ada yang kamu inginkan kami akan berusaha mewujudkanya
            </p>
            <textarea
              ref={textAreaRef}
              onChange={(evt) => setJawaban(evt.target.value)}
              placeholder="Ceritakan pendapat serta keinginanmu disini"
              className="form-control"
            ></textarea>
            <div className={style.col_btn}>
              <button
                onClick={() => handleSubmit()}
                type="button"
                disabled={submit}
                className={style.btn_next}
              >
                <span>{submit ? "Loading..." : "Lanjutkan"}</span>
                <ArrowRight color="#ffffff" size={18} />
              </button>
            </div>
          </div>
          <div className={style.box}>
            <Link href="/survey/ketiga">
              <a ref={linkRef}></a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
