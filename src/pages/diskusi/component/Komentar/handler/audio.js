let duration, recorder;

/**
 * Merakam audio
 * @param {Number} currentSecond
 * @param {Number} currentMinutes
 * @param {Function} secondCb
 * @param {Function} minutesCb
 */
export function startRecording(
  currentSecond,
  currentMinutes,
  secondCb,
  minutesCb
) {
  let no = 0;
  let menit = 0;
  let detik = 0;
  let jam = 0;
  duration = setInterval(() => {
    // memulai merekam
    recordAudio();
    no += 1;
    jam = Math.floor(no / 3600);
    menit = Math.floor((no - jam * 3600) / 60);
    detik = no - (jam * 3600 + menit * 60);
    secondCb(detik);
    minutesCb(menit);
  }, 1000);
}

/**
 * Menghentikan perekaman audio
 */
export function stopRecording() {
  clearInterval(duration);
  recorder.stop();
}

/**
 * Melakukan pengambilan data audio dari user jika diizinkan
 */
function recordAudio() {
  navigator.mediaDevices
    .getUserMedia({ audio: true, video: false })
    .then((stream) => {
      recorder = new MediaRecorder(stream);
      recorder.start();

      const audioChunks = [];

      recorder.addEventListener("dataavailable", (evt) => {
        audioChunks.push(evt.data);
      });

      recorder.addEventListener("stop", () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/vnd.wav" });

        // post data audio ke server
        const data = new FormData();
        data.append("audio", audioBlob);

        const audio = new Audio();
        audio.setAttribute("src", URL.createObjectURL(audioBlob));
        audio.play();
      });
    });
}
