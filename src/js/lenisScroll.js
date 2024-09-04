import Lenis from 'lenis';

let lenisInstance = null;

  let lastCall = 0;
  const throttleScroll = (callback, limit) => {
    return (time) => {
      if (time - lastCall >= limit) {
        lastCall = time;
        callback(time);
      }
      requestAnimationFrame((t) => throttleScroll(callback, limit)(t));
    };
  };

  // Crear una nueva instancia de Lenis
  lenisInstance = new Lenis({
    smoothWheel: true,
    wheelMultiplier: 1,
    duration: 1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothTouch: false, // Mobile
    touchMultiplier: 2, // Sensibilidad en móvil
    infinite: false // Desplazamiento infinito
  });

  const smoothLinks = document.querySelectorAll('.anchor');

  smoothLinks.forEach(link => {
    let anchor = link.getAttribute('href');

    // Guardar la referencia al manejador de eventos
    link.clickHandler = (e) => {
      e.preventDefault();

      lenisInstance.scrollTo(anchor, {
        duration: 2, // Puedes ajustar la duración según tus necesidades
        easing: (t) => 1 - Math.pow(1 - t, 6) // Ejemplo de una función de easing personalizada
      });
    };

    // Agregar el event listener
    link.addEventListener('click', link.clickHandler);
  });

  function raf(time) {
    throttleScroll((time) => lenisInstance.raf(time), 16 )(time); // 60 fps (1000ms/60 ≈ 16ms)
  }

  requestAnimationFrame(raf);

