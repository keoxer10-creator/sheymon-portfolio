(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const root = document.documentElement;
  const body = document.body;

  /* ---------- Language (FA / EN) ---------- */
  const langBtn = $('#language'), langText = $('#langText');
  let language = 'fa';
  const T = {
    fa: { lang: 'تغییر زبان به انگلیسی', theme: 'تغییر تم', close: 'بستن' },
    en: { lang: 'Switch to Persian', theme: 'Toggle theme', close: 'Close' }
  };
  function setLanguage(next) {
    language = next;
    const en = next === 'en';
    root.lang = next; root.dir = en ? 'ltr' : 'rtl';
    body.classList.toggle('english', en);
    $$('[data-fa][data-en]').forEach(el => {
      const v = el.getAttribute(en ? 'data-en' : 'data-fa');
      if (v != null) el.innerHTML = v;
    });
    langText.textContent = en ? 'فا' : 'EN';
    langBtn.setAttribute('aria-label', T[next].lang);
    $('#theme').setAttribute('aria-label', T[next].theme);
    $('#sheetClose').setAttribute('aria-label', T[next].close);
    try { localStorage.setItem('sheymon-language', next); } catch (_) {}
  }
  langBtn.addEventListener('click', () => setLanguage(language === 'fa' ? 'en' : 'fa'));
  try { if (localStorage.getItem('sheymon-language') === 'en') setLanguage('en'); else setLanguage('fa'); } catch (_) { setLanguage('fa'); }

  /* ---------- Theme (light / dark) ---------- */
  const themeMeta = $('meta[name="theme-color"]');
  function setTheme(t, save) {
    root.setAttribute('data-theme', t);
    if (themeMeta) themeMeta.setAttribute('content', t === 'dark' ? '#110D09' : '#FBF8F3');
    if (save) { try { localStorage.setItem('sheymon-theme', t); } catch (_) {} }
  }
  $('#theme').addEventListener('click', () => setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark', true));
  // follow the system only while the visitor hasn't picked a theme manually
  try {
    matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!localStorage.getItem('sheymon-theme')) setTheme(e.matches ? 'dark' : 'light', false);
    });
  } catch (_) {}

  /* ---------- Active section in nav + tab bar ---------- */
  if ('IntersectionObserver' in window) {
    const links = $$('.nav-link');
    const io = new IntersectionObserver(entries => entries.forEach(en => {
      if (en.isIntersecting) links.forEach(l => l.classList.toggle('active', l.hash === '#' + en.target.id));
    }), { rootMargin: '-40% 0px -55% 0px' });
    ['home', 'projects', 'about', 'toolkit', 'contact'].forEach(id => {
      const el = document.getElementById(id); if (el) io.observe(el);
    });
    // "toolkit" has no tab of its own: keep "About" highlighted there
    const ioTool = new IntersectionObserver(es => es.forEach(en => {
      if (en.isIntersecting) links.forEach(l => l.classList.toggle('active', l.hash === '#about'));
    }), { rootMargin: '-40% 0px -55% 0px' });
    const tk = $('#toolkit'); if (tk) ioTool.observe(tk);
  }

  /* ---------- Project bottom sheet ---------- */
  const sheet = $('#sheet'), backdrop = $('#sheetBackdrop'), closeBtn = $('#sheetClose');
  let lastFocus = null;
  function openSheet(card) {
    lastFocus = document.activeElement;
    const vis = $('#sheetVisual');
    vis.innerHTML = '';
    $$('.project-visual img', card).forEach(img => {
      const c = img.cloneNode(true); c.removeAttribute('loading'); vis.appendChild(c);
    });
    $('#sheetType').innerHTML = $('.tag-accent', card).innerHTML;
    $('#sheetTitle').innerHTML = $('h3', card).innerHTML;
    $('#sheetText').innerHTML = $('.project-body p', card).innerHTML;
    $('#sheetTags').innerHTML = $('.tags', card).innerHTML;
    $('#sheetTags').closest('.sheet-scroll').scrollTop = 0;
    body.classList.add('sheet-open');
    sheet.setAttribute('aria-hidden', 'false'); backdrop.setAttribute('aria-hidden', 'false');
    setTimeout(() => closeBtn.focus({ preventScroll: true }), 60);
  }
  function closeSheet() {
    if (!body.classList.contains('sheet-open')) return;
    body.classList.remove('sheet-open');
    sheet.setAttribute('aria-hidden', 'true'); backdrop.setAttribute('aria-hidden', 'true');
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  }
  $$('.project').forEach(card => {
    card.addEventListener('click', () => openSheet(card));
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openSheet(card); } });
  });
  closeBtn.addEventListener('click', closeSheet);
  backdrop.addEventListener('click', closeSheet);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSheet(); });
})();
