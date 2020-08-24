/**
 * Imports
 */
import api from './services.js';




/**
 * Global variables
 */

const URLTrendingWords = 'http://api.giphy.com/v1/trending/searches';

let divTrendingWordsContainer = document.getElementById('trendingWordsContainer');
let allHTMLTrendingGifs = '';


/**
 * @method getTrendingWords
 * @description LLamado a la función
 * @param {}
 * @returns {}
 */

const getTrendingWords = ((api_key) => {
    const { trendingWordsData } = api;
    trendingWordsData(URLTrendingWords, api_key).then((response) => {getTrendingWordsJson(response.data);}).catch((error) => {renderMsg(error);});
  });


  /**
 * @method getTrendingWordsPromise
 * @description LLamado a la función
 * @param {}
 * @returns {}
 */

  const getTrendingWordsPromise = ((api_key) => {
    return new Promise((resolve, reject) => {

        const { trendingWordsData } = api;

        trendingWordsData(URLTrendingWords, api_key)
        .then((response) => {
            getTrendingWordsJson(response.data);
        }).catch((error) => {
          renderMsg(error);
        }).then((response) => resolve(response)).catch((error) => reject(error));

    });
  });

  
  /**
 * @method getTrendingWordsJson
 * @description Recorre uno por uno el array de Trending Search Terms del response.data
 * @param {array} allTrendingWords
 * @returns {}
 */

 const getTrendingWordsJson = ((allTrendingWords) => {
    for (let i=0; i<5; i++) {
        allHTMLTrendingGifs+= trendingWords(allTrendingWords[i]);         
    }
    divTrendingWordsContainer.innerHTML = allHTMLTrendingGifs.slice(0, -2);
   
 });

  /**
 * @method trendingWords
 * @description Crea el HTML
 * @param {array} allTrendingWords
 * @returns {}
 */

const trendingWords = ((data) => {
    return(
       `<span class="trending_words" id="trending_words">${data}</span>, `
    );
});

 /**
 * @method renderMsg
 * @description Render message on the DOM
 * @returns {String}
 */

const renderMsg = ((msg) => document.querySelector('.gifos-msg').innerHTML = msg );


export {getTrendingWords, getTrendingWordsPromise};