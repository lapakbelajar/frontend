import { Search } from "react-feather";
import style from "./Search.module.css";

// component
import Link from "next/link";

// hook
import { useState, useRef } from "react";

export default function SearchMobile() {
  const inputRef = useRef(null);
  const linkRef = useRef(null);

  const [query, setQuery] = useState("");

  /**
   * menangani event ketika user mengirimkan query pencarian
   */

  function handleSubmit(evt) {
    evt.preventDefault();
    linkRef.current.click();
    inputRef.current.value = "";
  }

  return (
    <form
      action=""
      onSubmit={(evt) => handleSubmit(evt)}
      method="GET"
      className={style.form}
    >
      <Link href={`/diskusi/search/${query}`}>
        <a style={{ display: "none" }} ref={linkRef}></a>
      </Link>
      <input
        ref={inputRef}
        onChange={(evt) => setQuery(evt.target.value)}
        type="text"
        className={style.input}
        placeholder="Telusuri apapun disini"
      />
      <button type="button" className={style.btn_submit}>
        <Search color="#696969" size={18} />
      </button>
    </form>
  );
}
