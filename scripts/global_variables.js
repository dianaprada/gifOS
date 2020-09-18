
/**
 * Global variables
 */

const api_key = 'FXvt5yHvROwhxmFNSs87LoAAc6qhfrwz';

const searchURL = 'https://api.giphy.com/v1/gifs/search';

const URLTrending = 'https://api.giphy.com/v1/gifs/trending';

const URLTrendingWords = 'https://api.giphy.com/v1/trending/searches';

const autocompleteURL = 'https://api.giphy.com/v1/gifs/search/tags';

const getGIFbyIDURL = 'https://api.giphy.com/v1/gifs';

const uploadGifoURL = 'https://upload.giphy.com/v1/gifs';

const LOCAL_STORAGE_FAVORITE_GIFS = "favoriteGifs";

const divFavGridContainer = document.getElementById('favResultsGrid');

const favModal = document.getElementById("favorite-gif-Modal");

const divMyGifosContainer = document.getElementById('myGifosResultsGrid');

const downloadModal = document.getElementById("download-gif-Modal");

const LOCAL_STORAGE_MY_GIFOS = "myGifos";


export {api_key, 
        searchURL, 
        URLTrending, 
        URLTrendingWords, 
        getGIFbyIDURL, 
        autocompleteURL,
        LOCAL_STORAGE_FAVORITE_GIFS, 
        divFavGridContainer, 
        favModal, 
        divMyGifosContainer, 
        uploadGifoURL, 
        downloadModal,
        LOCAL_STORAGE_MY_GIFOS}