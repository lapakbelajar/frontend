// style
import style from "./css/Jawab.module.css";

// component
import { CenterComponent } from "../../templates";
import Head from "next/head";

// authorization & api
import jwt from "jsonwebtoken";
import cookie from "js-cookie";
import api from "../../config/api";
import { useEffect, useState } from "react";

// hellper
import parser from "./comp/Parser";
import { HasilJawaban, JawabanBenar } from "./comp/Result";

export default function Result({ Pertanyaan, Materi, TipeTest }) {
  const [jawaban, setJawaban] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    getUser();
  }, []);
  /*
    * memvalidasi data
    ? jika data pertanyaan dan soal jumlahnya sama maka akan ditampilkan
    ? jika tidak sama maka akan di arahkan ke halaman materi
    */

  function getUser() {
    jwt.verify(cookie.get("auth_user"), api.jwt_key, (err, decoded) => {
      if (err) {
        window.location.href = "/materi";
      } else {
        getJawaban(Materi, decoded.id, TipeTest);
      }
    });
  }

  // mengambil data jawaban
  function getJawaban(materi_id, user_id, tipe) {
    fetch(
      `${api.api_endpoint}/materi/test/jawaban?materi_id=${materi_id}&user_id=${user_id}&tipe_test=${tipe}`,
      {
        headers: {
          authorization: api.authorization,
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((final) => {
        if (final.length === Pertanyaan.length) {
          // mendapatkan jawaban user
          setJawaban(final);

          // menghitung nilai user
          hitungNilai(final);
        } else {
          window.location.href = "/materi";
        }
      })
      .catch((err) => {
        console.warn(err);
      });
  }

  function hitungNilai(jawaban = []) {
    let sumNilai = 0;
    jawaban.forEach((items) => {
      sumNilai = sumNilai + items.nilai;
    });

    // menjumlahkan semua arrah
    setScore((sumNilai / jawaban.length) * 100);
  }

  return (
    <CenterComponent>
      <Head>
        <title>Hasil Test</title>
      </Head>
      <div className={style.container_result}>
        <div className={style.result_header}>
          <small>Nilai Mu</small>
          <h1>{score.toLocaleString()}</h1>
        </div>

        {/* list soal */}

        {(Pertanyaan || []).map((items, i) => (
          <div className={style.soal} key={i}>
            <div className={style.content_soal}>
              <div
                dangerouslySetInnerHTML={{
                  __html: parser(JSON.parse(items.pertanyaan).blocks),
                }}
              ></div>

              <small className={style.sub_header}>Jawaban mu</small>
              <div className={style.jawaban}>
                <span>
                  <HasilJawaban items={items} jawaban_user={jawaban[i]} />
                </span>
              </div>

              <small className={style.sub_header}>Jawaban benar</small>
              <div className={style.selected_jawaban}>
                <span>
                  <JawabanBenar items={items} />
                </span>
              </div>
            </div>
          </div>
        ))}
        {/*  */}
      </div>
    </CenterComponent>
  );
}
