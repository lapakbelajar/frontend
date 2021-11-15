import style from "./Center.module.css";
import Link from "next/link";

// icon
import { MessageSquare, Edit3, Filter, Plus } from "react-feather";

// component
import Pertanyaan from "../Pertanyaan";
import BoxDiskusi from "../../../../molekul/BoxDiskusi";

//
import { useEffect, useState } from "react";

// state
import { store } from "../../../../config/redux/store";

// time
import { timeAgo } from "../../../../molekul/Time";

export default function CenteredContent({ Data }) {
  const [showQuestion, setShowQuestion] = useState("-200%");
  const [diskusi, setDiskusi] = useState([]);

  useEffect(() => {
    setDiskusi(Data);
  }, [Data]);

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
        {diskusi.map((items, i) => (
          <BoxDiskusi forum={items.forum} user={items.forum.user} key={i} />
        ))}
      </div>
    </>
  );
}
