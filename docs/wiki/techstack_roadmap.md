# Tech Stack & Architecture

- **Frontend**

  - **Framework:** Next.js (TypeScript) for SSR, file-based routing, built-in API routes.
  - **3D & Canvas:** Babylon.js integrated into React components for Spread Creator & immersive readings.
  - **UI Components:** Tailwind CSS for styling, Radix UI for accessible components.
  - **State Management:** React Query for data fetching, Zustand for local state (e.g., user profile, journal entries).
  - **Markdown Support:** MDX with contentlayer for blog articles and knowledge base content.

- **Backend / API**

  - **Primary:** Next.js API routes (Node) for user-facing endpoints and orchestrating Supabase.
  - **Astrology Microservice:** Separate Python service (FastAPI) using `pyswisseph`, containerized, exposing REST endpoints for chart calc, pdf/svg generation.

- **Database & Auth**

  - **Supabase (PostgreSQL):** Auth (OAuth providers), real-time DB for feeds, storage for images & PDFs.
  - **Storage buckets:** Card images, user avatars, exported PDFs.

- **AI Interpolations**

  - Calls from Next.js API routes to OpenAI (or your preferred LLM) for reading interpretations and dice readings.

- **CI/CD & Hosting**

  - **GitHub Actions** → Deploy Next.js to Vercel.
  - **Docker + AWS ECS / Kubernetes** → Python microservice.
  - **Supabase** hosted.

---

## Implementation Roadmap (MVP-First Sprints)

| Sprint | Focus & Key Tasks                      | Deliverables                                                                                                                                        |
| :----: | :------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1**  | **Project Kick-off & Infra**           | • Monorepo set up with Next.js + Python folder<br>• Supabase project provisioned (Auth + DB)<br>• CI/CD pipelines (Next.js → Vercel; Python Docker) |
| **2**  | **Auth & User Profiles**               | • Signup/login pages (Supabase Auth)<br>• Profile model & UI<br>• Avatar upload, bio editing, badge system scaffold                                 |
| **3**  | **Dashboard Core**                     | • News feed (supabase real-time)<br>• Card of the Day component (rotating pick)<br>• Daily horoscope (static placeholder → LLM integration later)   |
| **4**  | **Live Readings & AI**                 | • Spread selection UI & deck options<br>• “Draw cards” simulation + image render<br>• LLM call to generate interpretation                           |
| **5**  | **Tarot Explorer & Journal**           | • Card gallery with search & filter<br>• Tarot Journal CRUD (manual entries)<br>• Import flow stub for live reading data                            |
| **6**  | **Spread Creator & Community Sharing** | • Babylon.js canvas component<br>• Drag/drop & label positions<br>• Save → share feed                                                               |
| **7**  | **Astrology Microservice & Charts**    | • FastAPI service with endpoints: birth chart, transit, synastry<br>• Next.js integration for request/response<br>• SVG preview in UI               |
| **8**  | **Supporting Features**                | • Tarot quiz game<br>• Dice reading + LLM<br>• Private calendar CRUD                                                                                |
| **9**  | **Blog, Comments & Knowledge Base**    | • Blog section with MDX (or CMS)<br>• Commenting system (Supabase)<br>• Knowledge base pages (static content)                                       |
| **10** | **Polish, Testing & Performance**      | • Responsive / accessibility audits<br>• Unit & integration tests (Jest / React Testing Library)<br>• Load-test astrology endpoints                 |

---

### Why This Order?

1. **Infra & Auth first** unlocks every other feature behind a secure, versioned codebase.
2. **Profiles & Dashboard** give immediate value to users and let you demo the core “experience.”
3. **Live readings & Spread Creator** are the “wow” features; once infra and data models exist, you can layer on 3D and AI.
4. **Explorer & Journal** let enthusiasts browse and start logging—solid retention hooks.
5. **Astrology service** is a blocker for all chart-based features, so isolate and deliver it mid-stream.
6. **Supporting gamification & community** keep users coming back.
7. **Content & docs** tie it all together and improve discoverability (SEO + stickiness).
