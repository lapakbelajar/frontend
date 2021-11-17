import api from "../../../src/config/api";
import { Detail } from "../../../src/pages";

export default function DetailDiskusi({ data, identitas, message, komentar }) {
  return (
    <Detail
      Data={data}
      Identitas={identitas}
      Message={message}
      DataKomentar={komentar}
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

    return {
      props: {
        data: res,
        identitas: identitas,
        message: "",
        komentar: res_komentar,
      },
    };
  } catch (err) {
    return {
      props: {
        data: [],
        identitas: identitas,
        message: err,
        komentar: [],
      },
    };
  }
}
