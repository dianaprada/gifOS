
/**
 * Global variables
 */

const api_key = 'FXvt5yHvROwhxmFNSs87LoAAc6qhfrwz';

const searchURL = 'http://api.giphy.com/v1/gifs/search';

const URLTrending = 'http://api.giphy.com/v1/gifs/trending';

const URLTrendingWords = 'http://api.giphy.com/v1/trending/searches';

const getGIFbyIDURL = 'http://api.giphy.com/v1/gifs';

const uploadGifoURL = 'https://upload.giphy.com/v1/gifs';

const LOCAL_STORAGE_FAVORITE_GIFS = "favoriteGifs";

const divFavGridContainer = document.getElementById('favResultsGrid');

const favModal = document.getElementById("favorite-gif-Modal");

const divMyGifosContainer = document.getElementById('myGifosResultsGrid');

const LOCAL_STORAGE_MY_GIFOS = "myGifos";


export {api_key, 
        searchURL, 
        URLTrending, 
        URLTrendingWords, 
        getGIFbyIDURL, 
        LOCAL_STORAGE_FAVORITE_GIFS, 
        divFavGridContainer, 
        favModal, 
        divMyGifosContainer, 
        uploadGifoURL, 
        LOCAL_STORAGE_MY_GIFOS}