// styles
import style from "./css/Jadwal.module.css";

// icon
import { Trash } from "react-feather";

// state management
import { broker } from "../../config/broker";
import api from "../../config/api";

export default function Jadwal({
  moment = "",
  tanggal = "",
  jam = "-",
  edit = false,
  id = 0,
  zona = "",
}) {
  async function hapusJadwal(id) {
    try {
      const req = await fetch(
        `${api.api_endpoint}/privat/custom/jadwal/delete/${id}`,
        {
          headers: {
            authorization: api.authorization,
          },
          method: "DELETE",
        }
      );
      broker.dispatch({ type: "delete_schedule", id: id });
    } catch (err) {
      //
    }
  }
  return (
    <div className={style.jadwal}>
      {edit ? (
        <div className={style.jadwal_cta}>
          <button
            onClick={() => {
              hapusJadwal(id);
            }}
            type="button"
            className="btn btn-outline-secondary"
          >
            <Trash color="#c4c4c4" size={18} />
          </button>
        </div>
      ) : (
        ""
      )}
      <div className={style.jadwal_date}>
        <div className={style.jadwal_header}>
          <h3>
            {moment(tanggal).format("dddd")} pukul {jam}
          </h3>
          <small>{zona}</small>
        </div>
        <small>{moment(tanggal).format("ll")}</small>
      </div>
    </div>
  );
}
