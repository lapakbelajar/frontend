import api from "../../../../config/api";
import { store } from "../../../../config/redux/store";

/**
 * fungsi dibawah ini digunakan untuk membuat tag
 * @param {Object} event data object dari suatu event DOM
 * @param {Array} currentState merupakan array dari tag lama
 * @param {Function} callback yang berfungsi untuk mengirimkan data ke state
 * @param {Object} references merupakan refensi suatu DOM
 */
export function parseTag(event, currentState = [], callback, references) {
  const value = event.target.value
    .replace(/[^\w\s]|_/g, "")
    .replace(/\s+/g, " ");

  if (currentState.length <= 5) {
    if (event.key === "Enter" || event.key === " " || event.key === ",") {
      if (value.length > 1) {
        callback([...currentState, value]);
        references.current.value = "";
      }
    }
  }
}

/**
 * Menghapus tag
 * @param {String} currentTag merupakan sebuah tag yang baru saja diiskan user
 * @param {Array} tag merupakan data tag lama yang sudah diisi sebelumnnya
 * @param {Function} callback sebuah fungsi yang akan mengirimkan data ke root component dan client
 */

export function deleteTags(currentTag, oldTag = [], callback) {
  const filtered = oldTag.filter((value, index, arr) => {
    return value !== currentTag;
  });
  callback(filtered);
}

/**
 * Menangani membaca file
 * @param {String} mediaType tipe media contohnya image, document
 * @param {Array} supportedMedia media yang didukung contohnya ["jpg", "jpeg", "png"]
 * @param {Array} files array file dari hasil yang dipilih user
 * @param {Array} oldFiles file lama
 * @param {Function} callback callback untuk mengirimkan data ke root component
 * @param {Array} oldPreview preview gambar sebelumnya ( jika tipe media images maka ini diperlukan tapi jika bukan cukup kirimkan array kosong [] )
 * @param {Function} setImageView sebuah fungsi untuk memasukan preview gambar
 */

export function handleFile(
  mediaType,
  supportedMedia = [],
  files = [],
  oldFiles,
  callback,
  oldPreview,
  setimageView
) {
  // membaca ekstensi media
  if (files.length > 0) {
    const ekstensi = files[0].type.split("/")[1];
    if (supportedMedia.includes(ekstensi)) {
      callback([...oldFiles, files[0]]);
    }

    // jika tipe gambar maka baca gambar tersebut
    if (mediaType === "image") {
      const reader = new FileReader();
      reader.onload = () => {
        setimageView([...oldPreview, reader.result]);
      };
      reader.readAsDataURL(files[0]);
    }
  }
}

/**
 * Fungsi dibawah ini digunakan untuk menghapus gambar
 * @param {Array} allImage semua file gambar
 * @param {Array} allPreview semua preview gambar
 * @param {Number} currentImage index array gambar yang akan dihapus
 * @param {Function} callbackPreview fungsi callback untuk memasukan data preview
 * @param {Function} callbackFiles fungsi callback untuk memasukan data file gambar
 */

export function deleteImage(
  allImage = [],
  allPreview = [],
  currentImage,
  callbackPreview,
  callbackFiles
) {
  const filtered_files = allImage.filter((value, index, arr) => {
    return index !== currentImage;
  });
  const filtered_preview = allPreview.filter((value, index, arr) => {
    return index !== currentImage;
  });
  callbackPreview(filtered_preview);
  callbackFiles(filtered_files);
}

/**
 * Fungsi dibawah ini digunakan untuk menghapus file document
 * @param {Array} allDoc semua file document
 * @param {Number} currentDoc index posisi array data yang akan dihapus
 * @param {Function} callback fungsi yang akan memanipulasi file
 */

export function deleteDocument(allDoc = [], currentDoc, callback) {
  const filtererd = allDoc.filter((value, index, arr) => {
    return index !== currentDoc;
  });
  callback(filtererd);
}

/**
 * Menggabungkan tag dari bebrapa array
 */

function mergeTag(values = []) {
  let result = "";

  values.forEach((items) => {
    if (items !== "") {
      result += `${items.replace(/ /g, "")} `;
    }
  });

  return result;
}

/**
 * Fungsi dibawah ini digunakan untuk mengirimkan data ke server data yang dikirimkan adalah
 * 1. Data pertanyaan
 * 2. Data gambar jika ada
 * 3. Data lampiran dokumen jika ada
 * @param
 */

export async function kirimData(
  pertanyaan,
  jenjang,
  jurusan,
  kelas,
  tags,
  anonim,
  user,
  images,
  documents,
  imagesCallback,
  filesCallback,
  loadingCallback,
  popupPosition
) {
  // cek apakah user login atau tidak
  if (user.login) {
    // data diskusi

    const diskusi = new FormData();
    diskusi.append("pertanyaan", pertanyaan);
    diskusi.append("jenjang", jenjang);
    diskusi.append("jurusan", jurusan);
    diskusi.append("kelas", kelas);
    diskusi.append("tags", mergeTag(tags));
    diskusi.append("anonim", anonim ? 1 : 0);
    diskusi.append("user_id", user.user.id);

    // mengirimkan data pertanyaan
    fetch(`${api.api_endpoint}/forum/baru`, {
      method: "POST",
      headers: {
        authorization: api.authorization,
      },
      body: diskusi,
    })
      .then((res) => {
        return res.json();
      })
      .then(async (final) => {
        // mengirimkan data media ke database

        // mengirimkan gambar
        if (images.length > 0) {
          images.forEach(async (items) => {
            const data_images = new FormData();
            data_images.append("media", items);

            // kirim ke cdn
            const kirim_images = await fetch(`${api.file}/upload.php`, {
              method: "POST",
              body: data_images,
            });
            const res_img = await kirim_images.json();

            // kirim ke server backend
            const cdn_server = new FormData();
            cdn_server.append("nama_file", res_img.filename);
            cdn_server.append("forum_id", final.forum_id);
            cdn_server.append("tipe_media", "image");

            const kirim_img = await fetch(
              `${api.api_endpoint}/forum/catat-file`,
              {
                method: "POST",
                headers: {
                  authorization: api.authorization,
                },
                body: cdn_server,
              }
            );
          });
        }

        // mengirimkan file dokumen
        if (documents.length > 0) {
          documents.forEach(async (items) => {
            const data_images = new FormData();
            data_images.append("media", items);

            // kirim ke cdn
            const kirim_images = await fetch(`${api.file}/upload.php`, {
              method: "POST",
              body: data_images,
            });
            const res_img = await kirim_images.json();

            // kirim ke server backend
            const cdn_server = new FormData();
            cdn_server.append("nama_file", res_img.filename);
            cdn_server.append("forum_id", final.forum_id);
            cdn_server.append("tipe_media", "document");

            const kirim_img = await fetch(
              `${api.api_endpoint}/forum/catat-file`,
              {
                method: "POST",
                headers: {
                  authorization: api.authorization,
                },
                body: cdn_server,
              }
            );
          });
        }
      })
      .then(() => {
        imagesCallback([]);
        filesCallback([]);
        loadingCallback(false);
        popupPosition("-200%");

        // trigger update forum
        store.dispatch({ type: "update_forum" });
      })
      .catch((err) => {
        console.warn(err);
      });
  } else {
    window.location.href = "/login";
  }
}
