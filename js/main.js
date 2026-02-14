document.addEventListener('DOMContentLoaded', () => {
  const LANGS = ['fa', 'de', 'en'];

  const getBasePrefix = () => {
    const parts = window.location.pathname.split('/').filter(Boolean);
    if (!parts.length) return '';
    const first = parts[0];
    const looksLikeFile = first.includes('.');
    if (LANGS.includes(first) || looksLikeFile) return '';
    return `/${first}`;
  };

  const getCurrentLangAndFile = () => {
    const parts = window.location.pathname.split('/').filter(Boolean);
    let langIndex = parts.findIndex((p) => LANGS.includes(p));
    if (langIndex === -1) return { lang: null, file: null };
    const file = parts.slice(langIndex + 1).join('/') || 'index.html';
    return { lang: parts[langIndex], file };
  };

  const toLangHome = (lang) => `${getBasePrefix()}/${lang}/`;
  const toLangFile = (lang, file) => `${getBasePrefix()}/${lang}/${file}`;

  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  document.querySelectorAll('.lang-switch').forEach((select) => {
    select.addEventListener('change', (e) => {
      const targetLang = e.target.value;
      const current = getCurrentLangAndFile();
      if (!current.lang) {
        window.location.href = toLangHome(targetLang);
        return;
      }
      const target = toLangFile(targetLang, current.file);
      fetch(target, { method: 'HEAD' })
        .then((r) => { window.location.href = r.ok ? target : toLangHome(targetLang); })
        .catch(() => { window.location.href = toLangHome(targetLang); });
    });
  });

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduced && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
  }

  const remember = localStorage.getItem('saadi-lang-remember') === 'true';
  const lang = localStorage.getItem('saadi-lang');
  const chooser = document.querySelector('[data-language-chooser]');
  if (chooser) {
    const check = document.getElementById('remember-choice');
    if (check) check.checked = remember;
    chooser.querySelectorAll('[data-lang]').forEach((btn) => {
      btn.addEventListener('click', (ev) => {
        ev.preventDefault();
        const selected = btn.dataset.lang;
        if (check?.checked) {
          localStorage.setItem('saadi-lang-remember', 'true');
          localStorage.setItem('saadi-lang', selected);
        } else {
          localStorage.removeItem('saadi-lang-remember');
          localStorage.removeItem('saadi-lang');
        }
        window.location.href = toLangHome(selected);
      });
    });
    if (remember && lang && LANGS.includes(lang)) {
      setTimeout(() => { window.location.href = toLangHome(lang); }, 350);
    }
  }
});
