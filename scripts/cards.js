const CardsTrending = ((id, img, title, username) => {
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

const CardsSearchResults = ((id, img, title, username) => {
    return(
       `<div class="resultsCard">
            <img class="resultsCard__gif" src=${img} alt="${title}">
            <div class="resultsCard__info" id="cards_hover">
                <div class="card__info--buttons" id="buttons_card">
                    <button class="card__info--span" id="favorite_gif">
                        <span class="icon-icon-fav-hover"></span>
                        <span class="icon-icon-fav-active"></span></button>
                    <button class="card__info--span" id="download-gif">
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

export {CardsTrending, CardsSearchResults};