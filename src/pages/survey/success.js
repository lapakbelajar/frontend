import style from "./css/Survey.module.css";

import Link from "next/link";
import Head from "next/head";

export default function SurveySelesai() {
  return (
    <div className={style.container}>
      <Head>
        <title>Selesai, Terimakasih telah berkontribusi</title>
      </Head>
      <div className={style.canvas_selesai}>
        <img
          src="/illustration/survey-selesai.jpg"
          alt="survet selesai image by freepik"
        />
        <h4>Selesai</h4>
        <p>
          Terimakasih telah mengisi survey, jawaban kamu sangat bermanfaat
          supaya kami bisa tumbuh lebih baik lagi
        </p>
        <Link href="/">
          <a className="btn btn-primary">Kembali ke Halaman Utama</a>
        </Link>
      </div>
    </div>
  );
}
