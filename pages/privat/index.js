import api from "../../src/config/api";
import Privat from "../../src/pages/privat";

export default function HalamanPrivat({ data }) {
  return <Privat DataExpert={data} />;
}

export async function getServerSideProps() {
  try {
    const req = await fetch(`${api.api_endpoint}/privat/expert/0/15`, {
      headers: {
        authorization: api.authorization,
      },
    });

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
