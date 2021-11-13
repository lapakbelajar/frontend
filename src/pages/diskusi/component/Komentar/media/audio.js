import style from "../Komentar.module.css";

// icon
import { StopCircle, Play, Pause, Trash } from "react-feather";

// hook
import { useState } from "react";

export default function AudioMessage() {
  const [recording, setRecording] = useState(true);
  const [play, setPlay] = useState(false);

  return (
    <div className={style.audio_container}>
      {recording ? (
        <div className={style.action_audio}>
          <button
            onClick={() => setRecording(false)}
            type="button"
            className={style.stop_recording}
          >
            <StopCircle size={22} color="#ffffff" />
          </button>
          <small>00:01 mendengarkan..</small>
        </div>
      ) : (
        <div className={style.audio_preview}>
          <button className={style.btn_playpause} type="button">
            {play ? (
              <Pause color="#ffffff" size={16} />
            ) : (
              <Play color="#ffffff" size={16} />
            )}
          </button>

          {/* track */}
          <input
            type="range"
            min="0"
            step="1"
            max="100"
            className={style.audio_track}
          />
          {/* times */}
          <small>00:01</small>

          {/* btn delete */}
          <button className={style.btn_delete} type="button">
            <Trash color="#ffffff" size={16} />
          </button>
          {/*  */}
        </div>
      )}
    </div>
  );
}
