// component
import Navbar from "../../molekul/navbar";
import SidebarRight from "./component/SidebarRight";
import SidebarLeft from "./component/SidebarLeft";
import CenteredContent from "./component/CenteredContent";
import Pertanyaan from "./component/Pertanyaan";
import Filter from "./component/Filter";

// style
import style from "./css/Diskusi.module.css";

export default function Diskusi() {
  return (
    <>
      <div className={style.main}>
        <Navbar />
        {/* bikin pertanyaan */}
        <Filter />
        {/* konten utama */}
        <div className={style.main_content}>
          <div className="container">
            <div className={style.content}>
              <SidebarLeft />
              <CenteredContent />
              <SidebarRight />
            </div>
          </div>
        </div>

        {/*  */}
      </div>
    </>
  );
}
