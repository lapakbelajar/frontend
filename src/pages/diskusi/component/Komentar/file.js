import style from "./Komentar.module.css";
//
import Image from "next/image";
// icon
import { ThumbsUp } from "react-feather";

//
import api from "../../../../config/api";

export default function DocumentComments({ pesan, user, waktu, anonim }) {
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
        <p>
          mengirimkan file{" "}
          <a href={`${api.file}${api.file_path}${pesan}`} download>
            <strong style={{ color: "blue" }}>{pesan}</strong>
          </a>
        </p>
      </div>
    </div>
  );
}
