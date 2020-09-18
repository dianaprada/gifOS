
  /**
 * @method downloadBlobAsFile
 * @description
 * @param {string} 
 * @returns {}
 */

async function downloadBlobAsFile(url) {
    //create new a element
    let a = document.createElement('a');
    // get image as blob
    let response = await fetch(url);
    let file = await response.blob();
    // use download attribute https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#Attributes
    a.download = 'myGif.gif';
    a.href = window.URL.createObjectURL(file);
    //store download url in javascript https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes#JavaScript_access
    a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
    //click on element to start download
    a.click();
  }


/**
 * @method addEventDownloadGif
 * @description 
 * @param {} 
 * @returns {}
*/

const addEventDownloadGif = (buttonCards) => {
    buttonCards.forEach(buttonCard => {
        let gif_url = buttonCard.getAttribute("data-gif_url");
        buttonCard.addEventListener("click",  () => {
            downloadBlobAsFile(gif_url);
        }, false);    
});
}

/**
 * @method addEventDownloadGifModal
 * @description 
 * @param {} 
 * @returns {}
*/

const addEventDownloadGifModal = (button) => {      
        button.addEventListener("click",  () => {
            let gif_url = button.getAttribute("data-gif_url");
            downloadBlobAsFile(gif_url);
        }, false);    

}



  export { addEventDownloadGif, addEventDownloadGifModal };