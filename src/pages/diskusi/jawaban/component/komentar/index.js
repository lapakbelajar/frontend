import style from "./Komentar.module.css";
import Image from "next/image";

// state management
import { store } from "../../../../../config/redux/store";

export default function Komentar() {
  return (
    <div className={style.container}>
      <button type="button" className={style.btn_action}>
        <Image src="/icon/jempol.svg" alt="jempol" width={27} height={30} />
        <span>10</span>
      </button>
      <button
        onClick={() => {
          store.dispatch({
            type: "detail_box_komentar",
            payload: { visibility: true },
          });
        }}
        type="button"
        className={style.btn_action}
      >
        <Image src="/icon/komentar.svg" alt="komentar" width={27} height={30} />
        <span>10</span>
      </button>
    </div>
  );
}
