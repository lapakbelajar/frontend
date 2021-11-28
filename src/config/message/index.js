import api from "../api";

/*
  ! BAGIAN ALERT
*/

// TODO mengirimkan notifikasi kepada user
export function sendNotification(
  pengirim,
  penerima,
  subject,
  keterangans,
  tautan
) {
  const data = new FormData();
  data.append("pengirim_id", pengirim);
  data.append("penerima_id", penerima);
  data.append("subjek", subject);
  data.append("keterangan", keterangans);
  data.append("tautan", tautan);

  fetch(`${api.api_endpoint}/notifikasi/kirim`, {
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
    })
    .catch((err) => {
      console.warn(err);
    });
}

/**
 * Mengirimkan email kepada user
 * @param {String} subjek judul pesan
 * @param {String} user_id id user penerima
 * @param {String} tujuan email user
 * @param {String} pesan isi pesan
 */

export async function kirimEmail(user_id, subject, pesan) {
  try {
    const data = new FormData();
    data.append("subjek", subject);
    data.append("pesan", pesan);
    data.append("user_id", user_id);

    const req = await fetch(`${api.api_endpoint}/messaging/email`, {
      method: "POST",
      headers: {
        authorization: api.authorization,
      },
      body: data,
    });

    const res = await req.json();
  } catch (err) {
    console.warn(err);
  }
}
