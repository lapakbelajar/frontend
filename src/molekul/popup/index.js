import style from "./Popup.module.css";

export default function PopUp(props) {
  return (
    <div className={style.popup} style={{ top: props.shown ? "0%" : "-200%" }}>
      <div className={style.container}>{props.children}</div>
    </div>
  );
}
