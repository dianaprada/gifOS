/**
 * Imports
 */

import { changeTheme, verifyTheme } from './darkmode.js';
import api from './services.js';
import {api_key, uploadGifoURL} from './global_variables.js';
import {addGifLocalStorage, getAllGifLocalStorage, existGifIDLocalStorage} from './new_gifo_localstorage.js';

/**
 * Declaration of DOM elements
 */

const newVideoInfoConteiner = document.getElementById('newVideoInfo');

const VideoTag = document.getElementById('videoTag');

const buttonStart = document.getElementById('buttonStart');
const buttonRecord = document.getElementById('buttonRecord');
const buttonFinish = document.getElementById('buttonFinish');
const buttonUpload = document.getElementById('buttonUpload');

const recordStep1 = document.getElementById('recordStep1');
const recordStep2 = document.getElementById('recordStep2');
const recordStep3 = document.getElementById('recordStep3');

const timer = document.getElementById('timer');
const repeatRecording = document.getElementById('repeatRecording');

/* Uploading and upoaded Gifo Styles */
const showPreviewGifoHover = document.getElementById('previewGifoHover');
const showPreviewGifoButtons = document.getElementById('buttonsPreviewGifo');
const showGifoUploading = document.getElementById('gifoUploading');
const showGifoUploaded = document.getElementById('gifoUploaded');


/**
 * Global variables
 */

let constraints = { audio: false, video: { width: 426, height: 240 } };
let startTime, IdInterval;
let recorder;
let form;
let streamCamera; //Object that contain camera
const imageGif = document.getElementById('previewGif');




const init = (() => {
  const userMediaSupport = () =>
    !!(navigator.mediaDevices.getUserMedia)
  if (typeof MediaRecorder === "undefined" || !userMediaSupport())
    return alert("Tu navegador web no cumple los requisitos; por favor, utiliza Firefox o Google Chrome");

});


/**
* @method getStreamAndRecord
* @description: 
* @returns {}
*/

let getStreamAndRecord = (() => {
  navigator.mediaDevices.getUserMedia(constraints)
    .then(function (mediaStream) {
      hideDivNewVideoInfo();
      let video = VideoTag;
      streamCamera = mediaStream;
      video.srcObject = streamCamera;
      video.play();
      // video.onloadedmetadata = function (e) {
      //   video.play();
      // };
    })
    .catch((error) => {
      renderMsg(error);
    });

});

/**
* @method _startListener
* @description: 
* @returns {}
*/

let _startListener = (() => {
  changeDivNewVideoInfo();
  getStreamAndRecord();

});


/**
* @method _recordListener
* @description: 
* @returns {}
*/

let _recordListener = (() => {
  toogleStylesStartRecording();
  startCounting();
  recorder = RecordRTC(streamCamera, {
    type: 'gif',
    frameRate: 1,
    quality: 10,
    width: 360,
    hidden: 240,
    onGifRecordingStarted: function () {
      console.log('Gif recording started.');
    }
  });

  recorder.startRecording();

  // release camera on stopRecording
  recorder.camera = streamCamera;

});

/**
* @method _stopRecordingListener
* @description: Stop recording
* @returns {}
*/

let _stopRecordingListener = (() => {
  toogleStylesStopRecording();
  stopCounting();

  VideoTag.srcObject = null;
  recorder.camera.stop();
  let blob = recorder.getBlob();
  imageGif.src = URL.createObjectURL(blob);
  VideoTag.classList.add("hidden");
  imageGif.classList.remove("hidden");
  recorder = null;

  form = new FormData();
  form.append('file', blob, 'myGif.gif');
  console.log(form.get('file'));


});

/**
* @method _startRepeatCapture
* @description: 
* @returns {}
*/

let _startRepeatCapture = (() => {
  changeDivNewVideoInfo();
  toogleStylesRepeatCapture();
  getStreamAndRecord();

});




/**
 * @method getTrendingGif
 * @description LLamado a la función
 * @param {}
 * @returns {}
 */

const uploadGifo = (() => {
  const { uploadGifoData } = api;
  uploadGifoData(uploadGifoURL, api_key, form)
  .then((response) => {
    console.log(response.data.id);
    addGifLocalStorage(response.data.id);
    toogleStylesUploadedGifo();
  }).catch((error) => {
    renderMsg(error);
  });
});


/**
* @method _uploadGifoListener
* @description: 
* @returns {}
*/

let _uploadGifoListener = (() => {
  toogleStylesUploadingGifo();
  uploadGifo();
  

});


/**
 * Timer
 */

/**
* @method secondsToTime
* @description: Convert seconds to time format in hours
* @returns {}
*/

const secondsToTime = ((numberOfSeconds) => {
  let hours = Math.floor(numberOfSeconds / 60 / 60);
  numberOfSeconds -= hours * 60 * 60;
  let minutes = Math.floor(numberOfSeconds / 60);
  numberOfSeconds -= minutes * 60;
  numberOfSeconds = parseInt(numberOfSeconds);
  if (hours < 10) hours = "0" + hours;
  if (minutes < 10) minutes = "0" + minutes;
  if (numberOfSeconds < 10) numberOfSeconds = "0" + numberOfSeconds;

  return `${hours}:${minutes}:${numberOfSeconds}`;
});


/**
* @method refreshTimer
* @description: Refresh Timer
* @returns {}
*/
const refreshTimer = (() => {
  timer.textContent = secondsToTime((Date.now() - startTime) / 1000);
});

/**
* @method startCounting 
* @description: start timer
* @returns {}
*/

// Ayudante para la duración; no ayuda en nada pero muestra algo informativo
const startCounting = (() => {
  startTime = Date.now();
  IdInterval = setInterval(refreshTimer, 500);
});

/**
* @method stopCounting 
* @description: stop timer
* @returns {}
*/

const stopCounting = (() => {
  clearInterval(IdInterval);
  startTime = null;
  timer.textContent = "";
});


/**
 * Listeners
 */

/**
* @method addEventListenerButtonStart
* @description: Event listener button "Comenzar"
* @returns {}
*/

const addEventListenerButtonStart = (() => {
  buttonStart.addEventListener("click", _startListener, false);
});


/**
* @method addEventListenerButtonRecord
* @description: Event listener button "Grabar"
* @returns {}
*/

const addEventListenerButtonRecord = (() => {
  buttonRecord.addEventListener("click", _recordListener, false);
});


/**
* @method addEventListenerButtonStop
* @description: Event listener button "Finalizar"
* @returns {}
*/

const addEventListenerButtonStop = (() => {
  buttonFinish.addEventListener("click", (() => {
    recorder.stopRecording(_stopRecordingListener);

  }), false);

});


/**
* @method addEventListenerRepeatRecording
* @description: Event listener button "Repetir Captura"
* @returns {}
*/

const addEventListenerRepeatRecording = (() => {
  repeatRecording.addEventListener("click", _startRepeatCapture, false);
});


/**
* @method addEventListenerUploadGifo
* @description: Event listener button "Subir Gifo"
* @returns {}
*/

const addEventListenerUploadGifo = (() => {
  buttonUpload.addEventListener("click", _uploadGifoListener, false);
});


/**
 * Show and Hidden
 */

/**
* @method changeDivNewVideoInfo
* @description Change class of New Video Div
* @param {}
* @returns {}
*/

const changeDivNewVideoInfo = (() => {
  console.log('llamado changeDivNewVideoInfo ');
  newVideoInfoConteiner.innerHTML = `<h3 class="record_video__h3" id="record_video__h3">¿Nos das acceso 
                                      <br /> a tu cámara?
                                      <p class="record_video__p" id="record_video__p">El acceso a tu camara será válido sólo
                                      <br />por el tiempo en el que estés creando el GIFO. </p>`;
  buttonStart.classList.remove("record__buttons");
  buttonStart.classList.add("hidden");
  recordStep1.classList.add("record_steps__hover");
});



/**
* @method hideDivNewVideoInfo
* @description Change class of No Results Div
* @param {}
* @returns {}
*/

const hideDivNewVideoInfo = (() => {
  newVideoInfoConteiner.classList.remove("newVideoInfo");
  newVideoInfoConteiner.classList.add("hidden");
  VideoTag.classList.remove("hidden");
  buttonRecord.classList.remove("hidden");
  recordStep1.classList.remove("record_steps__hover");
  recordStep2.classList.add("record_steps__hover");

});


/**
* @method toogleStylesStartRecording
* @description Change styles when recording starts
* @param {}
* @returns {}
*/

const toogleStylesStartRecording = (() => {
  buttonRecord.classList.add("hidden");
  buttonFinish.classList.remove("hidden");
  repeatRecording.classList.add("hidden");
  timer.classList.remove("hidden");

});


/**
* @method toogleStylesStopRecording
* @description change styles when recording stops
* @param {}
* @returns {}
*/

const toogleStylesStopRecording = (() => {

  timer.classList.add("hidden");
  buttonFinish.classList.add("hidden");
  buttonUpload.classList.remove("hidden");
  repeatRecording.classList.remove("hidden");
  repeatRecording.classList.add("repeat_capture");


});

/**
* @method toogleStylesRepeatCapture
* @description: 
* @returns {}
*/

const toogleStylesRepeatCapture = (() => {
  recordStep2.classList.remove("record_steps__hover");
  imageGif.classList.add("hidden");
  buttonUpload.classList.add("hidden");
  repeatRecording.classList.add("hidden");
  newVideoInfoConteiner.classList.remove("hidden");
  newVideoInfoConteiner.innerHTML = `<h3 class="record_video__h3" id="record_video__h3">¿Nos das acceso 
                                      <br /> a tu cámara?
                                      <p class="record_video__p" id="record_video__p">El acceso a tu camara será válido sólo
                                      <br />por el tiempo en el que estés creando el GIFO. </p>`;
});




/**
* @method toogleStylesUploadingGifo
* @description: 
* @returns {}
*/

const toogleStylesUploadingGifo = (() => {
  recordStep2.classList.remove("record_steps__hover");
  recordStep3.classList.add("record_steps__hover");
  showPreviewGifoHover.classList.remove("hidden");
  showPreviewGifoHover.classList.add("preview_gifo__hover");
  showGifoUploading.classList.remove("hidden");
  showGifoUploading.classList.add("preview_gifo__uploading");
  repeatRecording.classList.add("hidden");
  buttonUpload.classList.add("hidden");

});


/**
* @method toogleStylesUploadedGifo
* @description: 
* @returns {}
*/


const toogleStylesUploadedGifo = (() => {
  showGifoUploading.classList.add("hidden");
  showGifoUploading.classList.remove("preview_gifo__uploading");

  showPreviewGifoButtons.classList.remove("hidden");
  showPreviewGifoButtons.classList.add("preview_gifo__buttons");

  showGifoUploaded.classList.remove("hidden");
  showGifoUploaded.classList.add("preview_gifo__uploading");

 

});



/**
 * Error Messages
*/

/**
* @method renderMsg
* @description Render message on the DOM  revizar
* @returns {String}
*/

const renderMsg = ((msg) => document.querySelector('.gifos-msg').innerHTML = msg);



/**
 * Run
*/

init();

/*  Listeners  */
addEventListenerButtonStart();
addEventListenerButtonRecord();
addEventListenerButtonStop();
addEventListenerRepeatRecording();
addEventListenerUploadGifo();

/*  DarkMode  */
verifyTheme();

/*  Listeners  */
changeTheme();


