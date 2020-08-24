/**
 * Imports
 */
import api from './services.js';
import {CardsTrending} from './cards.js';
import {addEventOpenModal} from './modal.js';


/**
 * Global variables
 */

const URLTrending = 'http://api.giphy.com/v1/gifs/trending';
let allHTMLTrendingGifs = '';


/* Slideshow Trending */
const before_slideshow = document.getElementById("slideshow__before");
const after_slideshow = document.getElementById("slideshow__after");

/**
 * @method getTrendingGif
 * @description LLamado a la función
 * @param {}
 * @returns {}
 */

const getTrendingGif = ((divTrendingContainer, api_key) => {
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
 * @method renderMsg
 * @description Render message on the DOM
 * @returns {String}
 */

const renderMsg = ((msg) => document.querySelector('.gifos-msg').innerHTML = msg );



export {getTrendingGif, EventListener_Slideshow};