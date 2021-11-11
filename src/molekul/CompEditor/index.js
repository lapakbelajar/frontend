const api = require("../../config/api/");

let Image = "";

if (typeof window !== "undefined") {
  Image = require("@editorjs/image");
}

module.exports = {
  image: {
    class: Image,
    config: {
      endpoints: {
        byFile: `${api.file}/materi/test/upload`,
      },
      caption: false,
    },
  },
};
