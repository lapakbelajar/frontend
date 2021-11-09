// component
import Navbar from "./component/navbar";
import SidebarRight from "./component/SidebarRight";
import SidebarLeft from "./component/SidebarLeft";
import CenteredContent from "./component/CenteredContent";

// style
import style from "./css/Diskusi.module.css";

export default function Diskusi() {
  return (
    <>
      <div className={style.main}>
        <Navbar />

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
