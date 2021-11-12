/*
* Didalam helper ini berisi fungsi sebagai berikut
? 1. menangani manipulasi data
? 2. menangani komunikasi antara client dan server
*/

/*
* Fungsi dibawah ini digunakan untuk membaca file dan mengembalikan ke client
1. tipe media -> string -> contoh image, video, document
2. supported_media -> array -> contoh media gambar ["jpg", "png", "jpeg"]
3. files -> file -> file dari input tag html
4. callback -> function -> fungsi untuk mengembalikan data ke client

TODO cara kerja
1. akan mengembalikan file jika sesuai dengan supported_media
2. jika tidak sesuai akan mengembalikan warning
*/

export function readMedia(
  mediaType,
  supported_media = [],
  files = [],
  callback
) {
  // membaca tipe file
  let file_type = files[0].type.split("/")[1];
  let message = {};

  console.log("media type", mediaType);
  console.log("file type", file_type);
  console.log("file", files);
  console.log("supported file", supported_media);

  switch (mediaType) {
    case "image":
      if (supported_media.includes(file_type)) {
        callback(files);
        message = {
          error: false,
          message: `file ${files[0].name} berhasil di filter`,
        };
      } else {
        message = { error: true, message: "File tidak didukung" };
      }
      break;
    case "file":
      if (supported_media.includes(file_type)) {
        callback(files);
        message = {
          error: false,
          message: `file ${files[0].name} berhasil di filter`,
        };
      } else {
        message = { error: true, message: "File tidak didukung" };
      }
      break;
    default:
      message = { error: true, message: "Terjadi kesalahan silahkan ulangi" };
  }

  return message;
}
