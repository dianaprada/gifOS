/**
 * Imports
 */

import {LOCAL_STORAGE_FAVORITE_GIFS} from './global_variables.js';



/** Add and remove to Localstorage
*/

/**
 * @method addGifLocalStorage
 * @description Add localstorage method of all cards
 * @param {string} gif_id
 */
const addGifLocalStorage = ((selectedGif) => {
    let gifSelected = JSON.parse(localStorage.getItem(LOCAL_STORAGE_FAVORITE_GIFS)) || [];
    gifSelected.push(selectedGif);

    localStorage.setItem(LOCAL_STORAGE_FAVORITE_GIFS, JSON.stringify(gifSelected));
  });
  
  
  /**
   * @method removeGifLocalStorage
   * @description  Remove gif selected from localstorage
   */
  const removeGifLocalStorage = ((gif_id) => { 
    let gifSelected = JSON.parse(localStorage.getItem(LOCAL_STORAGE_FAVORITE_GIFS)) || [];
    let index = gifSelected.indexOf(gif_id);
    gifSelected.splice(index, 1);

    localStorage.setItem(LOCAL_STORAGE_FAVORITE_GIFS, JSON.stringify(gifSelected));
  });


   /**
   * @method getAllGifLocalStorage 
   * @description get all the gifs from the localstorage
   */

   const getAllGifLocalStorage = (() => {
    let gifSelected = JSON.parse(localStorage.getItem(LOCAL_STORAGE_FAVORITE_GIFS)) || [];
    return gifSelected.toString();

   });


      /**
   * @method existGifIDLocalStorage
   * @description check if there are gifs in localstorage, returns true or false
   */

  const existGifIDLocalStorage = ((gif_id) => {
    let IDList= JSON.parse(localStorage.getItem(LOCAL_STORAGE_FAVORITE_GIFS)) || [];
    let index = IDList.indexOf(gif_id);
    if(index >= 0){
        return true;
    }
    else{
        return false;
    }
   });


   /**
 * Exports
 */

   export {addGifLocalStorage, removeGifLocalStorage, getAllGifLocalStorage, existGifIDLocalStorage};