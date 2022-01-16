import style from "./css/Detail.module.css";

// icon
import { ArrowRight } from "react-feather";

// component
import Link from "next/link";
import Head from "next/head";

// templates
import CenterComponent from "../../templates/centered";
import Profile from "./component/Profile";
import { useEffect, useState } from "react";

//
import { encode as bs6encode } from "js-base64";

export default function Detail({ ProfileExpert, KelasExpert }) {
  const [kelas, setKelas] = useState([]);

  useEffect(() => {
    if (Object.keys(ProfileExpert).length > 0) {
      setKelas(KelasExpert);
    } else {
      window.location.href = "/privat";
    }
  }, []);
  return (
    <CenterComponent>
      <Head>
        <title>Kelas Privat {ProfileExpert.name}</title>
        <meta
          name="description"
          content={`Les privat bersama ${ProfileExpert.name}`}
        />
      </Head>
      <Profile
        image={ProfileExpert.image}
        name={ProfileExpert.name}
        education={ProfileExpert.school}
        skils={ProfileExpert.keahlian}
      />

      <br />
      <h4 className={style.secondary_header}>Kelas Khusus</h4>
      <p style={{ fontSize: "14px", lineHeight: "25px" }}>
        Sekarang kamu bisa mulai kelas privat sesuai dengan keinginan mu, kamu
        bisa meminta kurikulum yang kamu mau, gaya belajar, jadwal belajar atau
        apapun semuanya bebas sesuai dengan yang kamu inginkan
      </p>

      <Link
        href={`/privat/custom/register?tutor=${bs6encode(
          ProfileExpert.id.toString()
        )}`}
      >
        <a
          className="btn btn-primary"
          style={{ fontSize: "14px", fontWeight: 600 }}
        >
          Ajukan Kelas Khusus
        </a>
      </Link>
      {/* list kursus */}
      <div className={style.privat}>
        <strong className={style.secondary_header}>
          Kursus privat yang dibuka
        </strong>
        <div className={style.list_privat}>
          {/*  */}
          {kelas.length > 0 ? (
            kelas.map((items, i) => (
              <div className={style.box_privat} key={i}>
                <div className={style.section_1}>
                  <div className={style.no}>
                    <div className={style.no_content}>{i + 1}</div>
                  </div>
                  <span>Kelas {items.matpel}</span>
                </div>
                <Link href={`/privat/kelas/${items.identitas}`}>
                  <a className={style.btn_detail}>
                    <ArrowRight color="#ffffff" size={18} />
                  </a>
                </Link>
              </div>
            ))
          ) : (
            <div className={style.empty}>
              <img src="/icon/kelas-kosong.png" alt="kelas kosong" />
              <h5>Kosong</h5>
              <small>Belum membuka kelas apapun</small>
            </div>
          )}
          {/*  */}
        </div>
      </div>
    </CenterComponent>
  );
}
