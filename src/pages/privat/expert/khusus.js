import main_style from "./css/Dashboard.module.css";
import style from "./css/Khusus.module.css";

//
import Jadwal from "../../../atom/jadwal";
import DashboardTemplates from "./templates/main";
import moment from "moment";
import "moment/locale/id";

// icon
import { ArrowRight } from "react-feather";

//
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";
import api from "../../../config/api";
import { useState, useEffect } from "react";

export default function KelasKhusus() {
  const [listKelas, setListKelas] = useState([]);
  const [detailKelas, setDetailKelas] = useState({});

  //
  const [harga, setHarga] = useState(0);
  const [media, setMedia] = useState("");
  const [submit, setSubmit] = useState(false);
  const [submitTolak, setSubmitTolak] = useState(false);

  useEffect(() => {
    jwt.verify(Cookies.get("auth_user"), api.jwt_key, (err, decoded) => {
      if (err) {
        window.location.href = "/";
      } else {
        ambilKelas(decoded.id);
      }
    });
  }, []);

  async function tolakKelas() {
    try {
      setSubmitTolak(true);
      if (!submitTolak) {
        const req = await fetch(
          `${api.api_endpoint}/privat/custom/tolak-kelas/${detailKelas.kelas.id}`,
          {
            method: "PUT",
            headers: {
              authorization: api.authorization,
            },
          }
        );
        const res = await req.json();
        if (req.status === 200) {
          setSubmitTolak(false);
        }
      }
    } catch (err) {
      //
    }
  }

  async function terimaKelas() {
    try {
      setSubmit(true);
      const data = new FormData();
      data.append("kelas_id", detailKelas.kelas.id);
      data.append("media", media);
      data.append("harga", harga);

      const req = await fetch(`${api.api_endpoint}/privat/custom/accept`, {
        method: "PUT",
        headers: {
          authorization: api.authorization,
        },
        body: data,
      });
      const res = await req.json();

      if (req.status === 200) {
        setSubmit(false);
      }
      console.log(res);
    } catch (err) {
      //
    }
  }

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
        `${api.api_endpoint}/privat/custom/bytutor/${userid}/0/15`,
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
    <DashboardTemplates>
      {listKelas.map((items, i) => (
        <div className={main_style.box_privat} key={i}>
          <div className={main_style.section_1}>
            <div className={main_style.no}>
              <div className={main_style.no_content}>{i + 1}</div>
            </div>
            <span>Permintaan dari {items.tutor.name}</span>
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

      {/* modal detail */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Datail Permintaan Kelas
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
                <strong className={main_style.header_text}>
                  Informasi Siswa
                </strong>
                <table className="table table-bordered mt-3">
                  <tbody>
                    <tr>
                      <td>Nama</td>
                      <td>{detailKelas.kelas.pelajar.name}</td>
                    </tr>
                    <tr>
                      <td>Pendidikan</td>
                      <td>{detailKelas.kelas.pelajar.school}</td>
                    </tr>
                    <tr>
                      <td>Bidang</td>
                      <td>{detailKelas.kelas.pelajar.keahlian}</td>
                    </tr>
                    <tr>
                      <td>Kontak</td>
                      <td>{detailKelas.kelas.pelajar.contact}</td>
                    </tr>
                  </tbody>
                </table>
                <hr />
                <strong className={main_style.header_text}>
                  Jadwal yang diminta
                </strong>

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

                <br />

                {/* form */}
                <div className={style.form}>
                  <strong className={main_style.header_text}>
                    Data yang dibutuhkan
                  </strong>
                  <small style={{ display: "block" }}>
                    Jika anda akan menerima permintaan ini, maka anda harus
                    mengisi data dibawah ini
                  </small>
                  <form action="" method="POST" className="row mt-3">
                    <div className="col-md-12">
                      <label htmlFor="media">
                        Media Belajar (link zoom, gmeet, dll)
                      </label>
                      <input
                        name="media"
                        type="url"
                        className="form-control"
                        placeholder="Masukan link meeting seperti google meet, zoom, etc"
                        defaultValue={detailKelas.kelas.media}
                        onChange={(evt) => {
                          setMedia(evt.target.value);
                        }}
                      />
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="media">Harga</label>
                      <input
                        name="harga"
                        type="number"
                        className="form-control"
                        placeholder="Masukan harga untuk kelas ini"
                        defaultValue={detailKelas.kelas.harga}
                        onChange={(evt) => {
                          setHarga(evt.target.value);
                        }}
                      />
                    </div>
                    {!detailKelas.kelas.ditolak ? (
                      <div className="col-md-6 mt-3">
                        {detailKelas.kelas.diterima ? (
                          <button
                            onClick={() => terimaKelas()}
                            className="btn btn-warning"
                            type="submit"
                          >
                            {submit ? "loading..." : "Update Data"}
                          </button>
                        ) : (
                          <>
                            <button
                              onClick={() => {
                                tolakKelas();
                              }}
                              type="button"
                              className="btn btn-danger btn-block"
                            >
                              {submitTolak ? "loading..." : "Tolak"}
                            </button>
                            <button
                              onClick={() => terimaKelas()}
                              type="button"
                              className="btn btn-primary ml-5"
                              style={{ marginLeft: "20px" }}
                            >
                              {submit ? "loading..." : "Terima"}
                            </button>
                          </>
                        )}
                      </div>
                    ) : (
                      <span className="badge bg-secondary">
                        kelas telah ditolak
                      </span>
                    )}
                  </form>
                </div>
                {/*  */}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </DashboardTemplates>
  );
}
