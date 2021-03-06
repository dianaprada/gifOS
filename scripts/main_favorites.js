/**
 * Imports
 */

import {getTrendingGif, EventListener_Slideshow} from './trending.js';
import {addEventCloseModal} from './modal.js';
import {changeTheme, verifyTheme} from './darkmode.js';
import {loadFavorites, addEventListenerFavViewMore} from './favorites.js';
import {addEventFavModal} from './favorites.js';
import {downloadModal} from './global_variables.js';
import {addEventDownloadGifModal} from './download.js';

/**
 * Global variables
 */


const divElementContainerCards = document.querySelector('.slideshow__cards');

/* Modal Popup */
const closeButton = document.getElementById("close-button");

/**
* @method _listenerCloseModal
* @description: Listener Close Modal 
* @returns {}
*/

const _listenerCloseModal = (() => {
    loadFavorites(0);
})


/**
* @method addEventListenerCloseModal
* @description: Event Listener Close Modal 
* @returns {}
*/

const addEventListenerCloseModal = (() => {
    closeButton.addEventListener("click", _listenerCloseModal);
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

/*  DarkMode  */
verifyTheme();

/*  Listeners  */
EventListener_Slideshow(divElementContainerCards);
addEventFavModal();
addEventCloseModal(closeButton);
addEventListenerCloseModal();
addEventListenerFavViewMore();
changeTheme();
addEventDownloadGifModal(downloadModal);



