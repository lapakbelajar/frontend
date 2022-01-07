import KursusUpdate from "../../../src/pages/privat/expert/update";
import api from "../../../src/config/api";

export default function UpdateKelas({ data }) {
  return <KursusUpdate DataPrivat={data} />;
}

export async function getServerSideProps(ext) {
  try {
    const { identitas } = ext.params;
    const req = await fetch(
      `${api.api_endpoint}/privat/kelas/detail/${identitas}`,
      {
        headers: {
          authorization: api.authorization,
        },
      }
    );
    const res = await req.json();

    return {
      props: {
        data: res || {},
      },
    };
  } catch (err) {
    return {
      props: {
        data: {},
      },
    };
  }
}
