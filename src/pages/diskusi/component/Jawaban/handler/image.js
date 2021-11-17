/**
 * Mengirimkan file ke server dan mengirimkan komentar ke backend
 */

import api from "../../../../../config/api";

export async function kirimGambar(
  mediaType,
  gambar = [],
  gambarCb,
  submitCb,
  anonim,
  userId,
  forumIdentitas,
  positionCb
) {
  if (gambar.length > 0 && userId !== 0) {
    submitCb(true);

    // mengirimkan file ke cdn
    const cdn = new FormData();
    cdn.append("media", gambar[0]);

    const req = await fetch(`${api.file}/upload.php`, {
      method: "POST",
      body: cdn,
    });
    const res = await req.json();

    // mengirimkan data ke backend
    if (res.status === 200) {
      const data = new FormData();
      data.append("forum_identitas", forumIdentitas);
      data.append("user_id", userId);
      data.append("tipe", mediaType);
      data.append("anonim", anonim ? "1" : "0");
      data.append("pesan", res.filename);

      fetch(`${api.api_endpoint}/forum/komentar/create`, {
        method: "POST",
        headers: {
          authorization: api.authorization,
        },
        body: data,
      })
        .then((response) => {
          return response.json();
        })
        .then((final) => {
          console.log(final);
        })
        .then(() => {
          gambarCb([]);
          submitCb(false);
          positionCb("-200%");
        })
        .catch((err) => {
          console.warn(err);
        });
    }
  }
}
