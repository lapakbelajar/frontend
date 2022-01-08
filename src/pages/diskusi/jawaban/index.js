import style from "../css/Jawaban.module.css";
import { ArrowLeft } from "react-feather";
import { useEffect, useState } from "react";

// component
import Image from "next/image";
import { timeAgo } from "../../../molekul/Time";
import Parser from "../../../molekul/Parser";
import Head from "next/head";

// local component
import Penilaian from "./component/penilaian";
import Komentar from "./component/komentar";
import Interaksi from "./component/Interaksi";
import JawabanLain from "./component/JawabanLain";
import api from "../../../config/api";

export default function Jawaban({ Data, IdentitasJawaban, DataKomentar }) {
  const [keterangan, setKeterangan] = useState({
    user: {
      name: "",
      image: "",
    },
    jawaban: "",
    anonim: false,
    sumber: "",
    waktu: new Date(),
  });

  const [jawabanLain, setJawabanLain] = useState([]);

  useEffect(() => {
    if (Object.keys(Data).length > 0) {
      setKeterangan(Data);
      ambilJawabanLain(Data.forum.identitas, IdentitasJawaban);
    } else {
      window.location.href = "/diskusi";
    }
  }, [Data]);

  // mengambil jawaban lainnya
  async function ambilJawabanLain(identitas_forum, currentAnswer) {
    try {
      const req = await fetch(
        `${api.api_endpoint}/jawaban/get/${identitas_forum}`,
        {
          headers: {
            authorization: api.authorization,
          },
        }
      );
      const res = await req.json();

      // buang jawaban yang sama dengan yang sedang dibaca
      const filtered = await res.filter((items, i) => {
        return items.identitas !== currentAnswer;
      });

      setJawabanLain(filtered);
    } catch (err) {
      //
    }
  }

  // konten parser
  function parseContent() {
    try {
      return {
        __html:
          Object.keys(Data).length > 0
            ? Parser(JSON.parse(keterangan.jawaban || []).blocks)
            : "<span>-</span>",
      };
    } catch (err) {
      return {
        __html: "<span></span>",
      };
    }
  }
  return (
    <div className={style.container}>
      <Head>
        <title>
          Jawaban dari - {keterangan.anonim ? "anonim" : keterangan.user.name}
        </title>
      </Head>
      <div className={style.canvas}>
        {/* header */}
        <button
          onClick={() => window.history.back()}
          type="button"
          className={style.btn_back}
        >
          <ArrowLeft size={22} color="#363636" />
          <span>Kembali</span>
        </button>
        <div className={style.header}>
          {keterangan.anonim ? (
            <Image
              src="/illustration/anonim.png"
              alt="anonim"
              height={45}
              width={45}
            />
          ) : (
            <img src={keterangan.user.image} alt={keterangan.user.name} />
          )}
          <div className={style.header_desc}>
            <h4>{keterangan.anonim ? "anonim" : keterangan.user.name}</h4>
            {keterangan.anonim ? (
              <div className={style.keterangan_tempat}>
                <small>..</small>
                <small>|</small>
                <small>..</small>
              </div>
            ) : (
              <div className={style.keterangan_tempat}>
                <small>{keterangan.user.school}</small>
                <small>|</small>
                <small>{keterangan.user.jurusan}</small>
              </div>
            )}
          </div>
        </div>

        {keterangan.sumber !== null && keterangan.sumber.length > 0 ? (
          <>
            <small style={{ marginTop: 30, display: "block" }}>
              <strong>Sumber</strong>
            </small>
            <a href={keterangan.sumber} className={style.sumber_jawaban}>
              {keterangan.sumber}
            </a>
          </>
        ) : (
          ""
        )}
        {/* body */}
        <div className={style.info_jawaban}>
          {/* keterangan terverifikasi */}
          {Data.terbantu ? (
            <div className={style.terverifikasi}>
              <span>Jawaban Terverifikasi</span>
              <Image
                src="/icon/verified.svg"
                alt="terverifikasi"
                width={25}
                height={25}
              />
            </div>
          ) : (
            ""
          )}
          {/*  */}
          <small className={style.time}>
            Dikirim {timeAgo.format(new Date(keterangan.waktu))}
          </small>
          {/*  */}
        </div>

        <div
          className={style.body}
          dangerouslySetInnerHTML={parseContent()}
        ></div>

        {/* penilaian */}
        <Penilaian DataJawaban={Data} />
        <Komentar IdentitasJawaban={IdentitasJawaban} />
        <Interaksi
          DataJawaban={Data}
          DataKomentar={DataKomentar}
          IdentitasJawaban={IdentitasJawaban}
        />
        {/*  */}
        <hr />
        <br />
        {jawabanLain.length > 0 ? (
          <h6 style={{ fontWeight: 700 }}>Jawaban Lainnya</h6>
        ) : (
          ""
        )}
        <br />
        {jawabanLain.map((items, i) => (
          <JawabanLain
            key={i}
            username={items.user.name}
            userimage={items.user.image}
            education={items.user.school}
            skill={items.user.jurusan}
            preview={items.preview}
            identitas_jawaban={items.identitas}
            anonim={items.anonim}
          />
        ))}
        {/*  */}
      </div>
    </div>
  );
}
