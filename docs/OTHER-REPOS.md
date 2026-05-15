# Related public repositories

Checklist to keep GitHub and the portfolio **Works** section aligned. Repos live under [github.com/aroldanrabanal](https://github.com/aroldanrabanal).

| Repository | Role in portfolio | What the code shows | Documentation to keep visible |
|--------------|-------------------|---------------------|-------------------------------|
| [angel-portfolio](https://github.com/aroldanrabanal/angel-portfolio) | This site | Next.js 16, React 19, Tailwind v4, GSAP/Lenis, React Three Fiber, bilingual JSON content | README with setup, build/lint, content files and Vercel deployment |
| [TECHNOAPP](https://github.com/aroldanrabanal/TECHNOAPP) | Prague techno events guide | Next.js App Router routes for events, calendar, profile, social, chats and admin; Firebase; Resident Advisor scraping; AI classification; Capacitor Android build | Replace starter README with product purpose, live demo, Firebase/env setup, admin/scraper flow and Android commands |
| [CampusGo](https://github.com/aroldanrabanal/CampusGo) | Campus events front end | Ionic/Angular standalone app with Capacitor, routes for login, register, calendar, favourites, payment and social; service consuming the Render API | Add README with app purpose, `npm start`, API base URL, main routes and link to AppCampusGo |
| [AppCampusGo](https://github.com/aroldanrabanal/AppCampusGo) | CampusGo backend/API | Spring Boot 3.5, Java 21, JPA, DTOs, MapStruct, REST controllers for events/users/gallery and service tests | Add README with endpoints, database expectations, local run command, test command and link back to CampusGo |
| [A-Saturday-Night-of-Angel](https://github.com/aroldanrabanal/A-Saturday-Night-of-Angel) | Unity/C# 2D game | Player movement, double jump, shooting, enemy patrols, moving platforms, pickups, game-over flow and scenes MainMenu/Nivel1/Nivel2 | Add README with Unity version, controls, scenes, gameplay loop and build/export notes |

Skip polishing for class-only or empty repos (`clase`, `odoo`, etc.) unless you intend to showcase them.

## Portfolio card rules

- Every important project should have a clear `description`, `highlights`, `documentation` and `links` entry in `data/portfolio.en.json` and `data/portfolio.es.json`.
- Prefer facts visible in GitHub: routes, scripts, dependencies, controllers, public demos and README state.
- If a repo lacks README, say what documentation is missing instead of pretending it is complete.
- Link companion repos together when the product spans multiple codebases, such as CampusGo and AppCampusGo.

### Push from a local clone

From each project directory (after `git init` or existing clone):

```bash
git remote add origin https://github.com/aroldanrabanal/<repo>.git
git push -u origin main
```

Use GitHub **About** → website URL for live demos when they exist.
