import api from "../../../src/config/api";
import { Detail } from "../../../src/pages";

export default function DetailDiskusi({
  data,
  identitas,
  message,
  komentar,
  jawaban,
}) {
  return (
    <Detail
      Data={data}
      Identitas={identitas}
      Message={message}
      DataKomentar={komentar}
      DataJawaban={jawaban}
    />
  );
}

export async function getServerSideProps(ext) {
  const { identitas } = ext.params;
  try {
    const req = await fetch(
      `${api.api_endpoint}/forum/ambil/detail/${identitas}`,
      {
        headers: {
          authorization: api.authorization,
        },
      }
    );
    const res = await req.json();

    // mengambil data komentar
    const req_komentar = await fetch(
      `${api.api_endpoint}/forum/komentar/get?start=0&end=15&forum_identitas=${identitas}`,
      {
        headers: {
          authorization: api.authorization,
        },
      }
    );
    const res_komentar = await req_komentar.json();

    // mengambil data jawaban
    const req_jawab = await fetch(
      `${api.api_endpoint}/jawaban/get/${identitas}`,
      {
        headers: {
          authorization: api.authorization,
        },
      }
    );
    const res_jawab = await req_jawab.json();

    return {
      props: {
        data: res,
        identitas: identitas,
        message: "",
        komentar: res_komentar,
        jawaban: res_jawab,
      },
    };
  } catch (err) {
    return {
      props: {
        data: [],
        identitas: identitas,
        message: err,
        komentar: [],
        jawaban: {},
      },
    };
  }
}
