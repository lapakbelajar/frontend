import style from "./Data.module.css";
import Image from "next/image";

// icon
import { Download } from "react-feather";

export default function DataPertanyaan() {
  return (
    <>
      {/* informasi profile */}
      <div className={style.profile}>
        <Image
          src="/illustration/jepang.jpg"
          alt="jepang"
          width={45}
          height={45}
        />
        <div className={style.profile_desc}>
          <h4>Rizki Maulana</h4>
          <small>2 hari yang lalu</small>
        </div>
      </div>

      {/* detail pertanyaan */}
      <div className={style.pertanyaan}>
        <p>Apakah yang dimaksud dengan teori bumi datar ?</p>
      </div>
      {/* lampiran */}
      <strong className={style.subtitle}>Lampiran</strong>
      <div className={style.preview_image}>
        {/*  */}
        <div className={style.container_image}>
          <Image src="/illustration/jepang.jpg" width={250} height={200} />
        </div>
        {/*  */}
      </div>

      {/* lampiran file */}
      <div className={style.lampiran_file}>
        <a href="" download className={style.box_file}>
          <span>presentasi.pptx</span>
          <Download size={14} color="#363636" />
        </a>
      </div>
    </>
  );
}
