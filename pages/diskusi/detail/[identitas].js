import api from "../../../src/config/api";
import { Detail } from "../../../src/pages";

export default function DetailDiskusi({ data, identitas, message }) {
  return <Detail Data={data} Identitas={identitas} Message={message} />;
}

export async function getServerSideProps(ext) {
  try {
    const { identitas } = ext.params;
    const req = await fetch(
      `${api.api_endpoint}/forum/ambil/detail/${identitas}`,
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
        identitas: identitas,
        message: "",
      },
    };
  } catch (err) {
    return {
      props: {
        data: [],
        identitas: identitas,
        message: err,
      },
    };
  }
}
