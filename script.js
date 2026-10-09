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

  // Disable cursor-following glow and card tilt: they caused unnecessary repaints
  // and can feel jittery on lower-powered phones. Hover feedback stays CSS-only.

  // Keep the active navigation cue subtle and avoid any horizontal page movement.
  if ('IntersectionObserver' in window) {
    const links = $$('#nav a');
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) links.forEach(link => link.classList.toggle('active', link.hash === `#${entry.target.id}`));
    }), { rootMargin: '-35% 0px -55% 0px' });
    ['home', 'projects', 'about', 'contact'].forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });
  }
})();
