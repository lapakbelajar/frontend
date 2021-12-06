import api from "../../../src/config/api";
import JadwalKelas from "../../../src/pages/privat/jadwal";

export default function JadwalPertemuan({ id }) {
  return <JadwalKelas IdKelas={id} />;
}

export async function getServerSideProps(ext) {
  const { id } = ext.params;

  return {
    props: {
      id: id,
    },
  };
}
