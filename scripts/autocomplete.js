/**
 * Imports
 */

import api from './services.js';
import {autocompleteURL} from './global_variables.js';



 /**
 * Global variables
 */


let allHTMLAutocompleteWords = '';


/**
 * Declaration of DOM elements
 */

let autocompleteWordsContainer = document.getElementById('suggestedWords');
const inputSearch = document.getElementById('searchInput');



 /**
 * @method getAutocompleteWord
 * @description Call to the promises of endpoints
 * @param {}
 * @returns {}
 */

const getAutocompleteWord = ((api_key, keyword) => {
    allHTMLAutocompleteWords = '';
    const { autocompleteData } = api;
    autocompleteData(autocompleteURL, api_key, keyword)
    .then((response) => {
        getAutocompleteJson(response.data);
    }).catch((error) => {
      renderMsg(error);
    });
  });


 /**
 * @method getAutocompleteJson
 * @description Go through the array of words in response.data one by one
 * @param {array} allSuggestedWords 
 * @returns {}
 */

const getAutocompleteJson = ((allSuggestedWords) => {
  allSuggestedWords.forEach((everySuggestedWord) => {
    allHTMLAutocompleteWords += autocompleteWords(everySuggestedWord.name);        
  });
  //agregar el event listener al dar clic a una sugerencia
  autocompleteWordsContainer.innerHTML = allHTMLAutocompleteWords;
  addEventSuggestedWord(autocompleteWordsContainer.querySelectorAll('.suggested-words__li'));
  autocompleteWordsContainer.classList.remove("hidden");
  
});


/**
 * @method addEventSuggestedWord
 * @description Add Event Click suggested words
 * @param {array} 
 * @returns {}
*/

const addEventSuggestedWord = (suggested_words) => {
  suggested_words.forEach(suggested_word => {
      let keyword = suggested_word.getAttribute("data-keyword");
      suggested_word.addEventListener("click",  () => {
          inputSearch.value = keyword;
          autocompleteWordsContainer.classList.add("hidden");
          toggleInactiveSearchStyles();
      }, false);
  
});
}

  /**
 * @method autocompleteWords
 * @description Create the HTML of suggested words
 * @param {array} allTrendingWords
 * @returns {}
 */

const autocompleteWords = ((suggested_Word) => {
  return(
     `<li class="suggested-words__li" data-keyword="${suggested_Word}"><i class="icon-icon-search"></i>${suggested_Word}</li>`
  );
});


/**
 * Show and Hidden
 */


/**
 * @method toggleActiveSearchStyles
 * @description Change the class of the Input Search 
 * @param {}
 * @returns {}
*/

const toggleActiveSearchStyles = (() => {
  const showSearchIconLeft = document.getElementById('searchBtnLeft');
  const hideSearchIconRight = document.getElementById('searchBtn');
  const showCloseIconRight = document.getElementById('searchBtnClose');
  showSearchIconLeft.classList.remove("hidden");
  hideSearchIconRight.classList.add("hidden");
  showCloseIconRight.classList.remove("hidden");
  
});

/**
 * @method toggleInactiveSearchStyles
 * @description Change the class of the Input Search 
 * @param {}
 * @returns {}
*/

const toggleInactiveSearchStyles = (() => {
  const hideSearchIconLeft = document.getElementById('searchBtnLeft');
  const showSearchIconRight = document.getElementById('searchBtn');
  const hideCloseIconRight = document.getElementById('searchBtnClose');
  hideSearchIconLeft.classList.add("hidden");
  showSearchIconRight.classList.remove("hidden");
  hideCloseIconRight.classList.add("hidden");
  
});


 /**
 * @method renderMsg
 * @description Render message on the DOM
 * @returns {String}
 */

const renderMsg = ((msg) => document.querySelector('.gifos-msg').innerHTML = msg );


/**
 * Exports
 */

export {getAutocompleteWord, toggleActiveSearchStyles, toggleInactiveSearchStyles};