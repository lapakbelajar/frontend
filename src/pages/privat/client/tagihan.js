import style from "./css/Tagihan.module.css";

// local component
import CenterComponent from "../../../templates/centered";
import HeaderClient from "../component/headerClient";
import PopUp from "../component/PopUp";
import event from "../component/event";

// icon
import { ArrowRight } from "react-feather";
import { useEffect, useState } from "react";

//
import Link from "next/link";
import Head from "next/head";

// authirization
import jwt from "jsonwebtoken";
import cookie from "js-cookie";
import api from "../../../config/api";

export default function Tagihan() {
  const [position, setPosition] = useState("-200%");
  const [listInvoice, setListInvoice] = useState([]);
  const [detailData, setDetailData] = useState({});

  useEffect(() => {
    listenActivity();
    getUser();
  }, []);

  function getUser() {
    jwt.verify(cookie.get("auth_user"), api.jwt_key, (err, decoded) => {
      if (!err) {
        getInvoice(decoded.id);
      } else {
        window.location.href = "/login";
      }
    });
  }

  /**
   * Mengambil invoice
   */

  async function getInvoice(userid) {
    try {
      const req = await fetch(`${api.api_endpoint}/privat/byuser/${userid}`, {
        headers: {
          authorization: api.authorization,
        },
      });
      const res = await req.json();

      // filter hanya data yang status dibayar nya false saja yang dimasukan
      const final_data = res.filter((items) => {
        return !items.dibayar;
      });

      setListInvoice(final_data);
    } catch (err) {
      //
    }
  }

  /**
   * Mendengarkan tombol aktivitas di klik
   * jika di klik maka akan menampilkan sidebar
   */

  function listenActivity() {
    event.subscribe(() => {
      const states = event.getState();
      if (states.type === "close_detail_tagihan") {
        setPosition("-200%");
      }
    });
  }

  // mengambil data detail berdasarkan yang user pilih
  function handleDetail(data) {
    setPosition("0%");
    setDetailData(data);
  }

  return (
    <CenterComponent>
      <Head>
        <title>Data tagihan kelas</title>
      </Head>
      {/* popup */}
      <PopUp
        eventName={"close_detail_tagihan"}
        position={position}
        className={style.canvas}
      >
        {Object.keys(detailData).length > 0 ? (
          <div className={style.container}>
            <h4 className={style.header_text}>Tagihan</h4>
            {detailData.dibayar ? (
              <span className="badge bg-success">Pembayaran Berhasil</span>
            ) : (
              <span className="badge bg-warning">Menunggu Pembayaran</span>
            )}
            <hr />

            <h2 className={style.harga}>
              Rp. {detailData.harga.toLocaleString()}
            </h2>
            <div className={style.detail}>
              <small>Kirimkan melalui rekening berikut ini</small>
              <table className={style.table}>
                <tr>
                  <td>Nama</td>
                  <td>:</td>
                  <td>Suci Khairani Pane</td>
                </tr>
                <tr>
                  <td>Bank</td>
                  <td>:</td>
                  <td>BNI</td>
                </tr>
                <tr>
                  <td>Nomor Rekening</td>
                  <td>:</td>
                  <td>0847737199</td>
                </tr>
              </table>
            </div>

            {/* rincian pemesanan */}
            <div className={style.rincian}>
              <h4 className={style.header_text}>Rincian Pemesanan</h4>
              <table className={style.table}>
                <tr>
                  <td>Kelas</td>
                  <td>:</td>
                  <td>{detailData.kelas.matpel}</td>
                </tr>
                <tr>
                  <td>Tutor</td>
                  <td>:</td>
                  <td>{detailData.kelas.tutor.name}</td>
                </tr>
                <tr>
                  <td>Jenis Kelas</td>
                  <td>:</td>
                  <td>{detailData.kelas.tipe}</td>
                </tr>
                {detailData.kelas.tipe === "offline" ? (
                  <tr>
                    <td>Alamat</td>
                    <td>:</td>
                    <td>{detailData.kelas.media}</td>
                  </tr>
                ) : (
                  ""
                )}
              </table>
            </div>

            <Link href={`/privat/invoice/${detailData.identitas}`}>
              <a className="btn mt-5 btn-sm btn-primary">
                Verifikasi Pembayaran
              </a>
            </Link>
          </div>
        ) : (
          ""
        )}
      </PopUp>
      {/*  */}

      <h3 className={style.header_text}>Tagihan</h3>
      <small className={style.sub_header}>
        dibawah ini merupakan data tagihan yang perlu kamu lunasi
      </small>
      <div className={style.privat}>
        <HeaderClient page={"tagihan"} />
      </div>

      {/* list tagihan */}

      {listInvoice.map((items, i) => (
        <div className={style.box_privat} key={i}>
          <div className={style.section_1}>
            <div className={style.no}>
              <div className={style.no_content}>{i + 1}</div>
            </div>
            <span>Kelas {items.kelas.matpel}</span>
          </div>
          <span
            className={items.dibayar ? "badge bg-success" : "badge bg-warning"}
          >
            {items.dibayar ? "berhasil" : "pending"}
          </span>
          <button
            onClick={() => {
              handleDetail(items);
            }}
            className={style.btn_detail}
          >
            <ArrowRight color="#ffffff" size={18} />
          </button>
        </div>
      ))}
    </CenterComponent>
  );
}
