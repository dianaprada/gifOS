//Cargar el trending, necesito api_key 
//

/**
 * Imports
 */

 import api from './services.js';
 import {CardsFavorites} from './cards.js';
 import {addEventOpenModal} from './modal.js';
 import {api_key, getGIFbyIDURL, divFavGridContainer, favModal} from './global_variables.js';
 import {addGifLocalStorage, removeGifLocalStorage, getAllGifLocalStorage, existGifIDLocalStorage} from './favorites_localstorage.js';


 /**
 * Global variables
 */

let allHTMLFavResults;
const favViewMoreButton = document.getElementById('favResultsButton');
const maxGifsToShow = 12;




/**
 * @method loadFavorites
 * @description Validate if there are ids in the localstorage and call the getGIFSbyID function
 * @param {}
 * @returns {}
 */

const loadFavorites = ((offset) => {
    //validar que haya IDS 
    if(divFavGridContainer){
      if(offset === 0)
        cleanDivFavsContainer();

      let ids = getAllGifLocalStorage();
      if (ids.length>0) {
        getGIFSbyID(ids.split(","), offset);
      }
      else{
        showDivNoFavResults();
      }
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

const getGIFSbyID = ((ids, offset) => {
  allHTMLFavResults = '';
  let favIDS = [];
  let topOffset = 0;
  const { gifsByIDData } = api;

  if((offset + maxGifsToShow) < ids.length){
    topOffset = offset + maxGifsToShow;
  }
  else{
    topOffset = ids.length;
  }
  
  for( let i = offset; i < topOffset; i++){
    favIDS.push(ids[i]);
  }
  
  gifsByIDData(getGIFbyIDURL, api_key, favIDS)
  .then((response) => {
    getGIFbyIDJson(response.data);
    favoritesPagination(ids.length, topOffset);
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

const getGIFbyIDJson= ((allFavoritesGifs) => {
  let innerHTMLResult = '';
  allFavoritesGifs.forEach((everyFavoriteGif) => {
    innerHTMLResult = allFavoriteCards(everyFavoriteGif);        
  });
  divFavGridContainer.innerHTML += innerHTMLResult;
  addEventOpenModal(divFavGridContainer.querySelectorAll('.show-modal'));
  addEventFavButton(divFavGridContainer.querySelectorAll('.addFavorite'))

});


  /**
 * @method allFavoriteCards
 * @description: Extract the information to create the HTML
 * @returns {}
 */

const allFavoriteCards = ((onlyOneFavGif) => {
  const {id, images, title, username} = onlyOneFavGif;
  allHTMLFavResults += CardsFavorites(id, images.fixed_height.url, title, username);
  return allHTMLFavResults;

});



/**
 * Pagination
 */

/**
 * @method favoritesPagination
 * @description: Pagination of search results with view more button 
 * @returns {}
 */

const favoritesPagination = ((total_count, topOffset) => {
  if (total_count === 0) {
      hiddenFavViewMoreButton(); // ToDo cambiar y ocultar la sección
      showDivNoFavResults();
      // Cuando no hay resultados
  }
  else if (total_count === topOffset) {
      hiddenFavViewMoreButton();
      hideDivNoFavResults();
      // Cuando llega al final de los resultados de búsqueda
  }
  else {
      showFavViewMoreButton();
  }

});

 /**
* @method setAttributeViewMore
* @description: 
* @returns {}
*/

const setAttributeViewMore = ((offset) => {
  favViewMoreButton.setAttribute("data-offset", offset);
  
});



/**
* Show and Hidden
*/


/**
* @method hiddenFavViewMoreButton
* @description: hide the view more button
* @returns {}
*/

const hiddenFavViewMoreButton =( () => {
  favViewMoreButton.classList.remove("favResults__button");
  favViewMoreButton.classList.add("hidden");

});


/**
* @method showFavViewMoreButton
* @description: Show the view more button 
* @returns {}
*/

const showFavViewMoreButton =( () => {
  favViewMoreButton.classList.remove("hidden");
  favViewMoreButton.classList.add("favResults__button");
  

});


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
  divFavGridContainer.innerHTML = '';
  favViewMoreButton.classList.add("hidden");

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
 * @method cleanDivFavsContainer
 * @description Clean search results
 * @param {}
 * @returns {}
*/

const cleanDivFavsContainer = (() => {
  divFavGridContainer.innerHTML = "";

});


/**
 * Event Listener Favorites Button
*/

/**
 * @method addEventFavButton
 * @description Event Listener Favorites Button
 * @param {array}  favoriteGifs Recibe el array de gif con la clase .addFavorites
 * @returns {}
*/

const addEventFavButton = ((favoriteGifs) => {
  favoriteGifs.forEach(favoriteGif => {
      let gif_id = favoriteGif.getAttribute("data-gif_favIDS");
      refreshFavButton(gif_id);
      
      favoriteGif.addEventListener("click",  () => {
        if (existGifIDLocalStorage(gif_id)) {
          removeGifLocalStorage(gif_id);
          toogleFavButtonInactive(gif_id);
        }
        else{
          addGifLocalStorage(gif_id);
          toogleFavButtonActive(gif_id);
        }
        loadFavorites(0);
      }, false);    
});
});


/**
 * @method addEventFavButtonTrendingSearch
 * @description Event Listener Favorites Button
 * @param {array}  favoriteGifs Recibe el array de gif con la clase .addFavorites
 * @returns {}
*/

const addEventFavButtonTrendingSearch = ((favoriteGifs) => {
  favoriteGifs.forEach(favoriteGif => {
      let gif_id = favoriteGif.getAttribute("data-gif_favIDS");
      refreshFavButton(gif_id);
    
      favoriteGif.addEventListener("click",  () => {
        if (existGifIDLocalStorage(gif_id)) {
          removeGifLocalStorage(gif_id);
          toogleFavButtonInactive(gif_id);
        }
        else{
          addGifLocalStorage(gif_id);
          toogleFavButtonActive(gif_id);
        }
        loadFavorites(0);
      }, false);    
});
});

/**
 * @method addEventFavButtonTrendingSearch
 * @description Event Listener Favorites Button
 * @param {array}  favoriteGifs Recibe el array de gif con la clase .addFavorites
 * @returns {}
*/

const addEventFavModal = (() => {
  
  favModal.addEventListener("click",  () => {
    let gif_id = favModal.getAttribute("data-gif_favIDS");
      if (existGifIDLocalStorage(gif_id)) {
          removeGifLocalStorage(gif_id);
          toogleFavButtonInactive(gif_id);
      }
      else{
          addGifLocalStorage(gif_id);
          toogleFavButtonActive(gif_id);
      }
  }, false);    
});




  /**
 * @method _favListener
 * @description: 
 * @returns {}
 */

let _favListener = (() => {
  let offset = favViewMoreButton.getAttribute("data-offset");
  loadFavorites(offset);
}) ;


/**
* @method addEventListenerFavViewMore
* @description: 
* @returns {}
*/

const addEventListenerFavViewMore = (() => {
  favViewMoreButton.addEventListener("click", _favListener, false);
});


/**
 * @method refreshFavButton
 * @description 
 * @param {}  
 * @returns {}
*/

const refreshFavButton = ((gif_id) => {
  if (existGifIDLocalStorage(gif_id)) {
    toogleFavButtonActive(gif_id);
  }
  else{
    toogleFavButtonInactive(gif_id);
  }
})


/**
 * Change Styles to Favorites Button ♡ ==> ♥ ==> ♡ 
*/

/**
 * @method toogleFavButtonActive
 * @description Activate Favorites button ♡ ==> ♥
 * @param {} 
 * @returns {}
*/

const toogleFavButtonActive = ((gif_id) => {
  const favButtonON = document.querySelectorAll("[data-gif_favIDS='" + gif_id +"']");
  favButtonON.forEach((everyFavButton) =>{
    everyFavButton.innerHTML= `<span class="icon-icon-fav-active" id="favButton-active"></span>`;
  })
  
});

/**
 * @method toogleFavButtonInactive
 * @description Remove active class to favorites button ♥ ==> ♡ 
 * @param {} 
 * @returns {}
*/

const toogleFavButtonInactive = ((gif_id) => {
  const favButtonOFF = document.querySelectorAll("[data-gif_favIDS='" + gif_id +"']");  
  favButtonOFF.forEach((everyFavButton) =>{
    everyFavButton.innerHTML= `<span class="icon-icon-fav-hover" id="favButton-inactive"></span>`;
  })
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


export{loadFavorites, addEventFavButton, addEventFavButtonTrendingSearch, addEventListenerFavViewMore, addEventFavModal, refreshFavButton};

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