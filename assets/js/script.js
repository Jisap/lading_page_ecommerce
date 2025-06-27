


'use strict'

// add event on multiple elements
const addEventOnElem = function (elements, eventType, callback) {
  // for (let i = 0; i < elements.length; i++) {                         // 1. Inicia un bucle que recorre la colección de elementos
  //   elements[i].addEventListener(eventType, callback);                // 2. A cada elemento individual, le añade un event listener 
  // }
  elements.forEach(elem => elem.addEventListener(eventType, callback));  // Más moderno 
}

const $header = document.querySelector('[data-header]');
const $navbar = document.querySelector('[data-navbar]');
const $navToggler = document.querySelectorAll('[data-nav-toggler]');
const $overlay = document.querySelector('[data-overlay]');
const $dropdownToggler = document.querySelector('[data-dropdown-toggler]');
const $dropdown = document.querySelector('[data-dropdown]');
const $cartToggler = document.querySelector('[data-cart-toggler]');
const $cartModal = document.querySelector('[data-cart-modal]');


//NAVBAR

const toggleNavbar = function () {           // Añade la clase active cada elemento 
  $navbar.classList.toggle('active');
  $overlay.classList.toggle('active');
  document.body.classList.toggle('active');
}

// Se añaden eventListeners a los botones de menú y X para el evento click -> callback toggleNavbar
addEventOnElem($navToggler, 'click', toggleNavbar); 

// DROPDOWN

const toggleElem = function (elem) {
  elem.classList.toggle('active');
}

$dropdownToggler.addEventListener('click', function () { // Cuando se hace click en el botón de dropdown se añade la clase active -> se hace visible el contenido de dropdown
  toggleElem($dropdown);
});

// TOOGLE CART

$cartToggler.addEventListener('click', function () {     // Cuando se hace click en el botón de cart se añade la clase active a cartModal -> se hace visible el contenido de cart
  toggleElem($cartModal);
});

// header active when windows scrollY 50px
const activeHeader = function () {
  window.scrollY > 50 ? $header.classList.add('active') : $header.classList.remove('active');
}

window.addEventListener('scroll', activeHeader);


// Custom slider

const $sliderContainers = document.querySelectorAll('[data-slider-container]'); // div ppal

function sliderInitial($sliderContainer) { // elementos del slider
  const $slider = $sliderContainer.querySelector('[data-slider]');    // UL
  const $prevBtn = $sliderContainer.querySelector('[data-prev-btn]'); // botón prev
  const $nextBtn = $sliderContainer.querySelector('[data-next-btn]'); // botón next
  
  function nextSlide() {
    $slider.appendChild($slider.firstElementChild); // Mueve el último item del slider a la derecha. El css se encarga de la animación visual
  }
  $nextBtn.addEventListener('click', nextSlide);    // Se añaden eventListeners a los botones de slider

  function prevSlide() {
    $slider.prepend($slider.lastElementChild);      // Mueve el primer item del slider a la izquierda
  }
  $prevBtn.addEventListener('click', prevSlide);

  let autoSlideIntervalId;

  function autoSlide() {
    autoSlideIntervalId = setInterval(function () {
      nextSlide();
    }, 2000);
  }

  autoSlide();

  function deleteAutoSliding() {
    clearInterval(autoSlideIntervalId);
  }

  // Stop auto sliding when mouseover
  $slider.addEventListener('mouseover', deleteAutoSliding);
  $prevBtn.addEventListener('mouseover', deleteAutoSliding);
  $nextBtn.addEventListener('mouseover', deleteAutoSliding);

  // Resume auto sliding when mouseout
  $slider.addEventListener('mouseout', autoSlide);
  $prevBtn.addEventListener('mouseout', autoSlide);
  $nextBtn.addEventListener('mouseout', autoSlide);

}

// for (let i = 0; i < $sliderContainers.length; i++) {
//   sliderInitial($sliderContainers[i]);
// }

for (const slider of $sliderContainers) {          // Iteramos sobre todos los contenedores de slider y les aplicamos la lógica. 
  sliderInitial(slider);
}