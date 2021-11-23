import style from "./Komentar.module.css";
import Image from "next/image";

export default function Komentar() {
  return (
    <div className={style.container}>
      <button type="button" className={style.btn_action}>
        <Image src="/icon/jempol.svg" alt="jempol" width={27} height={30} />
        <span>10</span>
      </button>
      <button type="button" className={style.btn_action}>
        <Image src="/icon/komentar.svg" alt="komentar" width={27} height={30} />
        <span>10</span>
      </button>
    </div>
  );
}
