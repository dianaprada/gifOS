/**
 * Global variables
 */

let darkMode = localStorage.getItem('darkMode'); 

/**
 * Declaration of DOM elements
 */
const darkModeToggle = document.querySelector('.dark_mode');

/**
 * @method enableDarkMode
 * @description Enable DarkMode and Update darkMode in localStorage
 * @param {}
 * @returns {}
 */

const enableDarkMode = () => {
    document.body.classList.add('dark');
    document.getElementById("dark_ligth").innerHTML = "Modo Diurno";

    localStorage.setItem('darkMode', 'enabled');
}


/**
 * @method disableDarkMode
 * @description Disable DarkMode and Update darkMode in localStorage
 * @param {}
 * @returns {}
*/

const disableDarkMode = () => {
    document.body.classList.remove('dark');
    document.getElementById("dark_ligth").innerHTML = "Modo Nocturno";

    localStorage.setItem('darkMode', 'disable');
}

const verifyTheme = (() => {
    darkMode = localStorage.getItem('darkMode'); 
    if (!darkMode){
        localStorage.setItem('darkMode', 'disable');
    }
    if (darkMode == 'enabled') {
        enableDarkMode();
     } 
    else {  
        disableDarkMode(); 
    }
})
 
const changeTheme = (() => {
    darkModeToggle.addEventListener('click', () => {
        darkMode = localStorage.getItem('darkMode'); 
        if (darkMode !== 'enabled') {
            enableDarkMode();
         } 
        else {  
            disableDarkMode(); 
        }
    });

})


/**
 * Exports
 */
export {changeTheme, verifyTheme};
