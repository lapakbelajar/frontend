/**
 * mendengarkan apakah komponen komentar di halaman detail ingin ditampilkan
 * atau tidak jika ya maka reducer akan mengirimkan data berupa visibility
 * yang nilainya true
 */

import { store } from "../../../../../../config/redux/store";

export function listenForShowingComments(succesCb) {
  store.subscribe(() => {
    const state = store.getState();
    if (state.type === "detail_box_komentar") {
      // set posisi komentar jadi left : 0
      succesCb("0%");
    }
  });
}
