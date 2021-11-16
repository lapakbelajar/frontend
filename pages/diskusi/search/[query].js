import api from "../../../src/config/api";
import DiskusibyQuery from "../../../src/pages/diskusi/search";

export default function ByQuery({ data, query }) {
  return <DiskusibyQuery DataDiskusi={data} Query={query} />;
}

export async function getServerSideProps(ext) {
  try {
    const { query } = ext.params;
    const req = await fetch(
      `${api.api_endpoint}/forum/ambil/search?query=${query}&start=0&end=16`,
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
        query: query,
      },
    };
  } catch (err) {
    return {
      props: {
        data: [],
        query: "",
      },
    };
  }
}
