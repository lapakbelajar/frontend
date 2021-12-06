import Invoice from "../../../src/pages/privat/invoice";
import api from "../../../src/config/api";

export default function HalamanTagihan({ data }) {
  return <Invoice DataInvoice={data} />;
}

export async function getServerSideProps(ext) {
  try {
    const { id } = ext.params;
    const req = await fetch(`${api.api_endpoint}/privat/invoice/detail/${id}`, {
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
        data: {},
      },
    };
  }
}
