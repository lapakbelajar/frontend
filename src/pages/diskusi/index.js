// component
import Navbar from "../../molekul/navbar";
import SidebarRight from "./component/SidebarRight";
import SidebarLeft from "./component/SidebarLeft";
import CenteredContent from "./component/CenteredContent";
import Filter from "./component/Filter";
import Head from "next/head";
import Image from "next/image";

// style
import style from "./css/Diskusi.module.css";
import api from "../../config/api";
import { useEffect, useState } from "react";

export default function Diskusi({ DataDiskusi }) {
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    getTrends();
  }, []);

  // mendapatkan data trending
  async function getTrends() {
    try {
      const req = await fetch(`${api.api_endpoint}/forum/stats/ambil`, {
        headers: {
          authorization: api.authorization,
        },
      });
      const res = await req.json();

      if (res.length > 0) {
        setTrends(res);
      }
    } catch (err) {
      //
    }
  }

  return (
    <>
      <Head>
        <title>Buat ruang diskusi dan bahas tentang apapun</title>
        <meta
          name="description"
          content="Tanya apapun, dapatkan jawaban
dengan sumber terpercaya."
        />
      </Head>
      <div className={style.main}>
        <Navbar />
        {/* bikin pertanyaan */}
        <Filter />
        {/* konten utama */}
        <div className={style.main_content}>
          <div className="container">
            <div className={style.content}>
              <SidebarLeft Data={DataDiskusi} />
              <CenteredContent Data={DataDiskusi} Page="diskusi" />
              <SidebarRight DataTrends={trends} />
            </div>
          </div>
        </div>

        {/*  */}
      </div>
    </>
  );
}
