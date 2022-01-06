import DiskusibyMatpel from "../../../src/pages/diskusi/matpel";
import api from "../../../src/config/api";

export default function ByJenjang({ data, matpel }) {
  return <DiskusibyMatpel DataDiskusi={data} Matpel={matpel} />;
}

export async function getServerSideProps(ext) {
  try {
    const { matpel } = ext.params;
    const req = await fetch(
      `${api.api_endpoint}/forum/ambil/bymatpel/${matpel}`,
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
        matpel: matpel,
      },
    };
  } catch (err) {
    return {
      props: {
        data: [],
        matpel: "",
      },
    };
  }
}
