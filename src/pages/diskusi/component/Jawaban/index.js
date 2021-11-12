// style
import style from "./Jawaban.module.css";
import popupStyle from "../../../../molekul/popup/Popup.module.css";

// component
import dynamic from "next/dynamic";
import PopUp from "../../../../molekul/popup";
import Loading from "../../../../molekul/Loading";

// hook
import { useEffect, useRef, useState } from "react";
import { store } from "../../../../config/redux/store";

// editor
const EditorJs = dynamic(() => import("react-editor-js"), { ssr: false });
import COMPONENT_EDITOR from "../../../../molekul/CompEditor";
import Parser from "../../../../molekul/Parser";

export default function Jawaban() {
  const instanceRef = useRef(null);
  const popupRef = useRef(null);

  // position
  const [top, setTop] = useState("-200%");

  // identitas
  const [editor, setEditor] = useState(true);
  const [anonim, setAnonim] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [componentName, setCompName] = useState("jawaban");

  // inisialisasi data editor
  const [editorValue, setEditorvalue] = useState({
    blocks: [
      {
        type: "paragraph",
        data: {
          text: "Tuliskan jawabanmu disini",
        },
      },
    ],
  });

  useEffect(() => {
    handlePopup();
    handleStyle();
  }, []);

  // mengangani popup
  function handlePopup() {
    store.subscribe(() => {
      const state = store.getState();
      if (state.type === "show" && state.name === componentName) {
        setTop("0%");
      } else {
        setTop("-200%");
      }
    });
  }

  function handleStyle() {
    window.addEventListener("click", (evt) => {
      if (evt.target === popupRef.current) {
        setTop("-200%");
      }
    });
  }

  // menangkap data dari text editor
  async function handlePreview() {
    setEditor(false);
    const savedData = await instanceRef.current.save();
    setEditorvalue(savedData);
  }

  return (
    <div ref={popupRef} className={popupStyle.popup} style={{ top: top }}>
      <div className={popupStyle.container}>
        {/* loading */}
        <Loading visible={submit} />
        <div className={style.container_jawab}>
          <div className={style.header_jawab}>
            <button
              onClick={() => setEditor(true)}
              type="button"
              className={style.btn_transparent}
            >
              editor
            </button>
            <button
              onClick={() => handlePreview()}
              type="button"
              className={style.btn_transparent}
            >
              preview
            </button>
          </div>

          {editor ? (
            <div className={style.editor}>
              <EditorJs
                data={editorValue}
                tools={COMPONENT_EDITOR}
                instanceRef={(instance) => (instanceRef.current = instance)}
              />

              <div className={style.sumber}>
                <strong>Sumber</strong>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Cantumkan link sumber jawaban jika ada"
                />
              </div>

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
                  onClick={() =>
                    store.dispatch({
                      type: "hide",
                      payload: { name: "jawaban" },
                    })
                  }
                  type="button"
                  className={style.btn_transparent}
                >
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
              {/*  */}
            </div>
          ) : (
            <div
              className={style.preview}
              dangerouslySetInnerHTML={{ __html: Parser(editorValue.blocks) }}
            ></div>
          )}
        </div>
      </div>
    </div>
  );
}
