import api from "../api";

/*
  ! BAGIAN ALERT
*/

// TODO mengirimkan notifikasi kepada user
function sendNotification(pengirim, penerima, subject, keterangans, tautan) {
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

export { sendNotification };
