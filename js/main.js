/* ==========================================================================
   IZODOM — основная логика сайта
   Шапка/подвал, i18n (RU/KG), слайдеры, калькулятор, формы
   ========================================================================== */
(function () {
  "use strict";

  /* ---------- Логотип (фирменный знак IZODOM + подпись страны) ---------- */
  const COUNTRY = "Кыргызстан";
  function logoHTML(variant) {
    const mark = variant === "light" ? "assets/img/mark-white.png" : "assets/img/mark.png";
    const cls = variant === "light" ? "logo logo--light" : "logo";
    return `<a class="${cls}" href="index.html">
      <img class="logo-mark" src="${mark}" alt="IZODOM">
      <span class="logo-text"><b>IZODOM</b><i>${COUNTRY}</i></span>
    </a>`;
  }

  // Флаг Кыргызстана (красный фон, жёлтое солнце с тундуком)
  const FLAG_KG = `<svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="30" height="20" fill="#E8112D"/>
    <circle cx="15" cy="10" r="4.6" fill="#FFEF00"/>
    <g stroke="#FFEF00" stroke-width="0.7">
      ${Array.from({length: 24}).map((_, i) => {
        const a = (i * 15) * Math.PI / 180;
        const x1 = 15 + Math.cos(a) * 4.6, y1 = 10 + Math.sin(a) * 4.6;
        const x2 = 15 + Math.cos(a) * 6.2, y2 = 10 + Math.sin(a) * 6.2;
        return `<line x1="${x1.toFixed(2)}" y1="${y1.toFixed(2)}" x2="${x2.toFixed(2)}" y2="${y2.toFixed(2)}"/>`;
      }).join("")}
    </g>
    <circle cx="15" cy="10" r="2.7" fill="none" stroke="#E8112D" stroke-width="0.6"/>
    <path d="M12.6 10h4.8M15 7.6v4.8" stroke="#E8112D" stroke-width="0.6"/>
  </svg>`;

  const FLAG_RU = `<svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="30" height="6.67" y="0" fill="#fff"/>
    <rect width="30" height="6.67" y="6.67" fill="#0039A6"/>
    <rect width="30" height="6.67" y="13.33" fill="#D52B1E"/>
  </svg>`;

  const FLAGS = { ru: FLAG_RU, kg: FLAG_KG };
  const LANG_NAMES = { ru: "Русский", kg: "Кыргызча" };

  const ICONS = {
    speed: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" stroke-linejoin="round" stroke-linecap="round"/></svg>`,
    save: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2C7 8 5 11 5 15a7 7 0 0 0 14 0c0-4-2-7-7-13Z" stroke-linejoin="round"/></svg>`,
    shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5l-8-3Z" stroke-linejoin="round"/><path d="m9 12 2 2 4-4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    globe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/></svg>`,
    pin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s7-6 7-12a7 7 0 1 0-14 0c0 6 7 12 7 12Z" stroke-linejoin="round"/><circle cx="12" cy="9" r="2.5"/></svg>`,
    phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" stroke-linejoin="round"/></svg>`,
    mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>`,
    clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2" stroke-linecap="round"/></svg>`,
    fb: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 22v-8h3l.5-3H13V9c0-1 .3-1.5 1.6-1.5H17V4.8c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1V11H8v3h2.6v8H13Z"/></svg>`,
    ig: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17" cy="7" r="1" fill="currentColor" stroke="none"/></svg>`,
    wa: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 18.3a8.3 8.3 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.3 8.3 0 1 1 12 20.3Zm4.6-6.2c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.8 6.8 0 0 1-3.3-2.9c-.2-.4.2-.4.6-1.2.1-.1 0-.3 0-.4l-.8-2c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3c-.3.3-1 1-1 2.3s1 2.6 1.1 2.8c.1.2 2 3 4.7 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.7.1.6-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2 0-.1-.2-.2-.5-.3Z"/></svg>`,
    yt: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.8-1.8C18.3 5 12 5 12 5s-6.3 0-7.8.5A2.5 2.5 0 0 0 2.4 7.3C2 8.8 2 12 2 12s0 3.2.4 4.7a2.5 2.5 0 0 0 1.8 1.8C5.7 19 12 19 12 19s6.3 0 7.8-.5a2.5 2.5 0 0 0 1.8-1.8C22 15.2 22 12 22 12Zm-12 3V9l5 3-5 3Z"/></svg>`,
    tt: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 3c.3 2.2 1.6 3.7 3.8 3.9v2.6c-1.4.1-2.7-.3-3.8-1v5.7A5.2 5.2 0 1 1 10.8 9v2.7a2.5 2.5 0 1 0 2.6 2.5V3H16Z"/></svg>`,
    sound: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 9v6h4l5 4V5L8 9H4Z" stroke-linejoin="round"/><path d="M17 8a5 5 0 0 1 0 8M19.5 5.5a8.5 8.5 0 0 1 0 13" stroke-linecap="round"/></svg>`,
    home: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 11 12 4l8 7" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 10v10h12V10" stroke-linejoin="round"/><path d="M10 20v-6h4v6" stroke-linejoin="round"/></svg>`,
    building: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M10 21v-3h4v3" stroke-linecap="round"/></svg>`,
    store: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 9 5 4h14l1 5M4 9v11h16V9M4 9h16" stroke-linejoin="round"/><path d="M9 20v-6h6v6" stroke-linejoin="round"/></svg>`,
    school: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 4 2 9l10 5 10-5-10-5Z" stroke-linejoin="round"/><path d="M6 11v5c0 1 3 3 6 3s6-2 6-3v-5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    tent: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 4 3 20h18L12 4Z" stroke-linejoin="round"/><path d="M12 4v16" stroke-linecap="round"/></svg>`,
    mountain: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m3 20 6-11 4 6 2-3 6 8H3Z" stroke-linejoin="round"/></svg>`
  };

  function injectIcons() {
    document.querySelectorAll("[data-icon]").forEach(el => {
      const name = el.getAttribute("data-icon");
      if (ICONS[name]) el.innerHTML = ICONS[name];
    });
  }

  /* ---------- Навигация ---------- */
  const NAV = [
    { key: "nav.tech", href: "tehnologiya.html" },
    { key: "nav.catalog", href: "katalog.html" },
    { key: "nav.projects", href: "proekty.html" },
    { key: "nav.calc", href: "kalkulyator.html" },
    { key: "nav.partners", href: "partneram.html" },
    { key: "nav.about", href: "o-kompanii.html" },
    { key: "nav.contacts", href: "kontakty.html" }
  ];

  // Контакты Кыргызстана
  const CONTACT = {
    phone: "+996 224 898 999",
    phoneHref: "tel:+996224898999",
    email: "izodomkg@gmail.com",
    whatsapp: "https://wa.me/996224898999",
    instagram: "https://www.instagram.com/izodom.kg/"
  };

  /* ---------- Язык ---------- */
  function getLang() {
    try { return localStorage.getItem("izodom_lang") || "ru"; } catch (e) { return "ru"; }
  }
  function setLang(l) {
    try { localStorage.setItem("izodom_lang", l); } catch (e) {}
  }
  function t(key) {
    const l = getLang();
    return (window.I18N[l] && window.I18N[l][key]) || (window.I18N.ru[key]) || key;
  }

  function applyI18n() {
    const l = getLang();
    document.documentElement.lang = l;
    document.querySelectorAll("[data-i18n]").forEach(el => {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-ph]").forEach(el => {
      el.setAttribute("placeholder", t(el.getAttribute("data-i18n-ph")));
    });
    document.querySelectorAll("[data-i18n-html]").forEach(el => {
      el.innerHTML = t(el.getAttribute("data-i18n-html"));
    });
    // обновить переключатель
    const lc = document.querySelector(".lang-current");
    if (lc) lc.querySelector(".flag").innerHTML = FLAGS[l];
    document.querySelectorAll(".lang-menu button").forEach(b => {
      b.classList.toggle("active", b.dataset.lang === l);
    });
    // событие для страниц (напр. калькулятор)
    document.dispatchEvent(new CustomEvent("langchange", { detail: { lang: l } }));
  }

  /* ---------- Построение шапки ---------- */
  function buildHeader() {
    const el = document.getElementById("site-header");
    if (!el) return;
    const current = location.pathname.split("/").pop() || "index.html";
    el.className = "site-header";
    el.innerHTML = `
      <div class="container header-inner">
        ${logoHTML("dark")}
        <nav class="main-nav" id="mainNav">
          ${NAV.map(n => `<a href="${n.href}" data-i18n="${n.key}" class="${current === n.href ? "active" : ""}">${t(n.key)}</a>`).join("")}
        </nav>
        <div class="header-actions">
          <div class="lang-switch" id="langSwitch">
            <div class="lang-current" id="langCurrent" role="button" tabindex="0">
              <span class="flag">${FLAGS[getLang()]}</span>
              <svg class="lang-caret" width="12" height="12" viewBox="0 0 12 12"><path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/></svg>
            </div>
            <div class="lang-menu">
              ${Object.keys(LANG_NAMES).map(lg => `<button data-lang="${lg}"><span class="flag">${FLAGS[lg]}</span>${LANG_NAMES[lg]}</button>`).join("")}
            </div>
          </div>
          <a href="kalkulyator.html" class="btn btn--dark btn--sm header-cta-desktop" data-i18n="nav.cta">${t("nav.cta")}</a>
          <button class="nav-toggle" id="navToggle" aria-label="Menu"><span></span><span></span><span></span></button>
        </div>
      </div>`;

    // бургер-меню
    const toggle = el.querySelector("#navToggle");
    const nav = el.querySelector("#mainNav");
    toggle.addEventListener("click", () => {
      toggle.classList.toggle("open");
      nav.classList.toggle("open");
    });
    nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
      toggle.classList.remove("open"); nav.classList.remove("open");
    }));

    // переключатель языка
    const sw = el.querySelector("#langSwitch");
    el.querySelector("#langCurrent").addEventListener("click", () => sw.classList.toggle("open"));
    el.querySelectorAll(".lang-menu button").forEach(b => {
      b.addEventListener("click", () => {
        setLang(b.dataset.lang);
        sw.classList.remove("open");
        applyI18n();
      });
    });
    document.addEventListener("click", (e) => { if (!sw.contains(e.target)) sw.classList.remove("open"); });
  }

  /* ---------- Построение подвала ---------- */
  function buildFooter() {
    const el = document.getElementById("site-footer");
    if (!el) return;
    el.className = "site-footer";
    const year = new Date().getFullYear();
    el.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div class="footer-col footer-brand">
            ${logoHTML("light")}
            <p data-i18n="footer.about">${t("footer.about")}</p>
            <div class="footer-social">
              <a href="${CONTACT.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${ICONS.ig}</a>
              <a href="${CONTACT.whatsapp}" target="_blank" rel="noopener" aria-label="WhatsApp">${ICONS.wa}</a>
            </div>
          </div>
          <div class="footer-col">
            <h4 data-i18n="footer.col.company">${t("footer.col.company")}</h4>
            <a href="o-kompanii.html" data-i18n="nav.about">${t("nav.about")}</a>
            <a href="tehnologiya.html" data-i18n="nav.tech">${t("nav.tech")}</a>
            <a href="proekty.html" data-i18n="nav.projects">${t("nav.projects")}</a>
            <a href="blog.html" data-i18n="nav.blog">${t("nav.blog")}</a>
          </div>
          <div class="footer-col">
            <h4 data-i18n="footer.col.products">${t("footer.col.products")}</h4>
            <a href="katalog.html" data-i18n="cat.p2.t">${t("cat.p2.t")}</a>
            <a href="katalog.html" data-i18n="cat.p1.t">${t("cat.p1.t")}</a>
            <a href="katalog.html" data-i18n="cat.p3.t">${t("cat.p3.t")}</a>
            <a href="katalog.html" data-i18n="cat.p4.t">${t("cat.p4.t")}</a>
            <a href="kalkulyator.html" data-i18n="nav.calc">${t("nav.calc")}</a>
          </div>
          <div class="footer-col footer-newsletter">
            <h4 data-i18n="footer.col.contacts">${t("footer.col.contacts")}</h4>
            <a href="${CONTACT.phoneHref}">${CONTACT.phone}</a>
            <a href="${CONTACT.whatsapp}" target="_blank" rel="noopener">WhatsApp</a>
            <a href="mailto:${CONTACT.email}">${CONTACT.email}</a>
            <a href="${CONTACT.instagram}" target="_blank" rel="noopener">Instagram @izodom.kg</a>
            <p style="margin-top:14px" data-i18n="footer.newsletter.text">${t("footer.newsletter.text")}</p>
            <form data-newsletter>
              <input type="email" required data-i18n-ph="footer.email.ph" placeholder="${t("footer.email.ph")}">
              <button class="btn btn--primary btn--sm" type="submit" data-i18n="common.subscribe">${t("common.subscribe")}</button>
              <div class="form-msg" data-msg></div>
            </form>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© ${year} IZODOM. <span data-i18n="footer.rights">${t("footer.rights")}</span></span>
          <span>
            <a href="#" data-i18n="footer.privacy">${t("footer.privacy")}</a> ·
            <a href="#" data-i18n="footer.terms">${t("footer.terms")}</a>
          </span>
        </div>
      </div>`;
  }

  /* ---------- Плавающая кнопка контакта ---------- */
  function buildFloatBtn() {
    if (document.querySelector(".float-contact")) return;
    const a = document.createElement("a");
    a.href = "kontakty.html";
    a.className = "float-contact";
    a.setAttribute("aria-label", "Контакты");
    a.innerHTML = ICONS.mail;
    document.body.appendChild(a);
  }

  /* ---------- Слайдер hero ---------- */
  function initHeroSlider() {
    const hero = document.querySelector("[data-hero-slider]");
    if (!hero) return;
    const slides = hero.querySelectorAll(".hero-slide");
    const dots = hero.querySelectorAll(".hero-dots button");
    let i = 0, timer;
    function show(n) {
      i = (n + slides.length) % slides.length;
      slides.forEach((s, k) => s.classList.toggle("active", k === i));
      dots.forEach((d, k) => d.classList.toggle("active", k === i));
    }
    function next() { show(i + 1); }
    function start() { timer = setInterval(next, 4500); }
    function stop() { clearInterval(timer); }
    dots.forEach((d, k) => d.addEventListener("click", () => { show(k); stop(); start(); }));
    hero.addEventListener("mouseenter", stop);
    hero.addEventListener("mouseleave", start);
    show(0); start();
  }

  /* ---------- Слайдер отзывов ---------- */
  function initTestiSlider() {
    const wrap = document.querySelector("[data-testi]");
    if (!wrap) return;
    const track = wrap.querySelector(".testi-track");
    const items = track.querySelectorAll(".testi");
    const prev = wrap.querySelector("[data-prev]");
    const next = wrap.querySelector("[data-next]");
    let pos = 0;
    function perView() { return window.innerWidth <= 640 ? 1 : window.innerWidth <= 960 ? 2 : 3; }
    function update() {
      const pv = perView();
      const max = Math.max(0, items.length - pv);
      pos = Math.min(pos, max);
      const item = items[0];
      const gap = 24;
      const step = item.getBoundingClientRect().width + gap;
      track.style.transform = `translateX(${-pos * step}px)`;
      track.style.transition = "transform .4s ease";
    }
    prev.addEventListener("click", () => { pos = Math.max(0, pos - 1); update(); });
    next.addEventListener("click", () => { pos = Math.min(items.length - perView(), pos + 1); update(); });
    window.addEventListener("resize", update);
    update();
  }

  /* ---------- Формы ---------- */
  function initForms() {
    document.querySelectorAll("form[data-newsletter]").forEach(f => {
      f.addEventListener("submit", (e) => {
        e.preventDefault();
        const msg = f.querySelector("[data-msg]");
        if (msg) { msg.textContent = getLang() === "kg" ? "Рахмат! Сиз жазылдыңыз." : "Спасибо! Вы подписаны."; msg.classList.add("show"); }
        f.reset();
      });
    });
    document.querySelectorAll("form[data-contact]").forEach(f => {
      f.addEventListener("submit", (e) => {
        e.preventDefault();
        const msg = f.querySelector("[data-msg]");
        if (msg) { msg.textContent = t("contacts.form.success"); msg.classList.add("show"); }
        f.reset();
      });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  function initReveal() {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) { els.forEach(e => e.classList.add("in")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    els.forEach(e => io.observe(e));
  }

  /* ---------- Калькулятор ---------- */
  function initCalculator() {
    const root = document.querySelector("[data-calc]");
    if (!root) return;
    const state = { area: 120, floors: 1, type: 1, finish: 1 };
    const RATE_MATERIAL = 620;   // усл. ед. за м² (материалы)
    const RATE_WORK = 380;       // монтаж за м²
    const FINISH = { 1: 180, 2: 340, 3: 560 };
    const TYPE_MULT = { 1: 1, 2: 1.18 };
    const FLOOR_MULT = { 1: 1, 2: 1.05, 3: 1.02 };

    function fmt(n) {
      return Math.round(n).toLocaleString(getLang() === "kg" ? "ru-RU" : "ru-RU") + " $";
    }
    function calc() {
      const area = state.area;
      const fm = FLOOR_MULT[state.floors];
      const tm = TYPE_MULT[state.type];
      const materials = area * RATE_MATERIAL * tm * fm;
      const work = area * RATE_WORK * fm;
      const finish = area * FINISH[state.finish];
      const total = materials + work + finish;
      root.querySelector("[data-r-materials]").textContent = fmt(materials);
      root.querySelector("[data-r-work]").textContent = fmt(work);
      root.querySelector("[data-r-finish]").textContent = fmt(finish);
      root.querySelector("[data-r-total]").textContent = fmt(total);
    }
    // площадь
    const areaInput = root.querySelector("[data-area]");
    const areaVal = root.querySelector("[data-area-val]");
    areaInput.addEventListener("input", () => {
      state.area = +areaInput.value;
      areaVal.textContent = state.area + " м²";
      calc();
    });
    // сегменты
    root.querySelectorAll("[data-seg]").forEach(group => {
      const field = group.dataset.seg;
      group.querySelectorAll("button").forEach(btn => {
        btn.addEventListener("click", () => {
          group.querySelectorAll("button").forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          state[field] = +btn.dataset.val;
          calc();
        });
      });
    });
    document.addEventListener("langchange", () => {
      areaVal.textContent = state.area + " м²";
      calc();
    });
    areaVal.textContent = state.area + " м²";
    calc();
  }

  /* ---------- Init ---------- */
  function initVideo() {
    document.querySelectorAll("[data-video]").forEach(w => {
      const video = w.querySelector("video");
      const poster = w.querySelector("[data-video-poster]");
      if (!video || !poster) return;
      poster.addEventListener("click", () => {
        poster.style.display = "none";
        video.setAttribute("preload", "auto");
        video.play().catch(() => {});
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    buildHeader();
    buildFooter();
    buildFloatBtn();
    injectIcons();
    applyI18n();
    initHeroSlider();
    initTestiSlider();
    initForms();
    initReveal();
    initCalculator();
    initVideo();
  });
})();
