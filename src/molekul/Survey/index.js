import style from "./css/Survey.module.css";

// icon
import { ArrowRight } from "react-feather";

// component
import Link from "next/link";

// life cycle
import { useEffect, useRef, useState } from "react";

import cookie from "js-cookie";

export default function Survey() {
  const linkRef = useRef(null);
  const [position, setPosition] = useState("0%");

  useEffect(() => {
    if (cookie.get("has_click_popup")) {
      setPosition("-200%");
    }
  }, []);

  function handleClick(type) {
    cookie.set("has_click_popup", true, { expires: 30, path: "/" });
    setPosition("-200%");
    if (type === "accept") {
      linkRef.current.click();
    }
  }

  return (
    <div className={style.container} style={{ top: position }}>
      <div className={style.canvas}>
        <h2>Survey Lapak Belajar</h2>
        <p>
          kami berusaha semaksimal mungkin untuk menciptakan ruang belajar yang
          nyaman untuk mu namun kami juga menyadari bahwa kami tidak bisa
          berjalan sendiri, kami butuh bantuan mu untuk mewujudkan semua itu.
          jika kamu bersedia membantu kami mari kita ikuti survey ini
        </p>
        <div className={style.col_btn}>
          <button
            onClick={() => handleClick("ignore")}
            type="button"
            className={style.btn_cancel}
          >
            Nanti Aja
          </button>
          <button
            onClick={() => handleClick("accept")}
            type="button"
            className={style.btn_next}
          >
            <span>Ikuti Survey</span>
            <ArrowRight color="#ffffff" size={18} />
          </button>

          {/*  */}
          <Link href="/survey/pertama">
            <a ref={linkRef}></a>
          </Link>
          {/*  */}
        </div>
      </div>
    </div>
  );
}
