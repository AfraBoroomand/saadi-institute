document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  document.querySelectorAll('.lang-switch').forEach(select => {
    select.addEventListener('change', (e) => {
      const targetLang = e.target.value;
      const path = window.location.pathname;
      const parts = path.split('/').filter(Boolean);
      if (parts.length === 0 || !['fa','de','en'].includes(parts[0])) {
        window.location.href = `/${targetLang}/`;
        return;
      }
      const filename = parts[1] || 'index.html';
      const target = `/${targetLang}/${filename}`;
      fetch(target, { method: 'HEAD' })
        .then(r => { window.location.href = r.ok ? target : `/${targetLang}/`; })
        .catch(() => { window.location.href = `/${targetLang}/`; });
    });
  });

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduced && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }

  const remember = localStorage.getItem('saadi-lang-remember') === 'true';
  const lang = localStorage.getItem('saadi-lang');
  if (window.location.pathname === '/' || window.location.pathname.endsWith('/index.html')) {
    const chooser = document.querySelector('[data-language-chooser]');
    if (chooser) {
      const check = document.getElementById('remember-choice');
      if (check) check.checked = remember;
      chooser.querySelectorAll('[data-lang]').forEach(btn => {
        btn.addEventListener('click', () => {
          if (check?.checked) {
            localStorage.setItem('saadi-lang-remember', 'true');
            localStorage.setItem('saadi-lang', btn.dataset.lang);
          } else {
            localStorage.removeItem('saadi-lang-remember');
            localStorage.removeItem('saadi-lang');
          }
          window.location.href = `/${btn.dataset.lang}/`;
        });
      });
      if (remember && lang) setTimeout(()=> window.location.href = `/${lang}/`, 350);
    }
  }
});
