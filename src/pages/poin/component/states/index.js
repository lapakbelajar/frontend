import { createStore } from "redux";

let initialState = {};

/**
 * Reducer mengatur alur berjalannya satu data
 * @param {*} state
 * @param {*} action
 * @returns
 */
export function reducer(state = initialState, action) {
  switch (action.type) {
    case "penarikan":
      return {
        type: "penarikan",
      };
    case "riwayat":
      return {
        type: "riwayat",
      };
    default:
      return {
        type: "tidak diketahui",
      };
  }
}

/**
 * Store mengatur action data
 */

export const store = createStore(reducer);
