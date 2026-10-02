// Native section links remain usable without JavaScript. Enhance them into
// notebook pages while preserving URLs and browser back/forward navigation.
(() => {
  const sections = [...document.querySelectorAll('main > section[id]')];
  if (!sections.length) return;
  const links = [...document.querySelectorAll('header a[href^="#"]')];
  function showSection() {
    const hash = location.hash.slice(1);
    const target = document.getElementById(({ fun: 'accomplishments', 'cool-stuff': 'accomplishments', 'older-projects': 'research-positions' })[hash] || hash);
    const active = sections.find(section => section === target || section.contains(target)) || sections[0];
    sections.forEach(section => { section.hidden = section !== active; });
    links.forEach(link => {
      if (link.hash === `#${active.id}`) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    return target && active.contains(target) ? target : active;
  }
  function scrollToTarget(target) {
    if (sections.includes(target)) window.scrollTo({ top: 0, behavior: 'instant' });
    else target.scrollIntoView({ behavior: 'instant', block: 'start' });
  }
  const initialTarget = showSection();
  if (location.hash) requestAnimationFrame(() => scrollToTarget(initialTarget));
  window.addEventListener('load', () => {
    if (location.hash) requestAnimationFrame(() => scrollToTarget(showSection()));
  }, { once: true });
  window.addEventListener('hashchange', () => {
    const target = showSection();
    scrollToTarget(target);
  });
})();

// Manual previous/next controls preserve keyboard access without auto-advancing.
(() => {
  document.querySelectorAll('.photo-carousel').forEach(carousel => {
  const slides = [...carousel.querySelectorAll('.photo-slide')];
  let selected = 0;
  const advance = direction => {
    selected = (selected + direction + slides.length) % slides.length;
    slides.forEach((slide, index) => { slide.hidden = index !== selected; });
  };
  carousel.querySelectorAll('[data-direction]').forEach(button => {
    button.addEventListener('click', () => advance(Number(button.dataset.direction)));
  });
  carousel.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      advance(event.key === 'ArrowRight' ? 1 : -1);
    }
  });
  });
})();
