import DiskusibyJenjang from "../../../src/pages/diskusi/jenjang";
import api from "../../../src/config/api";

export default function ByJenjang({ data, jurusan }) {
  return <DiskusibyJenjang DataDiskusi={data} Jenjang={jurusan} />;
}

export async function getServerSideProps(ext) {
  try {
    const { jurusan } = ext.params;
    const req = await fetch(
      `${api.api_endpoint}/forum/ambil/jurusan?jurusan=${jurusan}&start=0&end=16`,
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
        jurusan: jurusan,
      },
    };
  } catch (err) {
    return {
      props: {
        data: [],
        jurusan: "",
      },
    };
  }
}
