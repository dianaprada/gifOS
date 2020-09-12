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
let recorder; 


const init = (() =>{
  const userMediaSupport = () =>
  !!(navigator.mediaDevices.getUserMedia)
  if (typeof MediaRecorder === "undefined" || !userMediaSupport ())
  return alert("Tu navegador web no cumple los requisitos; por favor, utiliza Firefox o Google Chrome");

});


  /**
 * @method _startListener
 * @description: 
 * @returns {}
 */

let _startListener = (() => {
  changeDivNewVideoInfo();
  navigator.mediaDevices.getUserMedia(constraints)
  .then(function(mediaStream) {
    hideDivNewVideoInfo();
    addEventListenerButtonRecord();
    let video = VideoTag;
    video.srcObject = mediaStream;

    video.onloadedmetadata = function(e) {
      video.play();
    };
  })
  .catch((error) => {
    renderMsg(error);
  });
  
});

  /**
 * @method _recordListener
 * @description: 
 * @returns {}
 */

let _recordListener = (() => {
  toogleStylesStartRecording();
  

});


  /**
 * @method _stopRecordingListener
 * @description: Stop recording
 * @returns {}
 */

let  _stopRecordingListener = (() => {
  toogleStylesStopRecording();
  
  VideoTag.srcObject = null;
    
    let blob = recorder.getBlob();
    VideoTag.src = URL.createObjectURL(blob);

    recorder.camera.stop();
    recorder = null;

});

/**
 * Listeners
 */

  /**
 * @method addEventListenerButtonStart
 * @description: Request permission to use camera
 * @returns {}
 */

const addEventListenerButtonStart = (() => {
  buttonStart.addEventListener("click", _startListener, false);
});


  /**
 * @method addEventListenerButtonRecord
 * @description: Start video recording
 * @returns {}
 */

const addEventListenerButtonRecord = (() => {
  buttonRecord.addEventListener("click", _recordListener, false);
});


  /**
 * @method addEventListenerButtonStop
 * @description: Stop video recording
 * @returns {}
 */

const addEventListenerButtonStop = (() => {
  buttonFinish.addEventListener("click", _stopRecordingListener, false);
});



  /**
 * @method addEventListenerRepeatRecording
 * @description: Repeat video recording
 * @returns {}
 */

const addEventListenerRepeatRecording = (() => {
  repeatRecording.addEventListener("click", _startListener, false);
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
  buttonRecord.classList.remove("record__buttons");
  buttonRecord.classList.add("hidden");
  buttonFinish.classList.remove("hidden");
  timer.classList.remove("hidden");
  
});


 /**
* @method toogleStylesStopRecording
* @description change styles when recording stops
* @param {}
* @returns {}
*/

const toogleStylesStopRecording = (() => {
  
  timer.innerHTML=  `<p>REPETIR CAPTURA</p>`;
  timer.classList.add("repeat_capture");
  buttonFinish.classList.add("hidden");
  ButtonUpload.classList.remove("hidden");
  
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
addEventListenerButtonStop();
addEventListenerRepeatRecording();

/*  DarkMode  */
verifyTheme();

/*  Listeners  */
changeTheme();


