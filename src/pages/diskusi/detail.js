import style from "./css/Detail.module.css";

// component
import Navbar from "../../molekul/navbar";
import SidebarRight from "./component/SidebarRight";

// component Jawaban
import Komentar from "./component/Komentar";
import Jawaban from "./component/Jawaban";
import Media from "./component/Jawaban/media";
import DataPertanyaan from "./component/DataPertanyaan";
import Head from "next/head";

// component komentar
import { useEffect, useState } from "react";

// authorization
import jwt from "jsonwebtoken";
import cookie from "js-cookie";
import api, { jwt_key } from "../../config/api";
import { store } from "../../config/redux/store";
import RenderKomentar from "./component/RenderKomentar";

// handler
import { updateComments } from "./component/Komentar/handler/text";
import { timeAgo } from "../../molekul/Time";

// realtime communication
import { io } from "socket.io-client";
const socketIo = io(`${api.ws}/forum`);

export default function Detail({
  Data,
  Identitas,
  Message,
  DataKomentar,
  DataJawaban,
}) {
  const [title, setTitle] = useState("");
  const [user, setUser] = useState({
    id: 0,
    name: "",
  });

  const [listKomentar, setListKomentar] = useState([]);

  useEffect(() => {
    // menghubungkan dengan server realtime
    socketIo.emit("join-room-diskusi", { room_name: Identitas });
    // data handler
    validateData();
    getUser();
    listenMessage();
    setListKomentar(DataKomentar);
  }, [listKomentar]);

  /**
   * Mengambil data user
   */

  function getUser() {
    jwt.verify(cookie.get("auth_user"), jwt_key, (err, decoded) => {
      if (!err) {
        setUser(decoded);
      }
    });
  }

  /**
   * mengaambil alih ketika ada inputan tidak sesuai kriteria
   * jika sesuai akan di ijinkan masuk
   * tapi jika tidak akan ditendang
   */

  function validateData() {
    if (typeof Data !== "undefined" && Data.length > 0) {
      //
      setTitle(Data[0].forum.pertanyaan);
    } else {
      window.location.href = "/diskusi";
    }
  }

  /**
   * mendengarkan apakah ada pesan baru atau tidak
   */

  function listenMessage() {
    store.subscribe(() => {
      const states = store.getState();
      if (states.type === "update_comments") {
        updateComments(
          states.comments_id,
          listKomentar,
          setListKomentar,
          Identitas
        );
      }
    });
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Head>
      <Navbar />
      <div className={style.body}>
        <div className="container">
          {/* tag diskusi */}
          <div className={style.content}>
            {/*  */}
            <div className={style.discuss}>
              <div className={style.data_diskusi}>
                <DataPertanyaan Data={Data[0]} Identitas={Identitas} />
                <hr />
                {/*  */}
                <Komentar
                  RealTimeHandler={socketIo}
                  DataJawaban={DataJawaban}
                  IdentitasForum={Identitas}
                  User={user}
                />
                <Jawaban
                  RealTimeHandler={socketIo}
                  User={user}
                  IdentitasForum={Identitas}
                />
                <Media IdentitasForum={Identitas} User={user} />
              </div>

              {/* list komentar */}
              <strong style={{ fontSize: 14 }}>
                Komentar {listKomentar.length}
              </strong>
              {listKomentar.map((items, i) => (
                <RenderKomentar
                  tipe={items.tipe}
                  pesan={items.pesan}
                  user={items.user}
                  waktu={timeAgo.format(new Date(items.waktu))}
                  anonim={items.anonim}
                  key={i}
                />
              ))}
            </div>

            {/*  */}
            <SidebarRight />
          </div>
          {/*  */}
        </div>
      </div>
    </>
  );
}
