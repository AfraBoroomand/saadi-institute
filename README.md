# Saadi Institute Static Website

Dependency-free static website (HTML/CSS/JS only), deployable on shared hosting (e.g., STRATO) via FTP.

## Project structure
- `index.html` root redirect
- `fa/`, `de/`, `en/` language pages
- `fa/news/`, `de/news/`, `en/news/` static blog pages
- `fa/events/`, `de/events/`, `en/events/` static events pages
- `assets/downloads/` PDF resources
- `data/*-search.json` per-language search index

## Add a new News post
1. Copy one of the existing files in `/<lang>/news/` (e.g. `2026-01-welcome.html`).
2. Rename it to your date slug format: `YYYY-MM-topic.html`.
3. Edit title/date/body in that file.
4. Add a card entry to `/<lang>/news/index.html` linking to the new post.
5. Optionally add it to `data/<lang>-search.json`.

## Add a new Event
1. Copy `/<lang>/events/event-template.html`.
2. Rename to a dated slug (e.g. `2026-09-dialogue.html`).
3. Fill title, date/time, location and details.
4. Add a card item to `/<lang>/events/index.html`.
5. Optionally add the event page to `data/<lang>-search.json`.

## Replace PDF downloads
- Replace files in `assets/downloads/` with real PDFs:
  - `saadi-brochure.pdf`
  - `course-outline.pdf`
  - `annual-report.pdf`
- If file names change, update links in `/<lang>/downloads.html`.

## Update search index JSON
- Edit `data/fa-search.json`, `data/de-search.json`, `data/en-search.json` manually.
- Each entry uses:
  - `title`
  - `url`
  - `excerpt`
  - `keywords`
- Keep URLs absolute from root (e.g. `/fa/events/index.html`).

## Privacy-friendly defaults
- No Google Maps embeds.
- No analytics/tracking by default.
- Newsletter UI is local-only; there is currently no server-side newsletter processing.

## Form setup
- Configure Formspree endpoint in `js/form.js` for contact forms.

## Deploy (FTP / STRATO)
1. Upload all files to the web root (`htdocs`/`public_html`).
2. Ensure `index.html` is in root.
3. Test `/fa/`, `/de/`, `/en/`, and nested pages like `/fa/news/...`.
