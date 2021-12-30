import style from "./AlertData.module.css";

// icon
import { ArrowRight } from "react-feather";

// component
import Link from "next/link";

// authorization
import { jwt_key } from "../../config/api";
import jwt from "jsonwebtoken";
import cookie from "js-cookie";
import { useEffect, useState } from "react";

export default function AlertData() {
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState({
    id: 0,
    name: "",
  });
  const [lengkap, setLengkap] = useState(false);

  useEffect(() => {
    getUser();
  }, []);

  /**
   * Mengambil data user dari json web token
   */

  function getUser() {
    jwt.verify(cookie.get("auth_user"), jwt_key, (err, decoded) => {
      if (!err) {
        setLogin(true);
        if (checkData(decoded)) {
          console.log(decoded);
          setLengkap(false);
          setUser(decoded);
        } else {
          setLengkap(true);
        }
      } else {
        setLogin(false);
      }
    });
  }

  /**
   * Mengecek apakah data user ada yang valuenya - atau tidak
   */

  function checkData(value) {
    let data_kosong = [];
    Object.keys(value).forEach((items) => {
      if (
        items !== "accountType" &&
        items !== "wilayah" &&
        items !== "keahlian"
      ) {
        if (value[items] === "-") {
          data_kosong.push(value[items]);
        }
      }
    });
    return data_kosong.length > 0 ? true : false;
  }

  if (login) {
    if (!lengkap) {
      return (
        <div className={style.alert_box}>
          <img
            src="/illustration/analisis-data.jpg"
            className={style.img_alert}
          />
          <div className={style.alert_desc}>
            <h4>
              Hi{" "}
              {user.name.split(" ").length > 0
                ? user.name.split(" ")[0]
                : user.name}
            </h4>
            <p>
              Data profile kamu belum lengkap nih
              <br /> lengkapin dulu yuk...
            </p>
            <Link href="/profile/pengaturan">
              <a className={style.btn_redirect}>
                <span>Lengkapi Sekarang</span>
                <ArrowRight size={18} color="#ffffff" />
              </a>
            </Link>
          </div>
        </div>
      );
    } else {
      return "";
    }
  } else {
    return "";
  }
}
