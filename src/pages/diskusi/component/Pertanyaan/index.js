import style from "./Pertanyaan.module.css";

// icon
import { Camera, Paperclip, X } from "react-feather";
import { useEffect, useRef, useState } from "react";
import { store } from "../../../../config/redux/store";

export default function Pertanyaan({ PopupPosition }) {
  const popupRef = useRef(null);

  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);

  // position
  const [top, setTop] = useState("-200%");

  // identitas
  const [identitas, setIdentitas] = useState(false);
  const [componentName, setCompName] = useState("pertanyaan");

  useEffect(() => {
    store.subscribe(() => {
      const state = store.getState();
      if (state.type === "show" && state.name == componentName) {
        setTop("0%");
      } else {
        setTop("-200%");
      }
    });

    handleStyle();
  }, [top]);

  // menghilangkan popup ketika overlay di klik

  function handleStyle() {
    window.addEventListener("click", (evt) => {
      if (evt.target === popupRef.current) {
        setTop("-200%");
      }
    });
  }

  return (
    <div ref={popupRef} className={style.popup} style={{ top: top }}>
      <div className={style.container}>
        <textarea
          className={style.textarea}
          placeholder="Tulis pertanyaan mu disini"
        ></textarea>

        {/* tombol lampiran */}
        <div className={style.btn_attachment}>
          <button type="button" className={style.btn_transparent}>
            <Camera size={18} color="#363636" />
          </button>
          <button type="button" className={style.btn_transparent}>
            <Paperclip size={18} color="#363636" />
          </button>
        </div>

        {/* preview image */}
        {images.length > 0 ? (
          <>
            <strong className={style.title}>lampiran</strong>
            <div className={style.preview_image}>
              <div className={style.container_image}>
                <img
                  src="https://cdn.pixabay.com/photo/2021/10/18/19/19/bird-6721895_960_720.jpg"
                  alt=""
                />
                <button className={style.remove_img}>
                  <X color="#363636" size={18} />
                </button>
              </div>
              <div className={style.container_image}>
                <img
                  src="https://cdn.pixabay.com/photo/2021/10/18/19/19/bird-6721895_960_720.jpg"
                  alt=""
                />
                <button className={style.remove_img}>
                  <X color="#363636" size={18} />
                </button>
              </div>
              <div className={style.container_image}>
                <img
                  src="https://cdn.pixabay.com/photo/2021/10/18/19/19/bird-6721895_960_720.jpg"
                  alt=""
                />
                <button className={style.remove_img}>
                  <X color="#363636" size={18} />
                </button>
              </div>
              <div className={style.container_image}>
                <img
                  src="https://cdn.pixabay.com/photo/2021/10/18/19/19/bird-6721895_960_720.jpg"
                  alt=""
                />
                <button className={style.remove_img}>
                  <X color="#363636" size={18} />
                </button>
              </div>
              <div className={style.container_image}>
                <img
                  src="https://cdn.pixabay.com/photo/2021/10/18/19/19/bird-6721895_960_720.jpg"
                  alt=""
                />
                <button className={style.remove_img}>
                  <X color="#363636" size={18} />
                </button>
              </div>
            </div>
          </>
        ) : (
          ""
        )}

        {files.length > 0 ? (
          <>
            {/* preview file */}
            <strong className={style.title}>File</strong>
            <div className={style.preview_file}>
              <div className={style.files}>
                <span>document</span>
                <button className={style.remove_file} type="button">
                  <X size={14} color="#363636" />
                </button>
              </div>
            </div>
          </>
        ) : (
          ""
        )}

        {/* keterangan pertanyaan */}
        <strong className={style.title}>keterangan</strong>
        <div className={style.container_keterangan}>
          <select className={style.input}>
            <option>Jenjang</option>
            <option>SMA</option>
            <option>SMK</option>
            <option>lainnya</option>
          </select>
          <input className={style.input} placeholder="Jurusan contoh : IPA" />
          <select className={style.input}>
            <option>Kelas</option>
            <option>10</option>
            <option>11</option>
            <option>12</option>
            <option>lainnya</option>
          </select>
        </div>

        {/* tags */}
        <div className={style.container_tags}>
          <div className={style.tags}>
            <span>ipa</span>
            <button className={style.remove_file} type="button">
              <X color="#363636" size={18} />
            </button>
          </div>
          <input
            className={style.input_tags}
            placeholder="tag contoh : #ipa, #biologi"
          />
        </div>

        {/* kirim sebagai anonim */}
        <strong className={style.title}>Kirim sebagai anonim</strong>
        <div className={style.anonim}>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              onChange={() => setIdentitas(!identitas)}
            />
            <label
              className="form-check-label"
              htmlFor="flexSwitchCheckDefault"
            >
              {identitas
                ? "Tampilkan identitas ku"
                : "Sembunyikan identitas ku"}
            </label>
          </div>
        </div>

        {/* tombol kirim */}
        <div className={style.container_btn}>
          <button className={style.btn_cancel}>Batal</button>
          <button className={style.btn_kirim}>Kirim</button>
        </div>

        {/* overlay loading */}
        <div className={style.overlay_loading}>
          <div className={style.loading}>
            <div className={style.indicator}></div>
          </div>
        </div>
        {/*  */}
      </div>
    </div>
  );
}
