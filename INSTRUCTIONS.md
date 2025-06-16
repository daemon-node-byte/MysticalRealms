# Mystical Realms – Repository Context Instructions (for Copilot)

## Project Purpose

Mystical Realms is a modular Tarot & Astrology platform built with Next.js (TypeScript), Supabase (Postgres), Babylon.js (3D), and a Python (FastAPI) microservice for astrology calculations. It features user authentication, tarot readings, astrology charts, journals, quizzes, and a blog, with a focus on testability, modularity, and a mystical, immersive UI.

---

## Documentation Overview

The `/wiki` directory contains detailed, structured documentation for all major aspects of the project:

- **techstack_roadmap.md**: High-level tech stack, architecture, and sprint roadmap.
- **sprint_summery.md**: Step-by-step breakdown of each sprint, with granular tasks.
- **database_supabase.md**: Complete Supabase SQL schema, seed data, and ER diagram.
- **house_rules.md**: Architecture, folder structure, and best-practice guidelines.
- **design_principles.md**: Visual design principles, theme palettes, and brand usage.
- **public_pages.md / public_pages_layout.md**: Landing page and public-facing page requirements and layout ideas.
- **testing_setup.md**: Testing stack, setup, and example tests for frontend and backend.

---

## How to Use This Context

- **Architecture & Patterns**: Refer to `house_rules.md` for code organization, layering, and best practices.
- **Database & Data Models**: Use `database_supabase.md` for table schemas, relationships, and seed data.
- **Feature Planning**: Consult `techstack_roadmap.md` and `sprint_summery.md` for implementation order and feature breakdowns.
- **UI/UX & Design**: Reference `design_principles.md` and `public_pages_layout.md` for visual and interaction guidelines.
- **Testing**: Follow `testing_setup.md` for recommended tools, config, and test coverage.
- **Public Pages**: Use `public_pages.md` for requirements and enhancements for non-authenticated pages.

---

## Copilot Guidance

- Always align code and suggestions with the modular, layered, and feature-first structure described in `house_rules.md`.
- Use strict typing (TypeScript, Pydantic) and enforce test-driven development.
- When generating new code, prefer placing files/folders according to the patterns in the documentation.
- For database or API changes, ensure consistency with the Supabase schema and Python service contracts.
- For UI, follow the design system and theming guidelines.
- When in doubt, reference the relevant wiki file for context.

---
