/**
 * Imports
 */


import {changeTheme, verifyTheme} from './darkmode.js';


/**
 * Global variables
 */

const VideoTag = document.getElementById('videoTag');

let constraints = { audio: false, video: { width: 480, height: 320 } }; 

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


/**
* @method hideDivNewVideoInfo
* @description Change class of No Results Div
* @param {}
* @returns {}
*/

const hideDivNewVideoInfo = (() => {
    const hideNewVideoInfo = document.getElementById('newVideoInfo');
    hideNewVideoInfo.classList.remove("newVideoInfo");
    hideNewVideoInfo.classList.add("hidden");
    VideoTag.classList.remove("hidden");
    
    
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


/*  DarkMode  */
verifyTheme();

/*  Listeners  */
changeTheme();


