/**
 * Imports
 */
import api from './services.js';

/**
 * Global variables
 */
const URL = 'http://api.giphy.com/v1/gifs/trending';
const api_key = 'FXvt5yHvROwhxmFNSs87LoAAc6qhfrwz';
let allHTMLGifs = '';
const divElementContainerCards = document.querySelector('.slideshow__cards');



/**
 * @method getTrendingGif
 * @description LLamado a la función
 * @param {}
 * @returns {}
 */
const getTrendingGif = (() => {
    allHTMLGifs = '';
    const { trendingData } = api;
    trendingData(URL, api_key)
    .then((response) => {
        getTrendingJson(response.data);
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

 const getTrendingJson = ((allgifs) => {
    allgifs.forEach((everygif) => {
    divElementContainerCards.innerHTML = allCards(everygif);
        
    }

    );

 });

 /**
 * @method allCards
 * @description: Extraer la información para crear el HTML
 * @returns {}
 */

 const allCards = ((onlyonegif) => {
     const {images, title, user} = onlyonegif;
     allHTMLGifs += Cards(images.fixed_height.url, title, user.display_name);
     return allHTMLGifs;

 }

 );

 /**
 * @method Cards
 * @description Card marking method
 * @returns {}
 */

 const Cards = ((img, title, username) => {
     return(
        ` <div class="card" >
                            <img  class="card__gif" src=${img} alt="Trending Gif" >
                            <div class="card__info" >
                                <div class="card__info--divs">
                                    <div class="card__info--span ">
                                        <span class="icon-icon-fav-hover"></span>
                                        <span class="icon-icon-fav-active"></span></div>
                                    <div class="card__info--span "><span class="icon-icon-download"></span></div>
                                    <div class="card__info--span "><span class="icon-icon-max"></span></div>
                                </div>
                                <p class="card__info--p1">${username}</p>
                                <p class="card__info--p2">${title}</p>
                            </div>
                        </div>`
     );
 });

 /**
 * @method renderMsg
 * @description Render message on the DOM
 * @returns {String}
 */
const renderMsg = ((msg) => document.querySelector('.gifos-msg').innerHTML = msg );


getTrendingGif ();