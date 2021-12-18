import { createStore } from "redux";

const initialValue = {};

function reducer(state = initialValue, action) {
  switch (action.type) {
    case "show_sidebar":
      return {
        type: "show_sidebar",
        left: "-200%",
      };
    case "close_popup":
      return {
        type: "close_popup",
      };
    case "show_class":
      return {
        type: "show_class",
      };
    case "filter_privat":
      return {
        type: "filter_privat",
      };
    case "show_filter_privat":
      return {
        type: "show_filter_privat",
      };
    default:
      return {};
  }
}

const store = createStore(reducer);
module.exports = store;
