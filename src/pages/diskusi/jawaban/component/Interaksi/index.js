import { useState, useRef, useEffect } from "react";
import { X } from "react-feather";
import style from "./Interaksi.module.css";

// component
import Image from "next/image";

// icon
import { Heart } from "react-feather";

// helper
import { handleStyle, handleTextArea } from "./helper/style";
import { listenForShowingComments } from "./helper/state";

// state management

export default function Interaksi() {
  const popupRef = useRef(null);
  const textRef = useRef(null);

  //
  const [left, setLeft] = useState("0%");
  const [componentName, setCompName] = useState("interaksi");

  // identitas
  const [anonim, setAnonim] = useState(false);

  // state text
  const [textComments, setTextComments] = useState("");
  const [textHeight, setTextHeight] = useState(45);

  useEffect(() => {
    handleStyle(popupRef.current, setLeft);
    listenForShowingComments(setLeft);
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

        {/* list komentar */}
        <div className={style.list_komentar}>
          <div className={style.data_header}>
            <img
              src="https://images.unsplash.com/photo-1637588267796-aafa984ce3d5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              alt="user's name"
            />
            <div className={style.data_header_desc}>
              <span>Alexander Brio</span>
              <small>2 jam yang lalu</small>
            </div>
          </div>
          {/* isi komentar */}
          <div className={style.isi_komentar}>
            <p>
              Keren sekali isinya bermutu dan juga entah kenapa saya suka banget
              dah
            </p>
          </div>
          {/*  */}
          {/* penilaian */}
          <div className={style.penilaian}>
            <button type="button" className={style.btn_likes}>
              <Heart size={20} color="#696969" />
              <span>10</span>
            </button>
          </div>
        </div>
        <div className={style.list_komentar}>
          <div className={style.data_header}>
            <img
              src="https://images.unsplash.com/photo-1637588267796-aafa984ce3d5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              alt="user's name"
            />
            <div className={style.data_header_desc}>
              <span>Alexander Brio</span>
              <small>2 jam yang lalu</small>
            </div>
          </div>
          {/* isi komentar */}
          <div className={style.isi_komentar}>
            <p>
              Keren sekali isinya bermutu dan juga entah kenapa saya suka banget
              dah
            </p>
          </div>
          {/*  */}
          {/* penilaian */}
          <div className={style.penilaian}>
            <button type="button" className={style.btn_likes}>
              <Heart size={20} color="#696969" />
              <span>10</span>
            </button>
          </div>
        </div>

        <div className={style.list_komentar}>
          <div className={style.data_header}>
            <img
              src="https://images.unsplash.com/photo-1637588267796-aafa984ce3d5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              alt="user's name"
            />
            <div className={style.data_header_desc}>
              <span>Alexander Brio</span>
              <small>2 jam yang lalu</small>
            </div>
          </div>
          {/* isi komentar */}
          <div className={style.isi_komentar}>
            <p>
              Keren sekali isinya bermutu dan juga entah kenapa saya suka banget
              dah
            </p>
          </div>
          {/*  */}
          {/* penilaian */}
          <div className={style.penilaian}>
            <button type="button" className={style.btn_likes}>
              <Heart size={20} color="#696969" />
              <span>10</span>
            </button>
          </div>
        </div>
        {/*  */}
      </div>
    </div>
  );
}
