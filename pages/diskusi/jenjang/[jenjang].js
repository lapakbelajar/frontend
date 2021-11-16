import DiskusibyJenjang from "../../../src/pages/diskusi/jenjang";
import api from "../../../src/config/api";

export default function ByJenjang({ data, jenjang }) {
  return <DiskusibyJenjang DataDiskusi={data} Jenjang={jenjang} />;
}

export async function getServerSideProps(ext) {
  try {
    const { jenjang } = ext.params;
    const req = await fetch(
      `${api.api_endpoint}/forum/ambil/jenjang?jenjang=${jenjang}&start=0&end=16`,
      {
        headers: {
          authorization: api.authorization,
        },
      }
    );

    const res = await req.json();

    return {
      props: {
        data: res,
        jenjang: jenjang,
      },
    };
  } catch (err) {
    return {
      props: {
        data: [],
        jenjang: "",
      },
    };
  }
}
