/**
 * Imports
 */

import {getTrendingGif, EventListener_Slideshow} from './trending.js';
import {addEventCloseModal} from './modal.js';
import {getSearchResultsGif, searchGlobalParam, addEventListenerViewMore} from './search.js';

/**
 * Global variables
 */

const api_key = 'FXvt5yHvROwhxmFNSs87LoAAc6qhfrwz';


/* Trending Cards and Slideshow Trending */
const divElementContainerCards = document.querySelector('.slideshow__cards');
const divSearchResultsContainer = document.querySelector('.resultsGrid');
/* DarkMode */
let darkMode = localStorage.getItem('darkMode'); 
const darkModeToggle = document.querySelector('.dark_mode');

/* Modal Popup */
const closeButton = document.getElementById("close-button");

 /**
 * @method renderMsg
 * @description Render message on the DOM  revizar
 * @returns {String}
 */

const renderMsg = ((msg) => document.querySelector('.gifos-msg').innerHTML = msg );

/**
 * @method enableDarkMode
 * @description Enable DarkMode and Update darkMode in localStorage
 * @param {}
 * @returns {}
 */

const enableDarkMode = () => {
    document.body.classList.add('dark');
    document.getElementById("dark_ligth").innerHTML = "Modo Diurno";

    localStorage.setItem('darkMode', 'enabled');
}

/**
 * @method disableDarkMode
 * @description Disable DarkMode and Update darkMode in localStorage
 * @param {}
 * @returns {}
*/

const disableDarkMode = () => {
    document.body.classList.remove('dark');
    document.getElementById("dark_ligth").innerHTML = "Modo Nocturno";

    localStorage.setItem('darkMode', null);
}
 
  if (darkMode === 'enabled') {
    enableDarkMode();
  }

darkModeToggle.addEventListener('click', () => {
    darkMode = localStorage.getItem('darkMode'); 
    if (darkMode !== 'enabled') {
        enableDarkMode();
     } 
    else {  
        disableDarkMode(); 
    }
});

/**
 * @method setSearchGlobalParam
 * @description 
 * @param {}
 * @returns {}
*/

const setSearchGlobalParam = (() => {  
    searchGlobalParam.api_key = api_key;
    searchGlobalParam.divSearchResultsContainer = divSearchResultsContainer;

});

 /**
 * Run
 */
 
getTrendingGif (divElementContainerCards, api_key);
EventListener_Slideshow(divElementContainerCards);
addEventCloseModal(closeButton);
setSearchGlobalParam();
getSearchResultsGif('cheeseburgers', 0);
addEventListenerViewMore();