import api from "../../../src/config/api";
import Jawaban from "../../../src/pages/diskusi/jawaban";

export default function HalamanJawaban({ data, identitas, komentar }) {
  return (
    <Jawaban Data={data} IdentitasJawaban={identitas} DataKomentar={komentar} />
  );
}
export async function getServerSideProps(ext) {
  const { identitas } = ext.params;
  try {
    // mengambil data jawaban
    const req = await fetch(`${api.api_endpoint}/jawaban/detail/${identitas}`, {
      headers: {
        authorization: api.authorization,
      },
    });
    const res = await req.json();

    // mengambil data komentar jawaban
    const komentar = await fetch(
      `${api.api_endpoint}/jawaban/komentar/terbaru?start=0&end=16&jawaban_identitas=${identitas}`,
      {
        headers: {
          authorization: api.authorization,
        },
      }
    );

    const res_komentar = await komentar.json();

    return {
      props: {
        data: res,
        identitas: identitas,
        komentar: res_komentar,
      },
    };
  } catch (err) {
    return {
      props: {
        data: {},
        identitas: identitas,
        komentar: [],
      },
    };
  }
}
