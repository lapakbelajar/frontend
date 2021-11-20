import style from "./Soon.module.css";

// component
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

export default function CommingSoon() {
  return (
    <>
      <Head>
        <title>Fitur ini akan segera hadir sebentar lagi</title>
      </Head>
      <div className={style.container}>
        <div className={style.canvas}>
          <Image
            src="/illustration/process.svg"
            alt="process"
            width={250}
            height={300}
          />
          <h4>Coming Soon</h4>
          <p>Fitur ini akan segera hadir sebentar lagi</p>
          <Link href="/">
            <a className={style.btn_kembali}>Kembali</a>
          </Link>
        </div>
      </div>
    </>
  );
}
