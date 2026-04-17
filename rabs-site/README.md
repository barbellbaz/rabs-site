# RABS — Marketing Site

Single-page React marketing site for a residential as-built drawing service.
Built with Vite + React + Tailwind.

## Quick start

```bash
npm install
npm run dev       # local dev server
npm run build     # production build → /dist
npm run preview   # preview the built /dist locally
```

## Deploy

Push to `main`. The GitHub Action in `.github/workflows/deploy.yml` builds the site and publishes the contents of `dist/` to a `deploy` branch. Point Hostinger's Git integration at the `deploy` branch.

See `DEPLOYMENT.md` in the root for the step-by-step deploy guide.

## TODO before launch

Search the codebase for `TODO` and `PLACEHOLDER`:
- Confirm/update brand name in `src/rabs.jsx` (`BRAND` constant)
- Add real imagery to `public/images/`
- Replace placeholder testimonials
- Wire up the quote form's `handleSubmit` to a real endpoint (Formspree / Web3Forms / your API)
- Update SEO meta in `index.html`

## Structure

```
src/
  rabs.jsx     — the marketing page component
  main.jsx     — Vite entry
  index.css    — Tailwind directives
public/
  favicon.svg
  images/      — drop logo + sample scan images here
```
