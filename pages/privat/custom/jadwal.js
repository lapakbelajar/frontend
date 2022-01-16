import JadwalKelas from "../../../src/pages/privat/custom/jadwal";

export default function JadwalCustom({ kelas }) {
  return <JadwalKelas KelasId={kelas} />;
}

export async function getServerSideProps(ext) {
  return {
    props: {
      kelas: ext.query.kelas,
    },
  };
}
