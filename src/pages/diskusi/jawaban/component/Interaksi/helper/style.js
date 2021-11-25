/**
 * Menangani popup pengiriman komentar
 * @param {Object} popupRef referensi componen popup
 * @param {Function} setRight function utuk menangani posisi popup
 */

export function handleStyle(popupRef, setRight) {
  window.addEventListener("click", (evt) => {
    if (evt.target === popupRef) {
      setRight("-200%");
    }
  });
}

/**
 * Menangni tinggi component textarea
 */

export function handleTextArea(heightCb, TextCb, text) {
  if (text.length > 0) {
    TextCb(text);
    const lines = text.split("\n");
    if (lines.length % 2 === 0) {
      heightCb(lines.length * 20);
      console.log(lines.length * 20);
    }
  } else {
    heightCb(45);
  }
}
