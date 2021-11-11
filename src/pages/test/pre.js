// style
import style from "./css/Test.module.css";

// icon
import { Trash, Edit3, X } from "react-feather";

// component
import Head from "next/head";
import Link from "next/link";

// state & api
import { useEffect, useRef, useState } from "react";
import api from "../../config/api";

// editor
import dynamic from "next/dynamic";
const EditorSoal = dynamic(() => import("react-editor-js"), { ssr: false });
import ComponentEditor from "./comp";

//
import Parser from "./comp/Parser";

export default function PreTest({ tema_id }) {
  const instanceref = useRef(null);
  const jawabanARef = useRef(null);
  const jawabanBRef = useRef(null);
  const jawabanCRef = useRef(null);
  const jawabanDRef = useRef(null);
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
  //
  const [windowLoaded, setWindowLoaded] = useState(false);

  useEffect(() => {
    getSoal();
    // inisialisasi editor
    setWindowLoaded(true);
  }, []);

  // handle jawaban benar
  function handleJawaban(jawaban) {
    setJawbanBenar(jawaban);
  }

  // mendapatkan soal

  async function getSoal() {
    const list_soal = await fetch(
      `${api.api_endpoint}/materi/test/bymateri/${tema_id}`,
      {
        headers: {
          Authorization: api.authorization,
        },
      }
    );

    const res = await list_soal.json();
    setListSoal(res);
  }

  // hapus soal

  async function handleHapus(id) {
    const req = await fetch(`${api.api_endpoint}/materi/test/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: api.authorization,
      },
    });

    getSoal();
  }

  // handle kirim
  async function handleKirim() {
    // soal
    const savedData = await instanceref.current.save();
    setSoal(savedData);

    const data = new FormData();
    data.append("pertanyaan", JSON.stringify(savedData));
    data.append("jawaban_a", jawabanA);
    data.append("jawaban_b", jawabanB);
    data.append("jawaban_c", jawabanC);
    data.append("jawaban_d", jawabanD);
    data.append("jawaban_benar", jawbanBenar);
    data.append("materi_id", tema_id);

    // kirim data ke server
    const kirim_soal = await fetch(`${api.api_endpoint}/materi/test/create`, {
      method: "POST",
      body: data,
      headers: {
        Authorization: api.authorization,
      },
    });

    getSoal();

    // kosongkan jawaban sebelumnya
    setPopup(false);
    setSoal("");
    setJawbanA("");
    setJawbanB("");
    setJawbanC("");
    setJawbanD("");
    setJawbanBenar("A");
    jawabanARef.current.value = "";
    jawabanBRef.current.value = "";
    jawabanCRef.current.value = "";
    jawabanDRef.current.value = "";
  }

  //
  function htmlParser(value) {
    return { __html: Parser(JSON.parse(value).blocks) };
  }

  return (
    <div className={style.container}>
      {/* header */}
      <Head>
        <title>Soal Test</title>
      </Head>
      {/*  */}

      <div className={style.content}>
        <h3 className={style.main_header}>Soal Test</h3>
        <p className={style.co_header}>
          Silahkan buat soal mengenai materi ini untuk testing kemampuan pelajar
          anda
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

          <Link href="/profile">
            <a type="button" className={style.next_step}>
              Lanjutkan
            </a>
          </Link>
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
            <h3 onClick={() => handleSaveEditor()}>Buat Soal</h3>
            <p>
              Buatlah soal dan 4 pilihan jawaban, setelah itu centang jawaban
              yang benar nya
            </p>

            <label className={style.label}>Soal</label>
            {windowLoaded ? (
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

            <button
              onClick={() => handleKirim()}
              type="button"
              className={style.btn_add}
            >
              Tambahkan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
