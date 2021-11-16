import style from "./Loading.module.css";
// component
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function ForumLoading() {
  return (
    <div className={style.container}>
      <SkeletonTheme color="#b0b0b0" highlightColor="#dedede">
        <div className={style.loading_header}>
          <Skeleton style={{ width: 45, height: 45, borderRadius: 50 }} />
          <div className={style.loading_desc}>
            <div>
              <Skeleton style={{ width: 100, height: 10, borderRadius: 5 }} />
            </div>
            <Skeleton style={{ width: 80, height: 10, borderRadius: 5 }} />
          </div>
        </div>
        <div className={style.loading_body}>
          <Skeleton style={{ width: "100%", height: 200 }} />
        </div>
      </SkeletonTheme>
    </div>
  );
}
