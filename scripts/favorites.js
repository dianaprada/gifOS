//Carga el trending, necesitamos api_key 
//

/**
 * Imports
 */

 import api from './services.js';
 import {CardsSearchResults} from './cards.js';
 import {addEventOpenModal} from './modal.js';
 import {api_key, getGIFbyIDURL} from './global_variables.js';
 import {addGifLocalStorage, removeGifLocalStorage, getAllGifLocalStorage, existGifIDLocalStorage} from './favorites_localstorage.js';


 /**
 * Global variables
 */

let allHTMLFavResults;

const divFavGridContainer = document.getElementById('favResultsGrid');



const LOCAL_STORAGE_GIF_SELECTED = '';


/**
 * @method loadFavorites
 * @description Validate if there are ids in the localstorage and call the getGIFSbyID function
 * @param {}
 * @returns {}
 */

const loadFavorites = (() => {
    //validar que haya IDS 
    // let ids = 'KpLPyE3D6HJPa,efgsSvAvMjOpy';
    // if (ids !== '')
    // {
    //   getGIFSbyID(ids);
    // }
    if (existGifIDLocalStorage()) {
      let ids = getAllGifLocalStorage();
      if (ids.length > 0) {
        getGIFSbyID(ids);
      }
      getGIFSbyID(ids);
    }
    else{
      showDivNoFavResults();
    }
    // si hay IDS llama a getGIFSbyID(ids) con lenhgt
    // sino llama a  showDivNoFavResults
    //getAllGifLocalStorage


  
  });

  /**
 * @method getGIFSbyID
 * @description Call to the promises of endpoints
 * @param {}
 * @returns {}
 */

const getGIFSbyID = ((ids) => {
  allHTMLFavResults = '';
  const { gifsByIDData } = api;
  gifsByIDData(getGIFbyIDURL, api_key, ids)
  .then((response) => {
    getGIFbyIDJson(response.data);
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

const getGIFbyIDJson= ((allFavoritesGifs) => {
  let innerHTMLResult = '';
  allFavoritesGifs.forEach((everyFavoriteGif) => {
    innerHTMLResult = allFavoriteCards(everyFavoriteGif);        
  });
  divFavGridContainer.innerHTML += innerHTMLResult;
  addEventOpenModal(divFavGridContainer.querySelectorAll('.show-modal'));
  //addEventFavButton(divFavGridContainer.querySelectorAll('.favorite'))

});


  /**
 * @method allFavoriteCards
 * @description: Extract the information to create the HTML
 * @returns {}
 */

const allFavoriteCards = ((onlyOneFavGif) => {
  const {id, images, title, username} = onlyOneFavGif;
  allHTMLFavResults += CardsSearchResults(id, images.fixed_height.url, title, username);
  return allHTMLFavResults;

});



/**
 * Show and Hidden
 */


/**
 * @method showDivNoFavResults
 * @description Change class of No Results Div
 * @param {}
 * @returns {}
*/

const showDivNoFavResults = (() => {
  const showNoFavs = document.getElementById('favNoContent');
  showNoFavs.classList.remove("hidden");
  showNoFavs.classList.add("search__noResults--h3");
  document.getElementById('favResults').innerHTML = '';

});

/**
* @method hideDivNoFavResults
* @description Change class of No Results Div
* @param {}
* @returns {}
*/

const hideDivNoFavResults = (() => {
  const hideNoFavs = document.getElementById('favNoContent');
  hideNoFavs.classList.remove("search__noResults--h3");
  hideNoFavs.classList.add("hidden");
  
});



/**
 * Event Listener Favorites Button
*/

/**
 * @method addEventFavButton
 * @description Event Listener Favorites Button
 * @param {} 
 * @returns {}
*/

const addEventFavButton = ((favoriteGifs) => {
  favoriteGifs.forEach(favoriteGif => {
      let gif_id = favoriteGif.getAttribute("data-gif_id");
      
      favoriteGif.addEventListener("click",  () => {
        if (existGifIDLocalStorage(gif_id)) {
          removeGifLocalStorage(gif_id);
        }
        else{
          addGifLocalStorage(gif_id);
        }
        loadFavorites();
      }, false);    
});
});



/**
 * Change Styles to Favorites Button
*/

/**
 * @method toogleFavButtonActive
 * @description Activate Favorites button
 * @param {} 
 * @returns {}
*/

const toogleFavButtonActive = (() => {
  const favButtonON = document.getElementById(favButton-inactive);
  favButtonON.classList.remove("icon-icon-fav-hover");
  favButtonON.classList.add("icon-icon-fav-active");
});


/**
 * Event Listener Favorites Button
*/

/**
 * @method toogleFavButtonInactive
 * @description Remove active class to favorites button
 * @param {} 
 * @returns {}
*/

const toogleFavButtonInactive = ((favoriteGifs) => {
  const favButtonOFF = document.getElementById(favButton-inactive);
  favButtonOFF.classList.add("icon-icon-fav-hover");
  favButtonOFF.classList.remove("icon-icon-fav-active"); 
});




export{loadFavorites};

//Cambiar el endpoint

//cuando se abre la página se debe validar si hay favoritos para mostrar, mostrar el div no favs o la lista

//Función para cambiar el icono: Cambiar el estilo del botón activar favoritos (puedo hacer una función toggle). 

//Agregar favoritos al localstorage: 
// 1. voy a guardar el ID del Gif, al local storage
// 3. llamar a la función para cambiar el ícono

//una vez en el localstorage, debo pasar los ID de los gif guardados a la función getGIFSbyID
//debo asegurarme que los id's estén en el formato requerido id1,id2,id3,id4,

//debo validar los ID de todos los gif que se están mostrando en la búsqueda y en trending
//si están en el localstorage llamar a la función toogleFavButtonActive(); 

//en la función addEventFavButton validar
// si NO es favorito llamar a las funciones: addGifLocalStorage(gif_id); y toogleFavButtonActive(); 
// si YA es favorito llamar a las funciones: removeGifLocalStorage(gif_id); y toogleFavButtonInactive(); refrescar la página de favoritos

// Agregar el Event Listener de favoritos a la búsqueda y al trending