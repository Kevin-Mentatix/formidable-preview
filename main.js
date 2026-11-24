// Formidable spec concept — nav, header state, scroll reveals.
(() => {
  document.documentElement.classList.add('js');
  const header = document.querySelector('.site-header');
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');

  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    nav.classList.toggle('open', open);
    header.classList.toggle('menu-open', open);
  });
  nav?.addEventListener('click', (e) => { if (e.target.closest('a') && nav.classList.contains('open')) toggle.click(); });

  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) { els.forEach((el) => el.classList.add('in')); return; }
  const io = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
  }), { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  els.forEach((el) => io.observe(el));
})();
