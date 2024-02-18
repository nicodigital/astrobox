import checkDevice from '../js/checkDevice'
// import smoothScroll from "../js/smoothscroll"
// import Rellax from "rellax";

/*/////////////////////////////////////////////////////////////////////*/
/*///////////////////////////// GET BASIC /////////////////////////////*/
/*/////////////////////////////////////////////////////////////////////*/

function getBasic() {

	const html = document.querySelector('html');
	const body = document.querySelector('body');
	const header = document.querySelector('header');
	let winW = document.documentElement.clientWidth;
	let winH = document.documentElement.clientHeight;
	let docH = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
	let headerH = header.offsetHeight;
	const device = checkDevice();

	/* Set Device on HTML tag */
	html.dataset.device = device;

	let basic = {
		html: html,
		body: body,
		winW: winW,
		winH: winH,
		docH: docH,
		device: device,
		header: header,
		headerH: headerH
	}

	return basic;

}

/* Storage Constant Device Values */
const basic = getBasic();
const html = basic.html;
const body = basic.body;
const device = basic.device;
let winH = basic.winH;
let winW = basic.winW;
let docH = basic.docH;
let header = basic.header;
let headerH = basic.headerH;

/*/////////////////////////////////////////////////////////////////////*/
/*///////////////////////// SCROLL MARKERS ////////////////////////////*/
/*/////////////////////////////////////////////////////////////////////*/
function setScrollPosition() {
	
	let lastScrollTop = ''

  const body = document.querySelector('body');
  const scrollPosition = window.scrollY;
  const windowHeight = window.innerHeight;
  const bodyHeight = document.body.scrollHeight;
	let footIn = false;

	var footer = document.querySelector('footer'); // <-- Cambiar a footer 

	// Opciones para el IntersectionObserver
	var options = {
		root: null, // Usar el viewport como área de observación
		rootMargin: '0px', // Margen adicional alrededor del área de observación
		threshold: 0.5 // Porcentaje del elemento que debe estar visible para activar la función de callback
	}

	// Función de callback que se ejecuta cuando el elemento entra en la pantalla
	var callback = function(entries, observer) {
		entries.forEach(entry => {

			if (entry.isIntersecting) {
				console.log('Elemento está ahora en pantalla!');
				body.setAttribute('data-scroll', 'bottom');
				// Puedes realizar aquí las acciones que desees cuando el elemento entre en pantalla
				// Por ejemplo, cambiar su estilo, cargar contenido adicional, etc.
			}else{

				if (scrollPosition < 100) {
					body.setAttribute('data-scroll', 'top');
				} else {
					body.setAttribute('data-scroll', 'down');
				}

			}
		});
	};

	// Crear una instancia de IntersectionObserver con la función de callback y opciones
	var observer = new IntersectionObserver(callback, options);
	// Observa el elemento target
	observer.observe(footer);

	}

/*/////////////////////////////////////////////////////////////////////*/
/*/////////////////////////// SMART MENU //////////////////////////////*/
/*/////////////////////////////////////////////////////////////////////*/

let lastScrollTop = ''

function smart_menu() {

	let st = window.scrollY;

	if (st > lastScrollTop) {
		body.dataset.stack = 'off';
	} else {
		body.dataset.stack = 'on';
	}

	lastScrollTop = st;

}

/*/////////////////////////////////////////////////////////////////////*/
/*////////////////////////// MENU MOBILE //////////////////////////////*/
/*/////////////////////////////////////////////////////////////////////*/

function menuMobile() {

  const btn_togg = document.querySelectorAll('.togg');

  // Crea un elemento div que tenga un ancho forzado de desbordamiento
  var scrollDiv = document.createElement('div');
  scrollDiv.style.width = '100px';
  scrollDiv.style.height = '100px';
  scrollDiv.style.overflow = 'scroll';

  // Agrega el elemento al documento, pero fuera del área visible
  document.body.appendChild(scrollDiv);

  // Calcula el ancho de la barra de desplazamiento restando el ancho del contenido interno del div del ancho del div con desbordamiento
  var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;

  // Elimina el div de prueba
  document.body.removeChild(scrollDiv);

  // La variable "scrollbarWidth" ahora contiene el ancho de la barra de desplazamiento en píxeles
  // console.log('Ancho de la barra de desplazamiento: ' + scrollbarWidth + ' píxeles');


  function menuToggler() {

    const toggler = document.querySelector('body');

    if ( toggler.classList.contains('menu-in') ) {

      toggler.classList.toggle('menu-in');
      html.style.overflowY = 'auto';
      body.style.overflowY = 'auto';
      body.style.paddingRight = '0';

    } else {
      toggler.classList.toggle('menu-in');
      html.style.overflowY = 'hidden';
      body.style.overflowY = 'hidden';
      body.style.paddingRight = scrollbarWidth + 'px';
    }

  }

  btn_togg.forEach(btn => {
    btn.onclick = () => menuToggler();
  });


}

/*/////////////////////////////////////////////////////////////////////*/
/*///////////////// EJECUTAR FUNCIONES EN EVENTOS /////////////////////*/
/*/////////////////////////////////////////////////////////////////////*/

/* Ejecutar el getBasic si cambia el tamaño del navegador o rota el dispositivo */
window.addEventListener("resize", getBasic);
window.addEventListener("orientationchange", getBasic);

document.addEventListener('scroll', function () {
	setScrollPosition();
	smart_menu();
});

document.addEventListener('DOMContentLoaded', function () {
	setScrollPosition();
	menuMobile();
});

document.addEventListener('astro:after-swap', function () {
	setScrollPosition();
  smart_menu();
	menuMobile();
});

/*/////////////////////////////////////////////////////////////////////*/
/*///////////////////////////// RELLAX ////////////////////////////////*/
/*/////////////////////////////////////////////////////////////////////*/

// var rellax = new Rellax('.rellax', {
// 	center: true
// });

/*/////////////////////////////////////////////////////////////////////*/
/*//////////////////// ALERT GIRAR DISPOSITIVO ////////////////////////*/
/*/////////////////////////////////////////////////////////////////////*/

if ( device != 'desktop' ) {

	function rotateDeviceHorizontal() {
		if (window.orientation === 0 || window.orientation === 180) {
			// Bloquear la orientación vertical
			alert("Por favor, gire su dispositivo para visualizar correctamente nuestro sitio.");
		}
	}

	function rotateDeviceVertical() {
		if (window.orientation === 90 || window.orientation === -90) {
			// Bloquear la orientación horizontal
			alert("Por favor, gire su dispositivo para visualizar correctamente nuestro sitio.");
		}
	}

	if ( device == 'bigTablet' ) {

		rotateDeviceHorizontal();

		window.addEventListener("orientationchange", function () {
			rotateDeviceHorizontal();
		});

	}

	if ( device == 'mobile' && device != 'bigTablet' ) {

		rotateDeviceVertical()

		window.addEventListener("orientationchange", function () {
			rotateDeviceVertical()
		});

	}

}

/*/////////////////////////////////////////////////////////////////////*/
/*///////////////////////////// ANIMATIONS ////////////////////////////*/
/*/////////////////////////////////////////////////////////////////////*/

let animations = document.querySelectorAll(".animate");

if (animations) {

	let lastScrollY = 0;
	let delay = 0;

	/* Observer */
	function triggerAnim(entries) {

		entries.forEach(entry => {
			// console.log(entry);

			if (window.scrollY > lastScrollY) {
				delay = entry.target.dataset.delay || 0;
			}

			// Loop Normal /////////////////////////////////////////////////////
			setTimeout(() => {
				entry.target.classList.toggle('anim-on', entry.isIntersecting);
			}, delay);

			//Loop Once ////////////////////////////////////////////////////////
			// if ( entry.isIntersecting ) {
			// 	setTimeout(() => {
			//         entry.target.classList.toggle('anim-on', true);
			//         // Eliminar el elemento del observador después de la animación
			//         observer.unobserve(entry.target);

			//         // Agregar el elemento a la lista de elementos observados
			//         observedElements.add(entry.target);
			//      }, delay);
			// }

		})

	}

	const options = {
		root: null, // aqui definimos el contenedor, cuando lo dejamos null, el contenedor es el viewport
		rootMargin: '0px', // by default is 0 -> esto amplía el alcance del contenedor en la cantidad de pixeles que le asignemos
		threshold: 0.4 // Si ponemos 0 el elmento se muestra apenas entra en el viewport
		// Si ponemos 1 el elemento se muestra cuando entró totalmente en el viewport
	}

	const observer = new IntersectionObserver(triggerAnim, options);

	window.addEventListener('scroll', () => {
		lastScrollY = window.scrollY;
	});

	// Volver a observar los elementos después de recargar la página
	window.addEventListener('load', () => {
		animations.forEach(element => {
			observer.observe(element);
		});
	});

}

// if ( device == 'desktop' ) {
// 	smoothScroll();
// }