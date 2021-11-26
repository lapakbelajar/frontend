import { useState, useRef, useEffect } from "react";
import { Plus, X } from "react-feather";
import style from "./Interaksi.module.css";

// component
import Image from "next/image";

// icon
import { Heart } from "react-feather";

// helper
import { handleStyle, handleTextArea } from "./helper/style";
import {
  getMore,
  kirimKomentar,
  listenForShowingComments,
} from "./helper/state";
import { timeAgo } from "../../../../../molekul/Time";

// authorization
import cookie from "js-cookie";
import { authentication } from "./helper/state";

export default function Interaksi({ DataKomentar, IdentitasJawaban }) {
  const popupRef = useRef(null);
  const textRef = useRef(null);

  // list data
  const [listKomentar, setListKomentar] = useState([]);

  //
  const [left, setLeft] = useState("-200%");
  const [componentName, setCompName] = useState("interaksi");

  // identitas
  const [anonim, setAnonim] = useState(false);

  // state text
  const [textComments, setTextComments] = useState("");
  const [textHeight, setTextHeight] = useState(45);

  // update komentar
  const [startUpdate, setStartUpdate] = useState(false);
  const [startPoint, setStartPoint] = useState(16);
  const [endPoint, setEndpoint] = useState(31);

  // user
  const [login, setLogin] = useState(false);
  const [userActive, setUser] = useState({
    id: 0,
    name: "",
    image: "",
  });

  useEffect(() => {
    setListKomentar(DataKomentar);

    //
    handleStyle(popupRef.current, setLeft);
    listenForShowingComments(setLeft);

    // authentication user
    const user = authentication(cookie.get("auth_user"));
    if (Object.keys(user).length > 0) {
      setUser(user);
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, []);
  return (
    <div ref={popupRef} className={style.popup} style={{ left: left }}>
      <div className={style.container}>
        {/* header */}
        <div className={style.container_header}>
          <h6>Komentar</h6>
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
          {login ? (
            anonim ? (
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
                  <img src={userActive.image} alt={userActive.name} />
                  <div className={style.profile_desc}>
                    <span>{userActive.name}</span>
                  </div>
                </div>
              </>
            )
          ) : (
            ""
          )}
          {/* input text */}
          <textarea
            ref={textRef}
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
                  htmlFor="flexSwitchCheckDefault"
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
              {login ? (
                <button
                  onClick={() => {
                    // mengirimkan komentar
                    kirimKomentar(
                      textComments,
                      IdentitasJawaban,
                      userActive.id,
                      anonim,
                      listKomentar,
                      setListKomentar
                    );

                    // membersihkan form input
                    textRef.current.value = "";
                  }}
                  type="button"
                  className={style.btn_send}
                >
                  Kirim
                </button>
              ) : (
                <button
                  onClick={() => (window.location.href = "/login")}
                  type="button"
                  className={style.btn_send}
                >
                  login
                </button>
              )}
            </div>
          </div>
          {/*  */}
        </div>

        {/* list komentar */}

        {listKomentar.map((items, i) => (
          <div className={style.list_komentar} key={i}>
            <div className={style.data_header}>
              {items.anonim ? (
                <Image
                  src="/illustration/anonim.png"
                  alt="anonim"
                  width={45}
                  height={45}
                />
              ) : (
                <img src={items.user.image} alt={items.user.name} />
              )}
              <div className={style.data_header_desc}>
                <span>{items.anonim ? "Anonim" : items.user.name}</span>
                <small>{timeAgo.format(new Date(items.waktu))}</small>
              </div>
            </div>
            {/* isi komentar */}
            <div className={style.isi_komentar}>
              <p>{items.komentar}</p>
            </div>
            {/*  */}
            {/* penilaian */}
            <div className={style.penilaian}>
              {/* <button type="button" className={style.btn_likes}>
                <Heart size={20} color="#696969" />
                <span>10</span>
              </button> */}
            </div>
          </div>
        ))}
        {/* update data komentar */}
        {listKomentar.length > 15 ? (
          <button
            onClick={() => {
              setStartUpdate(true);
              getMore(
                IdentitasJawaban,
                startPoint,
                endPoint,
                setStartPoint,
                setEndpoint,
                setStartUpdate,
                listKomentar,
                setListKomentar
              );
            }}
            className={style.btn_more}
            type="button"
          >
            <Plus color="#363636" size={22} />
            <span>{startUpdate ? "Loading..." : "Tampilkan lebih banyak"}</span>
          </button>
        ) : (
          ""
        )}
        {/*  */}
      </div>
    </div>
  );
}
