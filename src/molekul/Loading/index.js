import style from "./Loading.module.css";

export default function Loading({ visible }) {
  return (
    <div className={visible ? style.overlay_loading : style.hidden}>
      <div className={style.loading}>
        <div className={style.indicator}></div>
      </div>
    </div>
  );
}
