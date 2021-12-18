import style from "../../css/Privat.module.css";

// component
import Link from "next/link";
import Image from "next/image";

// icon
import { PlusCircle, Calendar } from "react-feather";

// state manajement
import event from "../event";
import { useEffect, useState } from "react";

export default function Header({ User }) {
  const [pengguna, setPengguna] = useState({});
  const [login, setLogin] = useState(false);

  useEffect(() => {
    if (Object.keys(User).length > 0) {
      setPengguna(User);
      setLogin(true);
    }
  }, [User]);

  return (
    <div className={style.lecturers_header}>
      <Link href={login ? "/privat/baru" : "/login"}>
        <a className={style.btn_create}>
          <PlusCircle color="#ffffff" size={22} />
          <span>Buat Kelas</span>
        </a>
      </Link>
      <Link
        href={
          login
            ? pengguna.accountType === "expert"
              ? "/privat/dashboard"
              : "/privat/data"
            : "/login"
        }
      >
        <a className={style.btn_dashboard}>
          <img src="/icon/layout.svg" alt="layout" />
          <span>Dashboard</span>
        </a>
      </Link>
      <button
        onClick={() => event.dispatch({ type: "show_filter_privat" })}
        className={style.btn_dashboard}
        type="button"
      >
        <Image src="/icon/filter.svg" alt="filter" width={12} height={7} />
        <span>Filter</span>
      </button>
      <button
        onClick={() => event.dispatch({ type: "show_sidebar" })}
        type="button"
        className={style.btn_dates}
      >
        <Calendar color="#606060" size={22} />
        <span>Kegiatan</span>
      </button>
    </div>
  );
}
