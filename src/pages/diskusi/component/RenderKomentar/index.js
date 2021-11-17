import TextComments from "../Komentar/teks";
import ImageComments from "../Komentar/image";

export default function RenderKomentar({ tipe, pesan, user, waktu, anonim }) {
  switch (tipe) {
    case "teks":
      return (
        <TextComments pesan={pesan} user={user} waktu={waktu} anonim={anonim} />
      );
    case "gambar":
      return (
        <ImageComments
          pesan={pesan}
          user={user}
          waktu={waktu}
          anonim={anonim}
        />
      );
    default:
      return "";
  }
}
