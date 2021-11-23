import style from "./Penilaian.module.css";

export default function Penilaian() {
  return (
    <div className={style.container}>
      <h5>Apakah jawaban ini membantu ?</h5>
      <div className={style.container_btn}>
        <button type="button" className={style.btn_answer_yes}>
          <span style={{ color: "#2AD78B" }}>Ya</span>
        </button>
        <button type="button" className={style.btn_answer_no}>
          <span style={{ color: "#EB5264" }}>Tidak</span>
        </button>
      </div>
    </div>
  );
}
