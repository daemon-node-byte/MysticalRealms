# Copilot Instructions for Mystical Realms Project

Mystical Realms is a modular Tarot & Astrology platform built with Next.js 15 (TypeScript), Supabase (PostgreSQL), Babylon.js (3D), and a Python (FastAPI) microservice for astrology calculations. It features user authentication, tarot readings, astrology charts, journals, quizzes, and a blog, with a focus on testability, modularity, and a mystical, immersive UI.

## 🏗️ Architecture Overview

### Four-Layer Architecture

- **UI Layer**: Next.js App Router, React, Babylon.js - handles user interface and interaction
- **Domain/API Layer**: Next.js API Routes, Zod validation - business logic and API orchestration
- **Data Access Layer**: Supabase, PostgreSQL - data persistence with Row Level Security (RLS)
- **Services Layer**: Python FastAPI microservice - specialized astrology calculations and chart generation

### Key Design Principles

- **Modular Architecture**: Clear separation of concerns across layers
- **Type Safety**: End-to-end TypeScript with Zod validation, Pydantic models for Python
- **Security First**: All user tables implement Row Level Security (RLS)
- **Performance Optimized**: SSR, caching, lazy loading, comprehensive indexing
- **Test-Driven Development**: Write tests before implementation (Jest for frontend, Pytest for backend)

## 🛠️ Tech Stack Details

### Frontend

- **Framework**: Next.js 15 with App Router, TypeScript, React 19
- **3D Graphics**: Babylon.js for tarot spread creators and immersive experiences
- **UI Components**: Radix UI components (`@radix-ui/themes`) and primitives
- **Styling**: TailwindCSS 4 with custom design system
- **State Management**: React Query for server state, Zustand for local state
- **Package Manager**: PNPM (specified version: 10.12.1)

### Backend

- **Primary API**: Next.js API Routes for user-facing endpoints
- **Astrology Service**: FastAPI (Python) with Swiss Ephemeris for calculations
- **Database**: Supabase (PostgreSQL) with real-time subscriptions
- **Authentication**: Supabase Auth with OAuth providers
- **Storage**: Supabase Storage for images, PDFs, user uploads

### Development Environment

- **Monorepo**: PNPM workspace with Turbo.json optimization
- **Testing**: Jest + React Testing Library, Playwright for E2E
- **Containerization**: Docker for Python service
- **CI/CD**: GitHub Actions → Vercel deployment

## 🎨 Design System

### Theme Collection

- **Deep Nebula**: Ethereal, regal (premium experiences)
- **Midnight Tarot**: Classic, timeless (traditional readings)
- **Cosmic Neon**: Futuristic, energetic (interactive features)
- **Sage Minimal**: Clean, focused (accessibility mode)

### Design Principles

- **Dark-First Design**: Optimized for low-light environments
- **Hierarchical Clarity**: Consistent typography scale (48px → 16px)
- **Accessibility First**: WCAG AA compliance, 4.5:1 contrast ratios
- **Mystical Authenticity**: Consistent iconography, subtle animations

## 📊 Database Schema Summary

### Core Tables

- **profiles**: User profiles extending Supabase Auth
- **tarot_readings**: Reading sessions with JSONB card data
- **tarot_spreads**: Custom and default spread layouts
- **astrology_charts**: Birth charts and calculations
- **journal_entries**: User journaling system
- **blog_posts**: Content management
- **quiz_results**: Learning and gamification
- **calendar_entries**: Personal events and reminders

### Key Features

- Row Level Security on all user tables
- JSONB columns for flexible data storage
- Comprehensive indexing strategy
- Foreign key constraints for data integrity
- Automatic timestamps and audit trails

## 📁 File Structure Guidelines

### Next.js App Router Structure

```
apps/web/src/
├── app/                    # App Router pages
│   ├── (auth)/            # Authentication routes
│   ├── (dashboard)/       # Protected dashboard routes
│   ├── (public)/          # Public content routes
│   └── api/               # API route handlers
├── components/            # Reusable UI components
├── features/             # Feature-specific modules
├── hooks/                # Custom React hooks
├── theme/                # Design system and themes
├── types/                # TypeScript type definitions
└── utils/                # Utility functions
```

### Python FastAPI Structure

```
apps/api/
├── main.py               # FastAPI entry point
├── config/               # Configuration management
├── services/             # Business logic services
├── models/               # Pydantic data models
├── routers/              # API route definitions
└── utils/                # Utility functions
```

## 🧪 Testing Strategy

### Testing Pyramid

- **Unit Tests**: Jest + React Testing Library (many, fast)
- **Integration Tests**: API routes, database interactions (some, medium)
- **E2E Tests**: Playwright for user journeys (few, slow, high confidence)

### Test Coverage Requirements

- Minimum 80% code coverage
- All components must have unit tests
- All API routes must have integration tests
- Critical user journeys must have E2E tests

## 🚀 Development Workflow

### Sprint Structure

- 2-week sprints with clear deliverables
- Test-Driven Development (TDD) approach
- Code reviews required for all changes
- Documentation updated with each feature

### Current Implementation Status

- ✅ Foundation & Infrastructure (Sprint 1)
- 🔄 Authentication & Profiles (Sprint 2)
- ⏳ Dashboard & Core Features (Sprint 3)
- ⏳ Tarot Reading System (Sprint 4)

## 📋 Coding Standards

### TypeScript/JavaScript

- Strict TypeScript configuration
- Zod schemas for runtime validation
- ESLint + Prettier for code formatting
- Functional programming patterns preferred
- Custom hooks for reusable logic

### Python

- Pydantic models for data validation
- FastAPI with async/await patterns
- Type hints required
- Pytest for comprehensive testing
- Black + isort for formatting

### UI Components

- Use Radix UI components and primitives exclusively
- Follow design system color variables
- Implement responsive design patterns
- Ensure accessibility compliance
- Test components in isolation

## 🔧 Development Commands

### Frontend (apps/web)

```bash
pnpm dev          # Start development server
pnpm build        # Production build
pnpm test         # Run Jest tests
pnpm test:e2e     # Run Playwright E2E tests
```

### Backend (apps/api)

```bash
python main.py    # Start FastAPI server
pytest           # Run Python tests
```

### Monorepo

```bash
pnpm dev:web    # Start web app in development mode
pnpm dev:api     # Start API service in development mode
pnpm -r install     # Install all dependencies
pnpm build       # Build all apps
pnpm test        # Run all tests
```

## 📚 Documentation Reference

The `/docs/wiki` directory contains comprehensive documentation:

- **techstack_roadmap.md**: Complete tech stack and implementation roadmap
- **design_pattern_house_rules.md**: Architecture patterns and coding standards
- **database_schema_complete.md**: Full database schema with relationships
- **design_principles.md**: Visual design system and theme specifications
- **testing_setup.md**: Testing strategies and implementation guides
- **web_app_architecture.md**: Frontend file structure and routing
- **api_app_architecture.md**: Backend service architecture
- **sprint_plan_guide.md**: Detailed sprint planning and task breakdown

## 🎯 Key Development Guidelines

1. **Always check documentation first**: Reference wiki files for architecture decisions
2. **Type safety is non-negotiable**: Use TypeScript interfaces and Pydantic models
3. **Test-driven development**: Write tests before implementation
4. **Modular design**: Keep components focused and reusable
5. **Performance matters**: Consider SSR, caching, and optimization
6. **Accessibility first**: Ensure WCAG AA compliance
7. **Security by default**: Implement RLS and input validation
8. **Consistent styling**: Use design system variables and Radix UI
9. **Documentation as code**: Update docs with every feature
10. **Monorepo best practices**: Use PNPM workspace commands

---

_This document serves as the comprehensive context for GitHub Copilot when working on the Mystical Realms project. Always reference the detailed wiki documentation for specific implementation guidance._
