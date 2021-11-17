/**
 * mengirimkan pesan teks ke server
 *
 */

import api from "../../../../../config/api";
import { store } from "../../../../../config/redux/store";

export function sendText(text, forum_identitas, user_id, submitCb) {
  if (user_id !== 0) {
    if (text.length > 0) {
      submitCb(true);
      const data = new FormData();
      data.append("forum_identitas", forum_identitas);
      data.append("user_id", user_id);
      data.append("anonim", "0");
      data.append("tipe", "teks");
      data.append("pesan", text);

      fetch(`${api.api_endpoint}/forum/komentar/create`, {
        method: "POST",
        headers: {
          authorization: api.authorization,
        },
        body: data,
      })
        .then((res) => {
          return res.json();
        })
        .then((final) => {
          console.log(final);
          // mengirimkan data ke client bahwa ada perbahan data
          store.dispatch({
            type: "update_comments",
            payload: { forum_id: final.id },
          });
        })
        .then(() => {
          submitCb(false);
        })
        .catch((err) => {
          console.warn(err);
        });
    }
  } else {
    window.location.href = "/login";
  }
}
/**
 * Fungsi dibawah ini digunakan untuk mengupdate data komentar
 * dengan yang baru dikirim
 */

export async function updateComments(id, currentComments = [], cmCb) {
  const req = await fetch(`${api.api_endpoint}/forum/komentar/latest/${id}`, {
    headers: {
      authorization: api.authorization,
    },
  });

  const res = await req.json();

  // update data
  const new_data = currentComments;

  // menghindari duplikat data
  const filtered = new_data.filter((items) => {
    return items.id !== res.id;
  });

  //
  filtered.unshift(res);

  cmCb(filtered);
}
