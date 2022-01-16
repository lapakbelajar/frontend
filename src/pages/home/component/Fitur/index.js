import style from "./Fitur.module.css";

// component
import Image from "next/image";
import Link from "next/link";

// icon
import { ArrowRight, ChevronLeft, ChevronRight } from "react-feather";

// authentication
import { jwt_key } from "../../../../config/api";
import cookie from "js-cookie";
import { useEffect, useState } from "react";
import { isUserLogin } from "../../helper";

// component
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Scrollbar } from "swiper";
SwiperCore.use([Navigation, Scrollbar]);

import team from "./data/team";
import partner from "./data/partner";

export default function Fitur() {
  const [auth, setAuth] = useState({
    login: false,
  });

  useEffect(() => {
    const userCheck = isUserLogin(cookie.get("auth_user"), jwt_key);
    setAuth(userCheck);
  }, []);

  return (
    <>
      {/* detail fitur */}
      {/* ruang diskusi */}
      <div className={style.fitur}>
        <div className={style.box_fitur}>
          <Image
            src="/illustration/ruang-diskusi.png"
            width={551}
            height={451.25}
            alt="ruang diskusi"
          />
        </div>
        <div className={style.box_fitur}>
          <div className={style.text_fitur}>
            <h3>Buat ruang diskusi dan bahas tentang apapun</h3>
            <p>
              kami menyediakan fasilitas diskusi agar pembelajaran mu lebih
              interaktif dan menyenangkan.
            </p>
          </div>
        </div>
      </div>

      {/* unfair advantage */}
      <div className={style.fitur2}>
        <div className={style.box_fitur}>
          <div className={style.text_fitur}>
            <h3>Dapatkan Jawaban Kurang dari 1 Jam</h3>
            <p>
              Apakah guru atau teman kamu lambat dalam merespon pertanyaan mu ?,
              sudah saatnya berdiskusi di lapak belajar kami akan memberikan
              jawaban dibawah 1 jam
            </p>
          </div>
        </div>
        <div className={style.box_fitur}>
          <Image
            src="/illustration/fast.svg"
            width={250}
            height={250}
            alt="unfair advantage"
          />
        </div>
      </div>

      {/* fitur diskusi */}

      <div className={style.fitur}>
        <div className={style.box_fitur}>
          <div className={style.text_fitur}>
            <h3>Interaksi jadi lebih menyenangkan</h3>
            <p>
              Tersedia fitur ke kinian yang memungkinkan membuat diskusi mu
              lebih menarik
            </p>
          </div>
        </div>
        <div className={style.box_fitur}>
          <Image
            src="/illustration/fitur-disuksi.png"
            width={636}
            height={445}
            alt="fitur diskusi"
          />
        </div>
      </div>

      {/* fitur private */}
      <div className={style.fitur} style={{ backgroundColor: "#fafaff" }}>
        <div className={style.box_fitur}>
          {/* swipper */}
          <div className={style.box_mentor}>
            {/* <button type="button" className={style.btn_slide}>
              <ChevronLeft color="#2AD78B" size={14} />
            </button> */}
            <Swiper
              navigation={true}
              spaceBetween={0}
              slidesPerView={1}
              pagination={{ clickable: true }}
              scrollbar={{ hide: true }}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {team.map((items, i) => (
                <SwiperSlide key={i}>
                  <div className={style.slider}>
                    <img src={items.foto} alt={items.nama} />
                    <h5>{items.nama}</h5>
                    <small>{items.universitas}</small>
                    <span>{items.keahlian}</span>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            {/* <button type="button" className={style.btn_slide}>
              <ChevronRight color="#2AD78B" size={14} />
            </button> */}
          </div>
          {/*  */}
        </div>
        <div className={style.box_fitur}>
          <div className={style.text_fitur}>
            <h3>Privat</h3>
            <p>
              Butuh mentor untuk belajar secara intensif ? kami memberikan
              fasilitas privat untuk mu dengan berbagai mentor yang ahli di
              bidangnya
            </p>
            <Link href="/privat">
              <a className={style.btn_join}>
                <span>Ambil Kelas</span>
                <ArrowRight color="#ffffff" size={16} />
              </a>
            </Link>
          </div>
        </div>
      </div>

      <div className={style.menjadi_tutor}>
        <div className={style.box_fitur}>
          <div className={style.text_fitur}>
            <h3>Menjadi Tutor</h3>
            <p>
              Kamu memiliki keahlian dan ingin mendapatkan uang ? siapapun
              sekarang bisa menjadi tutor di lapak belajar
            </p>
            <a
              href="https://bit.ly/TutorLB"
              target="_blank"
              className={style.btn_join}
            >
              <span>Daftar Menjadi Tutor</span>
              <ArrowRight color="#ffffff" size={16} />
            </a>
          </div>
        </div>
        <div className={style.box_fitur}>
          <img src="/illustration/tutor.png" alt="Menjadi Tutor" />
        </div>
      </div>

      {/* parter */}
      <div className={style.partner}>
        <h4>Partner Kami</h4>
        <div className={style.partner_logo}>
          {partner.map((items, i) => (
            <a title={items.name} href={items.sosmed} target="_blank" key={i}>
              <img src={items.logo} alt={items.name} />
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
