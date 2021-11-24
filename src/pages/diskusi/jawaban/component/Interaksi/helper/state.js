/**
 * mendengarkan apakah komponen komentar di halaman detail ingin ditampilkan
 * atau tidak jika ya maka reducer akan mengirimkan data berupa visibility
 * yang nilainya true
 */

import { store } from "../../../../../../config/redux/store";

export function listenForShowingComments(succesCb) {
  store.subscribe(() => {
    const state = store.getState();
    if (state.type === "detail_box_komentar") {
      // set posisi komentar jadi left : 0
      succesCb("0%");
    }
  });
}

/**
 * Mengangni authentikasi user
 * @param {String} token jsonwebtoken token
 */
import jwt from "jsonwebtoken";
import api, { jwt_key } from "../../../../../../config/api";

export function authentication(token) {
  let login = false;
  let user = {};
  jwt.verify(token, jwt_key, (err, decoded) => {
    if (!err) {
      user = decoded;
      login = true;
    } else {
      login = false;
    }
  });

  return user;
}

/**
 * Menangani pengiriman data komentar
 * @param {String} komentar data komentar yang diketik oleh user
 * @param {String} identitasJawaban identitas ( kode unik ) dari komentar
 * @param {Integer} userId id dari user yang ingin mengirimkan komentar
 */

export async function kirimKomentar(
  komentar,
  identitasJawaban,
  userId,
  anonim,
  currentData,
  dataCb
) {
  try {
    // data yang dibutuhkan
    const data = new FormData();
    data.append("jawaban_identitas", identitasJawaban);
    data.append("user_id", userId);
    data.append("komentar", komentar);
    data.append("anonim", anonim ? "1" : "0");

    // mengirimkan data
    const req = await fetch(`${api.api_endpoint}/jawaban/komentar/create`, {
      method: "POST",
      headers: {
        authorization: api.authorization,
      },
      body: data,
    });

    const res = await req.json();

    // mendapatkan data terbaru
    updateKomentar(res.id, currentData, dataCb);
  } catch (err) {
    console.warn(err);
  }
}

/**
 * mendapatkan komentar terakhir untuk update state list komentar
 * @param {Integer} id komentar id yang barusaja terkirim
 */

async function updateKomentar(id, currentData, dataCallback) {
  try {
    const req = await fetch(
      `${api.api_endpoint}/jawaban/komentar/terakhir?id=${id}`,
      {
        headers: {
          authorization: api.authorization,
        },
      }
    );
    const res = await req.json();

    // update ke state client
    dataCallback([res, ...currentData]);

    console.log(res);
  } catch (err) {
    //
  }
}

/**
 * Fungsi dibawah ini digunakan untuk update data komentar
 */

export async function getMore(
  jawaban_identitas,
  start,
  end,
  cbStart,
  cbEnd,
  loadngCb,
  currentData,
  dataCb
) {
  try {
    const req = await fetch(
      `${api.api_endpoint}/jawaban/komentar/terbaru?start=${start}&end=${end}&jawaban_identitas=${jawaban_identitas}`,
      {
        headers: {
          authorization: api.authorization,
        },
      }
    );

    const res = await req.json();
    cbStart(start + 15);
    cbEnd(end + 15);
    loadngCb(false);

    const data_baru = currentData.concat(res);
    dataCb(data_baru);
  } catch (err) {
    //
  }
}
