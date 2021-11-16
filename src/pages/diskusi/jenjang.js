// component
import Navbar from "../../molekul/navbar";
import SidebarRight from "./component/SidebarRight";
import SidebarLeft from "./component/SidebarLeft";
import CenteredContent from "./component/CenteredContent";
import Filter from "./component/Filter";
import Head from "next/head";

// style
import style from "./css/Diskusi.module.css";

export default function DiskusibyJenjang({ DataDiskusi, Jenjang }) {
  return (
    <>
      <Head>
        <title>Diskusi {Jenjang}</title>
        <meta
          name="description"
          content="Tanya apapun, dapatkan jawaban
dengan sumber terpercaya."
        />
      </Head>
      <div className={style.main}>
        <Navbar />
        {/* konten utama */}
        <div className={style.main_content}>
          <div className="container">
            <div className={style.content}>
              <SidebarLeft Data={DataDiskusi} />
              <CenteredContent Data={DataDiskusi} Page={"jenjang"} />
              <SidebarRight />
            </div>
          </div>
        </div>

        {/*  */}
      </div>
    </>
  );
}
