/**
 * mengirimkan notifikasi
 */

import api from "../../config/api";

export async function kirimNotifikasi(
  pengirim,
  penerima,
  pesan,
  tautan,
  anonim
) {
  try {
    // data yang dibutuhkan server
    const data = new FormData();
    data.append("pengirim_id", pengirim);
    data.append("penerima_id", penerima);
    data.append("pesan", pesan);
    data.append("tautan", tautan);
    data.append("anonim", anonim ? "1" : "0");

    const req = await fetch(`${api.api_endpoint}/notifikasi/create`, {
      method: "POST",
      headers: {
        authorization: api.authorization,
      },
      body: data,
    });

    const res = await req.json();
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  kirimNotifikasi,
};
