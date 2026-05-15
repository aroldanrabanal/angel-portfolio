<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

This is a single Next.js 16 portfolio app (no monorepo, no database, no external services).

### Running the app

- `npm run dev` — starts dev server on port 3000 (Turbopack)
- `npm run build` — production build
- `npm run lint` — ESLint (pre-existing lint errors in `components/canvas/WebGLCanvas.tsx` and `lib/lenis.tsx` are known; do not fix unless specifically asked)

### Notes

- No `.env` or secrets are required for local development or build.
- Static content lives in `data/portfolio.en.json` and `data/portfolio.es.json`.
- The `translate:portfolio` script requires `GOOGLE_TRANSLATE_API_KEY` but the translated file is already committed, so it's not needed for normal dev work.
- WebGL (React Three Fiber) renders a 3D canvas in the hero section; headless environments without GPU may show a blank canvas but the rest of the site renders normally.
