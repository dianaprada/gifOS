/**
 * Imports
 */

import {getTrendingGif, EventListener_Slideshow} from './trending.js';
import {addEventCloseModal} from './modal.js';
import {getSearchResultsGif, searchGlobalParam, addEventListenerViewMore, hideDivNoSearchResults, cleaninputSearch} from './search.js';
import {getTrendingWords, getTrendingWordsPromise} from './trending_words.js';
import {getAutocompleteWord, toggleActiveSearchStyles, toggleInactiveSearchStyles} from './autocomplete.js';


/**
 * Exports
 */
export {getSearchResultsGif, searchGlobalParam, addEventListenerViewMore};


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

/* Keyword Search - Input - Button */
const btnSearch = document.getElementById('searchBtn');
const inputSearch = document.getElementById('searchInput');

/* Keyword Search - Input - Button */
const trendingWordClick = document.getElementById('searchBtn');


/**
 * Listeners
*/


/**
 * @method _listenerSearch
 * @description: 
 * @returns {}
 */

let _listenerSearch = (() => {
    hideDivNoSearchResults();
    //limpiar div resultados debe borrar todo el innerHTML 
    cleanDivSearchResultsContainer();
    let keyword = inputSearch.value;
    document.getElementById('keywordSearch').innerHTML = keyword;
    getSearchResultsGif(keyword, 0);
    showDivSearchResults();
    //mostrar el div resultados 
});


/**
 * @method _listenerTrendingWords
 * @description: Event when clicking on a trend word
 * @returns {}
 */

const _listenerTrendingWords = (() => {
    let trendingWords = trendingWordsContainer.querySelectorAll('.trending_words');
    trendingWords.forEach(trendingWord => {        
        trendingWord.addEventListener("click",  () => {
            hideDivNoSearchResults();
            cleanDivSearchResultsContainer();
            let keyword = trendingWord.innerHTML;
            inputSearch.value = keyword;
            document.getElementById('keywordSearch').innerHTML = keyword;
            getSearchResultsGif(keyword, 0);
            showDivSearchResults();
        }, false);
    
    });
});


/**
 * Trending words Promise
*/


/**
 * @method getTrendingWordsAwait
 * @description Hace que el _listenerTrendingWords espere a que el getTrendingWordsPromise se resuelva para continuar
 * @param {}
 * @returns {}
*/

const getTrendingWordsAwait = (() => {
    getTrendingWordsPromise(api_key)
    .then(() => {
       _listenerTrendingWords();
    }).catch((error) => {
      renderMsg(error);
    });
});


/**
 * Clean
 */


/**
 * @method cleanDivSearchResultsContainer
 * @description Clean search results
 * @param {}
 * @returns {}
*/

const cleanDivSearchResultsContainer = (() => {
    document.getElementById("resultsGrid").innerHTML = "";

});


/**
 * @method cleansuggestedWordsUL
 * @description Clean Suggested Words UL (Autocomplete) 
 * @param {}
 * @returns {}
*/

const cleansuggestedWordsUL = (() => {
    document.getElementById("suggestedWords").innerHTML = "";

});


/**
 * Show and Hidden
 */


/**
 * @method showDivSearchResults
 * @description Change the class of the Search Results div
 * @param {}
 * @returns {}
*/

const showDivSearchResults = (() => {
    const showResults = document.getElementById('searchResults');
    showResults.classList.remove("searchResultsHidden");
    showResults.classList.add("searchResults");
    
});


/**
 * @method showDivNoSearchResults
 * @description Change the class of the No Search Results Div
 * @param {}
 * @returns {}
*/

const showDivNoSearchResults = (() => {
    const showNoResults = document.getElementById('searchNoResults');
    showNoResults.classList.remove("search__noResultsHidden");
    showNoResults.classList.add("search__noResults");
    
});


/**
 * Dark Mode
*/


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
 * Search Global Parameters
*/


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
 * Add Event Listeners
*/


/**
 * @method addEventListenerSearch
 * @description: 
 * @returns {}
 */

const addEventListenerSearch = (() => {
    btnSearch.addEventListener("click", _listenerSearch, false);
    inputSearch.addEventListener('keypress', function (e) {
        if (e.keyCode == 13) {
            _listenerSearch();
            e.preventDefault();
        }
    });
 });


 /**
 * @method addEventListenerAutocomplete
 * @description: 
 * @returns {}
 */

const addEventListenerAutocomplete = (() => {
    inputSearch.addEventListener('input', function (e) {
        if (e.keyCode !== 13) {
            cleansuggestedWordsUL();
            getAutocompleteWord(api_key, inputSearch.value);
            toggleActiveSearchStyles();   
            addEventListenerCloseAutocomplete();
        }
    });  
 });


  /**
 * @method addEventListenerAutocomplete
 * @description: 
 * @returns {}
 */

const addEventListenerCloseAutocomplete = (() => {
    const closeIcon = document.getElementById('searchBtnClose');
    closeIcon.addEventListener('click', function (e) {
        const autocompleteWordsContainer = document.getElementById('suggestedWords');
        autocompleteWordsContainer.classList.add("hidden");
        cleansuggestedWordsUL(); 
        toggleInactiveSearchStyles();
        
    });
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

//limpiar input text y los resultados de la búsqueda
cleaninputSearch();
cleanDivSearchResultsContainer();

getTrendingGif (divElementContainerCards);
getTrendingWordsAwait();

//Global Parameters
setSearchGlobalParam();

//Listeners
EventListener_Slideshow(divElementContainerCards);
addEventCloseModal(closeButton);
addEventListenerViewMore();
addEventListenerSearch();
addEventListenerAutocomplete();




