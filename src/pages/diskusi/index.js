// component
import Navbar from "./component/navbar";
import SidebarRight from "./component/SidebarRight";
import SidebarLeft from "./component/SidebarLeft";
import CenteredContent from "./component/CenteredContent";
import PopUp from "../../molekul/popup";

// style
import style from "./css/Diskusi.module.css";
import Pertanyaan from "./component/Pertanyaan";

// state management
import { store } from "../../config/redux/store";
import { useEffect, useRef, useState } from "react";

export default function Diskusi() {
  const popupRef = useRef(null);
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

  return (
    <>
      <div className={style.main}>
        <Navbar />
        {/* bikin pertanyaan */}
        <Pertanyaan />
        {/* popup filter */}
        <div ref={popupRef} className={style.popup} style={{ top: top }}>
          <div className={style.container}>
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
            <strong className={style.strong}>Waktu</strong>
            <div className={style.cover_date}>
              <input type="date" className="form-control" />
            </div>

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

        {/* konten utama */}
        <div className={style.main_content}>
          <div className="container">
            <div className={style.content}>
              <SidebarLeft />
              <CenteredContent />
              <SidebarRight />
            </div>
          </div>
        </div>

        {/*  */}
      </div>
    </>
  );
}
