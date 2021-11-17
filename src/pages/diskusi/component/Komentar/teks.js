import style from "./Komentar.module.css";
//
import Image from "next/image";
// icon
import { ThumbsUp } from "react-feather";

export default function TextComments({ pesan, user, waktu, anonim }) {
  return (
    <div className={style.comments}>
      {/* profile */}
      <div className={style.profile}>
        {anonim ? (
          <Image
            src="/illustration/anonim.png"
            alt="jepang"
            width={45}
            height={45}
          />
        ) : (
          <img src={user.image} alt={user.name} />
        )}
        <div className={style.profile_desc}>
          <h4>{anonim ? "anonim" : user.name}</h4>
          <small>{waktu}</small>
        </div>
      </div>
      {/* isi jawaban */}
      <div className={style.jawaban}>
        <p>{pesan}</p>
      </div>

      {/* stats */}
      <div className={style.stats}>
        <button type="button" className={style.btn_stats}>
          <ThumbsUp color="#696969" size={16} />
          <span>10</span>
        </button>
        <button type="button" className={style.btn_stats}>
          <ThumbsUp color="#696969" size={16} />
          <span>10</span>
        </button>
      </div>
      {/*  */}
    </div>
  );
}
