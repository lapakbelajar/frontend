import api from "../../../src/config/api";
import Jawaban from "../../../src/pages/diskusi/jawaban";

export default function HalamanJawaban({ data, identitas }) {
  return <Jawaban Data={data} IdentitasJawaban={identitas} />;
}
export async function getServerSideProps(ext) {
  const { identitas } = ext.params;
  try {
    const req = await fetch(`${api.api_endpoint}/jawaban/detail/${identitas}`, {
      headers: {
        authorization: api.authorization,
      },
    });
    const res = await req.json();

    return {
      props: {
        data: res,
        identitas: identitas,
      },
    };
  } catch (err) {
    return {
      props: {
        data: {},
        identitas: identitas,
      },
    };
  }
}
