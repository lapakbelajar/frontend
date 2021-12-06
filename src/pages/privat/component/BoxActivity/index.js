import style from "../../css/Privat.module.css";

// link

import Link from "next/link";
export default function BoxActivity({ no, matpel, tutor }) {
  return (
    <Link href="/privat/data">
      <a className={style.box_activity}>
        <h3>{no < 10 ? `0${no}` : no}</h3>
        <div className={style.activity_detail}>
          <span>{matpel}</span>
          <small>Bersama {tutor}</small>
        </div>
      </a>
    </Link>
  );
}
