/**
 * Imports
 */


import {changeTheme, verifyTheme} from './darkmode.js';


/**
 * Global variables
 */

const newVideoInfoConteiner = document.getElementById('newVideoInfo');
const VideoTag = document.getElementById('videoTag');
const buttonStart = document.getElementById('buttonStart');
const buttonRecord = document.getElementById('buttonRecord');
const buttonFinish = document.getElementById('buttonFinish');
const ButtonUpload = document.getElementById('ButtonUpload');


let constraints = { audio: false, video: { width: 426, height: 240 } }; 



/**
 * Listeners
 */

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
 * @method addEventListenerButtonStart
 * @description: 
 * @returns {}
 */

const addEventListenerButtonStart = (() => {
  buttonStart.addEventListener("click", _startListener, false);
});


/**
 * Show and Hidden
 */

 /**
* @method changeDivNewVideoInfo
* @description Change class of No Results Div
* @param {}
* @returns {}
*/

const changeDivNewVideoInfo = (() => {
  newVideoInfoConteiner.innerHTML=  `<h3 class="record_video__h3" id="record_video__h3">¿Nos das acceso 
                                      <br /> a tu cámara?
                                      <p class="record_video__p" id="record_video__p">El acceso a tu camara será válido sólo
                                      <br />por el tiempo en el que estés creando el GIFO. </p>`;
  buttonStart.classList.remove("record__buttons");
  buttonStart.classList.add("hidden");
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

/*  Listeners  */
addEventListenerButtonStart();

/*  DarkMode  */
verifyTheme();

/*  Listeners  */
changeTheme();


