/**
 * mengirimkan pesan teks ke server
 *
 */
 
import api from "../../../../../config/api";
import { store } from "../../../../../config/redux/store";
import { kirimNotifikasi } from "../../../../../molekul/notifikasi";


/**
 * Mengecek apakah komentar yang dikirimkan user
 * termasuk komentar kasar atau bukan
 * @param {string} text -> komentar yang diketik oleh user
 */

async function isAbusive(text, showAlert, setAlertMessage){
  
  // mengirim data ke server
  const req = await fetch(`${process.env.ML_URL}/predict`, {
    method: 'POST',
    body: JSON.stringify({
      "komentar": text
    })
  })

  // mengubah response server menjadi data json
  const response = await req.json()

  if(req.status !== 200){
    showAlert(true)
    setAlertMessage(response.pesan)
  }
}

/**
 * 
 * @param {*} text 
 * @param {*} forum_identitas 
 * @param {*} user_id 
 * @param {*} submitCb 
 */
export async function sendText(text, forum_identitas, user_id, submitCb, showAlert, setAlertMessage) {

  // memprediksi jenis teks
  // isAbusive(text, showAlert, setAlertMessage)

  // menyimpan data
  if (user_id !== 0) {
    if (text.length > 0) {
      submitCb(true);
      const data = new FormData();
      data.append("forum_identitas", forum_identitas);
      data.append("user_id", user_id);
      data.append("anonim", "0");
      data.append("tipe", "teks");
      data.append("pesan", text);

      const req_filter = await fetch(`${process.env.ML_URL}/predict`, {
        method: 'POST',
        body: JSON.stringify({
          "komentar": text
        })
      })
    
      // mengubah response server menjadi data json
      const response_filter = await req_filter.json()
    
      if(req_filter.status !== 200){

        showAlert(true)
        setAlertMessage(response_filter.pesan)
        data.append("kasar", "kasar")

      }else{

        data.append("kasar", "tidak kasar")

      }

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
        .then(async (final) => {
          // mengirimkan data ke client bahwa ada perbahan data
          store.dispatch({
            type: "update_comments",
            payload: { forum_id: final.id },
          });

          // mengirimkan notifikasi
          const detail_komentar = await fetch(
            `${api.api_endpoint}/forum/ambil/detail/${forum_identitas}`,
            {
              headers: {
                authorization: api.authorization,
              },
            }
          );

          return detail_komentar.json();
        })
        .then((detail) => {
          const forum = detail[0].forum;
          // kirim notifikasi
          kirimNotifikasi(
            user_id,
            forum.user.id,
            `Memberikan komentar di ${forum.pertanyaan.slice(0, 15)}...`,
            `${window.location.origin}/diskusi/detail/${forum_identitas}`,
            false
          );
          //
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

export async function updateComments(
  id,
  currentComments = [],
  cmCb,
  forum_identitas
) {
  const req = await fetch(`${api.api_endpoint}/forum/komentar/latest/${id}`, {
    headers: {
      authorization: api.authorization,
    },
  });

  const res = await req.json();
  const komentar_baru = currentComments;
  komentar_baru.push(res);
  console.log(komentar_baru);
  cmCb([res, ...currentComments]);
}
