/**
 * Imports
 */


import {changeTheme, verifyTheme} from './darkmode.js';


/**
 * Global variables
 */



/**
 * Error Messages
*/

 /**
 * @method renderMsg
 * @description Render message on the DOM  revizar
 * @returns {String}
 */

const renderMsg = ((msg) => document.querySelector('.gifos-msg').innerHTML = msg );



/**
 * Run
*/


/*  DarkMode  */
verifyTheme();

/*  Listeners  */
changeTheme();


