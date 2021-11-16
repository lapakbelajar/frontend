/**
 *
 */

import api from "../../../../config/api";

export function getFilteredData(jenjang, jurusan, kelas, successCb, loadingCb) {
  fetch(
    `${api.api_endpoint}/forum/ambil/saring?jenjang=${jenjang}&jurusan=${jurusan}&kelas=${kelas}`,
    {
      headers: {
        authorization: api.authorization,
      },
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((final) => {
      successCb(final);
      loadingCb(false);
    })
    .catch((err) => {
      console.warn(err);
    });
}

/**
 * mengembalikan pengaturan filter ke pengaturan awal
 * yaitu dengan menampilkan data terbaru ke client
 * @param {Function} successCb sebuah fungsi yang menangani event jika kondisi ini sukses
 * @param {Function} loadingCb sebuah fungsi yang akan mengatur tampilan loading | true | false
 */

export function resetData(successCb, loadingCb) {
  fetch(`${api.api_endpoint}/forum/ambil/terbaru?start=0&end=16`, {
    headers: {
      authorization: api.authorization,
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((final) => {
      successCb(final);
      loadingCb(false);
    })
    .catch((err) => {
      console.warn(err);
    });
}
