// style
import style from "./css/Test.module.css";

// icon
import { Trash, Edit3, X } from "react-feather";

// component
import Head from "next/head";

// state & api
import { useEffect, useState, useRef } from "react";
import api from "../../config/api";

// editor
import dynamic from "next/dynamic";
const EditorSoal = dynamic(() => import("react-editor-js"), { ssr: false });
import ComponentEditor from "./comp";

//
import Parser from "./comp/Parser";

export default function PostTest({ status, tema_id }) {
  const instanceref = useRef(null);
  const jawabanARef = useRef(null);
  const jawabanBRef = useRef(null);
  const jawabanCRef = useRef(null);
  const jawabanDRef = useRef(null);

  const [windowLoadead, setWindowLoaded] = useState(false);

  // state untuk membuat pertanyaan dan jawaban
  const [popup, setPopup] = useState(false);
  const [listSoal, setListSoal] = useState([]);

  // value yang akan dikirim ke server
  const [jawbanBenar, setJawbanBenar] = useState("");
  const [soal, setSoal] = useState({
    time: 1550476186479,
    blocks: [],
    version: "2.8.1",
  });
  const [jawabanA, setJawbanA] = useState("");
  const [jawabanB, setJawbanB] = useState("");
  const [jawabanC, setJawbanC] = useState("");
  const [jawabanD, setJawbanD] = useState("");

  // state updaate
  const [update, setUpdate] = useState(false);
  const [pertanyaanId, setPertanyaanId] = useState(0);

  useEffect(() => {
    cekPretest();
    setWindowLoaded(true);
    getSoal();
  }, []);

  // membersihkan form setelah semua terkirim
  function clearForm() {
    jawabanARef.current.value = "";
    jawabanBRef.current.value = "";
    jawabanCRef.current.value = "";
    jawabanDRef.current.value = "";
  }

  /*
   * cek apakah pre test sudah dibuat atau belum
   * jika sudah maka akan di arahkan ke halaman preview
   * jika belum maka harus dibuat terlebih dahulu
   */

  function cekPretest() {
    if (status === 200) {
      window.location.href = `/materi/preview?tema=${tema_id}`;
    }
  }

  // handle jawaban benar
  function handleJawaban(jawaban) {
    setJawbanBenar(jawaban);
  }

  // mendapatkan soal

  async function getSoal() {
    const list_soal = await fetch(
      `${api.api_endpoint}/materi/test/post/get?materi_id=${tema_id}`,
      {
        headers: {
          Authorization: api.authorization,
        },
      }
    );

    const res = await list_soal.json();
    setListSoal(res.data);
  }

  // hapus soal

  async function handleHapus(id) {
    const req = await fetch(
      `${api.api_endpoint}/materi/test/post/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: api.authorization,
        },
      }
    );

    getSoal();
  }

  // handle kirim
  async function handleKirim() {
    const data = new FormData();

    const savedData = await instanceref.current.save();
    setSoal(savedData);

    data.append("pertanyaan", JSON.stringify(savedData));
    data.append("jawaban_a", jawabanA);
    data.append("jawaban_b", jawabanB);
    data.append("jawaban_c", jawabanC);
    data.append("jawaban_d", jawabanD);
    data.append("jawaban_benar", jawbanBenar);
    data.append("materi_id", tema_id);

    // kirim data ke server
    const kirim_soal = await fetch(
      `${api.api_endpoint}/materi/test/post/baru`,
      {
        method: "POST",
        body: data,
        headers: {
          Authorization: api.authorization,
        },
      }
    );

    getSoal();

    // kosongkan jawaban sebelumnya
    if (kirim_soal.status === 200) {
      setPopup(false);
      setSoal("");
      setJawbanA("");
      setJawbanB("");
      setJawbanC("");
      setJawbanD("");
      setJawbanBenar("A");
      clearForm();
    }
  }

  // handle update
  function handleUpdate(id, soals, a, b, c, d, benar) {
    setPopup(true);
    setUpdate(true);

    // form input
    const jawaban_a = document.querySelector("#jawaban_a");
    const jawaban_b = document.querySelector("#jawaban_b");
    const jawaban_c = document.querySelector("#jawaban_c");
    const jawaban_d = document.querySelector("#jawaban_d");

    jawaban_a.value = a;
    jawaban_b.value = b;
    jawaban_c.value = c;
    jawaban_d.value = d;

    setPertanyaanId(id);
    setSoal(JSON.parse(soals));
    setJawbanA(a);
    setJawbanB(b);
    setJawbanC(c);
    setJawbanD(d);
    setJawbanBenar(benar);
  }

  // kirim date baruy ke server
  async function kirimUpdate() {
    const savedData = await instanceref.current.save();
    setSoal(savedData);

    const data = new FormData();

    data.append("pertanyaan", JSON.stringify(savedData));
    data.append("jawaban_a", jawabanA);
    data.append("jawaban_b", jawabanB);
    data.append("jawaban_c", jawabanC);
    data.append("jawaban_d", jawabanD);
    data.append("jawaban_benar", jawbanBenar);

    fetch(`${api.api_endpoint}/materi/test/post/update/${pertanyaanId}`, {
      method: "PUT",
      headers: {
        Authorization: api.authorization,
      },
      body: data,
    })
      .then((res) => {
        return res.json();
      })
      .then((final) => {
        getSoal();
        setPopup(false);
        setUpdate(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function htmlParser(value) {
    return { __html: Parser(JSON.parse(value).blocks) };
  }

  // publikasikan pertanyaan

  async function publish() {
    const req = await fetch(
      `${api.api_endpoint}/materi/test/post/publikasikan/${tema_id}`,
      {
        method: "PUT",
        headers: {
          Authorization: api.authorization,
        },
      }
    );
    const res = await req.json();

    setTimeout(() => {
      window.location.href = `/materi`;
    }, 2000);
  }

  return (
    <div className={style.container}>
      {/* header */}
      <Head>
        <title>Soal Post - Test</title>
      </Head>
      {/*  */}

      <div className={style.content}>
        <h3 className={style.main_header}>Post - Test</h3>
        <p className={style.co_header}>
          Silahkan buat soal untuk post-test yang berfungsi untuk mengukur
          kemampuan siswa setelah mengikut pembelajaran
        </p>

        {/* button action */}
        <div className={style.container_btn}>
          <button
            type="button"
            className={style.create_question}
            onClick={() => setPopup(true)}
          >
            Buat Pertanyaan
          </button>
          <button
            onClick={() => publish()}
            type="button"
            className={style.next_step}
          >
            Lanjutkan
          </button>
        </div>
        <hr />
        {/* list pertanyaan dan jawaban */}
        <div className={style.soal}>
          {listSoal.map((items, i) => (
            <div key={i} className={style.pertanyaan}>
              {/* tombol aksi */}
              <div className={style.header_soal}>
                <button
                  type="button"
                  onClick={() => handleHapus(items.id)}
                  className={style.btn_transparent}
                  title="Hapus pertanyaan"
                >
                  <Trash size={15} color="#dfd3d3" />
                </button>
                {/* <button
                  onClick={() =>
                    handleUpdate(
                      items.id,
                      items.pertanyaan,
                      items.jawaban_a,
                      items.jawaban_b,
                      items.jawaban_c,
                      items.jawaban_d,
                      items.jawaban_benar
                    )
                  }
                  type="button"
                  className={style.btn_transparent}
                  title="Edit pertanyaan"
                >
                  <Edit3 size={15} color="#dfd3d3" />
                </button> */}
              </div>

              {/* pertanyaan */}

              <span className={style.header_question}>
                <div
                  dangerouslySetInnerHTML={htmlParser(items.pertanyaan)}
                ></div>
              </span>

              {/* jawaban */}
              <div
                className={
                  items.jawaban_benar === "A"
                    ? style.jawaban_benar
                    : style.jawaban
                }
              >
                <span>A. {items.jawaban_a}</span>
              </div>
              <div
                className={
                  items.jawaban_benar === "B"
                    ? style.jawaban_benar
                    : style.jawaban
                }
              >
                <span>B. {items.jawaban_b}</span>
              </div>
              <div
                className={
                  items.jawaban_benar === "C"
                    ? style.jawaban_benar
                    : style.jawaban
                }
              >
                <span>C. {items.jawaban_c}</span>
              </div>
              <div
                className={
                  items.jawaban_benar === "D"
                    ? style.jawaban_benar
                    : style.jawaban
                }
              >
                <span>D. {items.jawaban_d}</span>
              </div>
            </div>
          ))}
        </div>

        {/* buat pertanyaan */}
        <div className={popup ? style.popup : style.hide_popup}>
          <div className={style.container_popup}>
            <div className={style.header_popup}>
              <button
                onClick={() => setPopup(false)}
                className={style.btn_transparent}
                type="button"
              >
                <X color="#363636" size={22} />
              </button>
            </div>
            <h3>Buat Soal</h3>
            <p>
              Buatlah soal dan 4 pilihan jawaban, setelah itu centang jawaban
              yang benar nya
            </p>

            <label className={style.label}>Soal</label>
            {windowLoadead ? (
              <EditorSoal
                holder="holder"
                autofocus={true}
                tools={ComponentEditor}
                instanceRef={(instance) => (instanceref.current = instance)}
                data={soal}
              />
            ) : (
              ""
            )}
            <div id="holder" className={style.holder}></div>

            <hr />
            <div className={style.container_jawaban}>
              <input
                onChange={() => handleJawaban("A")}
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
              />
              <textarea
                ref={jawabanARef}
                id="jawaban_a"
                defaultValue={jawabanA}
                onChange={(evt) => setJawbanA(evt.target.value)}
                name="jawaban"
                placeholder="Jawaban A"
                className={style.area_jawaban}
              ></textarea>
            </div>

            <div className={style.container_jawaban}>
              <input
                onChange={() => handleJawaban("B")}
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
              />
              <textarea
                ref={jawabanBRef}
                id="jawaban_b"
                defaultValue={jawabanB}
                onChange={(evt) => setJawbanB(evt.target.value)}
                name="jawaban"
                placeholder="Jawaban B"
                className={style.area_jawaban}
              ></textarea>
            </div>

            <div className={style.container_jawaban}>
              <input
                onChange={() => handleJawaban("C")}
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
              />
              <textarea
                ref={jawabanCRef}
                id="jawaban_c"
                defaultValue={jawabanC}
                onChange={(evt) => setJawbanC(evt.target.value)}
                name="jawaban"
                placeholder="Jawaban C"
                className={style.area_jawaban}
              ></textarea>
            </div>

            <div className={style.container_jawaban}>
              <input
                onChange={() => handleJawaban("D")}
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
              />
              <textarea
                ref={jawabanDRef}
                id="jawaban_d"
                defaultValue={jawabanD}
                onChange={(evt) => setJawbanD(evt.target.value)}
                name="jawaban"
                placeholder="Jawaban D"
                className={style.area_jawaban}
              ></textarea>
            </div>

            {update ? (
              <button
                onClick={() => kirimUpdate()}
                type="button"
                className={style.btn_add}
              >
                Update
              </button>
            ) : (
              <button
                onClick={() => handleKirim()}
                type="button"
                className={style.btn_add}
              >
                Tambahkan
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
