import style from "./Komentar.module.css";
//
import Image from "next/image";
// icon
import { ThumbsUp } from "react-feather";

export default function TextComments() {
  return (
    <div className={style.comments}>
      {/* profile */}
      <div className={style.profile}>
        <Image
          src="/illustration/jepang.jpg"
          alt="jepang"
          width={45}
          height={45}
        />
        <div className={style.profile_desc}>
          <h4>Cristiano Ronaldo</h4>
          <small>2 jam yang lalu</small>
        </div>
      </div>
      {/* isi jawaban */}
      <div className={style.jawaban}>
        <p>Apakah kamu serius ?</p>
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
