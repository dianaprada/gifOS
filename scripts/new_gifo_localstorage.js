/**
 * Imports
 */

import {LOCAL_STORAGE_MY_GIFOS} from './global_variables.js';


/** Add and remove to Localstorage
*/

/**
 * @method addGifLocalStorage
 * @description Add localstorage method of all cards
 * @param {string} gif_id
 */
const addGifLocalStorage = ((selectedGif) => {
    let gifSelected = JSON.parse(localStorage.getItem(LOCAL_STORAGE_MY_GIFOS)) || [];
    gifSelected.push(selectedGif);

    localStorage.setItem(LOCAL_STORAGE_MY_GIFOS, JSON.stringify(gifSelected));
  });
  
  
   /**
   * @method getAllGifLocalStorage 
   * @description get all the gifs from the localstorage
   */

   const getAllGifLocalStorage = (() => {
    let gifSelected = JSON.parse(localStorage.getItem(LOCAL_STORAGE_MY_GIFOS)) || [];
    return gifSelected.toString();

   });


      /**
   * @method existGifIDLocalStorage
   * @description check if there are gifs in localstorage, returns true or false
   */

  const existGifIDLocalStorage = ((gif_id) => {
    let IDList= JSON.parse(localStorage.getItem(LOCAL_STORAGE_MY_GIFOS)) || [];
    let index = IDList.indexOf(gif_id);
    if(index >= 0){
        return true;
    }
    else{
        return false;
    }
   });


   export {addGifLocalStorage, getAllGifLocalStorage, existGifIDLocalStorage};