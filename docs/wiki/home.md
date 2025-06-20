# Mystical Realms – Wiki Home

Welcome to the Mystical Realms documentation! This wiki is your guide to the architecture, design, development, and best practices for building and contributing to the Mystical Realms Tarot & Astrology platform.

Below you'll find a summary and table of contents for all major documentation pages.

---

## 📚 Table of Contents

1. **[Tech Stack & Roadmap](https://github.com/daemon-node-byte/MysticalRealms/wiki/TechStack-&-Roadmap)**

   - Overview of the frontend, backend, database, and deployment stack.
   - High-level architecture diagram with Mermaid diagrams.
   - Sprint-by-sprint implementation roadmap for the MVP.
   - Deployment strategy and monitoring considerations.

2. **[Sprint Summary](https://github.com/daemon-node-byte/MysticalRealms/wiki/Sprint-Plan-Guide-and-Summary)**

   - Step-by-step breakdown of each sprint (8 sprints total).
   - Granular tasks for systematically building the MVP.
   - Foundation → Auth → Core Features → Polish progression.
   - Guidance for team planning and progress tracking.

3. **[Complete Database Schema](https://github.com/daemon-node-byte/MysticalRealms/wiki/Complete-Database-Schema-Documentation)**

   - **Enhanced**: Comprehensive Supabase PostgreSQL schema documentation.
   - 19 core tables with relationships, constraints, and indexing.
   - Row Level Security (RLS) policies and performance optimizations.
   - Advanced usage patterns, maintenance utilities, and health checks.

4. **[Database Implementation Summary](https://github.com/daemon-node-byte/MysticalRealms/wiki/Database-Implementation-Summary-Report)**

   - **New**: Complete implementation status and validation report.
   - Migration file structure and deployment commands.
   - Production readiness assessment with enterprise-grade features.
   - Usage examples and performance benchmarks.

5. **[Database Validation Report](https://github.com/daemon-node-byte/MysticalRealms/wiki/Database-Validation-Report)**

   - **New**: Schema completeness and quality analysis.
   - Security implementation verification.
   - Performance optimization validation.
   - Future enhancement recommendations.

6. **[Architecture & House Rules](https://github.com/daemon-node-byte/MysticalRealms/wiki/Architecture,-Design-Patterns-&-House-Rules)**

   - Modular, layered, API-first architecture guidelines.
   - Frontend (Next.js) and backend (Python) folder structure.
   - Code organization, testing, and security best practices.
   - Layer responsibilities and design patterns.

7. **[Design Principles](<https://github.com/daemon-node-byte/MysticalRealms/wiki/Design-(UI)-Principles>)**

   - Visual design principles for a mystical, immersive UI.
   - Theme palettes, font pairings, and iconography standards.
   - Guidance for consistent, accessible, and engaging visuals.

8. **[Testing Setup](https://github.com/daemon-node-byte/MysticalRealms/wiki/Testing-Setup-&-Guidelines)**

   - Comprehensive testing strategy for frontend and backend.
   - Jest, Playwright, and Pytest configurations.
   - Unit, integration, and E2E testing approaches.
   - 4-phase testing roadmap implementation.

9. **[MDX Content Templates](<https://github.com/daemon-node-byte/MysticalRealms/wiki/Content-Layer-(MDX)-for-Blog-&-Articles>)**

   - **New**: Content architecture with MDX and Contentlayer.
   - Blog, knowledge base, and tutorial template structures.
   - SEO optimization and performance considerations.
   - Content management workflow and editorial process.

10. **[Sitemap & User Flows](https://github.com/daemon-node-byte/MysticalRealms/wiki/User-Flow-&-Sitemap-Info-with-Diagrams)**

    - **New**: Complete site architecture and navigation patterns.
    - Public and authenticated user journey flows.
    - SEO metadata configuration and analytics tracking.
    - Critical user experience pathways.

---

## 🧭 Getting Started

- **New to the project?** Start with the [Tech Stack & Roadmap](techstack_roadmap.md) and [House Rules](house_rules.md).
- **Database work?** See the [Complete Database Schema](database_schema_complete.md) and [Implementation Summary](../DATABASE_IMPLEMENTATION_SUMMARY.md).
- **Developers:** Reference the [Testing Setup](testing_setup.md) and [Client Scaffolding](scaffold_client.md) for implementation details.
- **Content creators:** Check out [MDX Templates](mdx_templates.md) for blog and knowledge base content.
- **Designers:** See [Design Principles](design_principles.md) and [Public Pages Layout](public_pages_layout.md) for UI/UX guidance.

---

## 🔗 Additional Resources

### Security & Compliance

- **[Security Policy](../SECURITY.md)** - Comprehensive security guidelines and vulnerability reporting
- **[Database Security](database_schema_complete.md#row-level-security-rls)** - RLS policies and access control

### Project Management

- **[Workspace Structure](../../README.md#project-structure)** - Monorepo organization and setup
- **[Contributing Guidelines](../../README.md#contributing)** - Development workflow and standards

### Architecture Documentation

- **[Supabase Utilities](../../apps/web/src/utils/supabase/README.md)** - Environment validation and client setup
- **[Migration Files](../../packages/supabase/migrations/)** - Database schema evolution

---

## ✨ Contributing

Please read the [House Rules](house_rules.md) and [Testing Setup](testing_setup.md) before submitting changes. Our architecture emphasizes:

- **Modularity**: Feature-first organization with clear separation of concerns
- **Type Safety**: Strict TypeScript and Pydantic model enforcement
- **Test-Driven Development**: Comprehensive test coverage across all layers
- **Documentation**: Living documentation that evolves with the codebase
- **Security**: Enterprise-grade security practices and RLS policies

Consistency and modularity are key to maintaining this complex, feature-rich platform!
