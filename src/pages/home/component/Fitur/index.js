import style from "./Fitur.module.css";

// component
import Image from "next/image";
import Link from "next/link";

// authentication
import { jwt_key } from "../../../../config/api";
import cookie from "js-cookie";
import { useEffect, useState } from "react";
import { isUserLogin } from "../../helper";

//

export default function Fitur() {
  const [auth, setAuth] = useState({
    login: false,
  });

  useEffect(() => {
    const userCheck = isUserLogin(cookie.get("auth_user"), jwt_key);
    setAuth(userCheck);
  }, []);

  return (
    <>
      {/* detail fitur */}
      {/* ruang diskusi */}
      <div className={style.fitur}>
        <div className={style.box_fitur}>
          <Image
            src="/illustration/ruang-diskusi.png"
            width={551}
            height={451.25}
            alt="ruang diskusi"
          />
        </div>
        <div className={style.box_fitur}>
          <div className={style.text_fitur}>
            <h3>Buat ruang diskusi dan bahas tentang apapun</h3>
            <p>
              kami menyediakan fasilitas diskusi agar pembelajaran mu lebih
              interaktif dan menyenangkan.
            </p>
          </div>
        </div>
      </div>

      {/* fitur diskusi */}

      <div className={style.fitur2}>
        <div className={style.box_fitur}>
          <div className={style.text_fitur}>
            <h3>Interaksi jadi lebih menyenangkan</h3>
            <p>
              Tersedia fitur ke kinian yang memungkinkan membuat diskusi mu
              lebih menarik
            </p>
          </div>
        </div>
        <div className={style.box_fitur}>
          <Image
            src="/illustration/fitur-disuksi.png"
            width={636}
            height={445}
            alt="fitur diskusi"
          />
        </div>
      </div>

      {/* text siap */}
      <div className={style.ready}>
        <div className={style.content_ready}>
          <h1>Kamu sudah siap ?</h1>
          <Link href={auth.login ? "/diskusi" : `/login`}>
            <a className={style.btn_ready}>
              {auth.login ? "Mulai Diskusi" : "Login"}
            </a>
          </Link>
        </div>
      </div>
    </>
  );
}
