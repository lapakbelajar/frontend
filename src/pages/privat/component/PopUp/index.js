import { X } from "react-feather";
import style from "./Popup.module.css";

// state management
import event from "../event";
import { useEffect, useRef } from "react";

export default function PopUp({ position, children, className, eventName }) {
  const popupRef = useRef(null);

  useEffect(() => {
    positionHandler();
  }, []);

  function positionHandler() {
    window.addEventListener("click", (evt) => {
      if (evt.target === popupRef.current) {
        event.dispatch({ type: eventName });
      }
    });
  }

  return (
    <div ref={popupRef} className={style.container} style={{ top: position }}>
      <div className={className}>
        <button
          onClick={() => {
            event.dispatch({ type: eventName });
          }}
          type="button"
          className={style.btn_close}
        >
          <X size={22} color="#363636" />
        </button>
        <div className={style.canvas}>{children}</div>
      </div>
    </div>
  );
}
