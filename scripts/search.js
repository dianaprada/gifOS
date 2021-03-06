/**
 * Imports
 */
import api from './services.js';
import {CardsSearchResults} from './cards.js';
import {addEventOpenModal, addEventTouchModal} from './modal.js';
import {addEventFavButtonTrendingSearch} from './favorites.js';
import {api_key, divFavGridContainer, searchURL} from './global_variables.js';
import {addEventDownloadGif} from './download.js';



/**
 * Global variables
 */


let allHTMLSearchGifs = '';
const searchGlobalParam = {api_key: undefined, divSearchResultsContainer: undefined};

/**
 * Declaration of DOM elements
 */

const viewMoreButton = document.getElementById('searchResults_button');



/**
 * @method getSearchResultsGif
 * @description Call to the promises of endpoints
 * @returns {}
 */

const getSearchResultsGif = ((keyword, offset) => {
    allHTMLSearchGifs = '';
    const { searchData } = api;
    searchData(searchURL, api_key, keyword, 12, offset)
    .then((response) => {
        // verificar response.data si está vacío muestra el div noResults .lenght 
        getSearchResultsJson(response.data, searchGlobalParam.divSearchResultsContainer);
        searchResultsPagination(response.pagination);
        setAttributeViewMore(keyword, (parseInt(offset) + 12));
    }).catch((error) => {
      renderMsg(error);
    });
    
  });


   
  /**
 * @method getSearchResultsJson
 * @description Go through the array of gifs of the response.data that the API gave us one by one
 * @param {array} allgif
 * @returns {}
 */

 const getSearchResultsJson= ((allgifs, divSearchResultsContainer) => {
    let innerHTMLResult = '';
    allgifs.forEach((everygif) => {
        innerHTMLResult = allSearchResultsCards(everygif);        
    });
    divSearchResultsContainer.innerHTML += innerHTMLResult;
    addEventOpenModal(divSearchResultsContainer.querySelectorAll('.show-modal'));
    addEventFavButtonTrendingSearch(divSearchResultsContainer.querySelectorAll('.addFavorite'));
    addEventDownloadGif(divSearchResultsContainer.querySelectorAll('.downloadGifo'));
    addEventTouchModal(divSearchResultsContainer.querySelectorAll('.resultsCard__info'), divSearchResultsContainer);
 });



  /**
 * @method allSearchResultsCards
 * @description: Extract the information to create the HTML
 * @returns {}
 */

const allSearchResultsCards = ((onlyonegif) => {
    const {id, images, title, username} = onlyonegif;
    allHTMLSearchGifs += CardsSearchResults(id, images.fixed_height.url, title, username);
    return allHTMLSearchGifs;

});


/**
 * Pagination
 */

  /**
 * @method searchResultsPagination
 * @description: Pagination of search results with view more button 
 * @returns {}
 */

const searchResultsPagination = ((resultsPagination) => {
    const {total_count, offset, count} = resultsPagination;
    let total_count_int = parseInt(total_count);
    let offset_int = parseInt(offset);
    let count_int = parseInt(count);

    if (total_count_int === 0) {
        hiddenViewMoreButton();
        showDivNoSearchResults();
        // Cuando no hay resultados
    }
    else if (total_count_int == (offset_int + 1)) {
        hiddenViewMoreButton();
        // Cuando llega al final de los resultados de búsqueda
    }
    else if (total_count_int == count_int ) {
        hiddenViewMoreButton();
        // Cuando los resultados son menos de 12
    }

    else {
        showViewMoreButton();
    }

});

/**
 * Show and Hidden
 */


  /**
 * @method showDivNoSearchResults
 * @description Change the class of the No Results Div
 * @param {}
 * @returns {}
*/

const showDivNoSearchResults = (() => {
    const showNoResults = document.getElementById('searchNoResults');
    showNoResults.classList.remove("search__noResultsHidden");
    showNoResults.classList.add("search__noResults");
    
});

  /**
 * @method hideDivNoSearchResults
 * @description hide Div No search results
 * @param {}
 * @returns {}
*/

const hideDivNoSearchResults = (() => {
    const hideNoResults = document.getElementById('searchNoResults');
    hideNoResults.classList.remove("search__noResults");
    hideNoResults.classList.add("search__noResultsHidden");
    
    
});


  /**
 * @method hiddenViewMoreButton
 * @description: hide the view more button
 * @returns {}
 */

const hiddenViewMoreButton =( () => {
    viewMoreButton.classList.add("searchResults__button--hidden");

});


  /**
 * @method showViewMoreButton
 * @description: Show the view more button 
 * @returns {}
 */

const showViewMoreButton =( () => {
    viewMoreButton.classList.remove("searchResults__button--hidden");

});


/**
 * Cleaners
 */


  /**
 * @method cleaninputSearch
 * @description Clear the search form
 * @param {}
 * @returns {}
*/

const cleaninputSearch = (() => {
    document.getElementById("search_form").reset();

});


/**
 * Listeners
 */

  /**
 * @method _listener
 * @description: Listener view More Button
 * @returns {}
 */

let _listener = (() => {
    let keyword = viewMoreButton.getAttribute("data-keyword");
    let offset = viewMoreButton.getAttribute("data-offset");
    getSearchResultsGif(keyword, offset);
}) ;


  /**
 * @method addEventListenerViewMore
 * @description:  Event Listener view More Button
 * @returns {}
 */

 const addEventListenerViewMore = (() => {
    viewMoreButton.addEventListener("click", _listener, false);
 });

   /**
 * @method setAttributeViewMore
 * @description:  Set Attribute Offset to view more button
 * @returns {}
 */

const setAttributeViewMore = ((keyword, offset) => {
    viewMoreButton.setAttribute("data-keyword", keyword);
    viewMoreButton.setAttribute("data-offset", offset);
    
 });


  /**
 * @method renderMsg
 * @description Render message on the DOM  revizar
 * @returns {String}
 */

const renderMsg = ((msg) => document.querySelector('.gifos-msg').innerHTML = msg );




export {getSearchResultsGif, searchGlobalParam, addEventListenerViewMore, hideDivNoSearchResults, cleaninputSearch};
