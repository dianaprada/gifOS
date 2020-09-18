/**
 * Imports
 */
import api from './services.js';
import {CardsTrending} from './cards.js';
import {addEventOpenModal, addEventTouchModal, addEventTouchTrendingModal} from './modal.js';
import {api_key, URLTrending} from './global_variables.js';
import {addEventFavButtonTrendingSearch} from './favorites.js';
import {addEventDownloadGif} from './download.js';


/**
 * Global variables
 */

let allHTMLTrendingGifs = '';
let posInit = 0;



/* Slideshow Trending */
const before_slideshow = document.getElementById("slideshow__before");
const after_slideshow = document.getElementById("slideshow__after");

/**
 * @method getTrendingGif
 * @description LLamado a la función
 * @param {}
 * @returns {}
 */

const getTrendingGif = ((divTrendingContainer) => {
    allHTMLTrendingGifs = '';
    const { trendingData } = api;
    trendingData(URLTrending, api_key, 15)
    .then((response) => {
        getTrendingJson(response.data, divTrendingContainer);
    }).catch((error) => {
      renderMsg(error);
    });
  });


  
  /**
 * @method getTrendingJson
 * @description Recorre uno por uno el array de gifs del response.data
 * @param {array} allgif
 * @returns {}
 */

 const getTrendingJson = ((allgifs, divTrendingContainer) => {
    allgifs.forEach((everygif) => {
        divTrendingContainer.innerHTML = allCards(everygif);        
    });
    addEventOpenModal(divTrendingContainer.querySelectorAll('.show-modal'));
    addEventFavButtonTrendingSearch(divTrendingContainer.querySelectorAll('.addFavorite'));
    addEventDownloadGif(divTrendingContainer.querySelectorAll('.downloadGifo'));
    //addEventTouchModal(divTrendingContainer.querySelectorAll('.card__info'));
    EventTouchStart_Slideshow(divTrendingContainer.querySelectorAll('.card__info'));
    EventTouchEnd_Slideshow(divTrendingContainer.querySelectorAll('.card__info'), divTrendingContainer);

 });

  /**
 * @method allCards
 * @description: Extraer la información para crear el HTML
 * @returns {}
 */

const allCards = ((onlyonegif) => {
    const {id, images, title, username} = onlyonegif;
    allHTMLTrendingGifs += CardsTrending(id, images.fixed_height.url, title, username);
    return allHTMLTrendingGifs;

});

/**
 * @method EventListener_Slideshow
 * @description Slideshow Trending
 * @param {}
 * @returns {}
*/

const EventListener_Slideshow = ((divElementContainerCards) => {
    after_slideshow.addEventListener("click", () => {
          divElementContainerCards.scrollLeft += 280;  
        }
    );

    before_slideshow.addEventListener("click", () => {
          divElementContainerCards.scrollLeft += -280;
        }
    );
});

/**
 * @method EventTouchStart_Slideshow
 * @description Slideshow Trending
 * @param {}
 * @returns {}
*/

const EventTouchStart_Slideshow = ((slideGifos) => {
    slideGifos.forEach((gifo) => {
        gifo.addEventListener("touchstart", (e) => {
            posInit = e.touches[0].clientX;
          });       
    });

});


/**
 * @method EventTouchEnd_Slideshow
 * @description Slideshow Trending
 * @param {}
 * @returns {}
*/

const EventTouchEnd_Slideshow = ((slideGifos, divTrendingContainer) => {
    slideGifos.forEach((gifo) => {
        gifo.addEventListener("touchend", (e) => {
          let posEnd = e.changedTouches[0].clientX;
          if (posInit > posEnd + 5) {
            divTrendingContainer.scrollLeft += 208;  
          }
          else if (posInit < posEnd - 5) {
            divTrendingContainer.scrollLeft += -208;
          }
          else{
            addEventTouchTrendingModal(gifo);
          }
          });       
    });

});


 /**
 * @method renderMsg
 * @description Render message on the DOM
 * @returns {String}
 */

const renderMsg = ((msg) => document.querySelector('.gifos-msg').innerHTML = msg );



export {getTrendingGif, EventListener_Slideshow};