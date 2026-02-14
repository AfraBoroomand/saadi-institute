document.addEventListener('DOMContentLoaded', () => {
  const LANGS = ['fa', 'de', 'en'];

  // Some hosts serve /fa, /de, /en without appending a trailing slash.
  // In that case, relative links resolve from "/" and break navigation.
  if (LANGS.includes(window.location.pathname.replace(/^\/+|\/+$/g, ''))) {
    window.location.replace(`${window.location.pathname}/`);
    return;
  }

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
      thanks: 'سپاسگزاریم. خبرنامه به زودی فعال می شود. در حال حاضر می توانید از ایمیل استفاده کنید.',
      menu: 'منو',
      nav: 'پیمایش اصلی',
      language: 'زبان',
      skip: 'پرش به محتوای اصلی',
      copy: 'کپی پیوند',
      copied: 'کپی شد',
      copyFailed: 'کپی نشد',
      minutes: 'دقیقه'
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
      thanks: 'Vielen Dank. Der Newsletter wird in Kuerze aktiviert. Bis dahin erreichen Sie uns per E-Mail.',
      menu: 'Menue',
      nav: 'Hauptnavigation',
      language: 'Sprache',
      skip: 'Zum Inhalt springen',
      copy: 'Link kopieren',
      copied: 'Kopiert',
      copyFailed: 'Kopieren fehlgeschlagen',
      minutes: 'Min.'
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
      thanks: 'Thanks. The newsletter will be activated soon. You can contact us by email in the meantime.',
      menu: 'Menu',
      nav: 'Main navigation',
      language: 'Language',
      skip: 'Skip to main content',
      copy: 'Copy link',
      copied: 'Copied',
      copyFailed: 'Copy failed',
      minutes: 'min read'
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
  const toPrefixedUrl = (url) => {
    if (!url || typeof url !== 'string') return url;
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:') || url.startsWith('#')) return url;
    if (url.startsWith('/')) return `${getBasePrefix()}${url}`;
    return url;
  };

  const current = getCurrentLangAndFile();
  const langPack = i18n[current.lang] || i18n.en;
  const storage = {
    get(key) {
      try { return window.localStorage.getItem(key); } catch (_) { return null; }
    },
    set(key, value) {
      try { window.localStorage.setItem(key, value); } catch (_) {}
    },
    remove(key) {
      try { window.localStorage.removeItem(key); } catch (_) {}
    }
  };

  const languageChooser = document.querySelector('[data-language-chooser]');
  if (languageChooser) {
    const remember = document.querySelector('#remember-choice');
    const savedLang = storage.get('saadi-lang');
    const rememberLang = storage.get('saadi-lang-remember') === 'true';

    if (remember) remember.checked = rememberLang;

    languageChooser.querySelectorAll('[data-lang]').forEach((link) => {
      const lang = link.getAttribute('data-lang');
      if (!LANGS.includes(lang)) return;
      if (savedLang === lang) {
        link.classList.remove('secondary');
        link.classList.add('primary');
      }
      link.addEventListener('click', () => {
        if (remember?.checked) {
          storage.set('saadi-lang', lang);
          storage.set('saadi-lang-remember', 'true');
        } else {
          storage.remove('saadi-lang');
          storage.set('saadi-lang-remember', 'false');
        }
      });
    });
  }

  // Guard relative link navigation so language pages still route correctly
  // even when the current URL was loaded without trailing slash normalization.
  if (current.lang) {
    document.addEventListener('click', (e) => {
      const anchor = e.target instanceof Element ? e.target.closest('a[href]') : null;
      if (!anchor) return;
      if (anchor.target === '_blank' || anchor.hasAttribute('download')) return;
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const rawHref = anchor.getAttribute('href') || '';
      if (!rawHref || rawHref.startsWith('/') || rawHref.startsWith('#')) return;
      if (rawHref.startsWith('mailto:') || rawHref.startsWith('tel:') || rawHref.startsWith('javascript:')) return;
      if (/^[a-z][a-z0-9+.-]*:/i.test(rawHref)) return;

      const resolved = new URL(rawHref, window.location.href);
      if (resolved.origin !== window.location.origin) return;

      const langPrefix = `/${current.lang}/`;
      if (resolved.pathname.startsWith(langPrefix)) return;
      if (LANGS.some((lang) => resolved.pathname.startsWith(`/${lang}/`))) return;

      e.preventDefault();
      const fixedPath = `${langPrefix}${resolved.pathname.replace(/^\/+/, '')}`;
      const fixed = `${fixedPath}${resolved.search}${resolved.hash}`;
      window.location.assign(`${getBasePrefix()}${fixed}`);
    });
  }

  const normalizeA11y = () => {
    const main = document.querySelector('main');
    if (main && !main.id) main.id = 'main';

    let skip = document.querySelector('.skip-link');
    if (!skip && main) {
      skip = document.createElement('a');
      skip.className = 'skip-link';
      skip.href = '#main';
      document.body.insertAdjacentElement('afterbegin', skip);
    }
    if (skip) skip.textContent = langPack.skip;

    const nav = document.querySelector('.main-nav');
    if (nav) {
      nav.setAttribute('aria-label', langPack.nav);
      if (!nav.id) nav.id = 'main-navigation';
    }

    const toggle = document.querySelector('.nav-toggle');
    if (toggle) {
      toggle.setAttribute('aria-label', langPack.menu);
      toggle.setAttribute('aria-expanded', toggle.getAttribute('aria-expanded') || 'false');
      if (nav) toggle.setAttribute('aria-controls', nav.id);
    }

    const langSelect = document.querySelector('.lang-switch');
    if (langSelect) langSelect.setAttribute('aria-label', langPack.language);
  };

  normalizeA11y();

  document.querySelectorAll('.lang-switch').forEach((select) => {
    const wrap = document.createElement('div');
    wrap.className = 'lang-buttons';
    LANGS.forEach((lang) => {
      const a = document.createElement('a');
      a.className = `lang-btn${current.lang === lang ? ' active' : ''}`;
      a.href = current.lang && current.file ? toLangFile(lang, current.file) : toLangHome(lang);
      a.textContent = lang.toUpperCase();
      wrap.appendChild(a);
    });
    select.insertAdjacentElement('afterend', wrap);
  });

  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  if (nav && current.file) {
    const normalizedCurrent = current.file.replace(/index\.html$/, '');
    nav.querySelectorAll('a').forEach((link) => {
      const href = (link.getAttribute('href') || '').replace(/^\.\//, '');
      const normalizedHref = href.replace(/index\.html$/, '');
      if (normalizedHref && normalizedCurrent.startsWith(normalizedHref)) link.classList.add('active');
    });
  }

  document.querySelectorAll('.lang-switch').forEach((select) => {
    select.addEventListener('change', (e) => {
      const targetLang = e.target.value;
      if (storage.get('saadi-lang-remember') === 'true') {
        storage.set('saadi-lang', targetLang);
      }
      if (!current.lang || !current.file) {
        window.location.href = toLangHome(targetLang);
        return;
      }
      const target = toLangFile(targetLang, current.file);
      window.location.href = target;
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
    btn.textContent = langPack.search;
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
      const matches = index
        .filter((item) => `${item.title} ${item.excerpt} ${item.keywords}`.toLowerCase().includes(q))
        .slice(0, 8);

      if (!matches.length) {
        results.innerHTML = `<p>${langPack.noResults}</p>`;
        return;
      }

      results.innerHTML = `<h3>${langPack.resultsTitle}</h3>${matches.map((item) => `<article class="search-hit"><a href="${toPrefixedUrl(item.url)}">${item.title}</a><p>${item.excerpt}</p></article>`).join('')}`;
    };

    const getFocusables = () => [...modal.querySelectorAll('button, input, a, [tabindex]:not([tabindex="-1"])')];

    const openModal = () => {
      modal.hidden = false;
      document.body.classList.add('modal-open');
      setTimeout(() => input.focus(), 0);
    };

    const closeModal = () => {
      modal.hidden = true;
      document.body.classList.remove('modal-open');
      btn.focus();
    };

    btn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.hidden) closeModal();
      if (e.key === 'Tab' && !modal.hidden) {
        const focusables = getFocusables();
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
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
    const saved = storage.get(key);
    if (saved && emailInput) emailInput.value = saved;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!consent || !consent.checked) {
        if (message) message.textContent = consent?.dataset.error || 'Consent is required.';
        return;
      }
      if (saveCheck?.checked && emailInput?.value) {
        storage.set(key, emailInput.value);
      } else {
        storage.remove(key);
      }
      if (message) message.textContent = langPack.thanks;
      if (emailInput && saveCheck?.checked) {
        const cached = emailInput.value;
        form.reset();
        emailInput.value = cached;
      } else {
        form.reset();
      }
    });
  });

  document.querySelectorAll('[data-reading-time]').forEach((el) => {
    const target = document.querySelector(el.dataset.readingTime);
    if (!target) return;
    const words = target.textContent.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.round(words / 220));
    el.textContent = current.lang === 'fa' ? `${minutes} ${langPack.minutes}` : `${minutes} ${langPack.minutes}`;
  });

  document.querySelectorAll('[data-copy-url]').forEach((btn) => {
    if (!btn.textContent.trim()) btn.textContent = langPack.copy;
    btn.addEventListener('click', async () => {
      const original = btn.textContent;
      try {
        await navigator.clipboard.writeText(window.location.href);
        btn.textContent = btn.dataset.copied || langPack.copied;
      } catch (_) {
        btn.textContent = btn.dataset.failed || langPack.copyFailed;
      }
      setTimeout(() => {
        btn.textContent = original || langPack.copy;
      }, 1400);
    });
  });

  document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
    if ((link.textContent || '').trim().toLowerCase() === 'mailto') {
      link.textContent = link.getAttribute('href').replace('mailto:', '');
    }
  });

  const footerLinks = document.querySelector('.footer-links');
  if (footerLinks && current.lang) {
    const existing = new Set([...footerLinks.querySelectorAll('a')].map((a) => a.getAttribute('href')));
    [['downloads.html', langPack.downloads], ['events/', langPack.events], ['news/', langPack.news]].forEach(([href, label]) => {
      if (!existing.has(href)) {
        const a = document.createElement('a');
        a.href = href;
        a.textContent = label;
        footerLinks.appendChild(a);
      }
    });
  }
});
