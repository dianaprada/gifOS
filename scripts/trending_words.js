/**
 * Imports
 */
import api from './services.js';
import {URLTrendingWords} from './global_variables.js';



/**
 * Global variables
 */

let allHTMLTrendingGifs = '';

/**
 * Declaration of DOM elements
 */

let divTrendingWordsContainer = document.getElementById('trendingWordsContainer');



/**
 * @method getTrendingWords
 * @description Call to the promises of endpoints
 * @param {}
 * @returns {}
 */

const getTrendingWords = ((api_key) => {
    const { trendingWordsData } = api;
    trendingWordsData(URLTrendingWords, api_key).then((response) => {getTrendingWordsJson(response.data);}).catch((error) => {renderMsg(error);});
  });


  /**
 * @method getTrendingWordsPromise
 * @description Call to the promises of endpoints
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
 * @description Go through the array of gifs of the response.data that the API gave us one by one
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
 * @description Trending words marking method
 * @param {array} 
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