// component
import Navbar from "./component/navbar";
import SidebarRight from "./component/SidebarRight";
import SidebarLeft from "./component/SidebarLeft";
import CenteredContent from "./component/CenteredContent";
import PopUp from "../../molekul/popup";

// style
import style from "./css/Diskusi.module.css";
import Pertanyaan from "./component/Pertanyaan";

export default function Diskusi() {
  return (
    <>
      <div className={style.main}>
        <Navbar />
        {/* bikin pertanyaan */}
        <Pertanyaan />
        {/* popup filter */}
        <PopUp page_name={"filter"}>
          <strong className={style.strong}>Jenjang</strong>
          <div className={style.container_query}>
            <select className={style.select}>
              <option>Jenjang</option>
              <option>SMA</option>
              <option>SMK</option>
              <option>Lainnya</option>
            </select>

            <select className={style.select}>
              <option>Jurusan</option>
              <option>IPA</option>
              <option>IPS</option>
            </select>

            <select className={style.select}>
              <option>Kelas</option>
              <option>10</option>
              <option>11</option>
              <option>12</option>
            </select>
          </div>

          {/* waktu */}
          <strong className={style.strong}>Waktu</strong>
          <div className={style.cover_date}>
            <input type="date" className="form-control" />
          </div>

          {/* submit btn */}
          <div className={style.cover_btn}>
            <button type="button" className={style.btn_cancel}>
              Batal
            </button>
            <button type="button" className={style.btn_submit}>
              Terapkan
            </button>
          </div>
        </PopUp>
        {/* konten utama */}
        <div className={style.main_content}>
          <div className="container">
            <div className={style.content}>
              <SidebarLeft />
              <CenteredContent />
              <SidebarRight />
            </div>
          </div>
        </div>

        {/*  */}
      </div>
    </>
  );
}
