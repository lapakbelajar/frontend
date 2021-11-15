import api from "../../src/config/api";
import { Diskusi } from "../../src/pages";

export default function DiskusiPage({ data }) {
  return <Diskusi DataDiskusi={data} />;
}

export async function getServerSideProps() {
  try {
    const req = await fetch(
      `${api.api_endpoint}/forum/ambil/terbaru?start=0&end=16`,
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
      },
    };
  } catch (err) {
    return {
      props: {
        data: [],
      },
    };
  }
}
