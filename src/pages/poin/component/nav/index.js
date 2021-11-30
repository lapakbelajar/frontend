import { useState } from "react";
import style from "../../css/Poin.module.css";

// state management
import { store } from "../states";

export default function PoinNav() {
  const [riwayat, setRiwayat] = useState(true);
  return (
    <div className={style.navigasi}>
      <span
        onClick={() => {
          // mengubah state secara global
          store.dispatch({
            type: "riwayat",
          });

          // mengubah state secara local
          setRiwayat(true);
        }}
        className={riwayat ? style.nav_active : style.nav}
      >
        Riwayat
      </span>
      <span
        onClick={() => {
          // mengubah state secara global
          store.dispatch({
            type: "penarikan",
          });

          // mengubah state secara local
          setRiwayat(false);
        }}
        className={!riwayat ? style.nav_active : style.nav}
      >
        Penarikan
      </span>
    </div>
  );
}
