const $=(s,root=document)=>root.querySelectorAll?root.querySelector(s):null;
const $$=(s,root=document)=>[...root.querySelectorAll(s)];
const menuToggle=$("#menuToggle"),nav=$("#nav"),langToggle=$("#langToggle");
const reducedMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
menuToggle?.addEventListener("click",()=>{const open=nav.classList.toggle("open");menuToggle.setAttribute("aria-expanded",String(open));menuToggle.textContent=open?"×":"☰"});
$$("#nav a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menuToggle?.setAttribute("aria-expanded","false");if(menuToggle)menuToggle.textContent="☰"}));

if("IntersectionObserver" in window && !reducedMotion){
 const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");revealObserver.unobserve(entry.target)}}),{threshold:.12,rootMargin:"0px 0px -4% 0px"});
 $$(".reveal").forEach(el=>revealObserver.observe(el));
}else $$(".reveal").forEach(el=>el.classList.add("visible"));

const glow=$(".cursor-glow");
if(glow&&matchMedia("(pointer:fine)").matches&&!reducedMotion){let raf=0,x=0,y=0;document.addEventListener("pointermove",e=>{x=e.clientX;y=e.clientY;if(!raf)raf=requestAnimationFrame(()=>{glow.style.left=x+"px";glow.style.top=y+"px";glow.style.opacity=".85";raf=0})},{passive:true});document.addEventListener("pointerleave",()=>glow.style.opacity="0")}
if(!reducedMotion&&matchMedia("(hover:hover) and (pointer:fine)").matches){$$("[data-tilt]").forEach(card=>{const image=$(".project-image",card);if(!image)return;card.addEventListener("pointermove",e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;image.style.transform=`perspective(900px) rotateY(${x*2.2}deg) rotateX(${-y*2.2}deg) translateY(-2px)`});card.addEventListener("pointerleave",()=>image.style.transform="")})}

const details={
 crypto:{kicker:"FINTECH / DESKTOP TOOL",title:"POYA TRADE",fa:"ابزار دسکتاپ تحلیل بازار رمزارزها با نمودار قیمت و شاخص‌های تکنیکال برای بررسی طیف گسترده‌ای از ارزهای دیجیتال.",en:"A desktop cryptocurrency market analysis tool with price charts and technical indicators, designed to help explore a broad range of digital assets.",tags:["C#","WPF",".NET Framework","OxyPlot","CoinGecko"]},
 shop:{kicker:"BUSINESS SOFTWARE",title:"ترازینو",fa:"نرم‌افزار حسابداری فروشگاهی و مدیریت انبار برای ثبت خریدوفروش، مدیریت کالا و اشخاص، کنترل موجودی و پیگیری گردش مالی.",en:"A shop accounting and inventory app for sales and purchases, product and contact management, stock control and financial tracking.",tags:[".NET MAUI","C#","SQLite","Accounting"]},
 game:{kicker:"SCI-FI / GAME",title:"Stellar Vanguard",fa:"بازی علمی‌تخیلی با هویت بصری فضایی؛ تصویر فعلی برای معرفی پروژه است و می‌توان آن را با اسکرین‌شات‌های واقعی بازی تکمیل کرد.",en:"A sci-fi game project with a space-inspired visual identity. The current image introduces the project and can be replaced with real gameplay screenshots.",tags:["STELLAR VANGUARD","GAME PROJECT"]}
};
const modal=$("#projectModal");let currentLang="fa";
function openModal(key){const d=details[key];if(!d)return;$("#modalKicker").textContent=d.kicker;$("#modalTitle").textContent=key==="shop"?(currentLang==="fa"?"ترازینو":"TARAZINO"):d.title;$("#modalText").textContent=currentLang==="fa"?d.fa:d.en;$("#modalTags").innerHTML=d.tags.map(t=>`<span>${t}</span>`).join("");modal.classList.add("open");modal.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";$(".modal-close").focus()}
function closeModal(){modal.classList.remove("open");modal.setAttribute("aria-hidden","true");document.body.style.overflow=""}
$$("[data-open]").forEach(b=>b.addEventListener("click",()=>openModal(b.dataset.open)));$$("[data-close]").forEach(b=>b.addEventListener("click",closeModal));document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});$("#modalContact")?.addEventListener("click",closeModal);

const copyEmail=$("#copyEmail"),copyStatus=$("#copyStatus");copyEmail?.addEventListener("click",async()=>{const email="sheymon909@gmail.com";try{await navigator.clipboard.writeText(email);if(copyStatus)copyStatus.textContent=currentLang==="fa"?"ایمیل کپی شد ✓":"Email copied ✓"}catch{if(copyStatus)copyStatus.textContent=email}setTimeout(()=>{if(copyStatus)copyStatus.textContent=currentLang==="fa"?"برای کپی‌کردن ایمیل لمس کن":"Tap to copy email"},2200)});

const copyFa={
 'nav0':'پروژه‌ها','nav1':'درباره من','nav2':'تخصص‌ها','nav3':'ارتباط','.cta-label':'همکاری با من',
 '.eyebrow':'<span class="eyebrow-line"></span> ایده، کد، تجربه','.hero h1':'من چیزهایی<br>می‌سازم که <em>کار می‌کنند.</em>','.hero-desc':'من پویا هستم؛ توسعه‌دهنده‌ای که از تبدیل ایده‌های پیچیده به ابزارهای کاربردی لذت می‌برد. اینجا، بخشی از چیزهایی را می‌بینی که طراحی و ساخته‌ام.','.hero-actions .btn':'دیدن پروژه‌ها <span>↙</span>','.hero-actions .text-link':'داستان من <span>↗</span>','.hero-foot span:nth-child(2)':'برای کشف بیشتر اسکرول کن',
 '.section-head h2':'چیزهایی که<br><em>ساخته‌ام.</em>','.section-head>p':'پروژه‌های شخصی من در مسیر ساخت نرم‌افزارهای کاربردی؛ هر کدام یک مسئله، یک تجربه و یک قدم رو به جلو.',
 '.project:nth-child(1) .project-info>p':'ابزار تحلیل بازار رمزارزها برای بررسی قیمت‌ها، نمودارها و شاخص‌های تکنیکال در یک محیط دسکتاپ.','.project:nth-child(2) .project-info>p':'نرم‌افزار حسابداری فروشگاهی و مدیریت انبار برای ثبت خریدوفروش، مدیریت کالا و اشخاص، کنترل موجودی و پیگیری گردش مالی.','.project:nth-child(3) .project-info>p':'بازی علمی‌تخیلی با هویت بصری فضایی؛ تصویر روی کارت برای معرفی پروژه است و می‌توان آن را با اسکرین‌شات‌های واقعی بازی تکمیل کرد.',
 '.project:nth-child(1) .details-btn':'مشاهده جزئیات <span>↗</span>','.project:nth-child(2) .details-btn':'مشاهده جزئیات <span>↗</span>','.project:nth-child(3) .details-btn':'مشاهده جزئیات <span>↗</span>','.work-end span:last-child':'ادامه دارد...',
 '.manifesto h2':'کد فقط شروع ماجراست.<br><em>تجربه، چیزی‌ست که می‌ماند.</em>','.manifesto-bottom p':'برای من، نرم‌افزار خوب فقط مجموعه‌ای از قابلیت‌ها نیست. باید مسئله‌ای واقعی را حل کند، قابل اعتماد باشد و استفاده از آن حس خوبی بدهد. به همین دلیل از منطق فنی تا جزئیات رابط کاربری را جدی می‌گیرم.',
 '.stack .section-head h2':'ابزارهایی که<br><em>با آن‌ها می‌سازم.</em>','.stack .section-head>p':'از اپلیکیشن‌های دسکتاپ تا موبایل و ابزارهای تحلیلی؛ فناوری را بر اساس نیاز پروژه انتخاب می‌کنم.',
 '.contact h2':'ایده‌ای داری؟<br><em>بسازیمش.</em>','.contact-left p':'برای همکاری، گفت‌وگو درباره پروژه‌ها یا ساخت یک چیز تازه، پیام بده.','.contact-left .btn':'ارسال ایمیل <span>↗</span>','.contact-label':"LET’S MAKE SOMETHING REAL",'#copyEmail':'کپی ایمیل <span>⧉</span>','#copyStatus':'برای کپی‌کردن ایمیل لمس کن','.footer>a:nth-of-type(2)':'بازگشت به بالا ↑','#modalContact':'گفت‌وگو درباره پروژه <span>↗</span>'
};
const copyEn={
 'nav0':'Projects','nav1':'About','nav2':'Skills','nav3':'Contact','.cta-label':'Let’s work together',
 '.eyebrow':'<span class="eyebrow-line"></span> IDEAS, CODE, EXPERIENCE','.hero h1':'I build things<br>that <em>make sense.</em>','.hero-desc':'I’m Poya, a developer who enjoys turning complex ideas into useful tools. Here’s a selection of things I’ve designed and built.','.hero-actions .btn':'Explore projects <span>↘</span>','.hero-actions .text-link':'My story <span>↗</span>','.hero-foot span:nth-child(2)':'Scroll to explore',
 '.section-head h2':'Things I’ve<br><em>built.</em>','.section-head>p':'Selected personal projects focused on useful software. Each one is a problem solved, a lesson learned and a step forward.',
 '.project:nth-child(1) .project-info>p':'A desktop tool for exploring cryptocurrency prices, charts and technical indicators across a broad range of digital assets.','.project:nth-child(2) .project-info>p':'A shop accounting and inventory app for purchases and sales, product and contact management, stock control and financial tracking.','.project:nth-child(3) .project-info>p':'A sci-fi game project with a space-inspired visual identity. The current artwork introduces the project and can be replaced with real gameplay screenshots.',
 '.project:nth-child(1) .details-btn':'View details <span>↗</span>','.project:nth-child(2) .details-btn':'View details <span>↗</span>','.project:nth-child(3) .details-btn':'View details <span>↗</span>','.work-end span:last-child':'More to come...',
 '.manifesto h2':'Code is only the beginning.<br><em>Experience is what stays.</em>','.manifesto-bottom p':'Good software is more than a list of features. It should solve a real problem, feel reliable and be a pleasure to use. That’s why I care about everything from technical logic to the smallest interface details.',
 '.stack .section-head h2':'Tools I use<br><em>to bring ideas to life.</em>','.stack .section-head>p':'From desktop and mobile apps to analytical tools, I choose technology based on what each project needs.',
 '.contact h2':'Have an idea?<br><em>Let’s build it.</em>','.contact-left p':'For collaboration, a chat about my projects or building something new, get in touch.','.contact-left .btn':'Send an email <span>↗</span>','.contact-label':"LET’S MAKE SOMETHING REAL",'#copyEmail':'Copy email <span>⧉</span>','#copyStatus':'Tap to copy email','.footer>a:nth-of-type(2)':'Back to top ↑','#modalContact':'Let’s talk about it <span>↗</span>'
};
const saved={};
function translate(lang){currentLang=lang;document.documentElement.lang=lang;document.documentElement.dir=lang==="fa"?"rtl":"ltr";document.body.setAttribute("lang",lang);const dict=lang==="fa"?copyFa:copyEn;
 for(const [key,value] of Object.entries(dict)){let el;if(key.startsWith("nav")){el=$$("#nav a")[Number(key.slice(3))];if(el){const number=el.querySelector("span")?.outerHTML||"";el.innerHTML=value+(number?" "+number:"")}continue}el=$(key);if(el)el.innerHTML=value}
 
 const title1=$(".project:nth-child(1) .project-info h3"), title2=$(".project:nth-child(2) .project-info h3"), title3=$(".project:nth-child(3) .project-info h3");
 if(title1)title1.innerHTML="POYA<span> TRADE</span>";
 if(title2)title2.innerHTML=lang==="fa"?"ترازینو":"TARAZINO";
 if(title3)title3.innerHTML="STELLAR<span> VANGUARD</span>";
 const meta=$$(".project-meta"); if(meta.length>=3){meta[0].firstElementChild.textContent="FINTECH / ANALYTICS";meta[1].firstElementChild.textContent=lang==="fa"?"حسابداری و انبارداری":"ACCOUNTING / INVENTORY";meta[2].firstElementChild.textContent="SCI-FI / GAME";}
if(menuToggle)menuToggle.setAttribute("aria-label",lang==="fa"?"باز کردن منو":"Open menu");
 const contactMail=$(".contact-left .btn");if(contactMail){contactMail.href="mailto:sheymon909@gmail.com";contactMail.setAttribute("aria-label",lang==="fa"?"ارسال ایمیل":"Send email")}
 if(langToggle)langToggle.innerHTML=lang==="fa"?'EN <span>↗</span>':'فا <span>↗</span>';
 if(modal.classList.contains("open")){const key=Object.keys(details).find(k=>["POYA TRADE","ترازینو","TARAZINO","Stellar Vanguard"].includes($("#modalTitle").textContent));if(key)openModal(key)}
}
langToggle?.addEventListener("click",()=>translate(currentLang==="fa"?"en":"fa"));

if("IntersectionObserver" in window){const sections=$$("main section[id]"),links=$$("#nav a");const activeObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+e.target.id))}),{rootMargin:"-35% 0px -55% 0px"});sections.forEach(s=>activeObserver.observe(s))}
