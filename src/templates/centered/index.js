import style from "./css/Center.module.css";

// icon
import { ArrowLeft } from "react-feather";

export default function CenterComponent(props) {
  return (
    <div className={style.container}>
      <div className={style.canvas}>
        <div className={style.header}>
          <div onClick={() => window.history.back()}>
            <ArrowLeft color="#363636" /> Kembali
          </div>
        </div>
        {props.children}
      </div>
    </div>
  );
}
