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

const before_slideshow = document.getElementById("slideshow__before");
const after_slideshow = document.getElementById("slideshow__after");

let darkMode = localStorage.getItem('darkMode'); 
const darkModeToggle = document.querySelector('.dark_mode');




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
        
    }

    );

 });

 /**
 * @method allCards
 * @description: Extraer la información para crear el HTML
 * @returns {}
 */

 const allCards = ((onlyonegif) => {
     const {images, title, username} = onlyonegif;
     allHTMLGifs += Cards(images.fixed_height.url, title, username);
     return allHTMLGifs;

 });

 /**
 * @method Cards
 * @description Card marking method
 * @returns {}
 */

 const Cards = ((img, title, username) => {
     return(
        `<div class="card">
                <img  class="card__gif" src=${img} alt="${title}" >
                <div class="card__info" >
                    <div class="card__info--buttons">
                        <button class="card__info--span">
                            <span class="icon-icon-fav-hover"></span>
                            <span class="icon-icon-fav-active"></span></button>
                        <button class="card__info--span"><span class="icon-icon-download"></span></button>
                        <button class="card__info--span"><span class="icon-icon-max"></span></button>
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

  /**
 * @method create_EventListener_Slideshow
 * @description Enable DarkMode and Update darkMode in localStorage
 * @param {}
 * @returns {}
 */

const create_EventListener_Slideshow = (() =>{
	after_slideshow.addEventListener("click", () => {
		divElementContainerCards.scrollLeft += 280;
	
  })

	before_slideshow.addEventListener("click", () => {
		divElementContainerCards.scrollLeft += -280;
	
  })
});

create_EventListener_Slideshow();



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
 
// If the user already visited and enabled darkMode
// start things off with it on
if (darkMode === 'enabled') {
  enableDarkMode();
}

  /**
 * @method 
 * @description When someone clicks the button
 * @param {}
 * @returns {}
 */

darkModeToggle.addEventListener('click', () => {
  darkMode = localStorage.getItem('darkMode'); 
  if (darkMode !== 'enabled') {
    enableDarkMode();
  } 
  else {  
    disableDarkMode(); 
  }
});






