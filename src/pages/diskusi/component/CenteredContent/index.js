import style from "./Center.module.css";

// icon
import { Filter, Plus } from "react-feather";

// component
import Pertanyaan from "../Pertanyaan";
import BoxDiskusi from "../../../../molekul/BoxDiskusi";
import ForumLoading from "../../../../molekul/ForumLoading";
import NullContent from "../../../../molekul/NullContent";

//
import { useEffect, useState } from "react";

// state
import { store } from "../../../../config/redux/store";

// handler
import { getFilteredData, resetData } from "./handler";

export default function CenteredContent({ Data }) {
  const [showQuestion, setShowQuestion] = useState("-200%");
  const [diskusi, setDiskusi] = useState([]);

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
      }
    });
  }

  return (
    <>
      <Pertanyaan PopupPosition={showQuestion} />
      <div className={style.centered_content}>
        {/* filter data */}
        <div className={style.filter_data}>
          <button
            onClick={() =>
              store.dispatch({ type: "show", payload: { name: "pertanyaan" } })
            }
            className={style.create_question}
          >
            <Plus color="#ffffff" size={18} />
            <span>Ajukan Pertanyaan</span>
          </button>
          <button
            onClick={() =>
              store.dispatch({ type: "show", payload: { name: "filter" } })
            }
            className={style.btn_filter}
          >
            <Filter color="#363636" size={18} />
            <span>Filter</span>
          </button>
        </div>
        {/*  */}
        {loading ? (
          <>
            <ForumLoading />
            <ForumLoading />
          </>
        ) : diskusi.length > 0 ? (
          diskusi.map((items, i) => (
            <BoxDiskusi forum={items.forum} user={items.forum.user} key={i} />
          ))
        ) : (
          <NullContent />
        )}
      </div>
    </>
  );
}
