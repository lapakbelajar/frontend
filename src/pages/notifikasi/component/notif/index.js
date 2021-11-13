import style from "../../css/Notifikasi.module.css";

// component
import Link from "next/link";

// icon
import { Trash } from "react-feather";

export default function NotificationBox() {
  return (
    <div className={style.box_notif}>
      {/* notif sender */}
      <div className={style.credential}>
        {/* profile */}
        <div className={style.profile}>
          <img
            src="https://cdn.pixabay.com/photo/2021/10/23/03/35/mountain-6734031_960_720.jpg"
            alt=""
          />
          <div className={style.profile_desc}>
            <h5>Rizki Maulana</h5>
            <small>2 jam yang lalu</small>
          </div>
        </div>

        {/* action button */}
        <button type="button" className={style.btn_delete}>
          <Trash color="#696969" size={16} />
        </button>
        {/*  */}
      </div>

      {/* body notification */}
      <Link href="/">
        <a className={style.body}>Ali akbar menjawab pertanyaan anda</a>
      </Link>
    </div>
  );
}
