/**
 * Imports
 */

import {getTrendingGif, EventListener_Slideshow} from './trending.js';
import {addEventCloseModal} from './modal.js';

/**
 * Global variables
 */


const divElementContainerCards = document.querySelector('.slideshow__cards');

/* Modal Popup */
const closeButton = document.getElementById("close-button");



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

getTrendingGif (divElementContainerCards);

//Listeners
EventListener_Slideshow(divElementContainerCards);
addEventCloseModal(closeButton);