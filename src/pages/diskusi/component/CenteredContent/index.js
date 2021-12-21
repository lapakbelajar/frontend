import style from "./Center.module.css";

// icon
import { Filter, Plus } from "react-feather";

// component
import Pertanyaan from "../Pertanyaan";
import BoxDiskusi from "../../../../molekul/BoxDiskusi";
import ForumLoading from "../../../../molekul/ForumLoading";
import NullContent from "../../../../molekul/NullContent";
import SearchMobile from "../../../../molekul/SearchMobile";
import AlertData from "../../../../molekul/AlertData";

//
import { useEffect, useState } from "react";

// state
import { store } from "../../../../config/redux/store";

// handler
import { getFilteredData, resetData } from "./handler";
import api from "../../../../config/api";

export default function CenteredContent({ Data, Page }) {
  const [showQuestion, setShowQuestion] = useState("-200%");
  const [diskusi, setDiskusi] = useState([]);
  const [dataType, setDataType] = useState("terjawab");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setDiskusi(Data);
    listenContentChaged();
  }, [Data]);

  // mendengarkan perubahan konten
  function listenContentChaged() {
    store.subscribe(() => {
      const states = store.getState();

      if (states.type === "change_content") {
        // mengambil data berdasarkan filter
        if (states.loading) {
          setLoading(states.loading);

          // mendapatkan data dari server
          getFilteredData(
            states.jenjang,
            states.jurusan,
            states.kelas,
            setDiskusi,
            setLoading
          );
        }
      } else if (states.type === "reset_change_content") {
        // mengembalikan filter ke pengaturan awal
        setLoading(states.loading);
        resetData(setDiskusi, setLoading);
      } else if (states.type === "update_forum") {
        getNewData();
      }
    });
  }

  /**
   * mendapatkan 15 data terbaru
   */

  async function getNewData() {
    try {
      const req = await fetch(
        `${api.api_endpoint}/forum/ambil/terbaru?start=0&end=16`,
        {
          headers: {
            authorization: api.authorization,
          },
        }
      );

      const res = await req.json();
      if (res.length > 0) {
        setDiskusi(res);
      }
    } catch (err) {
      //
    }
  }

  /**
   * Memfilter diskusi berdasarkan :
   * 1. yang terjawab
   * 2. tidak terjawab
   * 3. campuran
   */

  function filterData(types) {
    let filtered;
    switch (types) {
      case "mix":
        filtered = Data;
        break;
      case "terjawab":
        filtered = Data.filter((items) => {
          return items.jumlah_jawaban > 0;
        });
        break;
      case "belum_terjawab":
        filtered = Data.filter((items) => {
          return items.jumlah_jawaban === 0;
        });
        break;
      default:
        setDiskusi(Data);
    }
    setDiskusi(filtered);
  }

  return (
    <>
      <Pertanyaan PopupPosition={showQuestion} />
      <div className={style.centered_content}>
        {/* kolom alert */}
        <AlertData />
        {/*  */}
        {/* component untuk halaman search */}
        {Page === "search" ? <SearchMobile /> : ""}
        {/* filter data */}
        {Page === "diskusi" ? (
          <div className={style.filter_data}>
            <button
              onClick={() =>
                store.dispatch({
                  type: "show",
                  payload: { name: "pertanyaan" },
                })
              }
              className={style.create_question}
            >
              <Plus color="#ffffff" size={18} />
              <span>Ajukan Pertanyaan</span>
            </button>
            <div className={style.data_manipulation}>
              <button
                onClick={() =>
                  store.dispatch({ type: "show", payload: { name: "filter" } })
                }
                className={style.btn_filter}
              >
                <Filter color="#363636" size={18} />
                <span>Filter</span>
              </button>
              <select
                onChange={(evt) => {
                  filterData(evt.target.value);
                  setDataType(evt.target.value);
                }}
                className={style.btn_filter}
              >
                <option value="mix">Tipe Pertanyaan</option>
                <option value="terjawab">Terjawab</option>
                <option value="belum_terjawab">Belum Terjawab</option>
              </select>
            </div>
          </div>
        ) : (
          ""
        )}
        {/*  */}
        {loading ? (
          <>
            <ForumLoading />
            <ForumLoading />
          </>
        ) : diskusi.length > 0 ? (
          diskusi.map((items, i) => (
            <BoxDiskusi
              forum={items.forum}
              user={items.forum.user}
              jumlah_response={items.jumlah_response}
              key={i}
              lampiran={items.media}
              jawaban={items.jumlah_jawaban}
            />
          ))
        ) : (
          <NullContent />
        )}
      </div>
    </>
  );
}
