import style from "../../css/Notifikasi.module.css";

// component
import Image from "next/image";
// icon
import { Trash } from "react-feather";
import { useRef } from "react";
import api from "../../../../config/api";

export default function NotificationBox({
  user,
  pesan,
  waktu,
  tautan,
  anonim,
  id,
}) {
  const redirectRef = useRef(null);

  /**
   * update status dilihat menjadi true ketika user klik notifikasi
   */

  function handleClickNotif() {
    fetch(`${api.api_endpoint}/notifikasi/update/${id}`, {
      method: "PUT",
      headers: {
        authorization: api.authorization,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((final) => {
        console.log(final);
        window.location.href = tautan;
      })
      .catch((err) => {
        console.warn(err);
      });
  }

  return (
    <div className={style.box_notif} onClick={() => handleClickNotif()}>
      {/* notif sender */}
      <div className={style.credential}>
        {/* profile */}
        <div className={style.profile}>
          {anonim ? (
            <Image
              src="/illustration/anonim.png"
              alt="anonim"
              width={45}
              height={45}
              alt="anonim"
            />
          ) : (
            <img src={user.image} alt={user.name} />
          )}
          <div className={style.profile_desc}>
            <h5>{anonim ? "anonim" : user.name}</h5>
            <small>{waktu}</small>
          </div>
        </div>

        {/* action button */}
        <button type="button" className={style.btn_delete}>
          <Trash color="#696969" size={16} />
        </button>
        {/*  */}
      </div>

      {/* body notification */}
      <span>{pesan}</span>
    </div>
  );
}
