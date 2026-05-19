<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

- **Single service:** This is a pure frontend Next.js 16 portfolio site with no database, no Docker, and no external service dependencies.
- **Dev server:** `npm run dev` starts on `localhost:3000`. No environment variables are needed.
- **Lint:** `npm run lint` — the codebase has 2 pre-existing ESLint errors (react-hooks/refs in `WebGLCanvas.tsx` and react-hooks/set-state-in-effect in `lib/lenis.tsx`). These are known and not blockers.
- **Build:** `npm run build` uses Turbopack and produces static output.
- **No test framework** is configured — there are no automated tests to run.
- **Content:** All portfolio content is in `data/portfolio.en.json` and `data/portfolio.es.json` (static JSON, no CMS).
- **Translation script** (`npm run translate:portfolio`) requires `GOOGLE_TRANSLATE_API_KEY` and is optional — the Spanish JSON is already committed.
