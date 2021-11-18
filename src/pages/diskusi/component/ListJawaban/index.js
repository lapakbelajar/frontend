import { useEffect, useRef, useState } from "react";
import { ChevronRight } from "react-feather";

// style
import popupstyle from "../../../../molekul/popup/Popup.module.css";
import style from "./List.module.css";

// component
import Link from "next/link";
import Image from "next/image";
import { timeAgo } from "../../../../molekul/Time/";

// state
import { store } from "../../../../config/redux/store";

export default function ListJawaban({ DataJawaban }) {
  const popupRef = useRef(null);
  const [componentName, setCompName] = useState("listJawaban");
  // state posisi
  const [top, setTop] = useState("-200%");

  // jawaban
  const [listJawaban, setListJawaban] = useState([]);

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

    //
    setListJawaban(DataJawaban);
  }, []);

  function handleStyle() {
    window.addEventListener("click", (evt) => {
      if (evt.target === popupRef.current) {
        setTop("-200%");
      }
    });
  }

  return (
    <div ref={popupRef} className={popupstyle.popup} style={{ top: top }}>
      <div className={popupstyle.container}>
        <div className={style.container_jawaban}>
          {/* box penjawab */}
          {listJawaban.map((items, i) => (
            <Link href={`/diskusi/jawaban/${items.identitas}`} key={i}>
              <a className={style.box_penjawab}>
                {items.anonim ? (
                  <Image
                    src="/illustration/anonim.png"
                    width={55}
                    height={55}
                    alt="anonim"
                  />
                ) : (
                  <img src={items.user.image} alt={items.user.name} />
                )}
                <div className={style.jawaban_desc}>
                  <span>
                    {items.anonim ? "anonim" : items.user.name}, menjawab
                    pertanyaan mu
                  </span>
                  <small>{timeAgo.format(new Date(items.waktu))}</small>
                </div>
                <button type="button" className={style.btn_go}>
                  <ChevronRight color="#363636" />
                </button>
              </a>
            </Link>
          ))}
          {/*  */}
        </div>
      </div>
    </div>
  );
}
