# 🔮 Mystical Realms

> **A Modular Tarot & Astrology Platform**  
> Discover the mysteries of the cosmos through interactive tarot readings, personalized astrology charts, and immersive 3D experiences.

[![License: AGPL-3.0](https://img.shields.io/badge/License-AGPL--3.0-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![Website](https://img.shields.io/website?url=https%3A%2F%2Fwww.mystical-realms.com&up_message=online&down_message=offline&link=https%3B%2F%2Fwww.mystical-realms.com%2F)](https://www.mystical-realms.com/)
[![Build Status](https://github.com/yourusername/MysticalRealms_monorepo/workflows/CI/badge.svg)](https://github.com/yourusername/MysticalRealms_monorepo/actions)
[![Coverage Status](https://codecov.io/gh/yourusername/MysticalRealms_monorepo/branch/main/graph/badge.svg)](https://codecov.io/gh/yourusername/MysticalRealms_monorepo)
[![Code Quality](https://app.codacy.com/project/badge/Grade/12345678901234567890123456789012)](https://www.codacy.com/gh/yourusername/MysticalRealms_monorepo/dashboard)

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white)](https://python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com/)
[![Babylon.js](https://img.shields.io/badge/Babylon.js-FF6F00?logo=babylon.js&logoColor=white)](https://babylonjs.com/)
[![Radix UI](https://img.shields.io/badge/Radix_UI-000000?logo=radix-ui&logoColor=white)](https://radix-ui.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

---

## ✨ Features

### Notice!

We are still in the early stages of development and this document is a work in progress.
Some sections may be incomplete or subject to change as we refine our features and architecture.

---

### 🃏 **Tarot Experience**

- **Live Readings**: Interactive tarot card draws with AI-powered interpretations
- **Spread Creator**: Custom 3D tarot spreads using Babylon.js
- **Card Explorer**: Comprehensive tarot deck with search and filtering
- **Reading Journal**: Personal tarot reading history and insights

### ⭐ **Astrology Tools**

- **Birth Charts**: Personalized natal chart generation and analysis
- **Daily Horoscopes**: AI-generated daily cosmic guidance
- **Transit Tracking**: Real-time planetary movements and their effects
- **Compatibility Analysis**: Synastry charts for relationship insights

### 🌟 **Community & Learning**

- **Mystical Feed**: Real-time community sharing and discussions
- **Knowledge Base**: Comprehensive guides to tarot and astrology
- **Interactive Quizzes**: Learn tarot meanings and astrological concepts
- **Blog**: Articles on mystical practices and cosmic events

### 🎲 **Additional Features**

- **Astrology Dice**: Quick cosmic guidance through dice divination
- **Personal Calendar**: Track important astrological events
- **Profile Customization**: Avatars, badges, and personal mystical journey
- **3D Immersive UI**: Beautiful, interactive mystical environments

---

## 🏗️ Architecture

Mystical Realms is built as a modern, scalable monorepo with a microservices architecture:

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (Next.js)                     │
│  • Server-Side Rendering    • Interactive 3D (Babylon.js)  │
│  • TypeScript Safety        • Responsive Design            │
│  • Radix UI Components      • TailwindCSS Styling          │
├─────────────────────────────────────────────────────────────┤
│                 Authentication & Database                   │
│  • Supabase Auth            • PostgreSQL Database          │
│  • Row Level Security       • Real-time Subscriptions      │
│  • OAuth Providers          • File Storage                 │
├─────────────────────────────────────────────────────────────┤
│              Backend Services (FastAPI/Python)             │
│  • Astrology Calculations   • PDF Generation               │
│  • Swiss Ephemeris          • RESTful APIs                 │
│  • Containerized Deployment • High Performance             │
└─────────────────────────────────────────────────────────────┘
```

## 🛠️ Tech Stack

### **Frontend**

- **[Next.js 14](https://nextjs.org/)** - React framework with SSR/SSG
- **[TypeScript](https://typescriptlang.org/)** - Type-safe JavaScript
- **[Babylon.js](https://babylonjs.com/)** - 3D graphics and immersive experiences
- **[Radix UI](https://radix-ui.com/)** - Accessible, unstyled UI primitives
- **[TailwindCSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[React Query](https://tanstack.com/query)** - Data fetching and caching
- **[Zustand](https://zustand-demo.pmnd.rs/)** - Lightweight state management

### **Backend**

- **[FastAPI](https://fastapi.tiangolo.com/)** - Modern Python web framework
- **[Pydantic](https://pydantic.dev/)** - Data validation using Python type hints
- **[Swiss Ephemeris](https://www.astro.com/swisseph/)** - Astronomical calculations
- **[Docker](https://docker.com/)** - Containerization and deployment

### **Database & Auth**

- **[Supabase](https://supabase.com/)** - PostgreSQL database with realtime features
- **[Supabase Auth](https://supabase.com/auth)** - Authentication with OAuth providers
- **[Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)** - Fine-grained access control

### **Development**

- **[pnpm](https://pnpm.io/)** - Fast, disk space efficient package manager
- **[Jest](https://jestjs.io/)** - JavaScript testing framework
- **[Pytest](https://pytest.org/)** - Python testing framework
- **[ESLint](https://eslint.org/)** - Code linting and formatting
- **[GitHub Actions](https://github.com/features/actions)** - CI/CD pipelines

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- **[Docker](https://docker.com/)** - For running Supabase locally
- **[Node.js](https://nodejs.org/)** (v18 or later)
- **[pnpm](https://pnpm.io/)** - Package manager
- **[Python](https://python.org/)** (v3.8 or later)
- **[Supabase CLI](https://supabase.com/docs/guides/cli)** (optional, for advanced database management)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/MysticalRealms_monorepo.git
   cd MysticalRealms_monorepo
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start the development environment**

   ```bash
   # Start all services (Supabase, Web, API)
   ./scripts/start_dev.sh
   ```

   Or start services individually:

   ```bash
   # Start Supabase (Database & Auth)
   cd packages/supabase && docker-compose up -d

   # or use Supabase CLI
   # supabase start

   # Start Next.js frontend
   pnpm dev:web

   # Start FastAPI backend
   pnpm dev:api
   ```

4. **Access the application**
   - **Frontend**: http://localhost:3000
   - **API Documentation**: http://localhost:5555/docs
   - **Supabase Dashboard**: http://localhost:54323

### Environment Configuration

The development environment will automatically set up environment variables from `.env.example` files. For production deployment, ensure you configure:

- **Supabase**: Database URL and API keys
- **OpenAI**: API key for AI interpretations
- **Authentication**: OAuth provider credentials (optional)

---

## 📚 Documentation

Comprehensive documentation is available in the [`/docs/wiki`](/docs/wiki) directory:

- **[Architecture & Best Practices](/docs/wiki/house_rules.md)** - Code organization and development guidelines
- **[Database Schema](/docs/wiki/database_supabase.md)** - Complete database structure and relationships
- **[Design Principles](/docs/wiki/design_principles.md)** - UI/UX guidelines and theming
- **[Testing Strategy](/docs/wiki/testing_setup.md)** - Testing tools and methodologies
- **[Sprint Roadmap](/docs/wiki/techstack_roadmap.md)** - Development timeline and feature priorities
- **[Security Policy](/docs/SECURITY.md)** - Security practices and vulnerability reporting
- **[Code of Conduct](/docs/CODE_OF_CONDUCT.md)** - Community guidelines and standards

---

## 🧪 Testing

### Running Tests

```bash
# Run all tests
pnpm test

# Run frontend tests
pnpm test:web

# Run backend tests
cd apps/api && pytest

# Run tests with coverage
pnpm test:coverage
```

### Test-Driven Development

This project follows TDD principles:

- **Frontend**: Jest + React Testing Library
- **Backend**: Pytest + FastAPI TestClient
- **E2E**: Playwright for end-to-end testing
- **Security**: Automated security scanning in CI/CD

---

## 📦 Project Structure

```
MysticalRealms_monorepo/
├── apps/
│   ├── web/                 # Next.js frontend application
│   └── api/                 # FastAPI backend service
├── packages/
│   └── supabase/           # Database configuration and migrations
├── docs/
│   └── wiki/               # Comprehensive project documentation
├── scripts/                # Development and deployment scripts
├── docker/                 # Docker configurations
└── docs/                   # Project policies and guidelines
```

### Key Directories

- **`apps/web/src/`** - Frontend components, pages, and utilities
- **`apps/api/`** - Backend API endpoints and business logic
- **`packages/supabase/`** - Database schema, migrations, and seed data
- **`docs/wiki/`** - Technical documentation and guides

---

## 🎯 Roadmap

### Current Phase: MVP Development

- ✅ **Sprint 1**: Project setup and infrastructure
- ✅ **Sprint 2**: Authentication and user profiles
- 🔄 **Sprint 3**: Dashboard and core features
- ⏳ **Sprint 4**: Live tarot readings with AI
- ⏳ **Sprint 5**: Tarot explorer and journal

### Upcoming Features

- **Advanced Astrology**: Transit predictions and aspect analysis
- **Social Features**: User-to-user readings and community challenges
- **Mobile App**: React Native companion app
- **AI Enhancements**: GPT-4 integration for deeper interpretations
- **Marketplace**: Custom tarot decks and reading templates

See the full [development roadmap](/docs/wiki/techstack_roadmap.md) for detailed sprint planning.

---

## 🤝 Contributing

We welcome contributions from the mystical community! Here's how to get started:

### Development Workflow

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Write** tests for your changes
4. **Commit** your changes (`git commit -m 'Add amazing feature'`)
5. **Push** to your branch (`git push origin feature/amazing-feature`)
6. **Open** a Pull Request

### Contribution Guidelines

- Follow the [Code of Conduct](/docs/CODE_OF_CONDUCT.md)
- Write tests for new features
- Update documentation as needed
- Follow the existing code style and architecture patterns
- Ensure your changes don't break existing functionality

### Areas for Contribution

- 🎨 **UI/UX**: Improve the mystical design and user experience
- 🔮 **Features**: Add new tarot spreads, astrological calculations
- 🧪 **Testing**: Expand test coverage and add E2E tests
- 📖 **Documentation**: Improve guides and add tutorials
- 🐛 **Bug Fixes**: Help us squash bugs and improve reliability
- 🌐 **Localization**: Translate the app to other languages

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🔐 Security

Security is paramount in handling user data and mystical practices. Please review our [Security Policy](/docs/SECURITY.md) for:

- Vulnerability reporting procedures
- Security best practices
- Data protection measures
- Incident response protocols

To report security vulnerabilities, please email `security@mysticalrealms.dev` or create a private security advisory.

---

## 🙏 Acknowledgments

- **Swiss Ephemeris** - For accurate astronomical calculations
- **Radix UI** - For accessible, unstyled UI primitives
- **Supabase** - For the incredible backend-as-a-service platform
- **The Tarot Community** - For inspiration and mystical wisdom
- **Open Source Contributors** - For making this project possible

---

## 🌟 Star History

If you find this project helpful, please consider giving it a ⭐ on GitHub!

---

<div align="center">

**[🔮 Visit Mystical Realms](https://mysticalrealms.com)** • **[📖 Documentation](/docs/wiki)** • **[🐛 Report Issues](https://github.com/yourusername/MysticalRealms_monorepo/issues)** • **[💬 Discussions](https://github.com/yourusername/MysticalRealms_monorepo/discussions)**

_Built with ❤️ and a touch of cosmic magic_

</div>
