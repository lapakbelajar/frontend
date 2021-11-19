// style
import style from "./css/Profile.module.css";

// component
import Navbar from "../../molekul/navbar";
import Sidebar from "./component/sidebar";
import BoxDiskusi from "../../molekul/BoxDiskusi";

// api and hook
import api, { authorization } from "../../config/api";
import { useState, useEffect } from "react";

// authorization
import jwt from "jsonwebtoken";
import cookie from "js-cookie";

export default function Profile() {
  const [listDiskusi, setListDiskusi] = useState([]);

  useEffect(() => {
    authorize();
  }, []);

  /**
   * Menangani authorisasi user
   *
   */

  function authorize() {
    jwt.verify(cookie.get("auth_user"), api.jwt_key, (err, decoded) => {
      if (err) {
        window.location.href = "/login";
      } else {
        getUserData(decoded.id);
      }
    });
  }

  /**
   * mengambil data diskusi berdasarkan user
   */

  async function getUserData(userid) {
    const req = await fetch(
      `${api.api_endpoint}/forum/ambil/user?user_id=${userid}&start=0&end=16`,
      {
        headers: {
          authorization: api.authorization,
        },
      }
    );
    const res = await req.json();
    setListDiskusi(res);
  }
  return (
    <>
      <Navbar />
      <div className={style.container}>
        <div className="container">
          <div className={style.main}>
            {/* sidebar */}
            <Sidebar />
            {/* main content */}
            <div className={style.main_content}>
              {listDiskusi.map((items, i) => (
                <BoxDiskusi
                  key={i}
                  forum={items.forum}
                  user={items.forum.user}
                  jumlah_response={items.jumlah_response}
                  lampiran={items.media}
                />
              ))}
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
}
