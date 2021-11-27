/**
 * Fungsi dibawah ini digunakan untuk mengubah data user yang ada di server
 * setelah diubah token akan di refresh dengan yang baru
 * @param {String} nama nama lengkap pengguna
 * @param {String} sekolah nama sekolah / kampus user
 * @param {Number} id id dari user
 */

import api, { jwt_key } from "../../../config/api";
import jwt from "jsonwebtoken";

export function updateProfile(
  nama,
  sekolah,
  jurusan,
  posisi,
  userid,
  succesCb,
  refreshTokenCb
) {
  // data yang dibutuhkan server
  const data = new FormData();
  data.append("id", userid);
  data.append("nama", nama);
  data.append("sekolah", sekolah);
  data.append("jurusan", jurusan);
  data.append("posisi", posisi);

  // mengirimkan data ke server
  fetch(`${api.api_endpoint}/authentication/update-user`, {
    method: "PUT",
    headers: {
      authorization: api.authorization,
    },
    body: data,
  })
    .then((res) => {
      return res.json();
    })
    .then((final) => {
      if (final.status === 200) {
        succesCb(true);
        // refresh token
        refreshTokenCb(jwt.sign(final.data, jwt_key, { expiresIn: "30 days" }));
      } else {
        succesCb(false);
      }
    })
    .catch((err) => {
      succesCb(false);
    });
}
