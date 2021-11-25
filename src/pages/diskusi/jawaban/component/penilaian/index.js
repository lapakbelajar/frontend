import style from "./Penilaian.module.css";

// authorization
import jwt from "jsonwebtoken";
import cookie from "js-cookie";
import api, { jwt_key } from "../../../../../config/api";
import { useEffect, useState } from "react";
import { data } from "autoprefixer";

export default function Penilaian({ DataJawaban }) {
  const [user, setUser] = useState({
    id: 0,
  });

  /**
   * Jika bernilai true itu berarti user yang bertanya sama dengan user yang sedang akses saat ini
   */
  const [match, setMatch] = useState(false);

  useEffect(() => {
    getUser();
  }, []);

  /**
   * mendapatkan data user dan mengecek apakah pengirim jawaban
   * sama dengan yang login saat ini
   */
  function getUser() {
    jwt.verify(cookie.get("auth_user"), jwt_key, (err, decoded) => {
      if (!err) {
        // cek apakah user yang login sama dengan yang bertanya
        if (decoded.id === DataJawaban.forum.user.id) {
          setMatch(true);
          setUser(decoded);
        } else {
          setMatch(false);
        }
      }
    });
  }

  /**
   * Mengirimkan penilaian
   */

  function kirimPenilaian() {
    fetch(`${api.api_endpoint}/jawaban/penilaian/${DataJawaban.identitas}`, {
      method: "PUT",
      headers: {
        authorization: api.authorization,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((final) => {
        setMatch(false);
      })
      .catch((err) => {
        console.warn(err);
      });
  }

  return (
    <>
      {match && DataJawaban.terbantu !== true ? (
        <div className={style.container}>
          <h5>Apakah jawaban ini membantu ?</h5>
          <div className={style.container_btn}>
            <button
              onClick={() => kirimPenilaian()}
              type="button"
              className={style.btn_answer_yes}
            >
              <span>Ya</span>
            </button>
            <button
              onClick={() => {
                setMatch(false);
              }}
              type="button"
              className={style.btn_answer_no}
            >
              <span>Tidak</span>
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
