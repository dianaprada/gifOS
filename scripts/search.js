/**
 * Imports
 */
import api from './services.js';
import {CardsSearchResults} from './cards.js';
import {addEventOpenModal} from './modal.js';



/**
 * Global variables
 */

const searchURL = 'http://api.giphy.com/v1/gifs/search';
let allHTMLSearchGifs = '';

const viewMoreButton = document.getElementById('searchResults_button');

const searchGlobalParam = {api_key: undefined, divSearchResultsContainer: undefined};

/**
 * @method getSearchResultsGif
 * @description 
 * @param {}
 * @returns {}
 */

const getSearchResultsGif = ((keyword, offset) => {
    allHTMLSearchGifs = '';
    const { searchData } = api;
    searchData(searchURL, searchGlobalParam.api_key, keyword, 12, offset)
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
 * @description Recorre uno por uno el array de gifs del response.data
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
 });



  /**
 * @method allSearchResultsCards
 * @description: Extraer la información para crear el HTML
 * @returns {}
 */

const allSearchResultsCards = ((onlyonegif) => {
    const {id, images, title, username} = onlyonegif;
    allHTMLSearchGifs += CardsSearchResults(id, images.fixed_height.url, title, username);
    return allHTMLSearchGifs;

});

  /**
 * @method searchResultsPagination
 * @description: Extraer la información para crear el HTML
 * @returns {}
 */

const searchResultsPagination = ((resultsPagination) => {
    const {total_count, offset} = resultsPagination;
    let total_count_int = parseInt(total_count);
    let offset_int = parseInt(offset);

    if (total_count_int === 0) {
        hiddenViewMoreButton();
        // ocultar botón, y mostrar no hay resultados
    }
    else if (total_count_int == (offset_int + 1)) {
        hiddenViewMoreButton();
    }

    else {
        showViewMoreButton();
    }

});

  /**
 * @method hiddenViewMoreButton
 * @description: Extraer la información para crear el HTML
 * @returns {}
 */

const hiddenViewMoreButton =( () => {
    viewMoreButton.classList.add("searchResults__button--hidden");

});

  /**
 * @method showViewMoreButton
 * @description: 
 * @returns {}
 */

const showViewMoreButton =( () => {
    viewMoreButton.classList.remove("searchResults__button--hidden");

});

  /**
 * @method _listener
 * @description: 
 * @returns {}
 */

let _listener = (() => {
    let keyword = viewMoreButton.getAttribute("data-keyword");
    let offset = viewMoreButton.getAttribute("data-offset");
    getSearchResultsGif(keyword, offset);
}) ;


  /**
 * @method addEventListenerViewMore
 * @description: 
 * @returns {}
 */

 const addEventListenerViewMore = (() => {
    viewMoreButton.addEventListener("click", _listener, false);
 });

   /**
 * @method setAttributeViewMore
 * @description: 
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




export {getSearchResultsGif, searchGlobalParam, addEventListenerViewMore};
