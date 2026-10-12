(() => {
  'use strict';
  const header = document.querySelector('#header');
  const progress = document.querySelector('#read-progress');
  const menuBtn = document.querySelector('#menu-toggle');
  const mobileNav = document.querySelector('#mobile-nav');
  const onScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = `${max > 0 ? (scrollTop / max * 100).toFixed(2) : 0}%`;
    header?.classList.toggle('scrolled', scrollTop > 35);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  const closeMenu = () => {
    if (!menuBtn || !mobileNav) return;
    menuBtn.setAttribute('aria-expanded','false');
    menuBtn.setAttribute('aria-label','Abrir menú');
    mobileNav.hidden = true;
    document.body.classList.remove('menu-open');
  };
  menuBtn?.addEventListener('click', () => {
    const isOpen = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!isOpen));
    menuBtn.setAttribute('aria-label', isOpen ? 'Abrir menú' : 'Cerrar menú');
    mobileNav.hidden = isOpen;
    document.body.classList.toggle('menu-open', !isOpen);
  });
  mobileNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  window.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  window.addEventListener('resize', () => { if (window.innerWidth > 1050) closeMenu(); });
  document.querySelector('#year').textContent = new Date().getFullYear();

  const form = document.querySelector('#contact-form');
  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const company = String(data.get('company') || '').trim();
    const service = String(data.get('service') || '').trim();
    const message = String(data.get('message') || '').trim();
    let txt = `Hola, equipo de SEE Level Collective. Soy ${name}.`;
    if (company) txt += `\nEmpresa / organización: ${company}.`;
    txt += `\nEstoy interesado/a en: ${service}.`;
    if (message) txt += `\nMi consulta: ${message}`;
    txt += '\nMe gustaría conocer cómo podemos trabajar juntos.';
    const url = `https://wa.me/593958654132?text=${encodeURIComponent(txt)}`;
    const popup = window.open(url, '_blank', 'noopener,noreferrer');
    if (!popup) window.location.href = url;
  });
  if ('IntersectionObserver' in window) {
    const revealObs = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => { if (entry.isIntersecting) {entry.target.classList.add('shown'); obs.unobserve(entry.target);} });
    }, { threshold: 0.07, rootMargin: '0px 0px 38px 0px' });
    document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));
    const navLinks = document.querySelectorAll('.desktop-nav a');
    const navObs = new IntersectionObserver(entries => {
      for (const entry of entries) { if (entry.isIntersecting) {
        const hash = `#${entry.target.id}`;
        navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === hash));
      }}
    }, {rootMargin: '-20% 0px -66% 0px', threshold: 0});
    document.querySelectorAll('main section[id]').forEach(section => navObs.observe(section));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('shown'));
  }
})();
