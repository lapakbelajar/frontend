import style from "./Profile.module.css";

import event from "../../component/event";

export default function Profile({
  image,
  name,
  education,
  skils,
  page,
  UserId,
  KelasId,
  JumlahLaporan,
}) {
  return (
    <div className={style.profile}>
      <img src={image} alt={name} />
      <div className={style.profile_desc}>
        <span>{name}</span>
        <small>
          {education} - {skils}
        </small>
      </div>
      {page === "siswa" ? (
        JumlahLaporan < 1 ? (
          <button
            onClick={() =>
              event.dispatch({
                type: "show-laporan-expert",
                payload: {
                  userId: UserId,
                  kelasId: KelasId,
                  userName: name,
                },
              })
            }
            type="button"
            className="btn btn-primary btn-sm"
          >
            Buat Laporan
          </button>
        ) : (
          <button type="button" className="btn btn-success btn-sm">
            Laporan Terkirim
          </button>
        )
      ) : (
        ""
      )}
    </div>
  );
}
