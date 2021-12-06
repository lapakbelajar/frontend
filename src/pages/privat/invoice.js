import style from "./css/Invoice.module.css";

import CenterComponent from "../../templates/centered";
import Head from "next/head";
import Swal from "sweetalert2";

// icon
import { UploadCloud } from "react-feather";
import { useEffect, useRef, useState } from "react";

//
import api from "../../config/api";
import { kirimEmail } from "../../config/message";

export default function Invoice({ DataInvoice }) {
  const fileRef = useRef(null);

  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState("");
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    if (Object.keys(DataInvoice).length > 0) {
      //
    } else {
      window.location.href = "/privat";
    }
  }, []);

  function handlleFile(files) {
    if (files.length > 0) {
      setImages(files);

      // read image
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(files[0]);
    }
  }

  // kirim data
  function handleSubmit() {
    setSubmit(true);
    if (images.length > 0) {
      const media = new FormData();
      media.append("media", images[0]);

      fetch(`${api.file}/upload.php`, {
        method: "POST",
        body: media,
      })
        .then((res) => {
          return res.json();
        })
        .then(async (res) => {
          const data = new FormData();
          data.append(
            "bukti_pembayaran",
            `${api.file}${api.file_path}${res.filename}`
          );
          data.append("identitas", DataInvoice.identitas);

          // update status pembayaran
          const update = await fetch(
            `${api.api_endpoint}/privat/invoice/update`,
            {
              method: "PUT",
              headers: {
                authorization: api.authorization,
              },
              body: data,
            }
          );
          // kirim email
          const msg = `${DataInvoice.user.name} Telah melakukan pembayaran untuk kelas privat ${DataInvoice.kelas.matpel}, tunggu email kami berkutnya kami akan mengubungi anda untuk melakukan proses pencairan, sekarang proses belajar bisa dilakukan`;
          kirimEmail(
            DataInvoice.kelas.tutor.id,
            `${DataInvoice.user.name} Berhasil Melakukan Pembayaran untuk Privat Kelas ${DataInvoice.kelas.matpel}`,
            msg
          );
          kirimEmail(
            DataInvoice.user.id,
            `Pembayaran kelas privat ${DataInvoice.kelas.matpel} berhasil`,
            `Terimakasih pembayaran untuk kelas privat ${DataInvoice.kelas.matpel} berhasil dilakukan, sekarang kamu bisa langsung belajar\n\n${window.location.origin}/privat/data`
          );
          setSubmit(false);
        })
        .then(() => {
          window.location.href = "/privat/data";
        })
        .catch((err) => {
          console.warn(err);
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Tolong Upload Foto Bukti Pembayaran",
      });
    }
  }

  return (
    <CenterComponent>
      <Head>
        <title>
          Tagihan kelas {DataInvoice.kelas.matpel} untuk {DataInvoice.user.name}
        </title>
        <meta
          name="description"
          content={`Tagihan kelas ${DataInvoice.kelas.matpel} untuk ${DataInvoice.user.name}`}
        />
      </Head>
      <h4>Tagihan</h4>
      <small>
        Id: <strong>{DataInvoice.identitas}</strong>
      </small>

      <div className={style.info}>
        <small>Ketarangan</small>
        <table className="table table-striped mt-3">
          <tbody>
            <tr>
              <td>
                <strong>Nama</strong>
              </td>
              <td>:</td>
              <td>{DataInvoice.user.name}</td>
            </tr>
            <tr>
              <td>
                <strong>Kelas</strong>
              </td>
              <td>:</td>
              <td>{DataInvoice.kelas.matpel}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className={style.info}>
        <small>Biaya</small>
        <div className={style.keterangan}>
          <h3>Rp. {DataInvoice.harga.toLocaleString()}</h3>
          {/* <small>/ hari</small> */}
        </div>
      </div>

      <hr />

      {/* alaman transfer */}
      <div className={style.secondary_info}>
        <strong>Alamat Transfer</strong>
        <small>
          Transfer sesuai dengan nominal diatas kemudian kirimkan ke alamat
          berikut ini
        </small>
        <div className={style.col_alamat}>
          <table>
            <tr>
              <td className={style.thead}>Nama</td>
              <td>: Suci Khainari Pane</td>
            </tr>
            <tr>
              <td className={style.thead}>Bank</td>
              <td>: BNI</td>
            </tr>
            <tr>
              <td className={style.thead}>Nomor Rekening</td>
              <td>: 0847737199</td>
            </tr>
          </table>
        </div>
      </div>
      {/*  */}

      <div className={style.secondary_info}>
        <strong>Bukti Pembayaran</strong>
        <small>
          Upload bukti pembayaran mu dengan klik atau drag n drop kolom dibawah
          ini
        </small>
      </div>

      <input
        onChange={(evt) => handlleFile(evt.target.files)}
        type="file"
        ref={fileRef}
        accept="image/*"
        style={{ display: "none" }}
      />

      {/* upload bukti pembayaran */}
      {images.length > 0 ? (
        <div className={style.bukti_pembayaran}>
          <img src={preview} alt="" />
        </div>
      ) : (
        <div className={style.upload} onClick={() => fileRef.current.click()}>
          <div className={style.upload_content}>
            <UploadCloud color="#606060" size={60} />
            <span>Upload</span>
            <small>Klik atau drag & drop disini</small>
          </div>
        </div>
      )}

      {/* tombol kirim */}
      <button
        type="button"
        className="btn btn-secondary"
        style={{ fontSize: 14 }}
        onClick={() => setImages([])}
      >
        Ganti Gambar
      </button>
      <button
        onClick={() => handleSubmit()}
        type="button"
        className="btn btn-primary ml-3"
        style={{ fontSize: 14, marginLeft: 15 }}
      >
        {submit ? "Loading..." : "Kirim"}
      </button>
    </CenterComponent>
  );
}
