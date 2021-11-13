import style from "./css/Profile.module.css";

// component
import Sidebar from "./component/sidebar";
import Navbar from "../../molekul/navbar";

export default function Pengaturan() {
  return (
    <>
      <Navbar />
      <div className={style.container}>
        <div className="container">
          <div className={style.main}>
            {/* sidebar */}
            <Sidebar />
            {/* main content */}
            <div className={style.main_content}>
              <div className={style.pengaturan}>
                <label htmlFor="#nama">Nama</label>
                <input
                  id="nama"
                  type="text"
                  className={"form-control"}
                  placeholder="Nama Lengkap"
                />
                <label htmlFor="#institusi">Sekolah / Kampus</label>
                <input
                  id="institusi"
                  type="text"
                  className={"form-control"}
                  placeholder="Nama institusi contoh : Universitas Indonesia"
                />
                <button type="button" className={style.btn_save}>
                  simpan
                </button>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
}
