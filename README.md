# United Supply Agency

Marketing site and product catalogue for United Supply Agency — springs, sheet-metal parts and hardware for railway signalling relays. Built with Next.js 16 (App Router), React 19 and TypeScript.

## Features

- **Home** — animated SVG train/viaduct hero, company intro, product range, quality credentials, client marquee, capabilities and a quote CTA.
- **Products** (`/products`) — searchable, filterable catalogue (35 parts / 6 families) with grid/list views, category deep links (`/products?cat=springs`), and a product detail modal with keyboard navigation.
- **Contact** (`/contact`) — an "enquiry list" cart (persisted to `localStorage`) with quantity editing, and one-click quote requests via email, Gmail, or WhatsApp.
- Light/dark theme toggle with a circular view-transition reveal, persisted to `localStorage`, no flash-of-wrong-theme on load.
- Fully responsive (mobile full-screen menu, adaptive grids), accessible, and animated with the Web Animations API + `IntersectionObserver` scroll reveals.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — start the dev server (Turbopack)
- `npm run build` — production build
- `npm run start` — serve the production build
- `npx eslint .` — lint

## Project structure

```
app/                  Routes (/, /products, /contact), layout, global CSS
components/           UI building blocks (Header, ProductCard, HeroTrain, Curtain, ...)
context/              Theme and enquiry-list React context providers
lib/                  Product catalogue data and theme tokens
```

## Deploying

This is a standard Next.js App Router project with no external services or environment variables required — it deploys as-is to [Vercel](https://vercel.com/new), or any Node.js host via `npm run build && npm run start`.
