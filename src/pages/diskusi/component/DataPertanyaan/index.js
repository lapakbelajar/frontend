import style from "./Data.module.css";
import Image from "next/image";

// icon
import { Download } from "react-feather";

// hook
import { useEffect, useState } from "react";

// time
import { timeAgo } from "../../../../molekul/Time";
import api from "../../../../config/api";

export default function DataPertanyaan({ Data, Identitas }) {
  const [forum, setForum] = useState({
    user: {
      image: "",
      name: "",
    },
  });
  const [gambar, setGambar] = useState([]);
  const [dokumen, setDokumen] = useState([]);

  useEffect(() => {
    setForum(Data.forum);
    filterFile(Data.media);
  }, [forum]);

  /**
   * Fungsi dibawah ini digunakan untuk memfilter file yang dikirimkan jika ada
   * @param {Array} source sumber media berupa array
   */

  function filterFile(source = []) {
    if (source.length > 0) {
      source.forEach((items) => {
        if (items.tipe === "image") {
          if (!gambar.includes(items.namafile)) {
            setGambar([...gambar, items.namafile]);
          }
        } else {
          if (!dokumen.includes(items.namafile)) {
            setDokumen([...dokumen, items.namafile]);
          }
        }
      });
    }
  }

  return (
    <>
      {/* informasi profile */}
      <div className={style.profile}>
        {forum.anonim ? (
          <Image
            src="/illustration/anonim.png"
            alt="anonim"
            width={45}
            height={45}
          />
        ) : (
          <img src={forum.user.image || ""} alt={forum.user.name || ""} />
        )}
        <div className={style.profile_desc}>
          <h4>{forum.anonim ? "anonim" : forum.user.name}</h4>
          <small>
            {forum.waktu !== undefined
              ? timeAgo.format(new Date(forum.waktu || ""))
              : "-"}
          </small>
        </div>
      </div>

      {/* detail pertanyaan */}
      <div className={style.pertanyaan}>
        <p>{forum.pertanyaan}</p>
      </div>
      {/* lampiran */}
      <strong className={style.subtitle}>Lampiran</strong>
      {gambar.length > 0 ? (
        <div className={style.preview_image}>
          {/*  */}
          {gambar.map((items, i) => (
            <div className={style.container_image} key={i}>
              <img src={`${api.file}${api.file_path}${items}`} alt={items} />
            </div>
          ))}
          {/*  */}
        </div>
      ) : (
        ""
      )}

      {/* lampiran file */}
      {dokumen.length > 0 ? (
        <div className={style.lampiran_file}>
          {dokumen.map((items, i) => (
            <a
              key={i}
              title={items}
              href={`${api.file}${api.file_path}${items}`}
              download
              className={style.box_file}
            >
              <span>
                {items.length > 15 ? `${items.slice(0, 15)}...` : items.slice}
              </span>
              <Download size={14} color="#363636" />
            </a>
          ))}
        </div>
      ) : (
        ""
      )}
    </>
  );
}
