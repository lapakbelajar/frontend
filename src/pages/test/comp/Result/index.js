function HasilJawaban({ items, jawaban_user }) {
  let teks = "";
  try {
    if (jawaban_user.jawaban_terpilih === "A") {
      teks = items.jawaban_a;
    } else if (jawaban_user.jawaban_terpilih === "B") {
      teks = items.jawaban_b;
    } else if (jawaban_user.jawaban_terpilih === "C") {
      teks = items.jawaban_c;
    } else if (jawaban_user.jawaban_terpilih === "D") {
      teks = items.jawaban_d;
    } else {
      teks = "-";
    }
  } catch (err) {
    //
  }

  return teks;
}

function JawabanBenar({ items }) {
  let teks = "";

  try {
    if (items.jawaban_benar === "A") {
      teks = items.jawaban_a;
    } else if (items.jawaban_benar === "B") {
      teks = items.jawaban_b;
    } else if (items.jawaban_benar === "C") {
      teks = items.jawaban_c;
    } else if (items.jawaban_benar === "D") {
      teks = items.jawaban_d;
    } else {
      teks = "-";
    }
  } catch (err) {
    //
  }

  return teks;
}

module.exports = {
  HasilJawaban,
  JawabanBenar,
};
