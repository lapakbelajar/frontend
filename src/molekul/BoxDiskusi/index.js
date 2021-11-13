import style from "./Box.module.css";

// component
import { MessageSquare, Edit3 } from "react-feather";
import Image from "next/image";
import Link from "next/link";

export default function BoxDiskusi() {
  return (
    <Link href="/">
      <a className={style.box_diskusi}>
        {/* profile */}
        <div className={style.box_profile}>
          <Image
            src="/illustration/jepang.jpg"
            width={45}
            height={45}
            alt="jepang"
          />
          <div className={style.bio}>
            <h5>Rizki Maulana</h5>
            <span>2 jam yang lalu</span>
          </div>
        </div>

        {/* pertanyaan */}
        <div className={style.pertanyaan}>
          <h4>Bagaimana cara mengerjakan soal UTS dengan cepat dan benar ?</h4>
        </div>
        {/* tags */}
        <div className={style.tags}>
          <div className={style.jenjang}>
            <span>SMA</span>
            <span>IPA</span>
            <span>10</span>
            <span>#ipa</span>
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
