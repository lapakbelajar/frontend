import style from "./Center.module.css";
import Image from "next/image";
import Link from "next/link";

// icon
import { MessageSquare, Edit3, Filter, Plus } from "react-feather";

// component
import Pertanyaan from "../Pertanyaan";
import { useState } from "react";

export default function CenteredContent() {
  const [showQuestion, setShowQuestion] = useState("-200%");

  return (
    <>
      <Pertanyaan PopupPosition={showQuestion} />
      <div className={style.centered_content}>
        {/* filter data */}
        <div className={style.filter_data}>
          <button
            onClick={() => setShowQuestion("0%")}
            className={style.create_question}
          >
            <Plus color="#ffffff" size={18} />
            <span>Ajukan Pertanyaan</span>
          </button>
          <button className={style.btn_filter}>
            <Filter color="#363636" size={18} />
            <span>Filter</span>
          </button>
        </div>
        {/*  */}
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
              <h4>
                Bagaimana cara mengerjakan soal UTS dengan cepat dan benar ?
              </h4>
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
              <h4>
                Bagaimana cara mengerjakan soal UTS dengan cepat dan benar ?
              </h4>
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
      </div>
    </>
  );
}
