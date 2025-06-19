---
applyTo: "**"
---

# Copilot Instructions for Mystical Realms Project

Mystical Realms is a modular Tarot & Astrology platform built with Next.js (TypeScript), Supabase (Postgres), Babylon.js (3D), and a Python (FastAPI) microservice for astrology calculations. It features user authentication, tarot readings, astrology charts, journals, quizzes, and a blog, with a focus on testability, modularity, and a mystical, immersive UI.

## Coding Standards

- **Language**: Use TypeScript for frontend (Next.js) and Python for backend (FastAPI).
- **Typing**: Enforce strict typing using TypeScript interfaces and Pydantic models.
- **Modularity**: Organize code into features, with clear separation of concerns (e.g., components, services, utilities).
- **Testing**: Follow Test-Driven Development (TDD) principles. Write unit tests for all components and services, using Jest for frontend and Pytest for backend.
- **Documentation**: Maintain clear, concise documentation in the `/docs/wiki` directory, following the structure outlined below.
- **Design**: Use Radix-UI components and primitives for UI elements, following the design principles outlined in the documentation.
- **Database**: Use Supabase for the database layer, with a focus on SQL schema design and data integrity.
- **API Contracts**: Ensure clear contracts between frontend and backend services, using TypeScript interfaces for API responses.
- **UI Components**: Create modular, reusable UI components that follow the design system and theming guidelines.
- **Public Pages**: Implement public-facing pages with clear requirements and layout ideas, ensuring a consistent user experience.

## How to Use This Context

- **Architecture & Patterns**: Refer to `house_rules.md` for code organization, layering, and best practices.
- **Database & Data Models**: Use `database_supabase.md` for table schemas, relationships, and seed data.
- **Feature Planning**: Consult `techstack_roadmap.md` and `sprint_summary.md` for implementation order and feature breakdowns.
- **UI/UX & Design**: Reference `design_principles.md` and `public_pages_layout.md` for visual and interaction guidelines.

## Documentation Overview

The `/docs/wiki/*` is structured to provide clear guidance on the project's architecture, coding standards, and usage. It includes:

- **techstack_roadmap.md**: High-level tech stack, architecture, and sprint roadmap.
- **sprint_summary.md**: Step-by-step breakdown of each sprint, with granular tasks.
- **database_supabase.md**: Complete Supabase SQL schema, seed data, and ER diagram.
- **house_rules.md**: Architecture, folder structure, and best-practice guidelines.
- **design_principles.md**: Visual design principles, theme palettes, and brand usage.
- **public_pages.md / public_pages_layout.md**: Landing page and public-facing page requirements and layout ideas.
- **testing_setup.md**: Testing stack, setup, and example tests for frontend and backend.
