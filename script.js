const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const menuToggle = $('#menuToggle');
const nav = $('#nav');
menuToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.textContent = open ? '×' : '☰';
});
$$('#nav a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded','false');
  if (menuToggle) menuToggle.textContent = '☰';
  $$('#nav a').forEach(a => a.classList.toggle('active', a === link));
}));
$$('.filter').forEach(button => button.addEventListener('click', () => {
  $$('.filter').forEach(b => b.classList.toggle('active', b === button));
  const filter = button.dataset.filter;
  $$('.project-card').forEach(card => {
    const categories = card.dataset.category.split(' ');
    card.hidden = filter !== 'all' && !categories.includes(filter);
  });
}));
const projects = {
  poyashop: {title:'PoyaShop', text:'اپلیکیشن حسابداری و انبارداری فروشگاهی با هدف مدیریت فاکتورهای خرید و فروش، کالاها، اشخاص، موجودی و گردش مالی. وضعیت فعلی و قابلیت‌های نهایی را پس از تکمیل پروژه به‌روزرسانی کن.', tags:['.NET MAUI','C#','SQLite','Accounting']},
  suianalyzer: {title:'SUIAnalyzer', text:'ابزار دسکتاپ تحلیل بازار رمزارز با C# و WPF که برای نمایش نمودار قیمت و اندیکاتورهایی مانند RSI، میانگین متحرک و MACD طراحی شده است.', tags:['C#','WPF','OxyPlot','Crypto']},
  portfolio: {title:'sheymon Portfolio', text:'وب‌سایت شخصی راست‌چین و واکنش‌گرا برای معرفی مسیر کاری، مهارت‌ها و نمونه‌کارها. طراحی با رنگ‌های قهوه‌ای، کهربایی و افکت شیشه‌ای انجام شده است.', tags:['HTML','CSS','JavaScript','Responsive']},
  ps5monitor: {title:'PS5 Monitor Concept', text:'یک ایده مفهومی برای ابزار پایش سیستم و نمایش اطلاعات عملکرد. این کارت به‌عنوان مفهوم/ایده معرفی شده تا با یک پروژه تکمیل‌شده اشتباه گرفته نشود.', tags:['Concept','Monitoring','C#']}
};
const dialog = $('#projectDialog');
$$('[data-project]').forEach(button => button.addEventListener('click', () => {
  const project = projects[button.dataset.project];
  if (!project) return;
  $('#dialogTitle').textContent = project.title;
  $('#dialogText').textContent = project.text;
  $('#dialogTags').replaceChildren(...project.tags.map(tag => { const span=document.createElement('span'); span.textContent=tag; return span; }));
  if (typeof dialog.showModal === 'function') dialog.showModal();
  else alert(project.title + '\\n\\n' + project.text);
}));
$('#dialogClose')?.addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
const toast = $('#toast');
let toastTimer;
function showToast(message) {
  toast.textContent = message; toast.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}
$('#copyEmail')?.addEventListener('click', async () => {
  const email = 'poyapanahi.dev@gmail.com';
  try { await navigator.clipboard.writeText(email); showToast('ایمیل کپی شد'); }
  catch { window.location.href = 'mailto:' + email; showToast('برنامه ایمیل باز می‌شود'); }
});
$('#year').textContent = new Date().getFullYear();
const sections = $$('main section[id]');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        $$('#nav a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
      }
    });
  }, {rootMargin:'-35% 0px -55% 0px'});
  sections.forEach(section => observer.observe(section));
}