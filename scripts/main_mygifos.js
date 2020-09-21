/**
 * Imports
 */

import api from './services.js';
import { getTrendingGif, EventListener_Slideshow } from './trending.js';
import { addEventOpenModal, addEventCloseModal, addEventTouchModal} from './modal.js';
import { addEventFavButtonTrendingSearch } from './favorites.js';
import { changeTheme, verifyTheme } from './darkmode.js';
import { addEventFavModal } from './favorites.js';
import { CardsFavorites } from './cards.js';
import { api_key, getGIFbyIDURL, divMyGifosContainer, downloadModal} from './global_variables.js';
import { getAllGifLocalStorage } from './new_gifo_localstorage.js';
import {addEventDownloadGif, addEventDownloadGifModal} from './download.js';



/**
 * Global variables
 */

let allHTMLMyGifosResults;
const maxGifsToShow = 12;

/**
 * Declaration of DOM elements
 */

const divElementContainerCards = document.querySelector('.slideshow__cards');

const noGifos = document.getElementById('myGifosNoContent');
const viewMoreButton = document.getElementById('myGifosViewMoreButton');

/* Modal Popup */
const closeButton = document.getElementById("close-button");


/**
 * @method loadMyGifos
 * @description Validate if there are ids in the localstorage and call the getGIFSbyID function
 * @param {}
 * @returns {}
 */

const loadMyGifos = ((offset) => {
    //validar que haya IDS 
    let ids = getAllGifLocalStorage();
    if (ids.length > 0) {
        getGIFSbyID(ids.split(","), offset);
    }
    else {
        showDivNoGifos();
    }

    // si hay IDS llama a getGIFSbyID(ids) con lenhgt
    // sino llama a  showDivNoGifos
    //getAllGifLocalStorage

});


/**
* @method getGIFSbyID
* @description Call to the promises of endpoints
* @param {}
* @returns {}
*/

const getGIFSbyID = ((ids, offset) => {
    allHTMLMyGifosResults = '';
    let myGifosIDS = [];
    let topOffset = 0;
    const { gifsByIDData } = api;

    if ((offset + maxGifsToShow) < ids.length) {
        topOffset = offset + maxGifsToShow;
    }
    else {
        topOffset = ids.length;
    }

    for (let i = offset; i < topOffset; i++) {
        myGifosIDS.push(ids[i]);
    }

    gifsByIDData(getGIFbyIDURL, api_key, myGifosIDS)
        .then((response) => {
            getGIFbyIDJson(response.data);
            myGifosPagination(ids.length, topOffset);
            setAttributeViewMore(offset + maxGifsToShow);

        }).catch((error) => {
            renderMsg(error);
        });
});



/**
 * @method getGIFbyIDJson
 * @description Go through the array of gifs of the response.data that the API gave us one by one
 * @param {array} allgif
 * @returns {}
 */

const getGIFbyIDJson = ((allMyGifs) => {
    let innerHTMLResult = '';
    allMyGifs.forEach((everyGifo) => {
        innerHTMLResult = allFavoriteCards(everyGifo);
    });
    divMyGifosContainer.innerHTML += innerHTMLResult;
    addEventOpenModal(divMyGifosContainer.querySelectorAll('.show-modal'));
    addEventFavButtonTrendingSearch(divMyGifosContainer.querySelectorAll('.addFavorite'));
    addEventDownloadGif(divMyGifosContainer.querySelectorAll('.downloadGifo'));
    addEventTouchModal(divMyGifosContainer.querySelectorAll('.resultsCard__info'), divMyGifosContainer);

});



/**
* @method allFavoriteCards
* @description: Extract the information to create the HTML
* @returns {}
*/

const allFavoriteCards = ((onlyOneFavGif) => {
    const { id, images, title, username } = onlyOneFavGif;
    allHTMLMyGifosResults += CardsFavorites(id, images.fixed_height.url, title, username);
    return allHTMLMyGifosResults;

});


  /**
 * @method _myGifosListener
 * @description: Listener 
 * @returns {}
 */

let _myGifosListener = (() => {
    let offset = viewMoreButton.getAttribute("data-offset");
    loadMyGifos(offset);
  }) ;
  
  
  /**
  * @method addEventListenerMyGifosViewMore
  * @description: Event Listener My Gifos View More
  * @returns {}
  */
  
  const addEventListenerMyGifosViewMore = (() => {
    viewMoreButton.addEventListener("click", _myGifosListener, false);
  });
  


/**
 * Pagination
 */

/**
 * @method myGifosPagination
 * @description: Pagination of search results with view more button 
 * @returns {}
 */

const myGifosPagination = ((total_count, topOffset) => {
    if (total_count === 0) {
        hiddenMyGifosViewMoreButton(); // ToDo cambiar y ocultar la sección
        showDivNoGifos();
        // Cuando no hay resultados
    }
    else if (total_count === topOffset) {
        hiddenMyGifosViewMoreButton();
        hideDivNoGifos();
        // Cuando llega al final de los resultados de búsqueda
    }
    else {
        showMyGifosViewMoreButton();
    }

});

/**
* @method setAttributeViewMore
* @description: Set attribute offset to view more button
* @returns {}
*/

const setAttributeViewMore = ((offset) => {
    viewMoreButton.setAttribute("data-offset", offset);

});



/**
* Show and Hidden
*/


/**
* @method hiddenMyGifosViewMoreButton
* @description: hide the view more button
* @returns {}
*/

const hiddenMyGifosViewMoreButton =( () => {
    viewMoreButton.classList.remove("myGifosResults__button");
    viewMoreButton.classList.add("hidden");
  
  });
  
  
  /**
  * @method showMyGifosViewMoreButton
  * @description: Show the view more button 
  * @returns {}
  */
  
  const showMyGifosViewMoreButton =( () => {
    viewMoreButton.classList.remove("hidden");
    viewMoreButton.classList.add("myGifosResults__button");
    
  
  });
  


/**
 * @method showDivNoGifos
 * @description Change class of No Results Div
 * @param {}
 * @returns {}
*/

const showDivNoGifos = (() => {

    noGifos.classList.remove("hidden");
    noGifos.classList.add("myGifosNoContent");
    divMyGifosContainer.innerHTML = '';
    viewMoreButton.classList.add("hidden");

});


/**
* @method hideDivNoGifos
* @description Change class of No Results Div
* @param {}
* @returns {}
*/

const hideDivNoGifos = (() => {
    noGifos.classList.remove("myGifosNoContent");
    noGifos.classList.add("hidden");
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

loadMyGifos(0);
getTrendingGif(divElementContainerCards);

/*  DarkMode  */
verifyTheme();

/*  Listeners  */
EventListener_Slideshow(divElementContainerCards);
addEventFavModal();
addEventCloseModal(closeButton);
changeTheme();
addEventListenerMyGifosViewMore();
addEventDownloadGifModal(downloadModal);


