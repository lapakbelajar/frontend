import style from "./Oboarding.module.css";

import { useState, useRef } from "react";
import Link from "next/link";

export default function onBoarding() {
  // searching
  const redirectRef = useRef(null);
  const [query, setQuery] = useState("");
  /**
   * menganani pencarian
   */

  function handleSearch(text) {
    setQuery(text);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    window.location.href = `/diskusi/search/${query}`;
  }

  return (
    <div className={style.on_boarding}>
      <div className={style.content_onboarding}>
        <h1>Tanya apapun, dapatkan jawaban dengan sumber terpercaya.</h1>
        <div className={style.action_boarding}>
          {/* for search */}
          <Link href="/">
            <a ref={redirectRef} style={{ display: "none" }}></a>
          </Link>
          <form
            action=""
            onSubmit={(evt) => handleSubmit(evt)}
            method="GET"
            className={style.form_search}
          >
            <input
              onChange={(evt) => handleSearch(evt.target.value)}
              type="text"
              className={style.input}
              placeholder="Aku mau tau tentang..."
            />
            <button className={style.submit_btn} type="button">
              Cari
            </button>
          </form>
          <span>atau</span>
          {/* button */}
          <button
            onClick={() => (window.location.href = "/diskusi")}
            className={style.btn_ask}
            type="button"
          >
            Ajukan Pertanyaan
          </button>
          {/*  */}
        </div>
      </div>
    </div>
  );
}
