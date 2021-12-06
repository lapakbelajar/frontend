import style from "./css/Dashboard.module.css";

// component
import DashboardTemplates from "./templates/main";
import PopUp from "../component/PopUp";
import Profile from "../component/Profile";

// icon
import { ArrowRight } from "react-feather";

// state management
import { useState, useEffect } from "react";
import event from "../component/event";

// authorization
import jwt from "jsonwebtoken";
import cookie from "js-cookie";
import api from "../../../config/api";

export default function Persetujuan() {
  const [position, setPosition] = useState("-200%");
  const [user, setUser] = useState({
    id: 0,
  });

  const [listUser, setListUser] = useState([]);
  const [detail, setDetail] = useState({});
  const [startUpdate, setStartUpdate] = useState(false);

  useEffect(() => {
    listenActivity();
    getUser();
  }, []);

  function getUser() {
    jwt.verify(cookie.get("auth_user"), api.jwt_key, (err, decoded) => {
      if (err) {
        window.location.href = "/login";
      } else {
        setUser(decoded);
        getPendingStudent(decoded.id);
      }
    });
  }

  /**
   * Mendapatkan user yang mengunggu persetujuan untuk diterima
   */

  async function getPendingStudent(userid) {
    try {
      const req = await fetch(
        `${api.api_endpoint}/privat/expert/pending-student/${userid}`,
        {
          headers: {
            authorization: api.authorization,
          },
        }
      );
      const res = await req.json();
      setListUser(res);
    } catch (err) {
      //
      console.error(err);
    }
  }

  /**
   * Mendapatkan detail invoice
   */

  async function getDetailInvoice(id) {
    try {
      const req = await fetch(
        `${api.api_endpoint}/privat/invoice/detail/${id}`,
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

  /**
   * menerima user sebagai murid
   *
   */

  async function acceptStudent(identitas) {
    try {
      setStartUpdate(true);
      const req = await fetch(
        `${api.api_endpoint}/privat/invoice/accept/${identitas}`,
        {
          method: "PUT",
          headers: {
            authorization: api.authorization,
          },
        }
      );

      if (req.status === 200) {
        setStartUpdate(false);
        setPosition("-200%");
      }
    } catch (err) {
      //
      console.error(err);
    }
  }
  return (
    <DashboardTemplates>
      <PopUp
        eventName={"show_class"}
        position={position}
        className={style.popup}
      >
        {Object.keys(detail).length > 0 ? (
          <div className={style.container_popup}>
            <div className={style.box_popup}>
              <Profile
                name={detail.user.name}
                image={detail.user.image}
                education={detail.user.school}
                skils={detail.user.jurusan}
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

              <div className={style.media}>
                <strong className={style.sub_header}>Detail</strong>
                <p>{detail.catatan}</p>

                <strong className={style.sub_header}>Status Pembayaran</strong>
                {detail.dibayar ? (
                  <span className="badge bg-success">Terbayar</span>
                ) : (
                  <span className="badge bg-warning">Menunggu Pembayaran</span>
                )}
              </div>

              <br />
              <br />
              <div className={style.container_btn}>
                <button
                  onClick={() => {
                    setPosition("-200%");
                  }}
                  type="button"
                  className="me-md-3 btn btn-secondary btn-sm"
                >
                  Batal
                </button>
                <button
                  onClick={() => {
                    acceptStudent(detail.identitas);
                  }}
                  type="button"
                  className="ml-3 btn btn-primary btn-sm"
                >
                  {startUpdate ? "Loading..." : "Terima dan Setujui"}
                </button>
              </div>
              {/*  */}
            </div>
            <div className={style.box_popup}>
              {detail.dibayar ? (
                <img
                  className={style.debt}
                  src={detail.pembayaran}
                  alt="debt"
                />
              ) : (
                <div className={style.debt_placeholder}></div>
              )}
            </div>
          </div>
        ) : (
          ""
        )}
      </PopUp>
      {listUser.map((items, i) => (
        <div className={style.box_privat} key={i}>
          <div className={style.section_1}>
            <div className={style.no}>
              <div className={style.no_content}>{i + 1}</div>
            </div>
            <span>{items.user.name}</span>
          </div>
          <button
            onClick={() => {
              setPosition("0%");
              getDetailInvoice(items.identitas);
            }}
            className={style.btn_detail}
          >
            <ArrowRight color="#ffffff" size={18} />
          </button>
        </div>
      ))}
    </DashboardTemplates>
  );
}
