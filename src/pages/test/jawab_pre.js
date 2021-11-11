import style from "./css/Jawab.module.css";

// component
import Link from "next/link";
import Head from "next/head";

// icon
import { ChevronLeft, TrendingUp } from "react-feather";
import { useEffect, useState } from "react";
import api from "../../config/api";

// content parser
import Parser from "./comp/Parser";

// authentication & authorization
import jwt from "jsonwebtoken";
import cookie from "js-cookie";

export default function JawabSoal(props) {
  // state soal
  const [selectedAnswer, setSelectedAns] = useState("");
  const [tipeTest, settipeTest] = useState("");
  const [noSoal, setNoSoal] = useState(0);
  const [lastQuestions, setLastQuestions] = useState(false);
  const [sumQuestion, setSumQuestion] = useState(0);
  const [nilaiJawaban, setNilai] = useState(0);

  const [pertanyaans, setPertanyaan] = useState({
    id: 0,
    pertanyaan: "blocks : {}",
    jawaban_a: "",
    jawaban_b: "",
    jawaban_c: "",
    jawaban_d: "",
    jawaban_benar: "",
    tema: {
      nama: "",
    },
  });

  const [soal, setSoal] = useState({});

  useEffect(() => {
    settipeTest(props.Tipe);
    setNoSoal(parseInt(props.NoSoal));

    setPertanyaan(props.pertanyaan);
    setSoal(JSON.parse(props.pertanyaan.pertanyaan).blocks);
    setLastQuestions(props.pertanyaan_terakhir);
    setSumQuestion(props.jumlah_soal);
  }, []);

  function handleClick(evt) {
    // console.log(evt)
  }

  function setJawaban(jawaban) {
    setSelectedAns(jawaban);

    // * menyimpan jawaban user
    let userAnswer = 0;

    if (jawaban === pertanyaans.jawaban_benar) {
      userAnswer = 1;
    } else {
      userAnswer = 0;
    }

    setNilai(userAnswer);
  }

  /*
   * FUNGSI DIBAWAH INI DIGUNAKAN UNTUK MENGIRIMKAN JAWABAN KE SERVER
   */

  function handleSubmit() {
    jwt.verify(cookie.get("auth_user"), api.jwt_key, (err, decoded) => {
      if (err) {
        window.location.href = "/";
      } else {
        setSelectedAns(jawaban);

        // * menyiapkan data yang akan dikirimkan ke server
        const data = new FormData();
        data.append("materi_id", props.Materi);
        data.append("user_id", decoded.id);
        data.append("soal_id", pertanyaans.id);
        data.append("nilai", nilaiJawaban);
        data.append("tipe_test", tipeTest);
        data.append("jawaban_terpilih", selectedAnswer);

        // TODO kirim data ke server
        fetch(`${api.api_endpoint}/materi/test/pre/jawab`, {
          method: "POST",
          headers: {
            Authorization: api.authorization,
          },
          body: data,
        })
          .then((hasil) => {
            return hasil.json();
          })
          .then((res) => {
            // TODO jika ini adalah jawaban terakhir maka arahkan ke detail materi
            // ? tapi jika bukan arahkan ke pertanyaan selanjutnya

            if (lastQuestions) {
              // window.location.href = `/materi/learn?tema=${props.Tema}&materi=${props.Materi}`;
              window.location.href = `/test/result?materi=${props.Materi}&tipe=${tipeTest}`;
            } else {
              window.location.href = `/test/${tipeTest}/jawab?materi=${
                props.Materi
              }&tema=${props.Tema}&no=${parseInt(noSoal) + 1}`;
            }
          });
      }
    });
  }

  // mengubah object menjadi html
  function htmlParser(value = { blocks: {} }) {
    console.log(JSON.parse(value));
    let parsed = "";
    setTimeout(() => {
      parsed = Parser(JSON.parse(value).blocks);
    }, 3000);
    return { __html: parsed };
  }

  return (
    <>
      <Head>
        <title>
          {tipeTest === "pre" ? "Pre - Test" : "Post - Test"} {noSoal}
        </title>
      </Head>
      <div className={style.container}>
        <div className={style.canvas}>
          <div className={style.header_desc}>
            <Link href="/">
              <a className={style.btn_back}>
                <ChevronLeft size={22} color="#363636" />
              </a>
            </Link>
            <div className={style.tema}>
              <span>{pertanyaans.tema.nama}</span>
            </div>
            <div className={style.tema}>
              <span>
                Soal ke : {noSoal}/{sumQuestion}
              </span>
            </div>
          </div>

          {/* keterangan tambahan */}
          <h3 className={style.main_header}>
            {tipeTest === "pre" ? "Pre - Test" : "Post - Test"}
          </h3>
          <p className={style.paragraph}>
            {tipeTest === "pre"
              ? `Sebelum mempelajari materi, yuk jawab dulu beberapa pertanyaan
                dibawah ini`
              : `Setelah mengikuti materi ini, yuk jawab dulu beberapa pertanyaan dibawah ini`}
          </p>

          {/* list pertanyaan */}
          <div className={style.container_soal}>
            <div
              onClick={(evt) => handleClick(evt)}
              className={style.pertanyaan}
              id="pertanyaan"
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: Parser(soal),
                }}
              ></div>

              {/* PILIHAN A */}
              <div
                id="jawaban"
                onClick={() => setJawaban("A")}
                className={
                  selectedAnswer === "A"
                    ? style.selected_jawaban
                    : style.jawaban
                }
              >
                <span>{pertanyaans.jawaban_a}</span>
              </div>

              {/* PILIHAN B */}
              <div
                id="jawaban"
                onClick={() => setJawaban("B")}
                className={
                  selectedAnswer === "B"
                    ? style.selected_jawaban
                    : style.jawaban
                }
              >
                <span>{pertanyaans.jawaban_b}</span>
              </div>

              {/* PILIHAN C */}
              <div
                id="jawaban"
                onClick={() => setJawaban("C")}
                className={
                  selectedAnswer === "C"
                    ? style.selected_jawaban
                    : style.jawaban
                }
              >
                <span>{pertanyaans.jawaban_c}</span>
              </div>

              {/* PILIHAN D */}
              <div
                id="jawaban"
                onClick={() => setJawaban("D")}
                className={
                  selectedAnswer === "D"
                    ? style.selected_jawaban
                    : style.jawaban
                }
              >
                <span>{pertanyaans.jawaban_d}</span>
              </div>
            </div>

            {/* btn lanjutkan */}
            <button
              type="button"
              className={style.btn_next}
              onClick={() => handleSubmit()}
            >
              Lanjutkan
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
