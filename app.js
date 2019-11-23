var play = document.querySelector("#cx-btn-start");
var pause = document.querySelector("#cx-btn-pause");
var stop = document.querySelector("#cx-btn-stop");

var isRecording = false;
var isPaused = false;

function startButton() {
  startDeviceCapture();

  play.classList.remove("disabled");
  pause.classList.remove("disabled");
  stop.classList.remove("disabled");
}

function pauseButton() {
  if (isRecording === true || isPaused == true) {
    pauseDeviceCapture();
    document.getElementById("cx-btn-start").innerHTML =
      '<div class="icn-start"></div>Reiniciar captura';

    play.classList.remove("disabled");
    pause.classList.remove("disabled");
    stop.classList.remove("disabled");
  }
}

function stopButton() {
  if (isRecording === true || isPaused === true) {
    stopDeviceCapture();
    document.getElementById("cx-btn-start").innerHTML =
      '<div class="icn-start"></div>Iniciar dispositivo de captura';

    play.classList.remove("disabled");
    pause.classList.add("disabled");
    stop.classList.add("disabled");
  }
}

function startDeviceCapture() {
  // este método irá iniciar a captura de vídeo
  updateDeviceCapture(true);
  isRecording = true;
  isPaused = false;
}

function pauseDeviceCapture() {
  // este método irá pausar a captura de vídeo
  updateDeviceCapture(false);
  isRecording = false;
  isPaused = true;
}

function stopDeviceCapture() {
  updateDeviceCapture(0);
  isRecording = false;
  isPaused = false;
}

function updateDeviceCapture(currentState) {
  let constraints = {
    audio: false,
    video: {
      width: 1280,
      height: 720
    }
  };

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function(mediaStream) {
      let video = document.querySelector("video");
      video.srcObject = mediaStream;

      video.onloadedmetadata = function(e) {
        if (currentState === true) {
          video.play();
        } else if (currentState === false) {
          video.pause();
        } else if (currentState === 0) {
          let stream = video.srcObject;
          let tracks = stream.getTracks();

          tracks.forEach(function(track) {
            track.stop();
          });

          video.srcObject = null;
          location.reload();
        }
      };
    })
    .catch(function(err) {
      alert(err.name + ": " + err.message);
    });
}
