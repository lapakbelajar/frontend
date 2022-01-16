import Register from "../../../src/pages/privat/custom/register";
import { decode } from "js-base64";

export default function HalamanPendaftaran({ tutorId }) {
  return <Register TutorId={tutorId} />;
}

export async function getServerSideProps(ext) {
  try {
    const { tutor } = ext.query;
    return {
      props: {
        tutorId: decode(tutor),
      },
    };
  } catch (err) {
    return {
      props: {
        tutorId: 0,
      },
    };
  }
}
