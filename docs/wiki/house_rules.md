Below is a set of architecture and design‑pattern guidelines—plus organizational “house rules”—that will keep your Tarot & Astrology project modular, maintainable, and testable as you iterate through your sprints.

---

## 1. Overall Architecture: Modular, Layered, API‑First

```
┌────────────────────────────┐      ┌─────────────────────────────┐
│       Frontend App        │◀────▶│    Next.js/SvelteKit SSR    │
│ • Pages & Routes          │      │ • API Routes / Endpoints    │
│ • Components (UI & 3D)    │      └─────────────────────────────┘
│ • State (React Query, Z.) │
└────────────────────────────┘
            ▲   ▲
            │   │ fetch / mutate
            │   │
┌────────────────────────────┐
│    Supabase (Postgres)     │
│ • Auth & Row‑Level Sec.    │
│ • Tables: users, cards…    │
└────────────────────────────┘
            ▲
            │ RPC / REST
            │
┌────────────────────────────┐
│  Python Astro Service      │
│ (FastAPI + pyswisseph)     │
│ • /chart, /transit, etc.   │
│ • Unit‑tested core logic   │
└────────────────────────────┘
```

### 1.1 Layers & Responsibilities

|       Layer       | Contains                                   | Responsibilities                              |
| :---------------: | :----------------------------------------- | :-------------------------------------------- |
|      **UI**       | Pages, Layouts, Components, 3D Scenes      | Routing, SSR data fetching, user interactions |
|  **Domain/API**   | API routes (Next/SvelteKit), services      | Auth checks, input validation, orchestration  |
|  **Data Access**  | Supabase client, DB schemas, RPC functions | CRUD operations, row‑level security           |
| **Astro Service** | Python modules, FastAPI endpoints          | Astro calculations, Swiss Ephemeris calls     |

---

## 2. Code Organization & Folder Structure

### 2.1 Frontend (Next.js example)

```
/src
 ├── pages/               # Route‑based pages (SSR & API)
 │    ├── index.tsx
 │    ├── dashboard.tsx
 │    └── api/
 │         ├── auth.ts
 │         ├── tarot-reading.ts
 │         ├── dice-reading.ts
 │         └── … other endpoints
 │
 ├── components/          # “Dumb” UI components
 │    ├── Button/
 │    ├── CardGallery/
 │    ├── 3dScene/
 │    └── AvatarUploader/
 │
 ├── features/            # “Smart” domain modules
 │    ├── auth/
 │    │    ├── hooks.ts   # useAuth(), useRequireAuth()
 │    │    └── api.ts     # client‑side wrappers for /api/auth
 │    ├── tarot‑reading/
 │    ├── dice‑reading/
 │    └── astrology‑chart/
 │
 ├── lib/                 # Shared utilities & configs
 │    ├── supabaseClient.ts
 │    └── openaiClient.ts
 │
 ├── styles/              # Tailwind config, global CSS
 └── tests/               # Jest / React Testing Library
      ├── unit/
      └── integration/
```

### 2.2 Backend (Python Astro Service)

```
/astro-service
 ├── app/
 │    ├── main.py          # FastAPI app & routers
 │    ├── routers/
 │    │    ├── chart.py
 │    │    └── transit.py
 │    ├── services/        # Pure logic, Swiss Ephemeris wrappers
 │    └── models/          # Pydantic schemas
 ├── tests/
 │    ├── unit/            # pytest for core functions
 │    └── integration/     # test endpoints with TestClient
 └── requirements.txt
```

---

## 3. Best‑Practice “House Rules”

1. **Single Responsibility & DRY**

   - Each component/service does one thing.
   - Factor shared logic into `lib/` or `services/` and reuse, don’t copy.

2. **Feature‑First Modules**

   - Group by domain feature (`features/tarot`, `features/dice`) not by type.
   - Each module folder contains its React hooks, API calls, types & tests.

3. **Type‑Safety Everywhere**

   - Frontend: TypeScript strict mode, shared types for API payloads.
   - Python: Pydantic models for request/response schemas.

4. **Testing Pyramid**

   - **Unit tests** for pure functions (< 80 ms each).
   - **Integration tests** for API routes end‑to‑end.
   - **E2E tests** for critical flows (signup → reading → save).

5. **Commit & PR Standards**

   - Write atomic commits with [Conventional Commits](https://www.conventionalcommits.org).
   - Every PR must include:

     - Description of feature/fix.
     - Screenshots or recordings for UI changes.
     - Linked issue or user story ID.
     - At least one unit test for new logic.

6. **API Versioning & Stability**

   - Prefix internal SSR routes with `/api/v1/...` for future evolution.
   - Deprecation path: maintain old endpoints for one full release cycle.

7. **Secure by Default**

   - Leverage Supabase row‑level security (RLS) policies.
   - Sanitize all inputs on API layer (Zod or Pydantic).
   - Store secrets in environment; never commit them.

8. **Performance & Caching**

   - SSR pages: use caching headers for low‑change widgets (e.g. Card of the Day).
   - Client data: React Query / SWR with proper stale‑while‑revalidate.
   - Lazy‑load heavy components (3D scenes) behind user actions.

9. **3D & Assets**

   - Store models/textures in a CDN-backed storage (e.g. Supabase Storage).
   - Isolate Babylon.js logic in its own wrapper component under `components/3dScene/`.

10. **Error Handling & Monitoring**

    - API: consistent error format `{ error: { code, message } }`.
    - Integrate Sentry (or similar) in both frontend and Python service.
    - Surface user‑friendly error messages in the UI.

---

## 4. Organizational Tips

- **Sprint Kick‑Off**: At start of each sprint, create a lightweight Confluence page or Notion doc outlining stories, acceptance criteria, and designs.
- **Kanban Board**: Track on GitHub Projects / Jira. Use labels (`backend`, `frontend`, `astro-service`, `3d`) and assign clear owners.
- **Design System**: Early on, spin up a minimal Storybook instance to house shared UI components and document props.
- **API Contracts**: Maintain a living OpenAPI spec for the Python service; generate TS client types with `openapi-typescript`.
- **Code Reviews**: Enforce at least one reviewer per PR; include checklist (types, tests, docs, lint).
- **Documentation**:

  - Inline: JSDoc / docstrings on public functions.
  - High‑level: README for each module and service with architecture diagrams and run instructions.

- **Demo & Retrospective**: End each sprint with a live demo, feedback round, and 15 min retro to improve process.

---

By adhering to a **layered**, **feature‑oriented** organization, leveraging **strict typing**, and enforcing **test‑driven**, **secure**, and **performance‑minded** practices, you’ll keep the codebase clean, predictable, and easy to evolve—no matter how many features you add.
