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

/* Trending Cards and Slideshow Trending */
const divElementContainerCards = document.querySelector('.slideshow__cards');
const before_slideshow = document.getElementById("slideshow__before");
const after_slideshow = document.getElementById("slideshow__after");

/* DarkMode */
let darkMode = localStorage.getItem('darkMode'); 
const darkModeToggle = document.querySelector('.dark_mode');

/* Modal Popup */
const modal = document.getElementById("myModal");
const closeButton = document.getElementById("close-button");


/**
 * @method getTrendingGif
 * @description LLamado a la función
 * @param {}
 * @returns {}
 */

const getTrendingGif = (() => {
    allHTMLGifs = '';
    const { trendingData } = api;
    trendingData(URL, api_key, 15)
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
    });
    addEventOpenModal(divElementContainerCards.querySelectorAll('.show-modal'));
 });

 /**
 * @method allCards
 * @description: Extraer la información para crear el HTML
 * @returns {}
 */

 const allCards = ((onlyonegif) => {
     const {id, images, title, username} = onlyonegif;
     allHTMLGifs += Cards(id, images.fixed_height.url, title, username);
     return allHTMLGifs;

 });

 /**
 * @method Cards
 * @description Card marking method
 * @returns {}
 */

 const Cards = ((id, img, title, username) => {
     return(
        `<div class="card">
                <img  class="card__gif" src=${img} alt="${title}" >
                <div class="card__info" id="cards_hover">
                    <div class="card__info--buttons" id="buttons_card">
                        <button class="card__info--span" id="favorite_gif">
                            <span class="icon-icon-fav-hover"></span>
                            <span class="icon-icon-fav-active"></span></button>
                        <button class="card__info--span" id="download-gif">
                            <span class="icon-icon-download"></span></button>
                        <button class="card__info--span show-modal" id="show-modal" data-gif_id="${id}" data-gif_img="${img}" data-gif_title="${title}" data-gif_username="${username}">
                            <span class="icon-icon-max"></span></button>
                    </div>
                    <p class="card__info--p1" id="show-username_gif">${username}</p>
                    <p class="card__info--p2" id="show-title_gif">${title}</p>
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


/**
 * @method EventListener_Slideshow
 * @description Slideshow Trending
 * @param {}
 * @returns {}
*/

const EventListener_Slideshow = (() =>{
	  after_slideshow.addEventListener("click", () => {
		    divElementContainerCards.scrollLeft += 280;
	
  })

	  before_slideshow.addEventListener("click", () => {
		    divElementContainerCards.scrollLeft += -280;
	
  })
});

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
 * @method toggleModal
 * @description Show Modal Popup
 * @param {} 
 * @returns {}
*/

const addEventOpenModal = (cards) => {
        cards.forEach(card => {
            let gif_id = card.getAttribute("data-gif_id");
            let gif_img = card.getAttribute("data-gif_img");
            let gif_username = card.getAttribute("data-gif_username");
            let gif_title = card.getAttribute("data-gif_title");
            card.addEventListener("click",  function() {
                toggleModal(gif_id, gif_img, gif_username, gif_title);
            }, false);
        
    });

}

/**
 * @method toggleModal
 * @description Show Modal Popup
 * @param {}  gifId, gifURL, username, title
 * @returns {}
*/

const toggleModal = (gifId, gifURL, username, title) => {
    document.getElementById("modal_gif_img").src=gifURL;
    document.getElementById("show_title_gif").innerHTML = title;
    document.getElementById("show_username_gif").innerHTML = username;
    modal.classList.toggle("show_modal");
}

/**
 * @method toggleCloseModal
 * @description Close Modal Popup
 * @param {}
 * @returns {}
*/



const toggleCloseModal = () => { 
    modal.classList.toggle("show_modal");
}

closeButton.addEventListener("click", toggleCloseModal);




 /**
 * Run
 */

 /* Trending Cards on the DOM and Slideshow Trending */

getTrendingGif ();
EventListener_Slideshow();
