(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const languageButton = $('#language');
  const langText = $('#langText');
  let language = 'fa';
  function setLanguage(next) {
    language = next;
    const isEnglish = next === 'en';
    document.documentElement.lang = next;
    document.documentElement.dir = isEnglish ? 'ltr' : 'rtl';
    document.body.classList.toggle('english', isEnglish);
    $$('[data-fa][data-en]').forEach(el => {
      const value = el.getAttribute(isEnglish ? 'data-en' : 'data-fa');
      if (value != null) el.innerHTML = value;
    });
    langText.textContent = isEnglish ? 'FA' : 'EN';
    languageButton.setAttribute('aria-label', isEnglish ? 'Switch to Persian' : 'Switch to English');
    try { localStorage.setItem('sheymon-language', next); } catch (_) {}
  }
  languageButton?.addEventListener('click', () => setLanguage(language === 'fa' ? 'en' : 'fa'));
  try { const saved = localStorage.getItem('sheymon-language'); if (saved === 'en') setLanguage('en'); } catch (_) {}

  const menuButton = $('#menuButton');
  const nav = $('#nav');
  menuButton?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.textContent = open ? '×' : '☰';
  });
  $$('#nav a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open'); menuButton?.setAttribute('aria-expanded', 'false');
    if (menuButton) menuButton.textContent = '☰';
  }));

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !reduced) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    }), { threshold: .1, rootMargin: '0px 0px -35px 0px' });
    $$('.reveal').forEach(el => observer.observe(el));
  } else $$('.reveal').forEach(el => el.classList.add('visible'));

  const halo = $('.pointer-halo');
  if (halo && matchMedia('(pointer:fine)').matches && !reduced) {
    let frame = 0, x = 0, y = 0;
    document.addEventListener('pointermove', event => {
      x = event.clientX; y = event.clientY;
      if (!frame) frame = requestAnimationFrame(() => {
        halo.style.left = `${x}px`; halo.style.top = `${y}px`; halo.style.opacity = '.9'; frame = 0;
      });
    }, { passive: true });
    document.addEventListener('pointerleave', () => halo.style.opacity = '0');
  }

  // Gentle card tilt is deliberately limited to desktop pointers; no scroll-linked layout shifts.
  if (!reduced && matchMedia('(hover:hover) and (pointer:fine)').matches) {
    $$('.project-card').forEach(card => {
      card.addEventListener('pointermove', event => {
        const rect = card.getBoundingClientRect();
        const rx = (event.clientY - rect.top) / rect.height - .5;
        const ry = (event.clientX - rect.left) / rect.width - .5;
        card.style.transform = `perspective(1000px) translateY(-5px) rotateX(${(-rx * 1.7).toFixed(2)}deg) rotateY(${(ry * 1.7).toFixed(2)}deg)`;
      }, { passive: true });
      card.addEventListener('pointerleave', () => { card.style.transform = ''; });
    });
  }

  // Keep the active navigation cue subtle and avoid any horizontal page movement.
  if ('IntersectionObserver' in window) {
    const links = $$('#nav a');
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) links.forEach(link => link.classList.toggle('active', link.hash === `#${entry.target.id}`));
    }), { rootMargin: '-35% 0px -55% 0px' });
    ['home', 'projects', 'about', 'contact'].forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });
  }
})();
