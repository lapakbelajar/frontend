import style from "./Komentar.module.css";

// icon
import { Plus, Image, Video, Mic, Send, File, StopCircle } from "react-feather";
import { useState } from "react";
import { store } from "../../../../config/redux/store";

export default function Komentar() {
  const [startInteract, setInteract] = useState(false);
  const [mediaType, setMediaType] = useState("text");
  const [textMsg, setTextMsg] = useState("");

  function handleTextData(text) {
    if (text.length > 0) {
      setTextMsg(text);
      setInteract(true);
    } else {
      setInteract(false);
    }
  }

  // menangani data audio
  function handleAudio() {
    setMediaType("audio");
    setInteract(true);
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
        <div className={style.media}>
          {/* text */}
          <textarea
            placeholder="Tulis komentar disini.."
            className={mediaType === "text" ? style.textarea : style.hide}
            onChange={(evt) => handleTextData(evt.target.value)}
          ></textarea>

          {/* audio */}
          <div
            className={
              mediaType === "audio" ? style.audio_container : style.hide
            }
          >
            <div className={style.action_audio}>
              <button type="button" className={style.stop_recording}>
                <StopCircle size={22} color="#ffffff" />
              </button>
              <small>00:01 mendengarkan..</small>
            </div>
          </div>
        </div>
        {startInteract ? (
          <div className={style.container_send}>
            <button className={style.btn_send} type="button">
              <Send color="#ffffff" size={16} />
            </button>
          </div>
        ) : (
          <div className={style.controls}>
            <button
              onClick={() => handleAudio()}
              type="button"
              className={style.btn_transparent}
            >
              <Mic color="#696969" size={16} />
            </button>
            <button
              onClick={() =>
                store.dispatch({
                  type: "show",
                  payload: { name: "media", type: "image" },
                })
              }
              type="button"
              className={style.btn_transparent}
            >
              <Image color="#696969" size={16} />
            </button>
            <button
              onClick={() =>
                store.dispatch({
                  type: "show",
                  payload: { name: "media", type: "file" },
                })
              }
              type="button"
              className={style.btn_transparent}
            >
              <File color="#696969" size={16} />
            </button>
            {/* <button type="button" className={style.btn_transparent}>
              <Video color="#696969" size={16} />
            </button> */}
          </div>
        )}
      </div>
      {/*  */}
    </div>
  );
}
