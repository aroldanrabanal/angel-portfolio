# angel-portfolio

Personal portfolio site for **Ángel Roldán Rabanal** — Next.js App Router, bilingual copy (EN/ES), scroll-driven sections, and a small WebGL scene (React Three Fiber + GSAP).

## Stack

- [Next.js](https://nextjs.org/) 16 · React 19 · TypeScript
- [Tailwind CSS](https://tailwindcss.com/) v4
- [GSAP](https://gsap.com/) + ScrollTrigger · [Lenis](https://lenis.darkroom.engineering/) smooth scroll
- [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) · [three.js](https://threejs.org/)

## Production

**Live site:** [angel-portfolio-virid.vercel.app](https://angel-portfolio-virid.vercel.app)

Source: [github.com/aroldanrabanal/angel-portfolio](https://github.com/aroldanrabanal/angel-portfolio)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # run production server locally
npm run lint
```

## Content

Copy and structure live in [`data/portfolio.en.json`](data/portfolio.en.json) and [`data/portfolio.es.json`](data/portfolio.es.json). Types: [`types/portfolio.ts`](types/portfolio.ts).

- **Works** (`projects` in JSON): public repos and live demos.
- **Experience** (`experience` in JSON): real employment and internships — surfaced in the Process section.

## Repository

```bash
git clone https://github.com/aroldanrabanal/angel-portfolio.git
cd angel-portfolio
```

Push updates to `main`:

```bash
git push origin main
```

Vercel is connected to this repo; pushes to `main` trigger production deploys when Git integration is enabled in the [Vercel dashboard](https://vercel.com/aroldanrabanals-projects/angel-portfolio).

## Deploy on Vercel

This project is linked under **aroldanrabanals-projects / angel-portfolio**. From a clean clone you can redeploy with:

```bash
npx vercel link --yes
npx vercel --prod --yes
```

No environment variables are required for the default build. Keep secrets only in **Project → Settings → Environment Variables** — never commit `.env` files (they are gitignored).

See also [`docs/OTHER-REPOS.md`](docs/OTHER-REPOS.md) for related public projects (TECHNOAPP, CampusGo, etc.).

## Licence

Private / personal project unless you add an explicit licence file.
