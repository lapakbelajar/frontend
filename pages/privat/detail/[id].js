import Detail from "../../../src/pages/privat/detail";

import { decode as bs64decode } from "js-base64";
import api from "../../../src/config/api";

export default function HalamanDetail({ profile, kelas }) {
  return <Detail ProfileExpert={profile} KelasExpert={kelas} />;
}

export async function getServerSideProps(ext) {
  try {
    const { id } = ext.params;
    const req = await fetch(
      `${api.api_endpoint}/privat/expert/detail/${bs64decode(id)}`,
      {
        headers: {
          authorization: api.authorization,
        },
      }
    );

    const res = await req.json();

    console.log(bs64decode(id));
    return {
      props: {
        profile: res.profile || {},
        kelas: res.kelas || {},
      },
    };
  } catch (err) {
    return {
      props: {
        profile: {},
        kelas: {},
      },
    };
  }
}
