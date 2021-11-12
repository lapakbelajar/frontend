import style from "./css/Detail.module.css";

// component
import Navbar from "./component/navbar";
import Image from "next/image";

// component Jawaban
import Komentar from "./component/Komentar";
import Jawaban from "./component/Jawaban";
import Media from "./component/Jawaban/media";
import DataPertanyaan from "./component/DataPertanyaan";

// component komentar
import TextComments from "./component/Komentar/teks";
import ImageComments from "./component/Komentar/image";

export default function Detail() {
  return (
    <>
      <Navbar />
      <div className={style.body}>
        <div className="container">
          {/* tag diskusi */}
          <div className={style.content}>
            {/*  */}
            <div className={style.discuss}>
              <div className={style.data_diskusi}>
                <DataPertanyaan />
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
            <div className={style.sidebar}></div>
          </div>
          {/*  */}
        </div>
      </div>
    </>
  );
}
