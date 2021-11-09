import style from "./Oboarding.module.css";

export default function onBoarding() {
  return (
    <div className={style.on_boarding}>
      <div className={style.content_onboarding}>
        <h1>Tanya apapun, dapatkan jawaban dengan sumber terpercaya.</h1>
        <div className={style.action_boarding}>
          {/* for search */}
          <form action="" method="GET" className={style.form_search}>
            <input
              type="text"
              className={style.input}
              placeholder="Aku mau tau tentang..."
            />
            <button className={style.submit_btn} type="button">
              cari
            </button>
          </form>
          <span>atau</span>
          {/* button */}
          <button className={style.btn_ask} type="button">
            Ajukan Pertanyaan
          </button>
          {/*  */}
        </div>
      </div>
    </div>
  );
}
