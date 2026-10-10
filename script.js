(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const root = document.documentElement;
  const body = document.body;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Project content (shown in the bottom sheet) ---------- */
  const P = {
    trade: {
      icon: 'i-chart', tags: ['C#', 'WPF', 'OxyPlot'],
      fa: {
        name: 'POYA TRADE', kind: 'تحلیل بازار', type: 'تحلیل بازار',
        tagline: 'تصویر کامل بازار رمزارزها، در یک پنجره.',
        text: 'POYA TRADE یک برنامه‌ی دسکتاپ ویندوز برای دنبال‌کردن و تحلیل روزانه‌ی بازار رمزارزهاست. صفحه‌ی اصلی تصویر کلی بازار را نشان می‌دهد و از همان‌جا می‌شود به نمودار هر دارایی و ابزارهای تحلیل رسید؛ بدون جابه‌جایی میان چند برنامه.',
        features: [
          ['i-grid', 'نمای کلی بازار', 'کارت‌های خلاصه برای ارزش کل بازار و دارایی‌های اصلی، همراه با درصد تغییر.'],
          ['i-chart', 'نمودار کندل‌استیک', 'نمایش قیمت در بازه‌های زمانی مختلف با نمودارهای تعاملی مبتنی بر OxyPlot.'],
          ['i-gauge', 'ابزارهای تحلیل تکنیکال', 'اندیکاتورها و ابزارهای تحلیلی در کنار نمودار، برای تصمیم‌گیری سریع‌تر.'],
          ['i-list', 'فهرست دارایی‌ها', 'ستون کناری با دارایی‌های مهم، قیمت لحظه‌ای و تغییرات برای دسترسی سریع.']
        ],
        kv: [['پلتفرم', 'ویندوز (دسکتاپ)'], ['فناوری', 'C# · WPF · OxyPlot']]
      },
      en: {
        name: 'POYA TRADE', kind: 'Market analytics', type: 'Market analysis',
        tagline: 'The whole crypto market, in a single window.',
        text: 'POYA TRADE is a Windows desktop application for following and analysing the crypto market every day. The home view gives a clear picture of the market, and from there you move straight into any asset’s chart and analysis tools — without switching between several programs.',
        features: [
          ['i-grid', 'Market overview', 'Summary cards for total market value and key assets, with percentage change.'],
          ['i-chart', 'Candlestick charts', 'Price across multiple timeframes with interactive charts powered by OxyPlot.'],
          ['i-gauge', 'Technical analysis tools', 'Indicators and analysis tools beside the chart for faster decisions.'],
          ['i-list', 'Asset list', 'A side panel with key assets, prices and changes for quick access.']
        ],
        kv: [['Platform', 'Windows (desktop)'], ['Built with', 'C# · WPF · OxyPlot']]
      }
    },
    tarazino: {
      icon: 'i-db', tags: ['C#', '.NET MAUI', 'SQLite'],
      fa: {
        name: 'ترازینو', kind: 'حسابداری فروشگاهی', type: 'حسابداری و انبار',
        tagline: 'حساب‌وکتاب فروشگاه، منظم و در یک جا.',
        text: 'ترازینو برای فروشگاه‌هایی طراحی شده که می‌خواهند خرید، فروش و موجودی را در یک برنامه‌ی منظم نگه دارند. فاکتورها، کالاها، اشخاص و انبار به هم متصل‌اند و داشبورد روزانه وضعیت کسب‌وکار را در یک نگاه نشان می‌دهد.',
        features: [
          ['i-gauge', 'داشبورد روزانه', 'فروش امروز، تعداد فاکتورها و ارزش موجودی در همان صفحه‌ی اول.'],
          ['i-receipt', 'فاکتور خرید و فروش', 'ثبت سریع فاکتور و مرور آخرین فاکتورهای صادرشده.'],
          ['i-box', 'کالاها و موجودی', 'وضعیت موجودی، کالاهای کم‌موجود و تمام‌شده با نمایش تصویری.'],
          ['i-users', 'اشخاص', 'فهرست مشتریان و تأمین‌کنندگان در کنار حساب‌ها.']
        ],
        kv: [['پلتفرم', 'موبایل و دسکتاپ'], ['فناوری', 'C# · .NET MAUI · SQLite'], ['داده', 'ذخیره‌سازی محلی']]
      },
      en: {
        name: 'Tarazino', kind: 'Retail accounting', type: 'Accounting & inventory',
        tagline: 'A shop’s books, orderly and in one place.',
        text: 'Tarazino is built for shops that want purchases, sales and stock managed in one orderly application. Invoices, products, contacts and the warehouse are connected, and the daily dashboard shows the state of the business at a glance.',
        features: [
          ['i-gauge', 'Daily dashboard', 'Today’s sales, invoice count and stock value on the very first screen.'],
          ['i-receipt', 'Sales & purchase invoices', 'Quick invoice entry and a view of the latest invoices issued.'],
          ['i-box', 'Products & stock', 'Stock status with a visual breakdown of low and sold-out items.'],
          ['i-users', 'Contacts', 'Customers and suppliers listed alongside the accounts.']
        ],
        kv: [['Platform', 'Mobile & desktop'], ['Built with', 'C# · .NET MAUI · SQLite'], ['Data', 'Local storage']]
      }
    },
    stellar: {
      icon: 'i-spark', tags: ['Game dev', '3D', 'Sci-Fi'],
      fa: {
        name: 'STELLAR VANGUARD', kind: 'بازی علمی‌تخیلی', type: 'بازی و تجربه تعاملی',
        tagline: 'جهانی علمی‌تخیلی که قدم‌به‌قدم ساخته می‌شود.',
        text: 'STELLAR VANGUARD یک بازی سه‌بعدی علمی‌تخیلی در دست توسعه است. تمرکز پروژه بر ساخت یک جهان منسجم است: از هویت بصری و رابط کاربری تا حس کنترل و حرکت در فضا.',
        features: [
          ['i-palette', 'هویت بصری', 'پالت گرم، فضای کیهانی و آیکن اختصاصی برای شکل‌دادن به دنیای بازی.'],
          ['i-planet', 'جهان بازی', 'فضاپیماها، سیاره‌ها و محیط‌هایی که مرحله‌به‌مرحله ساخته می‌شوند.'],
          ['i-target', 'تجربه‌ی بازی‌پذیری', 'طراحی کنترل و بازخورد برای تجربه‌ای روان و قابل‌اتکا.']
        ],
        kv: [['نوع', 'بازی سه‌بعدی'], ['ژانر', 'علمی‌تخیلی'], ['وضعیت', 'در حال توسعه']]
      },
      en: {
        name: 'STELLAR VANGUARD', kind: 'Sci-fi game', type: 'Game & interactive',
        tagline: 'A sci-fi universe, built one step at a time.',
        text: 'STELLAR VANGUARD is a 3D sci-fi game in development. The project is focused on building a coherent world: from visual identity and interface to the feel of control and movement in space.',
        features: [
          ['i-palette', 'Visual identity', 'A warm palette, cosmic setting and a dedicated icon that shape the game’s world.'],
          ['i-planet', 'Game world', 'Ships, planets and environments that are built stage by stage.'],
          ['i-target', 'Gameplay experience', 'Control and feedback designed for a smooth, dependable experience.']
        ],
        kv: [['Type', '3D game'], ['Genre', 'Sci-fi'], ['Status', 'In development']]
      }
    }
  };
  const UI = {
    fa: { lang: 'تغییر زبان به انگلیسی', theme: 'تغییر تم', close: 'بستن', inside: 'داخل برنامه', insideGame: 'درباره‌ی بازی', details: 'مشخصات', open: 'مشاهده‌ی پروژه' },
    en: { lang: 'Switch to Persian', theme: 'Toggle theme', close: 'Close', inside: 'Inside the app', insideGame: 'About the game', details: 'Details', open: 'View project' }
  };

  /* ---------- Language ---------- */
  const langBtn = $('#language'), langText = $('#langText');
  let language = 'fa';
  function setLanguage(next) {
    language = next;
    const en = next === 'en';
    root.lang = next; root.dir = en ? 'ltr' : 'rtl';
    body.classList.toggle('english', en);
    $$('[data-fa][data-en]').forEach(el => {
      const v = el.getAttribute(en ? 'data-en' : 'data-fa');
      if (v != null) el.innerHTML = v;
    });
    langText.textContent = en ? 'FA' : 'EN';
    langBtn.setAttribute('aria-label', UI[next].lang);
    $('#theme').setAttribute('aria-label', UI[next].theme);
    $('#sheetClose').setAttribute('aria-label', UI[next].close);
    renderIsland(); if (currentProject) fillSheet(currentProject);
    try { localStorage.setItem('sheymon-language', next); } catch (_) {}
  }

  /* ---------- Theme ---------- */
  const themeMeta = $('meta[name="theme-color"]');
  function setTheme(t, save) {
    root.setAttribute('data-theme', t);
    if (themeMeta) themeMeta.setAttribute('content', t === 'dark' ? '#110D09' : '#FBF8F3');
    if (save) { try { localStorage.setItem('sheymon-theme', t); } catch (_) {} }
  }
  $('#theme').addEventListener('click', () => setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark', true));
  try {
    matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!localStorage.getItem('sheymon-theme')) setTheme(e.matches ? 'dark' : 'light', false);
    });
  } catch (_) {}

  /* ---------- Bottom sheet ---------- */
  const sheet = $('#sheet'), backdrop = $('#sheetBackdrop'), closeBtn = $('#sheetClose'), scroller = $('#sheetScroll');
  let currentProject = null, lastFocus = null;

  function fillSheet(id) {
    const d = P[id], t = d[language], card = $(`.project[data-project="${id}"]`);
    const vis = $('#sheetVisual'); vis.innerHTML = '';
    $$('.project-visual img', card).forEach(img => { const c = img.cloneNode(true); c.removeAttribute('loading'); vis.appendChild(c); });
    $('#sheetType').textContent = t.type;
    $('#sheetTitle').textContent = t.name;
    $('#sheetTagline').textContent = t.tagline;
    $('#sheetText').textContent = t.text;
    $('#subInside').textContent = id === 'stellar' ? UI[language].insideGame : UI[language].inside;
    $('#subDetails').textContent = UI[language].details;
    $('#sheetFeatures').innerHTML = t.features.map(([ic, title, desc], i) =>
      `<li><span class="sq sq-${[1, 2, 4, 3][i % 4]}"><svg class="ic" aria-hidden="true"><use href="#${ic}"/></svg></span><span class="li-text"><b>${title}</b><small>${desc}</small></span></li>`).join('');
    $('#sheetKV').innerHTML = t.kv.map(([k, v]) => `<div><dt>${k}</dt><dd dir="auto">${v}</dd></div>`).join('');
    $('#sheetTags').innerHTML = d.tags.map(x => `<span class="tag">${x}</span>`).join('');
  }
  function openSheet(id) {
    lastFocus = document.activeElement; currentProject = id;
    fillSheet(id); scroller.scrollTop = 0;
    sheet.style.transform = ''; backdrop.style.opacity = '';
    body.classList.add('sheet-open');
    sheet.setAttribute('aria-hidden', 'false'); backdrop.setAttribute('aria-hidden', 'false');
    setTimeout(() => closeBtn.focus({ preventScroll: true }), 80);
  }
  function closeSheet() {
    if (!body.classList.contains('sheet-open')) return;
    sheet.style.transform = ''; backdrop.style.opacity = '';
    body.classList.remove('sheet-open'); currentProject = null;
    sheet.setAttribute('aria-hidden', 'true'); backdrop.setAttribute('aria-hidden', 'true');
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  }
  $$('.project').forEach(card => {
    const id = card.dataset.project;
    card.addEventListener('click', () => openSheet(id));
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openSheet(id); } });
  });
  closeBtn.addEventListener('click', closeSheet);
  backdrop.addEventListener('click', closeSheet);
  $('.grabber').addEventListener('click', closeSheet);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSheet(); });

  // drag down to dismiss (touch)
  let startY = 0, dy = 0, dragging = false, tracking = false;
  sheet.addEventListener('touchstart', e => {
    tracking = scroller.scrollTop <= 0; dragging = false; dy = 0; startY = e.touches[0].clientY;
  }, { passive: true });
  sheet.addEventListener('touchmove', e => {
    if (!tracking) return;
    dy = e.touches[0].clientY - startY;
    if (dy > 8 && scroller.scrollTop <= 0) {
      dragging = true; e.preventDefault();
      sheet.style.transition = 'none';
      sheet.style.transform = `translateY(${dy}px)`;
      backdrop.style.opacity = String(Math.max(0, 1 - dy / 420));
    }
  }, { passive: false });
  sheet.addEventListener('touchend', () => {
    if (!dragging) return;
    sheet.style.transition = ''; void sheet.offsetHeight;
    if (dy > 120) closeSheet(); else { sheet.style.transform = ''; backdrop.style.opacity = ''; }
    dragging = false; tracking = false;
  });

  /* ---------- Dynamic-Island project switcher ---------- */
  const island = $('#island'), order = ['trade', 'tarazino', 'stellar'];
  let islandIdx = 0, islandOpen = false, islandTimer = null;
  function renderIsland() {
    const id = order[islandIdx], t = P[id][language];
    $('#islandName').textContent = t.name; $('#islandKind').textContent = t.kind;
    $('#islandUse').setAttribute('href', '#' + P[id].icon);
    island.setAttribute('aria-label', UI[language].open + ': ' + t.name);
  }
  function islandStep() {
    if (document.hidden || body.classList.contains('sheet-open')) return;
    if (islandOpen) { island.classList.remove('open'); islandOpen = false; islandIdx = (islandIdx + 1) % order.length; }
    else { renderIsland(); island.classList.add('open'); islandOpen = true; }
  }
  island.addEventListener('click', () => openSheet(order[islandIdx]));
  renderIsland();
  if (!reduced) { setTimeout(islandStep, 1400); islandTimer = setInterval(islandStep, 3400); }
  else { island.classList.add('open'); }

  /* ---------- Scroll-driven polish ---------- */
  const header = $('.site-header'), heroArt = $('.hero-art');
  let ticking = false;
  function onScroll() {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      header.classList.toggle('scrolled', y > 8);
      if (!reduced && y < 900 && innerWidth > 820) root.style.setProperty('--py', (y * 0.07).toFixed(1));
      ticking = false;
    });
  }
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* ---------- Reveal on scroll (spring) ---------- */
  if ('IntersectionObserver' in window && !reduced) {
    const targets = $$('.section-head, .project, .projects-end, .about-card, .tool, .contact-art, .list-card');
    const io = new IntersectionObserver(es => es.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    }), { threshold: .12, rootMargin: '0px 0px -6% 0px' });
    targets.forEach((el, i) => {
      if (el.getBoundingClientRect().top < innerHeight * .9) return;   // already visible: don't hide
      el.classList.add('reveal');
      const sib = el.classList.contains('tool') ? $$('.tool').indexOf(el) % 4 : (el.classList.contains('project') ? $$('.project').indexOf(el) : 0);
      el.style.setProperty('--d', (sib * 0.08).toFixed(2) + 's');
      io.observe(el);
    });
  }

  /* ---------- Active section in nav + tab bar ---------- */
  if ('IntersectionObserver' in window) {
    const links = $$('.nav-link');
    const mark = hash => links.forEach(l => l.classList.toggle('active', l.hash === hash));
    const io2 = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) mark('#' + (en.target.id === 'toolkit' ? 'about' : en.target.id)); }), { rootMargin: '-40% 0px -55% 0px' });
    ['home', 'projects', 'about', 'toolkit', 'contact'].forEach(id => { const el = document.getElementById(id); if (el) io2.observe(el); });
  }

  langBtn.addEventListener('click', () => setLanguage(language === 'fa' ? 'en' : 'fa'));
  try { setLanguage(localStorage.getItem('sheymon-language') === 'en' ? 'en' : 'fa'); } catch (_) { setLanguage('fa'); }
})();
