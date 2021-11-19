import api from "../../../src/config/api";
import DiskusiTags from "../../../src/pages/diskusi/tags.js";

export default function TagsPage({ data, tags }) {
  return <DiskusiTags DataDiskusi={data} Tags={tags} />;
}

export async function getServerSideProps(ext) {
  const { tags } = ext.params;

  try {
    const req = await fetch(
      `${api.api_endpoint}/forum/ambil/bytags?tags=${tags}`,
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
        tags: tags,
      },
    };
  } catch (err) {
    return {
      props: {
        data: [],
        tags: "",
      },
    };
  }
}
