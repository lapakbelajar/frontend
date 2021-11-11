// style
import style from "./css/Test.module.css";

// templates
import { CenterComponent } from "../../templates";

// component
import dynamic from "next/dynamic";
const EditorSoal = dynamic(() => import("react-editor-js"), { ssr: false });
import ComponentEditor from "./comp";
import { Success } from "../../molekul/alert";
import Head from "next/head";

// api and hook
import { useEffect, useRef, useState } from "react";
import api from "../../config/api";

export default function EditTest({ Data }) {
  const instanceref = useRef(null);
  const jawabanARef = useRef(null);
  const jawabanBRef = useRef(null);
  const jawabanCRef = useRef(null);
  const jawabanDRef = useRef(null);

  const [id, setId] = useState(0);

  // list jawaban
  const [jawabanA, setJawbanA] = useState("");
  const [jawabanB, setJawbanB] = useState("");
  const [jawabanC, setJawbanC] = useState("");
  const [jawabanD, setJawbanD] = useState("");
  const [jawabanBenar, setJawabaBenar] = useState("");

  const [soal, setSoal] = useState({
    time: 1550476186479,
    blocks: [],
    version: "2.8.1",
  });

  const [submit, setSubmit] = useState(false);
  const [sucess, setSucess] = useState(false);

  useEffect(() => {
    initData();
    console.clear();
  }, []);

  // menangani inisialisasi data
  function initData() {
    setId(Data.id);
    setJawbanA(Data.jawaban_a || "");
    setJawbanB(Data.jawaban_b || "");
    setJawbanC(Data.jawaban_c || "");
    setJawbanD(Data.jawaban_d || "");
    setJawabaBenar(Data.jawaban_benar || "");
    setSoal(JSON.parse(Data.pertanyaan) || {});
  }

  /*
   * Menagani pemrosesan jawaban supaya lebih interaktif
   * 1. mengatur tinggi textarea otomatis jika ada garis baru
   */

  // mengatur tinggi area berdasarkan garis baru * 20

  function handleTextJawaban(text, pilgan) {
    // menghitung tinggi
    let tinggi_text_area = 45;
    let jumlah_baris = text.split("\n");

    if (jumlah_baris.length > 0) {
      tinggi_text_area = jumlah_baris.length * 20;
    } else {
      tinggi_text_area = 45;
    }

    switch (pilgan) {
      case "A":
        setJawbanA(text);
        jawabanARef.current.style = `height: ${tinggi_text_area}px;`;
        break;
      case "B":
        setJawbanB(text);
        jawabanBRef.current.style = `height: ${tinggi_text_area}px;`;
        break;
      case "C":
        setJawbanC(text);
        jawabanCRef.current.style = `height: ${tinggi_text_area}px;`;
      case "D":
        setJawbanD(text);
        jawabanDRef.current.style = `height: ${tinggi_text_area}px;`;
        break;
      default:
      //
    }
  }

  // mengirimkan data ke server
  async function handleSubmit() {
    setSubmit(true);

    const soals = await instanceref.current.save();

    // data yang dibutuhkan server
    const data = new FormData();
    data.append("id", id);
    data.append("pertanyaan", JSON.stringify(soals));
    data.append("jawaban_a", jawabanA);
    data.append("jawaban_b", jawabanB);
    data.append("jawaban_c", jawabanC);
    data.append("jawaban_d", jawabanD);
    data.append("jawaban_benar", jawabanBenar);

    fetch(`${api.api_endpoint}/materi/test/update`, {
      method: "PUT",
      headers: {
        authorization: api.authorization,
      },
      body: data,
    })
      .then((res) => {
        return res.json();
      })
      .then((final) => {
        console.log(final);
        setSubmit(false);
        setSucess(true);
        window.scrollTo(0, 0);
      })
      .catch((err) => {
        console.warn(err);
      });
  }

  return (
    <CenterComponent>
      <Head>
        <title>Edit Soal</title>
      </Head>
      <div className={style.container_popup}>
        <h3>Edit Soal</h3>

        {/* success indicator */}
        {sucess ? <Success /> : ""}
        {/*  */}

        <label className={style.label}>Soal</label>
        <EditorSoal
          holder="holder"
          autofocus={true}
          tools={ComponentEditor}
          instanceRef={(instance) => (instanceref.current = instance)}
          data={soal}
        />
        <div id="holder" className={style.holder}></div>

        <hr />
        <div className={style.container_jawaban}>
          <input
            checked={jawabanBenar === "A" ? "checked" : ""}
            onChange={() => {
              setJawabaBenar("A");
              setSucess(false);
            }}
            class="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
          />
          <textarea
            ref={jawabanARef}
            id="jawaban_a"
            defaultValue={jawabanA}
            onChange={(evt) => {
              handleTextJawaban(evt.target.value, "A");
              setSucess(false);
            }}
            name="jawaban"
            placeholder="Jawaban A"
            className={style.area_jawaban}
          ></textarea>
        </div>

        <div className={style.container_jawaban}>
          <input
            checked={jawabanBenar === "B" ? "checked" : ""}
            onChange={() => {
              setJawabaBenar("B");
              setSucess(false);
            }}
            class="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
          />
          <textarea
            ref={jawabanBRef}
            id="jawaban_b"
            defaultValue={jawabanB}
            onChange={(evt) => {
              handleTextJawaban(evt.target.value, "B");
              setSucess(false);
            }}
            name="jawaban"
            placeholder="Jawaban B"
            className={style.area_jawaban}
          ></textarea>
        </div>

        <div className={style.container_jawaban}>
          <input
            checked={jawabanBenar === "C" ? "checked" : ""}
            onChange={() => {
              setJawabaBenar("C");
              setSucess(false);
            }}
            class="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
          />
          <textarea
            ref={jawabanCRef}
            id="jawaban_c"
            defaultValue={jawabanC}
            onChange={(evt) => {
              handleTextJawaban(evt.target.value, "C");
              setSucess(false);
            }}
            name="jawaban"
            placeholder="Jawaban C"
            className={style.area_jawaban}
          ></textarea>
        </div>

        <div className={style.container_jawaban}>
          <input
            checked={jawabanBenar === "D" ? "checked" : ""}
            onChange={() => {
              setJawabaBenar("D");
              setSucess(false);
            }}
            class="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
          />
          <textarea
            ref={jawabanDRef}
            id="jawaban_d"
            defaultValue={jawabanD}
            onChange={(evt) => {
              handleTextJawaban(evt.target.value, "D");
              setSucess(false);
            }}
            name="jawaban"
            placeholder="Jawaban D"
            className={style.area_jawaban}
          ></textarea>
        </div>

        <button
          onClick={() => handleSubmit()}
          type="button"
          className={style.btn_add}
        >
          {submit ? "loading..." : "Simpan Perubahan"}
        </button>
      </div>
    </CenterComponent>
  );
}
