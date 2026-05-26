# POE2 Shaman Feral Razor Wolf Guide

Local and Vercel-hosted React dashboard built from
`poe2_0_5_shaman_feral_razor_wolf_thai_guide.pdf`.

The app turns the 35-page Thai PDF guide into a practical build dashboard:

- Dashboard-first workflow for checklist, skill setup, Spirit, gear, rotation,
  troubleshooting, and sources.
- `/page/1` through `/page/35` remain available as PDF reference pages.
- Interactive checklist state is stored in `localStorage`.
- Search covers PDF page titles, keywords, and guide body text.
- POE2DB is the only game-data/source-link basis for enrichment.
- Generated hero art is decorative; cached skill icons come from POE2DB.

## Local Development

```bash
npm install
npm run dev -- --host 127.0.0.1
```

Open `http://127.0.0.1:5173`.

## Verification

```bash
npm run lint
npm run build
```

The Vercel deployment uses Vite defaults with `dist` as the output directory.
`vercel.json` rewrites all routes to `index.html` so direct links such as
`/page/1` and `/page/35` refresh correctly.

