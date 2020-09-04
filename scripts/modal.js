
/**
 * Global variables
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

/**
 * @method addEventCloseModal
 * @description Close Modal Popup
 * @param {} 
 * @returns {}
*/

const addEventCloseModal = (closeButton) => {
    closeButton.addEventListener("click", toggleCloseModal);
}

export {addEventOpenModal, addEventCloseModal};
