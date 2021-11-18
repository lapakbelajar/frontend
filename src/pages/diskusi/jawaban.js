import style from "./css/Jawaban.module.css";
import { ArrowLeft } from "react-feather";
import { useEffect, useState } from "react";

// component
import Image from "next/image";
import { timeAgo } from "../../molekul/Time";
import Parser from "../../molekul/Parser";
import Head from "next/head";

export default function Jawaban({ Data, IdentitasJawaban }) {
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

  useEffect(() => {
    if (Object.keys(Data).length > 0) {
      setKeterangan(Data);
    } else {
      window.location.href = "/diskusi";
    }
  }, [Data]);

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
            <small>{timeAgo.format(new Date(keterangan.waktu))}</small>
          </div>
        </div>
        {keterangan.sumber !== null && keterangan.sumber.length > 0 ? (
          <>
            <small style={{ marginTop: 30, display: "block" }}>
              <strong>Sumber</strong>
            </small>
            <a
              href={keterangan.sumber}
              style={{ fontSize: 12, color: "blue", fontWeight: 600 }}
            >
              {keterangan.sumber}
            </a>
          </>
        ) : (
          ""
        )}
        {/* body */}
        <div
          className={style.body}
          dangerouslySetInnerHTML={parseContent()}
        ></div>
        {/*  */}
      </div>
    </div>
  );
}
