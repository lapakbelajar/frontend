import style from "./JawabanLain.module.css";

// component
import Link from "next/link";

// icon
import { ArrowRight } from "react-feather";

export default function JawabanLain({
  username = "-",
  userimage = "-",
  education = "-",
  skill = "-",
  time = "-",
  anonim = false,
  preview = "-",
  identitas_jawaban = "-",
}) {
  return (
    <div className={style.container}>
      {/* data pengirim jawaban */}
      <div className={style.profile}>
        <div className={style.profile_image}>
          {anonim ? (
            <img src="/illustration/anonim.png" alt="anonim" />
          ) : (
            <img src={userimage} alt={username} />
          )}
        </div>
        <div className={style.profile_desc}>
          <h5>{anonim ? "anonim" : username}</h5>
          <small>{anonim ? "-" : education}</small>
          <small>-</small>
          <small>{anonim ? "-" : skill}</small>
        </div>
      </div>

      {/* data pertanyaan */}
      <div className={style.body}>
        <p>{preview}</p>

        <Link href={`/diskusi/jawaban/${identitas_jawaban}`}>
          <a className={style.link_next}>
            Selengkapnya <ArrowRight color="#363636" size={18} />
          </a>
        </Link>
      </div>
      {/* CTA */}
    </div>
  );
}
