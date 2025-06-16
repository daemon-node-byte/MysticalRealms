# Mystical Realms

**Mystical Realms** is a modular Tarot & Astrology platform built with Next.js (TypeScript), Supabase (Postgres), Babylon.js (3D), and a Python (FastAPI) microservice for astrology calculations. The platform features user authentication, tarot readings, astrology charts, journals, quizzes, and a blog, all wrapped in a mystical, immersive UI.

---

## Features

- **User Authentication** (Supabase)
- **Tarot Readings** (interactive, modular)
- **Astrology Charts** (Python FastAPI microservice)
- **Personal Journals**
- **Quizzes & Assessments**
- **Blog & Knowledge Base**
- **Immersive 3D UI** (Babylon.js)
- **Modular, Testable Architecture**

---

## Tech Stack

- **Frontend:** Next.js (TypeScript), Radix UI, TailwindCSS
- **Backend:** Supabase (Postgres), Python FastAPI (astrology microservice)
- **3D/Graphics:** Babylon.js
- **State Management:** Zustand, TanStack Query
- **Testing:** Playwright, Vitest, Pytest
- **Docs:** `/wiki` directory (see below)

---

## Repository Structure

- `apps/web-client/` – Next.js frontend app
- `apps/astro-service/` – Python FastAPI astrology microservice
- `packages/` – Shared libraries and UI components
- `wiki/` – Project documentation (architecture, database, design, testing, etc.)

See [`wiki/house_rules.md`](./wiki/house_rules.md) for detailed architecture and folder structure guidelines.

---

## Getting Started

1. **Install dependencies:**

   ```sh
   pnpm install
   ```

2. **Configure environment variables:**

   - Copy `.env.example` to `.env` and fill in Supabase and service URLs/keys.

3. **Run the web client:**

   ```sh
   pnpm --filter web-client dev
   ```

4. **Run the astrology microservice:**

   ```sh
   cd apps/astro-service
   uvicorn main:app --reload
   ```

5. **Access the app:**  
   Open [http://localhost:3000](http://localhost:3000)

---

## Database

- **Supabase** is used for authentication and data storage.
- See [`wiki/database_supabase.md`](./wiki/database_supabase.md) for schema, seed data, and ER diagrams.

---

## Design & UI

- Follows the design system and theming in [`wiki/design_principles.md`](./wiki/design_principles.md).
- Public-facing pages and layouts are described in [`wiki/public_pages.md`](./wiki/public_pages.md).

---

## Testing

- **Frontend:** Playwright, Vitest
- **Backend:** Pytest (FastAPI)
- See [`wiki/testing_setup.md`](./wiki/testing_setup.md) for setup and examples.

---

## Contributing

- Follow modular, layered, and feature-first patterns (`wiki/house_rules.md`).
- Use strict typing (TypeScript, Pydantic).
- Write and run tests for all new features.
- Reference the `/wiki` docs for architecture, database, and design guidance.

---

## Documentation

All major project documentation is in the `/wiki` directory:

- `techstack_roadmap.md` – Tech stack, architecture, and sprint roadmap
- `sprint_summery.md` – Sprint breakdowns and tasks
- `database_supabase.md` – Database schema and ERD
- `house_rules.md` – Architecture, folder structure, best practices
- `design_principles.md` – Visual design and theming
- `public_pages.md` – Public page requirements
- `testing_setup.md` – Testing stack and examples

---

## License

MIT License

---
