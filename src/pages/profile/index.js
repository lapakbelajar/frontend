// style
import style from "./css/Profile.module.css";

// component
import Navbar from "../../molekul/navbar";
import Sidebar from "./component/sidebar";
import BoxDiskusi from "../../molekul/BoxDiskusi";

export default function Profile() {
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
              <BoxDiskusi />
              <BoxDiskusi />
              <BoxDiskusi />
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
}
