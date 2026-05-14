# angel-portfolio

Personal portfolio site for **Ángel Roldán Rabanal** — Next.js App Router, bilingual copy (EN/ES), scroll-driven sections, and a small WebGL scene (React Three Fiber + GSAP).

## Stack

- [Next.js](https://nextjs.org/) 16 · React 19 · TypeScript
- [Tailwind CSS](https://tailwindcss.com/) v4
- [GSAP](https://gsap.com/) + ScrollTrigger · [Lenis](https://lenis.darkroom.engineering/) smooth scroll
- [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) · [three.js](https://threejs.org/)

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

## Production URL

Replace with your live deployment after you connect hosting (for example Vercel):

**Production:** _add your URL here (e.g. `https://your-domain.vercel.app`)_

## Repository

Source: [github.com/aroldanrabanal/angel-portfolio](https://github.com/aroldanrabanal/angel-portfolio)

If the repo does not exist yet, create it on GitHub (public), add this folder as `origin`, and push `main`:

```bash
git remote add origin https://github.com/aroldanrabanal/angel-portfolio.git
git branch -M main
git push -u origin main
```

## Deploy on Vercel

1. Import this repository in the [Vercel dashboard](https://vercel.com/new).
2. Framework preset: **Next.js**. Root: repository root.
3. Keep secrets only in **Project → Settings → Environment Variables** — do not commit `.env` files (they are gitignored).

See also [`docs/OTHER-REPOS.md`](docs/OTHER-REPOS.md) for related public projects (TECHNOAPP, CampusGo, etc.).

## Licence

Private / personal project unless you add an explicit licence file.
