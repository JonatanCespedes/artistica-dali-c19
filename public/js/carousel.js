let slideIndex = 1; //Establece el slide inicial
showSlides(slideIndex)

// Controles de anterior y siguiente
function plusSlides(number) {
    showSlides(slideIndex += number)
}

// Controles de imagen en miniatura
function currentSlide (number) {
    showSlides(slideIndex = number)
}

function showSlides (number) {
    let i;
    let slides = document.getElementsByClassName("slides"); //captura todos los elementos del DOM que tengan la clase "slides"
    let dots = document.getElementsByClassName("dot");//captura todos los elementos del DOM que tengan la clase "dot"
    /* Si el numero recibido por parámetro es mayor a
     la cantidad de elementos que contienen la clase slides, 
     setea la variable slides a 1. Por lo tanto la imagen que se muestra 
     va a ser la primera, con esto evitamos que haya un error al pasar un
     índice que no corresponda a la longitud del array */
    if (number > slides.length) {
        slideIndex = 1
    }
    /* si el número recibido por parámetro es menor a 1, setea la variable
    slideIndex a el largo del array, con lo cual evitamos el error por
    un indice menor. Muestra la ultima imagen. */
    if (number < 1 ) {
        slideIndex = slides.length
    }
    /* Recorre el array de slides y en cada iteración coloca display none a cada elemento (nodo) del array */
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    /* Recorre el array de puntos y en cada iteración reemplaza la clase 
    "dot-active" de todos los elementos que la contengan */
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" dot-active", "");
    }

    /* Según el índice indicado en la variable, se le dará display "block" al slide que corresponda */
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " dot-active";
}

/* EXTRAAAA */

setInterval(() => {
    currentSlide(slideIndex + 1)
}, 5000);  

