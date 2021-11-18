import style from "./Komentar.module.css";
//
import Image from "next/image";
// icon
import { ThumbsUp } from "react-feather";
import { file, file_path } from "../../../../config/api";

export default function ImageComments({ pesan, user, waktu, anonim }) {
  return (
    <div className={style.comments}>
      {/* profile */}
      <div className={style.profile}>
        {anonim ? (
          <Image
            src="/illustration/anonim.png"
            alt={"anonim"}
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
        <img
          onClick={() => window.open(`${file}${file_path}${pesan}`)}
          src={`${file}${file_path}${pesan}`}
          alt={pesan}
        />
      </div>
    </div>
  );
}
