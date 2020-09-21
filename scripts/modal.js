/**
 * Imports
 */

import {favModal, downloadModal} from './global_variables.js';
import {refreshFavButton} from './favorites.js';
import {addEventDownloadGif} from './download.js';

/**
 * Global variables
 */

let posInit = 0;

/**
 * Declaration of DOM elements
 */
/* Modal Popup */

const modal = document.getElementById("myModal");



/**
 * @method addEventOpenModal
 * @description Show Modal Popup
 * @param {} 
 * @returns {}
*/

const addEventOpenModal = (buttonCards) => {
    buttonCards.forEach(buttonCard => {
        let gif_id = buttonCard.getAttribute("data-gif_id");
        let gif_img = buttonCard.getAttribute("data-gif_img");
        let gif_username = buttonCard.getAttribute("data-gif_username");
        let gif_title = buttonCard.getAttribute("data-gif_title");
        buttonCard.addEventListener("click",  () => {
            toggleModal(gif_id, gif_img, gif_username, gif_title);
        }, false); 
       
});
}


/**
 * @method addEventTouchModal
 * @description Show Modal Popup Mobile Search - Favorites - My Gifos
 * @param {array} 
 * @returns {}
*/

const addEventTouchModal = (imgCards, divScrollModal) => {
    imgCards.forEach(imgCard => {
        let gif_id = imgCard.getAttribute("data-gif_id");
        let gif_img = imgCard.getAttribute("data-gif_img");
        let gif_username = imgCard.getAttribute("data-gif_username");
        let gif_title = imgCard.getAttribute("data-gif_title");
        
        imgCard.addEventListener("touchstart",  (e) => {
            posInit = e.touches[0].clientY;
        }, false);  

        imgCard.addEventListener("touchend", (e) => {
            let posEnd = e.changedTouches[0].clientY;
            if (posInit > posEnd + 5) {
                divScrollModal.scrollLeft += 208;  
            }
            else if (posInit < posEnd - 5) {
                divScrollModal.scrollLeft += -208;
            }
            else{
                toggleModal(gif_id, gif_img, gif_username, gif_title);
            }
            });  

});
}



/**
 * @method addEventTouchTrendingModal
 * @description Show Modal Popup Mobile Trending
 * @param {} 
 * @returns {}
*/

const addEventTouchTrendingModal = (imgCard) => {
        let gif_id = imgCard.getAttribute("data-gif_id");
        let gif_img = imgCard.getAttribute("data-gif_img");
        let gif_username = imgCard.getAttribute("data-gif_username");
        let gif_title = imgCard.getAttribute("data-gif_title");
        toggleModal(gif_id, gif_img, gif_username, gif_title);
          
}

/**
 * @method toggleModal
 * @description Show Modal Popup
 * @param {}  gifId, gifURL, username, title
 * @returns {}
*/

const toggleModal = (gifId, gifURL, username, title) => {
    favModal.setAttribute("data-gif_favIDS", gifId);
    document.getElementById("modal_gif_img").src=gifURL;
    document.getElementById("show_title_gif").innerHTML = title;
    document.getElementById("show_username_gif").innerHTML = username;
    modal.classList.toggle("show_modal");
    refreshFavButton(gifId);
    downloadModal.setAttribute("data-gif_url", gifURL);
    

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

/**
 * @method addEventCloseModal
 * @description Close Modal Popup
 * @param {} 
 * @returns {}
*/

const addEventCloseModal = (closeButton) => {
    closeButton.addEventListener("click", toggleCloseModal);
    
}

export {addEventOpenModal, addEventCloseModal, favModal, addEventTouchModal, addEventTouchTrendingModal};
