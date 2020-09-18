/**
 * @method CardsTrending
 * @description Crea el HTML de cada Card
 * @param {id, img, title, username} 
 * @returns {}
*/

const CardsTrending = ((id, img, title, username) => {
    return(
       `<div class="card">
               <img  class="card__gif" src=${img} alt="${title}">
               <div class="card__info" id="cards_hover" data-gif_id="${id}" data-gif_img="${img}" data-gif_title="${title}" data-gif_username="${username}" >
                   <div class="card__info--buttons" id="buttons_card">
                       <button class="card__info--span addFavorite" id="favorite-gif" data-gif_favIDS="${id}">
                           <span class="icon-icon-fav-hover" id="favButton-inactive"></span></button>
                       <button class="card__info--span downloadGifo" id="download-gif" data-gif_url="${img}" >
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
 * @method CardsSearchResults
 * @description Crea el HTML de cada Card
 * @param {id, img, title, username} 
 * @returns {}
*/

const CardsSearchResults = ((id, img, title, username) => {
    return(
       `<div class="resultsCard">
            <img class="resultsCard__gif" src=${img} alt="${title}" >
            <div class="resultsCard__info" id="cards_hover" data-gif_id="${id}" data-gif_img="${img}" data-gif_title="${title}" data-gif_username="${username}" >
                <div class="card__info--buttons" id="buttons_card">
                    <button class="card__info--span addFavorite" id="favorite-gif" data-gif_favIDS="${id}">
                        <span class="icon-icon-fav-hover" id="favButton-inactive"></span></button>
                    <button class="card__info--span downloadGifo" id="download-gif" data-gif_url="${img}">
                        <span class="icon-icon-download"></span></button>
                    <button class="card__info--span show-modal" id="show-modal" data-gif_id="${id}" data-gif_img="${img}" data-gif_title="${title}" data-gif_username="${username}">
                        <span class="icon-icon-max"></span></button>
                </div>
                <p class="resultsCard__info--p1" id="show-username_gif">${username}</p>
                <p class="resultsCard__info--p2" id="show-title_gif">${title}</p>
            </div>
        </div>`
    );
});

/**
 * @method CardsFavorites
 * @description Crea el HTML de cada Card
 * @param {id, img, title, username} 
 * @returns {}
*/

const CardsFavorites = ((id, img, title, username) => {
    return(
       `<div class="resultsCard">
            <img class="resultsCard__gif" src=${img} alt="${title}" >
            <div class="resultsCard__info" id="cards_hover" data-gif_id="${id}" data-gif_img="${img}" data-gif_title="${title}" data-gif_username="${username}" >
                <div class="card__info--buttons" id="buttons_card">
                    <button class="card__info--span addFavorite" id="favorite-gif" data-gif_favIDS="${id}">
                        <span class="icon-icon-fav-active" id="favButton-inactive"></span></button>
                    <button class="card__info--span downloadGifo" id="download-gif" data-gif_url="${img}">
                        <span class="icon-icon-download"></span></button>
                    <button class="card__info--span show-modal" id="show-modal" data-gif_id="${id}" data-gif_img="${img}" data-gif_title="${title}" data-gif_username="${username}">
                        <span class="icon-icon-max"></span></button>
                </div>
                <p class="resultsCard__info--p1" id="show-username_gif">${username}</p>
                <p class="resultsCard__info--p2" id="show-title_gif">${title}</p>
            </div>
        </div>`
    );
});


export {CardsTrending, CardsSearchResults, CardsFavorites};