import style from "./css/Detail.module.css";

// component
import Navbar from "../../molekul/navbar";
import SidebarRight from "./component/SidebarRight";

// component Jawaban
import Komentar from "./component/Komentar";
import Jawaban from "./component/Jawaban";
import Media from "./component/Jawaban/media";
import DataPertanyaan from "./component/DataPertanyaan";
import Head from "next/head";

// component komentar
import TextComments from "./component/Komentar/teks";
import ImageComments from "./component/Komentar/image";
import { useEffect, useState } from "react";

export default function Detail({ Data, Identitas, Message }) {
  const [title, setTitle] = useState("");

  useEffect(() => {
    validateData();
  }, [Data]);

  /**
   * mengaambil alih ketika ada inputan tidak sesuai kriteria
   * jika sesuai akan di ijinkan masuk
   * tapi jika tidak akan ditendang
   */

  function validateData() {
    if (typeof Data !== "undefined" && Data.length > 0) {
      //
      setTitle(Data[0].forum.pertanyaan);
    } else {
      window.location.href = "/diskusi";
    }
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Head>
      <Navbar />
      <div className={style.body}>
        <div className="container">
          {/* tag diskusi */}
          <div className={style.content}>
            {/*  */}
            <div className={style.discuss}>
              <div className={style.data_diskusi}>
                <DataPertanyaan Data={Data[0]} Identitas={Identitas} />
                <hr />
                {/*  */}
                <Komentar />
                <Jawaban />
                <Media />
              </div>

              {/* list komentar */}
              <TextComments />
              <ImageComments />
            </div>

            {/*  */}
            <SidebarRight />
          </div>
          {/*  */}
        </div>
      </div>
    </>
  );
}
