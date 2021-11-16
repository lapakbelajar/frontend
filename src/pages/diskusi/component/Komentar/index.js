import style from "./Komentar.module.css";

// icon
import {
  Plus,
  Image,
  Mic,
  Send,
  File,
  Paperclip,
  X,
  Trash2,
} from "react-feather";
import { useRef, useState } from "react";
import { store } from "../../../../config/redux/store";

// handler
import { startRecording, stopRecording } from "./handler/audio";

// component

export default function Komentar() {
  const containerBtnRef = useRef(null);
  const btnShowMediaRef = useRef(null);

  const [showButton, setShowButton] = useState(false);
  const [mediaType, setMediaType] = useState("text");

  // audio states
  const [detik, setDetik] = useState(0);
  const [menit, setMenit] = useState(0);

  /**
   * Fungsi dibawah ini digunakan untuk menangani data text dari textarea
   * 1. mengatur tinggi komponen setiap ada baris baru * 20px
   */

  const [heighText, setHeighText] = useState(40);

  function handleText(teks) {
    if (teks.length > 2) {
      const new_line = teks.split("\n").length * 20;
      setHeighText(new_line);
    } else {
      setHeighText(45);
    }
  }

  return (
    <div className={style.komentar}>
      {/* tombol untuk membantu menjawab */}
      <button
        onClick={() =>
          store.dispatch({ type: "show", payload: { name: "jawaban" } })
        }
        type="button"
        className={style.btn_jawaban}
      >
        <Plus color="#ffffff" size={18} />
        <span>Bantu Menjawab</span>
      </button>

      {/* kolom komentar untuk menanyakan sesuatu dalam pesan singkat */}
      <div className={style.kolom_komentar}>
        <div
          className={mediaType === "text" ? style.text_comments : style.hide}
        >
          <textarea
            onChange={(evt) => {
              handleText(evt.target.value);
              setShowButton(false);
            }}
            placeholder="tulis komentar disini"
            className={style.textarea}
            style={{ height: `${heighText}px` }}
          ></textarea>
          <button
            ref={btnShowMediaRef}
            onClick={(evt) => {
              setShowButton(!showButton);
            }}
            type="button"
            className={
              showButton ? style.btn_transparent_active : style.btn_transparent
            }
          >
            {showButton ? (
              <X size={18} color="#696969" />
            ) : (
              <Paperclip size={18} color="#696969" />
            )}
          </button>
          <button className={style.btn_send} type="button">
            <Send color="#ffffff" size={18} />
          </button>

          {/* popup untuk kirim media file */}
          <div
            ref={containerBtnRef}
            className={showButton ? style.medias : style.hide}
          >
            <button
              onClick={() => {
                startRecording(detik, menit, setDetik, setMenit);
                setMediaType("audio");
                setShowButton(false);
              }}
              type="button"
              className={style.btn_media}
            >
              <Mic size={18} color="#696969" />
            </button>
            <button
              onClick={() => {
                store.dispatch({
                  type: "show",
                  payload: { name: "media", type: "image" },
                });
                setShowButton(false);
              }}
              type="button"
              className={style.btn_media}
            >
              <Image size={18} color="#696969" />
            </button>
            <button
              onClick={() => {
                store.dispatch({
                  type: "show",
                  payload: { name: "media", type: "file" },
                });
                setShowButton(false);
              }}
              type="button"
              className={style.btn_media}
            >
              <File size={18} color="#696969" />
            </button>
          </div>
          {/*  */}
        </div>

        {/* komentar audio */}
        <div
          className={mediaType === "audio" ? style.komentar_audio : style.hide}
        >
          <button
            onClick={() => {
              setMediaType("text");
              stopRecording();
            }}
            className={style.btn_delete}
            type="button"
          >
            <Trash2 size={18} color="#ffffff" />
          </button>
          <div className={style.keterangan_audio}>
            <small>
              {menit}:{detik} mendengarkan...
            </small>
          </div>
          <button type="button" className={style.btn_send}>
            <Send color="#ffffff" size={18} />
          </button>
        </div>
      </div>
      {/*  */}
    </div>
  );
}
