# Saadi Institute Static Website

Production-ready static website (no build step), deployable to shared hosting via FTP.

## Structure
- `index.html` language chooser
- `fa/`, `de/`, `en/` full page sets
- shared assets in `assets/`, styles in `css/`, scripts in `js/`

## Replace logo and hero images
1. Replace `assets/logo.svg` with your final logo (prefer square image).
2. Hero currently uses SVG placeholders in `assets/hero/slide-1.svg ... slide-4.svg`.
3. You can switch to JPG by either:
   - replacing image references in each language `index.html`, or
   - replacing `slide-*.svg` references with your own `slide-*.jpg` files.

## Edit text quickly
- Language pages live in:
  - Persian: `fa/*.html`
  - German: `de/*.html`
  - English scaffold: `en/*.html`
- Main menu is in each page header; keep file names identical across languages so language switching works.

## Formspree configuration
- Edit `js/form.js` and replace:
  - `https://formspree.io/f/XXXXXXXX`
  with your real Formspree endpoint.
- If left unchanged, form shows a warning and users can use the `mailto` fallback.

## Upload to STRATO/shared host via FTP
1. Open your FTP client (e.g., FileZilla).
2. Connect using host credentials from provider.
3. Upload **all files/folders** to the web root (often `htdocs` or `public_html`).
4. Ensure `index.html` is in the root upload directory.
5. Test `/`, `/fa/`, `/de/`, `/en/` in browser.

## GitHub setup
```bash
git init
git add .
git commit -m "Initial static website"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

## Future options
- Add a lightweight CMS later (headless CMS + static pages).
- Or migrate to WordPress while preserving structure and multilingual IA.

## Favicon
- Placeholder file in `assets/favicon/favicon.svg`.
- Generate final favicon set from your logo using a favicon generator and replace placeholder files.

## Make it live with GitHub Pages (GitHub Actions)
This repository includes a workflow at `.github/workflows/deploy-pages.yml` that deploys the site to GitHub Pages on every push to `main`.

### One-time setup
1. Push this repository to GitHub.
2. In GitHub, open **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Push to `main` (or run the workflow manually from **Actions** tab).

### Live URL
- Project site: `https://<your-github-username>.github.io/<repo-name>/`
- If this repo is named `<your-github-username>.github.io`, the URL is `https://<your-github-username>.github.io/`

### Notes
- The workflow uploads the repository root as a static artifact and deploys it directly.
- `.nojekyll` is included so GitHub Pages serves files without Jekyll processing.
