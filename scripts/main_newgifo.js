/**
 * Imports
 */

import {changeTheme, verifyTheme} from './darkmode.js';


/**
 * Declaration of DOM elements
 */

 const newVideoInfoConteiner = document.getElementById('newVideoInfo');

const VideoTag = document.getElementById('videoTag');

const buttonStart = document.getElementById('buttonStart');
const buttonRecord = document.getElementById('buttonRecord');
const buttonFinish = document.getElementById('buttonFinish');
const ButtonUpload = document.getElementById('ButtonUpload');

const recordStep1 = document.getElementById('recordStep1');
const recordStep2 = document.getElementById('recordStep2');
const recordStep3 = document.getElementById('recordStep2');

const timer = document.getElementById('timer');
const repeatRecording = document.getElementById('repeatRecording');


/**
 * Global variables
 */

let constraints = { audio: false, video: { width: 426, height: 240 } }; 
let startTime, mediaRecorder, IdInterval;
let recorder; 
let streamCamera; //Object that contain camera
const imageGif = document.getElementById('previewGif');



const init = (() =>{
  const userMediaSupport = () =>
  !!(navigator.mediaDevices.getUserMedia)
  if (typeof MediaRecorder === "undefined" || !userMediaSupport ())
  return alert("Tu navegador web no cumple los requisitos; por favor, utiliza Firefox o Google Chrome");

});


  /**
 * @method getStreamAndRecord
 * @description: 
 * @returns {}
 */

let getStreamAndRecord = (() => {
  navigator.mediaDevices.getUserMedia(constraints)
  .then(function(mediaStream) {
    hideDivNewVideoInfo();
    let video = VideoTag;
    streamCamera = mediaStream;
    video.srcObject = streamCamera;
    video.onloadedmetadata = function(e) {
      video.play();
    };
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
    onGifRecordingStarted: function() {
      console.log('Gif recording started.');
    },

    onGifPreview: function(gifURL) {
        VideoTag.src = gifURL;
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

let  _stopRecordingListener = (() => {
  toogleStylesStopRecording();
  stopCounting();

  VideoTag.srcObject = null;
  recorder.camera.stop();
  let blob = recorder.getBlob();
  imageGif.src = URL.createObjectURL(blob);
  VideoTag.classList.add("hidden");
  imageGif.classList.remove("hidden");
  recorder = null;

});

  /**
 * @method _startListener
 * @description: 
 * @returns {}
 */

let _startRepeatCapture = (() => {
  changeDivNewVideoInfo();
  toogleStylesRepeatCapture();
  getStreamAndRecord();
  
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

const stopCounting  = (() => {
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
  newVideoInfoConteiner.innerHTML=  `<h3 class="record_video__h3" id="record_video__h3">¿Nos das acceso 
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
  ButtonUpload.classList.remove("hidden");
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
  ButtonUpload.classList.add("hidden");
  repeatRecording.classList.add("hidden");
  newVideoInfoConteiner.classList.remove("hidden");
  newVideoInfoConteiner.innerHTML=  `<h3 class="record_video__h3" id="record_video__h3">¿Nos das acceso 
                                      <br /> a tu cámara?
                                      <p class="record_video__p" id="record_video__p">El acceso a tu camara será válido sólo
                                      <br />por el tiempo en el que estés creando el GIFO. </p>`;
});


/**
 * Error Messages
*/

 /**
 * @method renderMsg
 * @description Render message on the DOM  revizar
 * @returns {String}
 */

const renderMsg = ((msg) => document.querySelector('.gifos-msg').innerHTML = msg );



/**
 * Run
*/

init();

/*  Listeners  */
addEventListenerButtonStart();
addEventListenerButtonRecord();
addEventListenerButtonStop();
addEventListenerRepeatRecording();

/*  DarkMode  */
verifyTheme();

/*  Listeners  */
changeTheme();


