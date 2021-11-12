import { useEffect, useRef, useState } from "react";
import style from "./Popup.module.css";

// state management
import { store } from "../../config/redux/store";
/*
* Fungsi dibawah ini merupakan komponen popup yang bisa digunakan ketika
? 1. menampilkan pesan dengan popup contonhya alert
? 2. meminta data, contohnya saat mengajukan pertanyaan

TODO fungsi dibawah ini menerima paremeter sebagai berikut :

? 1. children -> child component -> component (jsx)
? 2. top -> posisi popup default "-200%" untuk menampilkan maka top harus "0%" -> string
*/

export default function PopUp(props) {
  const popupRef = useRef(null);
  const [top, setTop] = useState("-200%");

  // menghilangkan popup ketika overlay di klik

  function handleStyle() {
    window.addEventListener("click", (evt) => {
      if (evt.target === popupRef.current) {
        setTop("-200%");
      }
    });
  }
  return (
    <div ref={popupRef} className={style.popup} style={{ top: top }}>
      <div className={style.container}>{props.children}</div>
    </div>
  );
}
