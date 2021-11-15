// style
import style from "./Filter.module.css";
import popupstyle from "../../../../molekul/popup/Popup.module.css";
import { useRef, useState, useEffect } from "react";

// hook and state
import { store } from "../../../../config/redux/store";

export default function Filter() {
  const popupRef = useRef(null);

  // data position
  const [top, setTop] = useState("-200%");
  const [componentName, setCompName] = useState("filter");

  useEffect(() => {
    store.subscribe(() => {
      const state = store.getState();
      if (state.type === "show" && state.name == componentName) {
        setTop("0%");
      } else {
        setTop("-200%");
      }
    });
    handleStyle();
  }, []);

  function handleStyle() {
    window.addEventListener("click", (evt) => {
      if (evt.target === popupRef.current) {
        setTop("-200%");
      }
    });
  }

  function handleDate(evt) {
    console.log(evt.target.value);
  }

  return (
    <div ref={popupRef} className={popupstyle.popup} style={{ top: top }}>
      <div className={popupstyle.container}>
        <strong className={style.strong}>Jenjang</strong>
        <div className={style.container_query}>
          <select className={style.select}>
            <option>Jenjang</option>
            <option>SMA</option>
            <option>SMK</option>
            <option>Lainnya</option>
          </select>

          <select className={style.select}>
            <option>Jurusan</option>
            <option>IPA</option>
            <option>IPS</option>
          </select>

          <select className={style.select}>
            <option>Kelas</option>
            <option>10</option>
            <option>11</option>
            <option>12</option>
          </select>
        </div>

        {/* waktu */}
        {/* <strong className={style.strong}>Waktu</strong>
        <div className={style.cover_date}>
          <input
            onChange={(evt) => handleDate(evt)}
            type="datetime-local"
            className="form-control"
          />
        </div> */}

        {/* submit btn */}
        <div className={style.cover_btn}>
          <button
            onClick={() =>
              store.dispatch({ type: "hide", payload: { name: "filter" } })
            }
            type="button"
            className={style.btn_cancel}
          >
            Batal
          </button>
          <button type="button" className={style.btn_submit}>
            Terapkan
          </button>
        </div>
      </div>
    </div>
  );
}
