import { useState, useRef, useEffect } from "react";
import { X } from "react-feather";
import style from "./Interaksi.module.css";

// component
import Image from "next/image";

// helper
import { handleStyle, handleTextArea } from "./helper/style";

export default function Interaksi() {
  const popupRef = useRef(null);
  const textRef = useRef(null);
  const [left, setLeft] = useState("0%");
  const [componentName, setCompName] = useState("interaksi");

  // identitas
  const [anonim, setAnonim] = useState(false);

  // state text
  const [textComments, setTextComments] = useState("");
  const [textHeight, setTextHeight] = useState(45);

  useEffect(() => {
    handleStyle(popupRef.current, setLeft);
  }, [textHeight]);

  return (
    <div ref={popupRef} className={style.popup} style={{ left: left }}>
      <div className={style.container}>
        {/* header */}
        <div className={style.container_header}>
          <h6>Komentar 20</h6>
          <button
            onClick={() => setLeft("-200%")}
            type="button"
            className={style.btn_transparent}
          >
            <X color="#c5c5c5" size={22} />
          </button>
        </div>
        {/* ajukan pertanyaan */}
        <div className={style.pertanyaan}>
          {/* profile */}
          {anonim ? (
            <div className={style.pertanyaan_header}>
              <Image
                src="/illustration/anonim.png"
                alt="anonim"
                width={35}
                height={35}
                style={{ marginRight: 20 }}
              />
              <div className={style.profile_desc}>
                <span>Anonim</span>
              </div>
            </div>
          ) : (
            <>
              <div className={style.pertanyaan_header}>
                <img
                  src="https://cdn.pixabay.com/photo/2021/11/08/23/29/nature-6780354_960_720.jpg"
                  alt="user's name"
                />
                <div className={style.profile_desc}>
                  <span>Rizki Maulana</span>
                </div>
              </div>
            </>
          )}
          {/* input text */}
          <textarea
            className={style.text}
            onChange={(evt) =>
              handleTextArea(setTextHeight, setTextComments, evt.target.value)
            }
            style={{ height: `${textHeight}px` }}
            placeholder="Tulis Komentar disini.."
          ></textarea>
          {/* action */}
          <div className={style.container_action}>
            <div className={style.identity}>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                  onChange={() => setAnonim(!anonim)}
                />
                <label
                  className="form-check-label"
                  for="flexSwitchCheckDefault"
                >
                  {anonim ? "normal" : "anonim"}
                </label>
              </div>
            </div>
            <div className={style.container_send}>
              <span
                onClick={() => setLeft("-200%")}
                className={style.btn_cancel}
              >
                Batal
              </span>
              <button type="button" className={style.btn_send}>
                Kirim
              </button>
            </div>
          </div>
          {/*  */}
        </div>
        {/*  */}
      </div>
    </div>
  );
}
