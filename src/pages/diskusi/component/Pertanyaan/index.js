import style from "./Pertanyaan.module.css";
import stylePopup from "../../../../molekul/popup/Popup.module.css";

// icon
import { Camera, Paperclip, X } from "react-feather";
import { useEffect, useRef, useState } from "react";
import { store } from "../../../../config/redux/store";

// helper
import {
  parseTag,
  deleteTags,
  handleFile,
  deleteImage,
  deleteDocument,
} from "./handler";

// component
import Loading from "../../../../molekul/Loading";

export default function Pertanyaan({ PopupPosition }) {
  const popupRef = useRef(null);
  const refInputTag = useRef(null);
  const fileRef = useRef(null);

  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [previewImage, setPreviewImage] = useState([]);

  // media
  const [supportedMedia, setSupportedMedia] = useState(["jpg", "jpeg", "png"]);
  const [mediaType, setMediaType] = useState("");

  // position
  const [top, setTop] = useState("-200%");

  // tag
  const [tag, setTag] = useState([]);

  // identitas
  const [identitas, setIdentitas] = useState(false);
  const [componentName, setCompName] = useState("pertanyaan");

  //
  const [submit, setSubmit] = useState(false);

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
  }, []);

  // menghilangkan popup ketika overlay di klik
  function handleStyle() {
    window.addEventListener("click", (evt) => {
      if (evt.target === popupRef.current) {
        setTop("-200%");
      }
    });
  }

  return (
    <div ref={popupRef} className={stylePopup.popup} style={{ top: top }}>
      <div className={stylePopup.container}>
        <textarea
          className={style.textarea}
          placeholder="Tulis pertanyaan mu disini"
        ></textarea>

        {/* tombol lampiran */}
        <div className={style.btn_attachment}>
          <button
            onClick={() => {
              fileRef.current.click();
              setMediaType("image");
              setSupportedMedia(["jpg", "png", "jpeg"]);
            }}
            type="button"
            className={style.btn_transparent}
          >
            <Camera size={18} color="#363636" />
          </button>
          <button
            onClick={() => {
              fileRef.current.click();
              setMediaType("file");
              setSupportedMedia(["pdf", "pptx", "docs"]);
            }}
            type="button"
            className={style.btn_transparent}
          >
            <Paperclip size={18} color="#363636" />
          </button>
        </div>

        {/* file */}
        <input
          onChange={(evt) => {
            handleFile(
              mediaType,
              supportedMedia,
              evt.target.files,
              mediaType === "image" ? images : files,
              mediaType === "image" ? setImages : setFiles,
              mediaType === "image" ? previewImage : [],
              mediaType === "image" ? setPreviewImage : null
            );
          }}
          type="file"
          ref={fileRef}
          style={{ display: "none" }}
        />

        {/* preview image */}
        {images.length > 0 ? (
          <>
            <strong className={style.title}>lampiran</strong>
            <div className={style.preview_image}>
              {previewImage.map((items, i) => (
                <div className={style.container_image} key={i}>
                  <img key={i} src={items} alt="" />
                  <button
                    onClick={() =>
                      deleteImage(
                        images,
                        previewImage,
                        i,
                        setPreviewImage,
                        setImages
                      )
                    }
                    className={style.remove_img}
                  >
                    <X color="#363636" size={18} />
                  </button>
                </div>
              ))}
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
              {files.map((items, i) => (
                <div className={style.files} key={i}>
                  <span>
                    {items.name.length > 7
                      ? `${items.name.slice(0, 7)}..`
                      : items.name}
                  </span>
                  <button
                    onClick={() => deleteDocument(files, i, setFiles)}
                    className={style.remove_file}
                    type="button"
                  >
                    <X size={14} color="#363636" />
                  </button>
                </div>
              ))}
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
          {tag.map((items, i) => (
            <div className={style.tags} key={i}>
              <span>{items}</span>
              <button
                onClick={() => deleteTags(items, tag, setTag)}
                className={style.remove_file}
                type="button"
              >
                <X color="#363636" size={18} />
              </button>
            </div>
          ))}
          <input
            ref={refInputTag}
            onKeyUp={(evt) => parseTag(evt, tag, setTag, refInputTag)}
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
          <button
            className={style.btn_cancel}
            onClick={() => {
              store.dispatch({
                type: "hide",
                payload: { name: componentName },
              });
            }}
          >
            Batal
          </button>
          <button className={style.btn_kirim} onClick={() => setSubmit(true)}>
            Kirim
          </button>
        </div>

        {/* overlay loading */}
        <Loading visible={submit} />
        {/*  */}
      </div>
    </div>
  );
}
