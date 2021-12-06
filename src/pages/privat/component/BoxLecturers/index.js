import style from "../../css/Privat.module.css";

// component
import Link from "next/link";

// icon
import { User, Users } from "react-feather";

export default function BoxLecturers({
  image,
  name,
  university,
  skils,
  start_price,
  id,
}) {
  return (
    <Link href={`/privat/detail/${id}`}>
      <a className={style.box_lecturers}>
        <div className={style.lecturs_img}>
          <img src={image} alt={name} />
        </div>
        <div className={style.lecturers_desc}>
          <h4>{name}</h4>
          <div className={style.lec_about}>
            <div className={style.box_about}>
              <img src="/icon/toga.svg" alt="Pendidikan" />
              <span>{university}</span>
            </div>
            <div className={style.box_about}>
              <img src="/icon/keahlian.svg" alt="Pendidikan" />
              <span>{skils}</span>
            </div>
          </div>
          {/* testimoni */}
          <div className={style.testimoni}>
            {typeof start_price === "number" ? (
              <div className={style.harga}>
                <img src="/icon/money.svg" alt="money" />
                <span>Privat mulai dari Rp.{start_price.toLocaleString()}</span>
              </div>
            ) : (
              ""
            )}
            <div className={style.bergabung}>
              <Users color="#ffffff" size={22} />
              <span>22 orang telah mencobanya</span>
            </div>
          </div>
          {/*  */}
        </div>
      </a>
    </Link>
  );
}
