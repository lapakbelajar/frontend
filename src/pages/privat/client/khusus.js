import style from "./css/Khusus.module.css";
import main_style from "./css/Dashboard.module.css";

import CenterComponent from "../../../templates/centered";
import HeaderClient from "../component/headerClient";
import Jadwal from "../../../atom/jadwal";
import moment from "moment";
import "moment/locale/id";
//
import Head from "next/head";

// icon
import { ArrowRight } from "react-feather";
import { useEffect, useState } from "react";

// authorization
import jwt from "jsonwebtoken";
import api from "../../../config/api";
import Cookies from "js-cookie";

export default function Khusus() {
  const [listKelas, setListKelas] = useState([]);
  const [detailKelas, setDetailKelas] = useState({});

  useEffect(() => {
    jwt.verify(Cookies.get("auth_user"), api.jwt_key, (err, decoded) => {
      if (err) {
        window.location.href = "/";
      } else {
        ambilKelas(decoded.id);
      }
    });
  }, []);

  async function ambilDetailKelas(id) {
    try {
      const req = await fetch(
        `${api.api_endpoint}/privat/custom/detail/${id}`,
        {
          headers: {
            authorization: api.authorization,
          },
        }
      );
      const res = await req.json();
      setDetailKelas(res);
    } catch (err) {
      //
    }
  }

  async function ambilKelas(userid) {
    try {
      const req = await fetch(
        `${api.api_endpoint}/privat/custom/bypelajar/${userid}/0/15`,
        {
          headers: {
            authorization: api.authorization,
          },
        }
      );
      const res = await req.json();
      setListKelas(res);
    } catch (err) {
      //
    }
  }

  return (
    <CenterComponent>
      <Head>
        <title>Jadwal kelas khusus mu</title>
      </Head>
      <h4 className={main_style.header_text}>Kelas Khusus</h4>
      <small className={main_style.sub_header}>
        Berikut ini adalah data kelas yang kamu minta secara khusus
      </small>

      <div className={style.khusus}>
        <HeaderClient page={"khusus"} />

        {/* list data */}
        {listKelas.map((items, i) => (
          <div className={main_style.box_privat} key={i}>
            <div className={main_style.section_1}>
              <div className={main_style.no}>
                <div className={main_style.no_content}>{i + 1}</div>
              </div>
              <span>Kelas bersama {items.tutor.name}</span>
            </div>
            {items.ditolak ? (
              <span className="badge bg-secondary">ditolak</span>
            ) : items.diterima ? (
              <span className="badge bg-success">aktif</span>
            ) : (
              <span
                className="badge bg-warning"
                title="sedang menunggu persetujuan tutor"
              >
                pending
              </span>
            )}
            <button
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              className={main_style.btn_detail}
              onClick={() => ambilDetailKelas(items.id)}
            >
              <ArrowRight color="#ffffff" size={18} />
            </button>
          </div>
        ))}
        {/* modal */}
        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">
                  Detail Kelas
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              {Object.keys(detailKelas).length > 0 ? (
                <div className="modal-body">
                  <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <td>Jenjang</td>
                        <td>{detailKelas.kelas.jenjang || "-"}</td>
                      </tr>
                      <tr>
                        <td>Jurusan</td>
                        <td>{detailKelas.kelas.jurusan || "-"}</td>
                      </tr>
                      <tr>
                        <td>Kelas</td>
                        <td>{detailKelas.kelas.kelas || "-"}</td>
                      </tr>
                      <tr>
                        <td>Tipe</td>
                        <td>{detailKelas.kelas.tipe || "-"}</td>
                      </tr>
                      <tr>
                        <td>Media Pembelajaran</td>
                        <td>
                          {detailKelas.kelas.diterima ? (
                            <a href={detailKelas.kelas.media}>
                              {detailKelas.kelas.media}
                            </a>
                          ) : (
                            <span className="badge bg-secondary">
                              Menunggu Tutor
                            </span>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Harga</td>
                        <td>
                          {detailKelas.kelas.harga > 0 ? (
                            `Rp. ${detailKelas.kelas.harga}`
                          ) : (
                            <span className="badge bg-secondary">
                              Menunggu Tutor
                            </span>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Status Pembayaran</td>
                        <td>
                          {detailKelas.kelas.dibayar ? (
                            <span className="badge bg-success">Dibayar</span>
                          ) : (
                            <span className="badge bg-warning">Menunggu</span>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <hr />
                  {/* tentang tutor */}
                  <h4 className={main_style.header_text}>Tentang Tutor</h4>
                  <table className="table table-bordered mt-3">
                    <tbody>
                      <tr>
                        <td>Nama</td>
                        <td>{detailKelas.kelas.tutor.name}</td>
                      </tr>
                      <tr>
                        <td>Pendidikan</td>
                        <td>{detailKelas.kelas.tutor.school}</td>
                      </tr>
                      <tr>
                        <td>Bidang</td>
                        <td>{detailKelas.kelas.tutor.keahlian}</td>
                      </tr>
                      <tr>
                        <td>Kontak</td>
                        <td>{detailKelas.kelas.tutor.contact}</td>
                      </tr>
                    </tbody>
                  </table>
                  {/*  */}
                  <h4 className={main_style.header_text}>Jadwal</h4>
                  {detailKelas.jadwal.map((items, i) => (
                    <Jadwal
                      moment={moment}
                      edit={false}
                      tanggal={items.tanggal}
                      key={i}
                      jam={`${items.mulai}-${items.selesai}`}
                      id={items.id}
                      zona={items.zona}
                    />
                  ))}
                </div>
              ) : (
                ""
              )}
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
        {/*  */}
      </div>
    </CenterComponent>
  );
}
