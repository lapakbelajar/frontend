import style from "./Null.module.css";

// component
import Image from "next/image";

export default function NullContent() {
  return (
    <div className={style.container}>
      <Image
        src="/illustration/null-content.svg"
        alt="null"
        width={160}
        height={175}
      />
      <h4>Data tidak ditemukan</h4>
      <span>coba dengan filter yang berbeda</span>
    </div>
  );
}
