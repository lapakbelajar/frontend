import api from "../../../src/config/api";
import Kelas from "../../../src/pages/privat/kelas";

export default function HalamanKelas({ kelas, jadwal }) {
  return <Kelas KelasDetail={kelas} JadwalKelas={jadwal} />;
}

export async function getServerSideProps(ext) {
  try {
    const { id } = ext.params;
    const req = await fetch(`${api.api_endpoint}/privat/kelas/detail/${id}`, {
      headers: {
        authorization: api.authorization,
      },
    });

    const res = await req.json();

    return {
      props: {
        kelas: res.kelas,
        jadwal: res.jadwal,
      },
    };
  } catch (err) {
    return {
      props: {
        kelas: {},
        jadwal: [],
      },
    };
  }
}
