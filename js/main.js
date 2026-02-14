document.addEventListener('DOMContentLoaded', () => {
  const LANGS = ['fa', 'de', 'en'];

  const i18n = {
    fa: {
      search: 'جستجو',
      close: 'بستن',
      placeholder: 'جستجو در سایت...',
      noResults: 'نتیجه‌ای پیدا نشد.',
      readMore: 'مشاهده',
      resultsTitle: 'نتایج',
      downloads: 'دانلودها',
      events: 'رویدادها',
      news: 'اخبار',
      thanks: 'سپاسگزاریم — خبرنامه به‌زودی فعال می‌شود. می‌توانید از طریق ایمیل نیز با ما در تماس باشید.'
    },
    de: {
      search: 'Suche',
      close: 'Schließen',
      placeholder: 'Website durchsuchen ...',
      noResults: 'Keine Ergebnisse gefunden.',
      readMore: 'Mehr lesen',
      resultsTitle: 'Ergebnisse',
      downloads: 'Downloads',
      events: 'Veranstaltungen',
      news: 'News',
      thanks: 'Vielen Dank — der Newsletter wird bald verfügbar sein. Sie können uns auch per E-Mail kontaktieren.'
    },
    en: {
      search: 'Search',
      close: 'Close',
      placeholder: 'Search the site...',
      noResults: 'No results found.',
      readMore: 'Read more',
      resultsTitle: 'Results',
      downloads: 'Downloads',
      events: 'Events',
      news: 'News',
      thanks: 'Thank you — newsletter will be available soon. You can also contact us via email.'
    }
  };

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
    const langIndex = parts.findIndex((p) => LANGS.includes(p));
    if (langIndex === -1) return { lang: null, file: null };
    const file = parts.slice(langIndex + 1).join('/') || 'index.html';
    return { lang: parts[langIndex], file };
  };

  const toLangHome = (lang) => `${getBasePrefix()}/${lang}/`;
  const toLangFile = (lang, file) => `${getBasePrefix()}/${lang}/${file}`;
  const current = getCurrentLangAndFile();
  const langPack = i18n[current.lang] || i18n.en;

  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  if (nav && current.file) {
    nav.querySelectorAll('a').forEach((link) => {
      const href = link.getAttribute('href') || '';
      if (href && current.file.startsWith(href)) link.classList.add('active');
    });
  }

  document.querySelectorAll('.lang-switch').forEach((select) => {
    select.addEventListener('change', (e) => {
      const targetLang = e.target.value;
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

  const langSelect = document.querySelector('.lang-switch');
  if (langSelect) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'search-trigger';
    btn.setAttribute('aria-label', langPack.search);
    btn.textContent = '🔍';
    langSelect.insertAdjacentElement('afterend', btn);

    const modal = document.createElement('div');
    modal.className = 'search-modal';
    modal.hidden = true;
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.innerHTML = `<div class="search-panel" role="document">
      <div class="search-head"><h2>${langPack.search}</h2><button type="button" class="search-close">${langPack.close}</button></div>
      <input class="search-input" type="search" placeholder="${langPack.placeholder}" aria-label="${langPack.search}">
      <div class="search-results" aria-live="polite"></div>
    </div>`;
    document.body.appendChild(modal);

    const input = modal.querySelector('.search-input');
    const closeBtn = modal.querySelector('.search-close');
    const results = modal.querySelector('.search-results');
    let index = [];

    fetch(`${getBasePrefix()}/data/${current.lang || 'en'}-search.json`)
      .then((r) => r.json())
      .then((data) => { index = Array.isArray(data) ? data : []; })
      .catch(() => { index = []; });

    const renderResults = (term) => {
      const q = term.trim().toLowerCase();
      if (!q) {
        results.innerHTML = '';
        return;
      }
      const matches = index.filter((item) => `${item.title} ${item.excerpt} ${item.keywords}`.toLowerCase().includes(q)).slice(0, 8);
      if (!matches.length) {
        results.innerHTML = `<p>${langPack.noResults}</p>`;
        return;
      }
      results.innerHTML = `<h3>${langPack.resultsTitle}</h3>${matches.map((item) => {
        const link = item.url && item.url.startsWith('/') ? `${getBasePrefix()}${item.url}` : item.url;
        return `<article class="search-hit"><a href="${link}">${item.title}</a><p>${item.excerpt}</p></article>`;
      }).join('')}`;
    };

    const openModal = () => {
      modal.hidden = false;
      document.body.classList.add('modal-open');
      setTimeout(() => input.focus(), 20);
    };
    const closeModal = () => {
      modal.hidden = true;
      document.body.classList.remove('modal-open');
      btn.focus();
    };

    btn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.hidden) closeModal();
      if (e.key === 'Tab' && !modal.hidden) {
        const focusables = modal.querySelectorAll('button, input, a, [tabindex]:not([tabindex="-1"])');
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });

    input.addEventListener('input', () => renderResults(input.value));
  }

  document.querySelectorAll('.newsletter-form').forEach((form) => {
    const emailInput = form.querySelector('input[type="email"]');
    const consent = form.querySelector('[name="newsletter-consent"]');
    const saveCheck = form.querySelector('[name="newsletter-save"]');
    const message = form.querySelector('.newsletter-message');
    const key = `saadi-newsletter-${current.lang || 'en'}`;
    const saved = localStorage.getItem(key);
    if (saved && emailInput) emailInput.value = saved;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!consent?.checked) {
        message.textContent = consent.dataset.error || 'Please accept privacy consent.';
        return;
      }
      if (saveCheck?.checked && emailInput?.value) localStorage.setItem(key, emailInput.value);
      else localStorage.removeItem(key);
      message.textContent = langPack.thanks;
      form.reset();
    });
  });

  document.querySelectorAll('[data-reading-time]').forEach((el) => {
    const target = document.querySelector(el.dataset.readingTime);
    if (!target) return;
    const words = target.textContent.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.round(words / 220));
    el.textContent = `${minutes} min`;
  });

  document.querySelectorAll('[data-copy-url]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(window.location.href);
        btn.textContent = btn.dataset.copied || 'Copied';
      } catch (_) {
        btn.textContent = btn.dataset.failed || 'Copy failed';
      }
    });
  });

  const footerLinks = document.querySelector('.footer-links');
  if (footerLinks && current.lang) {
    const existing = [...footerLinks.querySelectorAll('a')].map((a) => a.getAttribute('href'));
    [['downloads.html', langPack.downloads], ['events/', langPack.events], ['news/', langPack.news]].forEach(([href, label]) => {
      if (!existing.includes(href)) {
        const a = document.createElement('a');
        a.href = href;
        a.textContent = label;
        footerLinks.appendChild(a);
      }
    });
  }
});
