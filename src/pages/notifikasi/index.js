import style from "./css/Notifikasi.module.css";

// component
import Navbar from "../../molekul/navbar";
import NotificationBox from "./component/notif";

export default function Notifikasi() {
  return (
    <>
      <Navbar />
      <div className={style.container}>
        <div className={style.canvas}>
          {/* box notifikasi */}
          <NotificationBox />
          <NotificationBox />
          <NotificationBox />
          {/*  */}
        </div>
      </div>
    </>
  );
}
