const api = require("../../config/api/");

let Image, Embed, CheckList, List, Paragraph, Header;

if (typeof window !== "undefined") {
  Image = require("@editorjs/image");
  Embed = require("@editorjs/embed");
  CheckList = require("@editorjs/checklist");
  List = require("@editorjs/list");
  Paragraph = require("@editorjs/paragraph");
  Header = require("@editorjs/header");
}

module.exports = {
  image: {
    class: Image,
    config: {
      endpoints: {
        byFile: `${api.file}/editor.php`,
      },
      caption: false,
    },
  },
  embed: {
    class: Embed,
  },
  paragraph: {
    class: Paragraph,
  },
  checklist: {
    class: CheckList,
  },
  list: {
    class: List,
  },
  header: {
    class: Header,
  },
};
