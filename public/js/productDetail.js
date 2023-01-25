/* Selector de imágenes */

function myFunction(imgs) {
    // Get the expanded image
    var expandImg = document.getElementById("expandedImg");
    // Get the image text
    var imgText = document.getElementById("imgtext");
    // Use the same src in the expanded image as the image being clicked on from the grid
    expandImg.src = imgs.src;
    // Show the container element (hidden with CSS)
    expandImg.parentElement.style.display = "block";
  }

  /* FUENTE: https://www.w3schools.com/howto/howto_js_tab_img_gallery.asp */

  /* Contador de cantidad de productos */
let counter = 1
let $count = document.getElementById('count');

  function add () {
    if(counter <= 10) {
        counter = counter + 1
        $count.innerHTML = `<p>${counter}</p>`
    }

  }

  function subtract () {
    if(counter > 0) {
        counter = counter - 1
        $count.innerHTML = `<p>${counter}</p>`
    }
  }