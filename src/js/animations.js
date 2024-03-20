function animations() {

  const observedElements = new Set();

  const animations = document.querySelectorAll(".animate");

  if (animations.length > 0) {
    let lastScrollY = 0;

    /* Observer */
    const triggerAnim = (entries) => {
      entries.forEach((entry) => {

        const delay = entry.target.dataset.delay || 0;

        const once = entry.target.dataset.once ?? "false"; // false 

        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('anim-on');
            if (once) {
              observedElements.add(entry.target);
            }
          }, delay);
        } else {

          if ( once != 'true' ) {
           entry.target.classList.remove('anim-on');
          }

        }
      });
    };

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.4
    };

    const observer = new IntersectionObserver(triggerAnim, options);

    window.addEventListener('scroll', () => {
      lastScrollY = window.scrollY;
    });

    animations.forEach(element => {
      observer.observe(element);
    });
  }

}

export default animations;