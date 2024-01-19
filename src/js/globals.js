/*/////////////////////////////////////////////////////////////////////*/
/*//////////////////////////// GET DEVICE /////////////////////////////*/
/*/////////////////////////////////////////////////////////////////////*/

function getDevice() {

	const html = document.querySelector('html');
	const body = document.querySelector('body');
	const header = document.querySelector('header');
	let winW = document.documentElement.clientWidth;
	let winH = document.documentElement.clientHeight;
	let docH = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
	let headerH = header.offsetHeight;

	let isDesktop = false;
	let isMobile = false;
	let isTablet = false;
	let isBigTablet = false;
	let device = '';

	if (winW >= 1064) {
		isDesktop = true;
		device = 'desktop';
	} else if (winW < 1064 && winW > 992) {
		isBigTablet = true;
		device = 'tablet';
	} else if (winW < 992 && winW > 640) {
		isTablet = true;
		device = 'tablet';
	} else if (winW < 640) {
		isMobile = true;
		device = 'mobile';
	}

	/* Set Device on HTML tag */
	html.dataset.device = device;

	let device_data = {
		html: html,
		body: body,
		winW: winW,
		winH: winH,
		docH: docH,
		header: header,
		isDesktop: isDesktop,
		isMobile: isMobile,
		isBigTablet: isBigTablet,
		isTablet: isTablet,
		headerH: headerH
	}

	// get_position(header_brand);
	// get_position(menu_brand);

	return device_data;

}

/* Storage Constant Device Values */
const device_data = getDevice();
const html = device_data.html;
const body = device_data.body;
let winH = device_data.winH;
let winW = device_data.winW;
let docH = device_data.docH;
let header = device_data.header;
let isDesktop = device_data.isDesktop;
let isMobile = device_data.isMobile;
let isTablet = device_data.isTablet;
let isBigTablet = device_data.isBigTablet;
let headerH = device_data.headerH;

/* Ejecutar el getDevice si cambia el tamaño del navegador o rota el dispositivo */
window.addEventListener("resize", getDevice);
window.addEventListener("orientationchange", getDevice);

/*/////////////////////////////////////////////////////////////////////*/
/*///////////////////////// SCROLL MARKERS ////////////////////////////*/
/*/////////////////////////////////////////////////////////////////////*/
function setScrollPosition() {
  const body = document.querySelector('body');
  const scrollPosition = window.scrollY;
  const windowHeight = window.innerHeight;
  const bodyHeight = document.body.scrollHeight;

  if (scrollPosition < 100) {
    body.setAttribute('data-scroll', 'top');
  } else if (scrollPosition + windowHeight === bodyHeight) {
    body.setAttribute('data-scroll', 'bottom');
  } else {
    body.setAttribute('data-scroll', 'down');
  }
}

window.addEventListener('scroll', setScrollPosition);

document.addEventListener('DOMContentLoaded', function () {
  setScrollPosition();
});

document.addEventListener('astro:after-swap', function () {
  setScrollPosition();
});

/*/////////////////////////////////////////////////////////////////////*/
/*//////////////////// ALERT GIRAR DISPOSITIVO ////////////////////////*/
/*/////////////////////////////////////////////////////////////////////*/

if (!isDesktop) {

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

	if (isBigTablet) {

		rotateDeviceHorizontal();

		window.addEventListener("orientationchange", function () {
			rotateDeviceHorizontal();
		});

	}

	if (isMobile && !isBigTablet) {

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