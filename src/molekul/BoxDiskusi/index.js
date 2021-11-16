import style from "./Box.module.css";

// component
import { MessageSquare, Edit3 } from "react-feather";
import Link from "next/link";
import Image from "next/image";

// time
import { timeAgo } from "../Time";

export default function BoxDiskusi({ forum, user }) {
  return (
    <Link href={`/diskusi/detail/${forum.identitas}`}>
      <a className={style.box_diskusi}>
        {/* profile */}
        <div className={style.box_profile}>
          {forum.anonim ? (
            <Image
              src="/illustration/anonim.png"
              alt="anonim"
              width={45}
              height={45}
            />
          ) : (
            <img src={user.image} alt={user.name} />
          )}
          <div className={style.bio}>
            <h5>{forum.anonim ? "anonim" : user.name}</h5>
            <span>{timeAgo.format(new Date(forum.waktu))}</span>
          </div>
        </div>

        {/* pertanyaan */}
        <div className={style.pertanyaan}>
          <p>{forum.pertanyaan}</p>
        </div>
        {/* tags */}
        <div className={style.tags}>
          <div className={style.jenjang}>
            <span>{forum.jenjang}</span>
            <span>{forum.jurusan}</span>
            <span>{forum.kelas}</span>

            {(forum.tags.split(" ") || []).map((tags, idx) => (
              <span key={idx}>#{tags}</span>
            ))}
          </div>
        </div>

        {/* interkasi */}
        <div className={style.interaction}>
          <div className={style.response}>
            <MessageSquare color="#AFAFAF" size={18} />
            <span>10 respon</span>
          </div>
          <div className={style.answer}>
            <Edit3 color="#AFAFAF" size={18} />
            <span>bantu jawab</span>
          </div>
        </div>
      </a>
    </Link>
  );
}
