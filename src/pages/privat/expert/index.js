import style from "./css/Dashboard.module.css";

// component
import PopUp from "../component/PopUp";
import Profile from "../component/Profile";
import DashboardTemplates from "./templates/main";
import Link from "next/link";
import Swal from "sweetalert2";
import Head from "next/head";

// icon
import { ArrowRight, Trash, Edit2, PlusCircle } from "react-feather";

// state
import { useEffect, useState } from "react";
import event from "../component/event";

// authorization
import jwt from "jsonwebtoken";
import cookie from "js-cookie";
import api from "../../../config/api";

export default function DashboardExpert() {
  const [position, setPosition] = useState("-200%");

  //
  const [user, setUser] = useState({
    id: 0,
    name: "",
  });
  const [kelas, setKelas] = useState([]);
  const [detail, setDetail] = useState({});

  useEffect(() => {
    listenActivity();
    getUser();
  }, []);

  /**
   *
   */

  function getUser() {
    jwt.verify(cookie.get("auth_user"), api.jwt_key, (err, decoded) => {
      if (err) {
        window.location.href = "/login";
      } else {
        setUser(decoded);
        getClass(decoded.id);
      }
    });
  }

  /**
   * Mengambil kelas yang dibuat oleh expert
   * @param {Number} id user id
   */

  async function getClass(id) {
    try {
      const req = await fetch(`${api.api_endpoint}/privat/byexpert/${id}`, {
        headers: {
          authorization: api.authorization,
        },
      });

      const res = await req.json();
      setKelas(res);
    } catch (err) {
      //
      console.warn(err);
    }
  }

  /**
   * Mendapatkan detail data untuk ditampilkan didalam popup
   */

  async function getDetail(identitas) {
    try {
      const req = await fetch(
        `${api.api_endpoint}/privat/kelas/detail/${identitas}`,
        {
          headers: {
            authorization: api.authorization,
          },
        }
      );
      const res = await req.json();
      setDetail(res);
    } catch (err) {
      //
    }
  }

  /**
   * Menghapus kelas
   */

  async function deleteClass(id) {
    try {
      Swal.fire({
        icon: "warning",
        title: "Apakah anda yakin ?",
        text: "Jika anda menghapus nya maka seluruh data yang berhubungan dengan kelas ini akan dihapus",
        showConfirmButton: true,
        showCancelButton: true,
      })
        .then(async (res) => {
          if (res.isConfirmed) {
            const req = await fetch(`${api.api_endpoint}/privat/delete/${id}`, {
              method: "DELETE",
              headers: {
                authorization: api.authorization,
              },
            });

            if (req.status === 200) {
              getClass(user.id);
              Swal.fire({
                icon: "success",
                title: "Berhasil",
                text: "Data berhasil dihapus",
              });
            }
          }
        })
        .catch((err) => {
          //
        });
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
      const id = states.id;
      if (states.type === "show_class") {
        setPosition("-200%");
      }
    });
  }

  return (
    <DashboardTemplates>
      <Head>
        <title>Data Kelas</title>
      </Head>
      {/* popup */}
      <PopUp
        eventName={"show_class"}
        position={position}
        className={style.popup}
      >
        {Object.keys(detail).length > 0 ? (
          <div className={style.container_popup}>
            <div className={style.box_popup}>
              <Profile
                name={detail.kelas.tutor.name}
                image={detail.kelas.tutor.image}
                education={detail.kelas.tutor.school}
                skils={detail.kelas.tutor.keahlian}
              />

              {/* keterangan kelas */}
              <div className={style.keterangan_kelas}>
                <span className="badge rounded-pill bg-primary">
                  Mata pelajaran {detail.kelas.matpel}
                </span>
                <span className="badge rounded-pill bg-light text-dark">
                  Kelas {detail.kelas.tipe}
                </span>
              </div>

              {/* lokasi atau media */}
              <div className={style.media}>
                <strong className={style.sub_header}>Tempat / Media</strong>
                {detail.kelas.tipe === "online" ? (
                  <a href={detail.kelas.media}>{detail.kelas.media}</a>
                ) : (
                  <p>{detail.kelas.media}</p>
                )}
              </div>
              {/*  */}
            </div>
            <div className={style.box_popup}>
              <strong className={style.sub_header}>Jadwal</strong>
              <br />
              {detail.jadwal.map((items, i) => (
                <div className={style.box_jadwal} key={i}>
                  <span>
                    {new Date(items.mulai).toLocaleString()} -{" "}
                    {new Date(items.selesai).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          ""
        )}
      </PopUp>
      {/* data privat */}
      <div className={style.privat}>
        <Link href="/privat/baru">
          <a className="btn btn-primary mb-3">
            <PlusCircle color="#ffffff" size={18} />
            <span style={{ fontSize: 14, fontWeight: 600, marginLeft: 10 }}>
              Buat Kelas Baru
            </span>
          </a>
        </Link>
        <h3 className={style.header_text}>Semua Kelas</h3>

        {kelas.map((items, i) => (
          <div className={style.box_privat} key={i}>
            <div className={style.section_1}>
              <div className={style.no}>
                <div className={style.no_content}>{i + 1}</div>
              </div>
              <span>Kelas {items.matpel}</span>
            </div>
            <div className={style.canvas_btn}>
              <button
                onClick={() => deleteClass(items.id)}
                type="button"
                className="btn btn-sm btn-danger"
              >
                <Trash color="#ffffff" size={18} />
              </button>
              {/* <button type="button" className="btn btn-sm btn-warning">
                <Edit2 color="#363636" size={18} />
              </button> */}
              <button
                onClick={() => {
                  setPosition("0%");
                  getDetail(items.identitas);
                }}
                className={style.btn_detail}
              >
                <ArrowRight color="#ffffff" size={18} />
              </button>
            </div>
            <button type="button" className={style.btn_transparent}>
              <img src="/icon/dotted.svg" alt="dotted" />
            </button>
          </div>
        ))}
        {/*  */}
      </div>
    </DashboardTemplates>
  );
}
