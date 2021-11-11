import style from "./Jawaban.module.css";

// icon
import { UploadCloud } from "react-feather";
// component
import PopUp from "../../../../molekul/popup";
import Loading from "../../../../molekul/Loading";
import { useState } from "react";

export default function JawabanGambar() {
  const [anonim, setAnonim] = useState(false);
  const [submit, setSubmit] = useState(false);

  return (
    <PopUp top="0%">
      <div className={style.container_upload}>
        <div className={style.upload_places}>
          <UploadCloud size={32} color="#696969" />
          <small>Klik atau drag {"&"} drop disini</small>
        </div>
      </div>

      {/* sembunyikan identitas */}
      <div className={style.identitas}>
        <strong>Anonim</strong>
        <div className={style.anonim}>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              onChange={() => setAnonim(!anonim)}
            />
            <label
              className="form-check-label"
              htmlFor="flexSwitchCheckDefault"
            >
              {anonim ? "Disembunyikan" : "Sembunyikan identitas ku"}
            </label>
          </div>
        </div>
      </div>
      {/* tombol kirim */}
      <div className={style.container_btn}>
        <button type="button" className={style.btn_transparent}>
          batal
        </button>
        <button
          onClick={() => setSubmit(true)}
          className={style.btn_kirim}
          type="button"
        >
          kirim
        </button>
      </div>

      {/* menampilkan loading jika data dikirimkan */}
      <Loading visible={submit} />
    </PopUp>
  );
}
