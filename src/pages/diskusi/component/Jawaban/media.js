// style
import popupStyle from "../../../../molekul/popup/Popup.module.css";
import style from "./Jawaban.module.css";

// icon
import { UploadCloud } from "react-feather";
// component
import PopUp from "../../../../molekul/popup";
import Loading from "../../../../molekul/Loading";

// helper
import { readMedia } from "./helper";

// hook
import { useEffect, useRef, useState } from "react";
import { store } from "../../../../config/redux/store";

// handler
import { kirimGambar } from "./handler/image";

export default function Media({ IdentitasForum, User }) {
  // references
  const fileRef = useRef(null);
  const popupRef = useRef(null);

  // states
  const [anonim, setAnonim] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [mediaType, setMediaType] = useState("image");
  const [supportedFile, setSupported] = useState([]);

  // files
  const [pickedFiles, pickTheFile] = useState([]);

  // file gambar
  const [imageData, setImageData] = useState("");

  // data gagal
  const [failed, setFailed] = useState(false);
  const [failedMsg, setFailedMsg] = useState("");

  // popup
  const [top, setTop] = useState("-200%");
  const [componentName, setCompName] = useState("media");

  useEffect(() => {
    handlePopup();
    handleStyle();
  }, [User]);

  // membuka file
  function openFile() {
    setFailed(false);
    fileRef.current.click();
  }

  // mengangani popup
  function handlePopup() {
    store.subscribe(() => {
      const state = store.getState();
      if (state.type === "show" && state.name === componentName) {
        setMediaType(state.detail.type);
        setTop("0%");

        // memeriksa tipe media
        if (state.detail.type === "image") {
          setSupported(["jpg", "png", "jpeg"]);
        } else {
          setSupported(["pdf", "pptx", "docs"]);
        }
      } else {
        setTop("-200%");
      }
    });
  }

  // menghilangkan popup ketika overlay di klik
  function handleStyle() {
    window.addEventListener("click", (evt) => {
      if (evt.target === popupRef.current) {
        setTop("-200%");
      }
    });
  }

  // menangani file
  function handleFile(selectedFiles) {
    if (selectedFiles.length > 0) {
      // membaca dan memfilter file
      const res = readMedia(
        mediaType,
        supportedFile,
        selectedFiles,
        pickTheFile
      );

      // cek error

      if (res.error) {
        pickTheFile([]);
        setFailed(true);
        setFailedMsg(res.message);
      } else {
        setFailed(false);
      }
    }
  }

  return (
    <div ref={popupRef} className={popupStyle.popup} style={{ top: top }}>
      <div className={popupStyle.container}>
        {failed ? (
          <div className={style.alert}>
            <small>{failedMsg}</small>
          </div>
        ) : (
          ""
        )}
        <div onClick={() => openFile()} className={style.container_upload}>
          <div className={style.upload_places}>
            <UploadCloud size={32} color="#696969" />
            {pickedFiles.length > 0 ? (
              <small>{pickedFiles[0].name}</small>
            ) : (
              <small>Klik atau drag {"&"} drop disini</small>
            )}
          </div>
        </div>

        {/* file tags */}
        <input
          onChange={(evt) => handleFile(evt.target.files)}
          type="file"
          style={{ display: "none" }}
          ref={fileRef}
        />

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
          <button
            onClick={() => {
              store.dispatch({ type: "hide", payload: { name: "media" } });
              pickTheFile([]);
              setFailed(false);
            }}
            type="button"
            className={style.btn_transparent}
          >
            batal
          </button>
          <button
            onClick={() => {
              kirimGambar(
                mediaType === "image" ? "gambar" : "dokumen",
                pickedFiles,
                pickTheFile,
                setSubmit,
                anonim,
                User.id,
                IdentitasForum,
                setTop
              );
            }}
            className={style.btn_kirim}
            type="button"
            disabled={failed}
          >
            kirim
          </button>
        </div>

        {/* menampilkan loading jika data dikirimkan */}
        <Loading visible={submit} />
      </div>
    </div>
  );
}
