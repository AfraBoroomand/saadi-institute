document.addEventListener('DOMContentLoaded', () => {
  const LANGS = ['fa', 'de', 'en'];

  // Some hosts serve /fa, /de, /en (or /subdir/fa, etc.) without trailing slash.
  // In that case, relative links can resolve incorrectly and cause 404 navigation.
  const pathnameNoTrailing = window.location.pathname.replace(/\/+$/, '');
  const langTailPattern = new RegExp(`/(?:${LANGS.join('|')})$`);
  if (langTailPattern.test(pathnameNoTrailing) && !window.location.pathname.endsWith('/')) {
    window.location.replace(`${pathnameNoTrailing}/${window.location.search}${window.location.hash}`);
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
      thanks: 'سپاسگزاریم. برای تکمیل عضویت، ایمیل پیش‌نویس‌شده را ارسال کنید.',
      menu: 'منو',
      nav: 'پیمایش اصلی',
      language: 'زبان',
      skip: 'پرش به محتوای اصلی',
      copy: 'کپی پیوند',
      copied: 'کپی شد',
      copyFailed: 'کپی نشد',
      minutes: 'دقیقه',
      navHome: 'خانه',
      navAbout: 'درباره',
      navPrograms: 'برنامه ها',
      navEvents: 'رویدادها',
      navNews: 'اخبار',
      navResources: 'منابع',
      navInvolved: 'مشارکت',
      navContact: 'تماس',
      month: 'ماه',
      type: 'نوع',
      allMonths: 'همه ماه ها',
      allTypes: 'همه رویدادها',
      eventsCalendar: 'تقویم رویدادها',
      noEventsVisible: 'در این فیلتر رویدادی یافت نشد.',
      calendarLegend: 'روزهای علامت خورده دارای رویداد هستند.',
      addToCalendar: 'افزودن به تقویم',
      googleCalendar: 'Google Calendar',
      downloadICS: 'دانلود ICS',
      a11y: 'دسترسی پذیری',
      a11yLargeText: 'متن بزرگ تر',
      a11yHighContrast: 'کنتراست بالا',
      a11yReaderMode: 'حالت خواندن',
      a11yClose: 'بستن',
      newsletterConsent: 'لطفا با دریافت خبرنامه موافقت کنید.',
      invalidEmail: 'ایمیل معتبر وارد کنید.',
      newsletterSaved: 'عضویت شما ثبت شد.',
      supportInvalid: 'لطفا مبلغ و نوع حمایت را انتخاب کنید.',
      supportReady: 'ایمیل حمایت آماده شد. لطفا آن را ارسال کنید.',
      getInvolved: 'مشارکت',
      accessibility: 'دسترسی پذیری'
    },
    de: {
      search: 'Suche',
      close: 'Schliessen',
      placeholder: 'Website durchsuchen ...',
      noResults: 'Keine Ergebnisse gefunden.',
      readMore: 'Mehr lesen',
      resultsTitle: 'Ergebnisse',
      downloads: 'Downloads',
      events: 'Veranstaltungen',
      news: 'News',
      thanks: 'Danke. Zum Abschluss senden Sie bitte die vorbereitete E-Mail ab.',
      menu: 'Menue',
      nav: 'Hauptnavigation',
      language: 'Sprache',
      skip: 'Zum Inhalt springen',
      copy: 'Link kopieren',
      copied: 'Kopiert',
      copyFailed: 'Kopieren fehlgeschlagen',
      minutes: 'Min.',
      navHome: 'Start',
      navAbout: 'Ueber uns',
      navPrograms: 'Programme',
      navEvents: 'Veranstaltungen',
      navNews: 'Neuigkeiten',
      navResources: 'Ressourcen',
      navInvolved: 'Mitmachen',
      navContact: 'Kontakt',
      month: 'Monat',
      type: 'Typ',
      allMonths: 'Alle Monate',
      allTypes: 'Alle Veranstaltungstypen',
      eventsCalendar: 'Event-Kalender',
      noEventsVisible: 'Keine Events fuer diesen Filter.',
      calendarLegend: 'Markierte Tage enthalten geplante Events.',
      addToCalendar: 'Zum Kalender',
      googleCalendar: 'Google Kalender',
      downloadICS: 'ICS herunterladen',
      a11y: 'Barrierefreiheit',
      a11yLargeText: 'Groessere Schrift',
      a11yHighContrast: 'Hoher Kontrast',
      a11yReaderMode: 'Lesemodus',
      a11yClose: 'Schliessen',
      newsletterConsent: 'Bitte stimmen Sie dem Newsletter zu.',
      invalidEmail: 'Bitte eine gueltige E-Mail eingeben.',
      newsletterSaved: 'Ihre Anmeldung wurde gespeichert.',
      supportInvalid: 'Bitte Betrag und Art der Unterstuetzung auswaehlen.',
      supportReady: 'Unterstuetzungs-E-Mail ist vorbereitet. Bitte senden Sie sie ab.',
      getInvolved: 'Mitmachen',
      accessibility: 'Barrierefreiheit'
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
      thanks: 'Thanks. Please send the prepared email to complete signup.',
      menu: 'Menu',
      nav: 'Main navigation',
      language: 'Language',
      skip: 'Skip to main content',
      copy: 'Copy link',
      copied: 'Copied',
      copyFailed: 'Copy failed',
      minutes: 'min read',
      navHome: 'Home',
      navAbout: 'About',
      navPrograms: 'Programs',
      navEvents: 'Events',
      navNews: 'News',
      navResources: 'Resources',
      navInvolved: 'Get Involved',
      navContact: 'Contact',
      month: 'Month',
      type: 'Type',
      allMonths: 'All months',
      allTypes: 'All events',
      eventsCalendar: 'Events calendar',
      noEventsVisible: 'No events match this filter.',
      calendarLegend: 'Highlighted dates include planned events.',
      addToCalendar: 'Add to calendar',
      googleCalendar: 'Google Calendar',
      downloadICS: 'Download ICS',
      a11y: 'Accessibility',
      a11yLargeText: 'Larger text',
      a11yHighContrast: 'High contrast',
      a11yReaderMode: 'Reader mode',
      a11yClose: 'Close',
      newsletterConsent: 'Please consent to receiving updates.',
      invalidEmail: 'Please enter a valid email address.',
      newsletterSaved: 'Your signup was saved.',
      supportInvalid: 'Please choose an amount and support type.',
      supportReady: 'Support email prepared. Please send it to complete your request.',
      getInvolved: 'Get involved',
      accessibility: 'Accessibility'
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

  const basePrefix = getBasePrefix();
  const stripBasePrefix = (pathname) => {
    if (!basePrefix) return pathname;
    if (pathname === basePrefix) return '/';
    if (pathname.startsWith(`${basePrefix}/`)) return pathname.slice(basePrefix.length);
    return pathname;
  };
  const toLangHome = (lang) => `${basePrefix}/${lang}/`.replace(/\/{2,}/g, '/');
  const toLangFile = (lang, file) => `${basePrefix}/${lang}/${file}`.replace(/\/{2,}/g, '/');
  const toPrefixedUrl = (url) => {
    if (!url || typeof url !== 'string') return url;
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:') || url.startsWith('#')) return url;
    if (url.startsWith('/')) return `${basePrefix}${url}`;
    return url;
  };

  const current = getCurrentLangAndFile();
  if (!current.lang) {
    const docLang = (document.documentElement.lang || '').slice(0, 2).toLowerCase();
    if (LANGS.includes(docLang)) current.lang = docLang;
  }
  const getLangRelativeHref = (target) => {
    if (!current.file) return target;
    const depth = Math.max(0, current.file.split('/').length - 1);
    return depth ? `${'../'.repeat(depth)}${target}` : target;
  };
  const langPack = i18n[current.lang] || i18n.en;

  const storage = {
    get(key) {
      try {
        return window.localStorage.getItem(key);
      } catch (_) {
        return null;
      }
    },
    set(key, value) {
      try {
        window.localStorage.setItem(key, value);
      } catch (_) {
        // Ignore storage errors
      }
    },
    remove(key) {
      try {
        window.localStorage.removeItem(key);
      } catch (_) {
        // Ignore storage errors
      }
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
      const hrefPath = rawHref.split('#', 1)[0].split('?', 1)[0];
      if (!rawHref || rawHref.startsWith('/') || rawHref.startsWith('#')) return;
      if (rawHref.startsWith('mailto:') || rawHref.startsWith('tel:') || rawHref.startsWith('javascript:')) return;
      if (/^[a-z][a-z0-9+.-]*:/i.test(rawHref)) return;
      // Keep static assets and non-HTML files untouched (e.g. PDFs in downloads).
      if (/\.[a-z0-9]+$/i.test(hrefPath) && !hrefPath.toLowerCase().endsWith('.html')) return;

      const resolved = new URL(rawHref, window.location.href);
      if (resolved.origin !== window.location.origin) return;

      const resolvedPathWithinBase = stripBasePrefix(resolved.pathname);
      if (/^\/(?:assets|css|js|data)\//.test(resolvedPathWithinBase)) return;
      const langPrefix = `/${current.lang}/`;
      if (resolvedPathWithinBase.startsWith(langPrefix)) return;
      if (LANGS.some((lang) => resolvedPathWithinBase.startsWith(`/${lang}/`))) return;

      e.preventDefault();
      const fixedPath = `${basePrefix}${langPrefix}${resolvedPathWithinBase.replace(/^\/+/, '')}`.replace(/\/{2,}/g, '/');
      window.location.assign(`${fixedPath}${resolved.search}${resolved.hash}`);
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

  const navConfig = {
    fa: [
      { key: 'home', href: 'index.html', label: i18n.fa.navHome },
      { key: 'about', href: 'about.html', label: i18n.fa.navAbout },
      { key: 'programs', href: 'programs.html', label: i18n.fa.navPrograms },
      { key: 'events', href: 'events/index.html', label: i18n.fa.navEvents },
      { key: 'news', href: 'news/index.html', label: i18n.fa.navNews },
      { key: 'resources', href: 'resources.html', label: i18n.fa.navResources },
      { key: 'involved', href: 'get-involved.html', label: i18n.fa.navInvolved },
      { key: 'contact', href: 'contact.html', label: i18n.fa.navContact }
    ],
    de: [
      { key: 'home', href: 'index.html', label: i18n.de.navHome },
      { key: 'about', href: 'about.html', label: i18n.de.navAbout },
      { key: 'programs', href: 'programs.html', label: i18n.de.navPrograms },
      { key: 'events', href: 'events/index.html', label: i18n.de.navEvents },
      { key: 'news', href: 'news/index.html', label: i18n.de.navNews },
      { key: 'resources', href: 'resources.html', label: i18n.de.navResources },
      { key: 'involved', href: 'get-involved.html', label: i18n.de.navInvolved },
      { key: 'contact', href: 'contact.html', label: i18n.de.navContact }
    ],
    en: [
      { key: 'home', href: 'index.html', label: i18n.en.navHome },
      { key: 'about', href: 'about.html', label: i18n.en.navAbout },
      { key: 'programs', href: 'programs.html', label: i18n.en.navPrograms },
      { key: 'events', href: 'events/index.html', label: i18n.en.navEvents },
      { key: 'news', href: 'news/index.html', label: i18n.en.navNews },
      { key: 'resources', href: 'resources.html', label: i18n.en.navResources },
      { key: 'involved', href: 'get-involved.html', label: i18n.en.navInvolved },
      { key: 'contact', href: 'contact.html', label: i18n.en.navContact }
    ]
  };

  const nav = document.querySelector('.main-nav');
  if (nav && current.lang) {
    const ul = nav.querySelector('ul');
    const items = navConfig[current.lang] || navConfig.en;
    if (ul) {
      ul.innerHTML = items
        .map((item) => `<li><a href="${getLangRelativeHref(item.href)}" data-nav-key="${item.key}">${item.label}</a></li>`)
        .join('');
    }
  }

  const getActiveNavKey = () => {
    if (!current.file) return null;
    const file = current.file;
    if (file === 'about.html') return 'about';
    if (file === 'contact.html') return 'contact';
    if (file.startsWith('events/')) return 'events';
    if (file.startsWith('news/')) return 'news';
    if (file === 'resources.html' || file === 'publications.html' || file === 'downloads.html' || file === 'bridge.html' || file === 'accessibility.html') return 'resources';
    if (file === 'programs.html' || file === 'education.html' || file === 'activity.html' || file === 'goals.html') return 'programs';
    if (file === 'get-involved.html') return 'involved';
    if (file === 'index.html') return 'home';
    return null;
  };

  if (nav) {
    const key = getActiveNavKey();
    if (key) {
      const activeLink = nav.querySelector(`a[data-nav-key="${key}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  }

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
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
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
      .then((data) => {
        index = Array.isArray(data) ? data : [];
      })
      .catch(() => {
        index = [];
      });

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

      results.innerHTML = `<h3>${langPack.resultsTitle}</h3>${matches
        .map((item) => `<article class="search-hit"><a href="${toPrefixedUrl(item.url)}">${item.title}</a><p>${item.excerpt}</p></article>`)
        .join('')}`;
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

    const a11yButton = document.createElement('button');
    a11yButton.type = 'button';
    a11yButton.className = 'a11y-trigger';
    a11yButton.textContent = langPack.a11y;
    a11yButton.setAttribute('aria-expanded', 'false');
    btn.insertAdjacentElement('afterend', a11yButton);

    const a11yPanel = document.createElement('div');
    a11yPanel.className = 'a11y-panel';
    a11yPanel.hidden = true;
    a11yPanel.innerHTML = `<div class="a11y-head"><strong>${langPack.a11y}</strong><button type="button" class="a11y-close">${langPack.a11yClose}</button></div>
      <label><input type="checkbox" data-a11y="large"> ${langPack.a11yLargeText}</label>
      <label><input type="checkbox" data-a11y="contrast"> ${langPack.a11yHighContrast}</label>
      <label><input type="checkbox" data-a11y="reader"> ${langPack.a11yReaderMode}</label>`;
    document.body.appendChild(a11yPanel);

    const applyA11y = () => {
      document.body.classList.toggle('a11y-large', storage.get('saadi-a11y-large') === 'true');
      document.body.classList.toggle('a11y-contrast', storage.get('saadi-a11y-contrast') === 'true');
      document.body.classList.toggle('a11y-reader', storage.get('saadi-a11y-reader') === 'true');
    };

    applyA11y();

    a11yPanel.querySelectorAll('[data-a11y]').forEach((inputEl) => {
      const mode = inputEl.getAttribute('data-a11y');
      const key = `saadi-a11y-${mode}`;
      inputEl.checked = storage.get(key) === 'true';
      inputEl.addEventListener('change', () => {
        storage.set(key, String(inputEl.checked));
        applyA11y();
      });
    });

    const closeA11y = () => {
      a11yPanel.hidden = true;
      a11yButton.setAttribute('aria-expanded', 'false');
    };

    a11yButton.addEventListener('click', () => {
      const open = a11yPanel.hidden;
      a11yPanel.hidden = !open;
      a11yButton.setAttribute('aria-expanded', String(open));
    });

    const a11yClose = a11yPanel.querySelector('.a11y-close');
    if (a11yClose) a11yClose.addEventListener('click', closeA11y);

    document.addEventListener('click', (e) => {
      if (a11yPanel.hidden) return;
      if (a11yPanel.contains(e.target) || a11yButton.contains(e.target)) return;
      closeA11y();
    });
  }

  const formatMonthLabel = (year, month) => {
    const date = new Date(year, month, 1);
    try {
      const locale = current.lang === 'fa' ? 'fa-IR' : current.lang === 'de' ? 'de-DE' : 'en-US';
      return new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(date);
    } catch (_) {
      return `${year}-${String(month + 1).padStart(2, '0')}`;
    }
  };

  const weekdayShort = () => {
    const locale = current.lang === 'fa' ? 'fa-IR' : current.lang === 'de' ? 'de-DE' : 'en-US';
    const labels = [];
    for (let i = 0; i < 7; i += 1) {
      const d = new Date(2024, 0, 7 + i); // Sunday-based week labels.
      labels.push(new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(d));
    }
    return labels;
  };

  const renderMiniCalendar = (container, year, month, highlightedDays, visibleDays) => {
    const first = new Date(year, month, 1);
    const totalDays = new Date(year, month + 1, 0).getDate();
    const startWeekday = first.getDay();
    const labels = weekdayShort();
    let html = `<p class="mini-calendar-title">${formatMonthLabel(year, month)}</p>`;
    html += '<table class="mini-calendar-grid"><thead><tr>';
    labels.forEach((label) => {
      html += `<th scope="col">${label}</th>`;
    });
    html += '</tr></thead><tbody><tr>';

    for (let i = 0; i < startWeekday; i += 1) {
      html += '<td></td>';
    }

    for (let day = 1; day <= totalDays; day += 1) {
      const weekday = (startWeekday + day - 1) % 7;
      const dayKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const hasEvent = highlightedDays.has(dayKey);
      const hasVisibleEvent = visibleDays.has(dayKey);
      const cls = hasVisibleEvent ? 'event-visible' : hasEvent ? 'event-day' : '';
      const aria = hasEvent ? ` aria-label="${day} ${langPack.events}"` : '';
      html += `<td class="${cls}"${aria}>${day}</td>`;
      if (weekday === 6 && day !== totalDays) html += '</tr><tr>';
    }

    const fill = (7 - ((startWeekday + totalDays) % 7)) % 7;
    for (let i = 0; i < fill; i += 1) {
      html += '<td></td>';
    }

    html += '</tr></tbody></table>';
    html += `<p class="mini-calendar-legend">${langPack.calendarLegend}</p>`;
    container.innerHTML = html;
  };

  document.querySelectorAll('[data-events-hub]').forEach((hub) => {
    const list =
      hub.querySelector('[data-event-list]') ||
      hub.parentElement?.querySelector('[data-event-list]') ||
      document.querySelector('[data-event-list]');
    const monthFilter = hub.querySelector('[data-filter-month]');
    const typeFilter = hub.querySelector('[data-filter-type]');
    const calendar = hub.querySelector('[data-mini-calendar]');
    if (!list || !monthFilter || !typeFilter || !calendar) return;

    const cards = [...list.querySelectorAll('[data-event-date]')];
    if (!cards.length) return;

    const monthKeys = new Set();
    const allDays = new Set();
    const typeKeys = new Set();

    cards.forEach((card) => {
      const date = card.getAttribute('data-event-date') || '';
      const type = card.getAttribute('data-event-type') || '';
      if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        monthKeys.add(date.slice(0, 7));
        allDays.add(date);
      }
      if (type) typeKeys.add(type);
    });

    monthFilter.innerHTML = `<option value="all">${langPack.allMonths}</option>`;
    [...monthKeys]
      .sort()
      .forEach((month) => {
        const [year, monthPart] = month.split('-').map((v) => Number(v));
        const opt = document.createElement('option');
        opt.value = month;
        opt.textContent = formatMonthLabel(year, monthPart - 1);
        monthFilter.appendChild(opt);
      });

    typeFilter.innerHTML = `<option value="all">${langPack.allTypes}</option>`;
    [...typeKeys].sort().forEach((type) => {
      const label = cards.find((c) => c.getAttribute('data-event-type') === type)?.getAttribute('data-event-type-label') || type;
      const opt = document.createElement('option');
      opt.value = type;
      opt.textContent = label;
      typeFilter.appendChild(opt);
    });

    const emptyNotice = hub.querySelector('[data-events-empty]');

    const applyFilters = () => {
      const monthValue = monthFilter.value;
      const typeValue = typeFilter.value;
      let visibleCount = 0;
      const visibleDays = new Set();

      cards.forEach((card) => {
        const date = card.getAttribute('data-event-date') || '';
        const type = card.getAttribute('data-event-type') || '';
        const monthMatch = monthValue === 'all' || date.startsWith(monthValue);
        const typeMatch = typeValue === 'all' || type === typeValue;
        const visible = monthMatch && typeMatch;
        card.hidden = !visible;
        if (visible) {
          visibleCount += 1;
          if (/^\d{4}-\d{2}-\d{2}$/.test(date)) visibleDays.add(date);
        }
      });

      if (emptyNotice) emptyNotice.hidden = visibleCount !== 0;

      let monthToRender = monthValue;
      if (monthToRender === 'all') {
        const firstVisible = [...visibleDays].sort()[0] || [...allDays].sort()[0];
        monthToRender = firstVisible ? firstVisible.slice(0, 7) : null;
      }

      if (monthToRender) {
        const [year, month] = monthToRender.split('-').map((v) => Number(v));
        renderMiniCalendar(calendar, year, month - 1, allDays, visibleDays);
      } else {
        calendar.innerHTML = `<p class="mini-calendar-legend">${langPack.noEventsVisible}</p>`;
      }
    };

    monthFilter.addEventListener('change', applyFilters);
    typeFilter.addEventListener('change', applyFilters);

    applyFilters();
  });

  document.querySelectorAll('.newsletter-form').forEach((form) => {
    const emailInput = form.querySelector('input[type="email"]');
    const consent = form.querySelector('[name="newsletter-consent"]');
    const saveCheck = form.querySelector('[name="newsletter-save"]');
    const message = form.querySelector('.newsletter-message');
    const key = `saadi-newsletter-${current.lang || 'en'}`;
    const saved = storage.get(key);
    const endpoint = (window.SAADI_CONFIG?.newsletterEndpoint || '').trim();
    const fallbackEmail = (window.SAADI_CONFIG?.newsletterFallbackEmail || 'info@saadi-institute.de').trim();
    const endpointPlaceholder = endpoint.includes('XXXXXXXX');
    if (saved && emailInput) emailInput.value = saved;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = (emailInput?.value || '').trim();
      if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        if (message) message.textContent = langPack.invalidEmail;
        return;
      }
      if (!consent || !consent.checked) {
        if (message) message.textContent = langPack.newsletterConsent;
        return;
      }

      if (saveCheck?.checked) {
        storage.set(key, email);
      } else {
        storage.remove(key);
      }

      if (endpoint && !endpointPlaceholder) {
        try {
          const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({ email, lang: current.lang || 'en' })
          });
          if (message) message.textContent = res.ok ? langPack.newsletterSaved : langPack.thanks;
        } catch (_) {
          if (message) message.textContent = langPack.thanks;
        }
      } else {
        const subject = encodeURIComponent(`Newsletter signup (${(current.lang || 'en').toUpperCase()})`);
        const body = encodeURIComponent(`Please add this email to the newsletter list:\n\n${email}`);
        window.location.href = `mailto:${fallbackEmail}?subject=${subject}&body=${body}`;
        if (message) message.textContent = langPack.thanks;
      }

      if (emailInput && saveCheck?.checked) {
        const cached = emailInput.value;
        form.reset();
        emailInput.value = cached;
        if (consent) consent.checked = true;
      } else {
        form.reset();
      }
    });
  });

  document.querySelectorAll('[data-support-form]').forEach((form) => {
    const notice = form.querySelector('[data-support-notice]');
    const fallbackEmail = (window.SAADI_CONFIG?.supportFallbackEmail || 'info@saadi-institute.de').trim();
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      const amount = (data.amount || '').trim();
      const mode = (data.mode || '').trim();
      if (!amount || !mode) {
        if (notice) notice.textContent = langPack.supportInvalid;
        return;
      }
      const subject = encodeURIComponent(`Support request (${mode})`);
      const body = encodeURIComponent(
        `Support type: ${mode}\nAmount: ${amount}\nName: ${data.name || ''}\nEmail: ${data.email || ''}\nReceipt requested: ${data.receipt ? 'yes' : 'no'}\nMessage: ${data.message || ''}`
      );
      window.location.href = `mailto:${fallbackEmail}?subject=${subject}&body=${body}`;
      if (notice) notice.textContent = langPack.supportReady;
    });
  });

  document.querySelectorAll('[data-reading-time]').forEach((el) => {
    const target = document.querySelector(el.dataset.readingTime);
    if (!target) return;
    const words = target.textContent.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.round(words / 220));
    el.textContent = `${minutes} ${langPack.minutes}`;
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
    const existing = new Set(
      [...footerLinks.querySelectorAll('a')].map((a) => {
        const href = a.getAttribute('href') || '';
        try {
          return new URL(href, window.location.href).pathname;
        } catch (_) {
          return href;
        }
      })
    );
    [
      ['downloads.html', langPack.downloads],
      ['events/', langPack.events],
      ['news/', langPack.news],
      ['get-involved.html', langPack.getInvolved],
      ['accessibility.html', langPack.accessibility]
    ].forEach(([target, label]) => {
      const href = getLangRelativeHref(target);
      const resolvedPath = new URL(href, window.location.href).pathname;
      if (!existing.has(resolvedPath)) {
        const a = document.createElement('a');
        a.href = href;
        a.textContent = label;
        footerLinks.appendChild(a);
        existing.add(resolvedPath);
      }
    });
  }

  const toICSDate = (isoString) => {
    const date = new Date(isoString);
    if (Number.isNaN(date.getTime())) return null;
    const pad = (n) => String(n).padStart(2, '0');
    return `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`;
  };

  const makeICS = ({ title, description, location, start, end }) => {
    const dtstamp = toICSDate(new Date().toISOString());
    const dtstart = toICSDate(start);
    const dtend = toICSDate(end);
    if (!dtstart || !dtend || !dtstamp) return null;
    const safe = (txt) => String(txt || '').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
    return [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Saadi Institute//Events//EN',
      'BEGIN:VEVENT',
      `UID:${Date.now()}-${Math.random().toString(36).slice(2)}@saadi-institute.de`,
      `DTSTAMP:${dtstamp}`,
      `DTSTART:${dtstart}`,
      `DTEND:${dtend}`,
      `SUMMARY:${safe(title)}`,
      `DESCRIPTION:${safe(description)}`,
      `LOCATION:${safe(location)}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');
  };

  document.querySelectorAll('[data-event-calendar]').forEach((container) => {
    const title = container.getAttribute('data-title') || document.title;
    const start = container.getAttribute('data-start');
    const end = container.getAttribute('data-end');
    const location = container.getAttribute('data-location') || '';
    const description = container.getAttribute('data-description') || '';
    if (!start || !end) return;

    const group = document.createElement('div');
    group.className = 'event-calendar-actions';

    const gStart = toICSDate(start);
    const gEnd = toICSDate(end);
    if (gStart && gEnd) {
      const google = document.createElement('a');
      google.className = 'btn secondary';
      google.target = '_blank';
      google.rel = 'noopener';
      const params = new URLSearchParams({
        action: 'TEMPLATE',
        text: title,
        dates: `${gStart}/${gEnd}`,
        details: description,
        location
      });
      google.href = `https://calendar.google.com/calendar/render?${params.toString()}`;
      google.textContent = langPack.googleCalendar;
      group.appendChild(google);
    }

    const icsData = makeICS({ title, description, location, start, end });
    if (icsData) {
      const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
      const icsLink = document.createElement('a');
      icsLink.className = 'btn secondary';
      icsLink.href = URL.createObjectURL(blob);
      icsLink.download = `${(container.getAttribute('data-slug') || 'event').replace(/[^a-z0-9-]/gi, '-').toLowerCase()}.ics`;
      icsLink.textContent = langPack.downloadICS;
      group.appendChild(icsLink);
    }

    if (group.children.length) {
      const titleEl = document.createElement('p');
      titleEl.className = 'meta';
      titleEl.textContent = langPack.addToCalendar;
      container.appendChild(titleEl);
      container.appendChild(group);
    }
  });
});
