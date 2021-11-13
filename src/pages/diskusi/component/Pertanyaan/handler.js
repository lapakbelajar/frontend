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
      callback([...currentState, value]);
      references.current.value = "";
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
