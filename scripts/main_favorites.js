/**
 * Imports
 */

import {getTrendingGif, EventListener_Slideshow} from './trending.js';
import {addEventCloseModal} from './modal.js';
import {loadFavorites, addEventListenerFavViewMore} from './favorites.js';
import {addEventFavModal} from './favorites.js';


/**
 * Global variables
 */


const divElementContainerCards = document.querySelector('.slideshow__cards');

/* Modal Popup */
const closeButton = document.getElementById("close-button");


const prueba = (() => {
    loadFavorites(0);
})


/**
* @method addEventListenerCloseModal
* @description: 
* @returns {}
*/

const addEventListenerCloseModal = (() => {
    closeButton.addEventListener("click", prueba);
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


loadFavorites(0);

getTrendingGif (divElementContainerCards);

/*  Listeners  */
EventListener_Slideshow(divElementContainerCards);
addEventFavModal();
addEventCloseModal(closeButton);
addEventListenerCloseModal();
addEventListenerFavViewMore();


