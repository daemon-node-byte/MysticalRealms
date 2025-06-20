# 🧱 File Structure (Complete Overview) Web App

## 📁 Next.js App Router Structure

```
apps/web/
├── src/
│   ├── app/                         # App Router (Next.js 13+)
│   │   ├── globals.css             # Global styles with CSS variables
│   │   ├── layout.tsx              # Root layout with providers
│   │   ├── page.tsx                # Landing page (public)
│   │   ├── loading.tsx             # Global loading UI
│   │   ├── error.tsx               # Global error boundary
│   │   ├── not-found.tsx           # 404 page
│   │   │
│   │   ├── (auth)/                 # Route group for auth pages
│   │   │   ├── login/
│   │   │   │   └── page.tsx        # Login form
│   │   │   ├── signup/
│   │   │   │   └── page.tsx        # Registration form
│   │   │   ├── forgot-password/
│   │   │   │   └── page.tsx        # Password reset
│   │   │   └── reset-password/
│   │   │       └── page.tsx        # Password reset confirmation
│   │   │
│   │   ├── (dashboard)/            # Protected route group
│   │   │   ├── layout.tsx          # Dashboard layout with sidebar
│   │   │   ├── dashboard/
│   │   │   │   ├── page.tsx        # Main dashboard
│   │   │   │   └── loading.tsx     # Dashboard loading state
│   │   │   │
│   │   │   ├── profile/
│   │   │   │   ├── page.tsx        # Profile settings
│   │   │   │   ├── edit/
│   │   │   │   │   └── page.tsx    # Profile editor
│   │   │   │   └── [username]/
│   │   │   │       └── page.tsx    # Public profile view
│   │   │   │
│   │   │   ├── readings/
│   │   │   │   ├── page.tsx        # Reading history
│   │   │   │   ├── new/
│   │   │   │   │   ├── page.tsx    # New reading wizard
│   │   │   │   │   └── loading.tsx
│   │   │   │   └── [readingId]/
│   │   │   │       ├── page.tsx    # View reading details
│   │   │   │       └── edit/
│   │   │   │           └── page.tsx # Edit reading notes
│   │   │   │
│   │   │   ├── journal/
│   │   │   │   ├── page.tsx        # Journal entries list
│   │   │   │   ├── new/
│   │   │   │   │   └── page.tsx    # New journal entry
│   │   │   │   └── [entryId]/
│   │   │   │       ├── page.tsx    # View entry
│   │   │   │       └── edit/
│   │   │   │           └── page.tsx # Edit entry
│   │   │   │
│   │   │   ├── spread-creator/
│   │   │   │   ├── page.tsx        # Spread creator interface
│   │   │   │   └── [spreadId]/
│   │   │   │       └── page.tsx    # Edit custom spread
│   │   │   │
│   │   │   ├── astrology/
│   │   │   │   ├── page.tsx        # Astrology dashboard
│   │   │   │   ├── birth-chart/
│   │   │   │   │   └── page.tsx    # Birth chart generator
│   │   │   │   ├── transits/
│   │   │   │   │   └── page.tsx    # Current transits
│   │   │   │   └── synastry/
│   │   │   │       └── page.tsx    # Relationship compatibility
│   │   │   │
│   │   │   └── quiz/
│   │   │       ├── page.tsx        # Quiz categories
│   │   │       └── [quizId]/
│   │   │           └── page.tsx    # Quiz interface
│   │   │
│   │   ├── (public)/               # Public route group
│   │   │   ├── explorer/
│   │   │   │   ├── tarot/
│   │   │   │   │   ├── page.tsx    # Tarot card explorer
│   │   │   │   │   └── [cardId]/
│   │   │   │   │       └── page.tsx # Card details
│   │   │   │   └── astrology/
│   │   │   │       └── page.tsx    # Astrology reference
│   │   │   │
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx        # Blog index
│   │   │   │   ├── [slug]/
│   │   │   │   │   └── page.tsx    # Blog post
│   │   │   │   └── category/
│   │   │   │       └── [category]/
│   │   │   │           └── page.tsx # Category posts
│   │   │   │
│   │   │   ├── horoscopes/
│   │   │   │   ├── page.tsx        # Daily horoscopes
│   │   │   │   └── [sign]/
│   │   │   │       └── page.tsx    # Sign-specific horoscope
│   │   │   │
│   │   │   ├── calendar/
│   │   │   │   └── page.tsx        # Astrological calendar
│   │   │   │
│   │   │   ├── dice/
│   │   │   │   └── page.tsx        # 3D dice roller
│   │   │   │
│   │   │   └── knowledge-base/
│   │   │       ├── page.tsx        # KB index
│   │   │       └── [slug]/
│   │   │           └── page.tsx    # KB article
│   │   │
│   │   └── api/                    # API routes
│   │       ├── auth/
│   │       │   └── callback/
│   │       │       └── route.ts    # Supabase auth callback
│   │       ├── readings/
│   │       │   └── generate/
│   │       │       └── route.ts    # AI reading generation
│   │       ├── horoscopes/
│   │       │   └── route.ts        # Horoscope API
│   │       └── upload/
│   │           └── route.ts        # File upload handler
│   │
│   ├── components/                 # Reusable components
│   │   ├── layout/
│   │   │   ├── Header.tsx          # Main navigation
│   │   │   ├── Footer.tsx          # Site footer
│   │   │   ├── Sidebar.tsx         # Dashboard sidebar
│   │   │   ├── MobileNav.tsx       # Mobile navigation
│   │   │   └── AuthGuard.tsx       # Route protection
│   │   │
│   │   ├── ui/                     # Base UI components (Radix-based)
│   │   │   ├── Button.tsx          # Button variants
│   │   │   ├── Card.tsx            # Card component
│   │   │   ├── Avatar.tsx          # User avatar
│   │   │   ├── Badge.tsx           # Status badges
│   │   │   ├── Modal.tsx           # Modal dialog
│   │   │   ├── Tooltip.tsx         # Tooltip component
│   │   │   ├── Tabs.tsx            # Tab navigation
│   │   │   ├── Form.tsx            # Form components
│   │   │   ├── Loading.tsx         # Loading states
│   │   │   └── ErrorBoundary.tsx   # Error handling
│   │   │
│   │   ├── dashboard/
│   │   │   ├── DailyHoroscope.tsx  # Daily horoscope widget
│   │   │   ├── CardOfTheDay.tsx    # Daily tarot card
│   │   │   ├── NewsFeed.tsx        # Activity feed
│   │   │   ├── QuickActions.tsx    # Dashboard shortcuts
│   │   │   └── RecentReadings.tsx  # Recent readings list
│   │   │
│   │   ├── tarot/
│   │   │   ├── DeckSelector.tsx    # Deck selection
│   │   │   ├── SpreadSelector.tsx  # Spread selection
│   │   │   ├── TarotCard.tsx       # Individual card component
│   │   │   ├── CardFlip.tsx        # Card flip animation
│   │   │   ├── ReadingCanvas.tsx   # Reading layout
│   │   │   ├── InterpretationPanel.tsx # AI interpretation
│   │   │   └── SaveReadingForm.tsx # Save reading dialog
│   │   │
│   │   ├── astrology/
│   │   │   ├── BirthChartViewer.tsx # Birth chart display
│   │   │   ├── TransitTable.tsx    # Transit listings
│   │   │   ├── PlanetaryPositions.tsx # Planet positions
│   │   │   ├── AspectGrid.tsx      # Aspect table
│   │   │   └── HouseSystem.tsx     # House system selector
│   │   │
│   │   ├── journal/
│   │   │   ├── EntryEditor.tsx     # Rich text editor
│   │   │   ├── EntryList.tsx       # Journal entries
│   │   │   ├── TagManager.tsx      # Entry tags
│   │   │   └── MoodSelector.tsx    # Mood tracking
│   │   │
│   │   ├── quiz/
│   │   │   ├── QuizCard.tsx        # Quiz question card
│   │   │   ├── QuizProgress.tsx    # Progress indicator
│   │   │   ├── ResultsPanel.tsx    # Quiz results
│   │   │   └── LeaderBoard.tsx     # Score rankings
│   │   │
│   │   ├── blog/
│   │   │   ├── PostCard.tsx        # Blog post preview
│   │   │   ├── PostContent.tsx     # Full post content
│   │   │   ├── CommentSection.tsx  # Comments system
│   │   │   ├── TagFilter.tsx       # Post filtering
│   │   │   └── ShareButtons.tsx    # Social sharing
│   │   │
│   │   ├── 3d/
│   │   │   ├── BabylonCanvas.tsx   # 3D canvas wrapper
│   │   │   ├── DiceRoller.tsx      # 3D dice component
│   │   │   ├── CardAnimations.tsx  # 3D card effects
│   │   │   └── SpreadDesigner.tsx  # 3D spread creator
│   │   │
│   │   └── providers/
│   │       ├── AuthProvider.tsx    # Authentication context
│   │       ├── ThemeProvider.tsx   # Theme management
│   │       ├── QueryProvider.tsx   # React Query setup
│   │       └── ToastProvider.tsx   # Notification system
│   │
│   ├── lib/                        # Utility libraries
│   │   ├── supabase/
│   │   │   ├── client.ts           # Browser client
│   │   │   ├── server.ts           # Server client
│   │   │   └── middleware.ts       # Auth middleware
│   │   ├── auth/
│   │   │   ├── config.ts           # Auth configuration
│   │   │   ├── helpers.ts          # Auth utilities
│   │   │   └── providers.ts        # OAuth providers
│   │   ├── api/
│   │   │   ├── client.ts           # API client setup
│   │   │   ├── endpoints.ts        # API endpoints
│   │   │   └── types.ts            # API types
│   │   ├── babylon/
│   │   │   ├── engine.ts           # Babylon.js setup
│   │   │   ├── scenes.ts           # 3D scenes
│   │   │   └── materials.ts        # 3D materials
│   │   ├── ai/
│   │   │   ├── openai.ts           # OpenAI integration
│   │   │   ├── prompts.ts          # AI prompts
│   │   │   └── parsers.ts          # Response parsing
│   │   ├── validation/
│   │   │   ├── schemas.ts          # Zod schemas
│   │   │   └── types.ts            # Validation types
│   │   └── utils/
│   │       ├── helpers.ts          # General utilities
│   │       ├── formatters.ts       # Data formatting
│   │       ├── constants.ts        # App constants
│   │       └── date.ts             # Date utilities
│   │
│   ├── hooks/                      # Custom React hooks
│   │   ├── useAuth.ts              # Authentication hook
│   │   ├── useReadings.ts          # Readings data hook
│   │   ├── useJournal.ts           # Journal entries hook
│   │   ├── useAstrology.ts         # Astrology data hook
│   │   ├── useLocalStorage.ts      # Local storage hook
│   │   └── useDebounce.ts          # Debounce hook
│   │
│   ├── store/                      # Zustand stores
│   │   ├── authStore.ts            # Auth state
│   │   ├── readingStore.ts         # Reading state
│   │   ├── uiStore.ts              # UI state
│   │   └── settingsStore.ts        # User settings
│   │
│   ├── styles/                     # Styling
│   │   ├── globals.css             # Global styles
│   │   ├── components.css          # Component styles
│   │   └── themes/
│   │       ├── light.css           # Light theme
│   │       └── dark.css            # Dark theme
│   │
│   └── types/                      # TypeScript definitions
│       ├── index.ts                # Main type exports
│       ├── supabase.ts             # Database types
│       ├── api.ts                  # API types
│       ├── astrology.ts            # Astrology types
│       └── tarot.ts                # Tarot types
│
├── public/                         # Static assets
│   ├── images/
│   │   ├── tarot-cards/            # Tarot card images
│   │   ├── icons/                  # App icons
│   │   └── backgrounds/            # Background images
│   ├── models/                     # 3D models
│   └── manifest.json               # PWA manifest
│
├── __tests__/                      # Test files
│   ├── components/                 # Component tests
│   ├── pages/                      # Page tests
│   ├── lib/                        # Utility tests
│   └── __mocks__/                  # Test mocks
│
├── docs/                           # Component documentation
├── .env.local                      # Environment variables
├── .env.example                    # Environment template
├── next.config.js                  # Next.js configuration
├── tailwind.config.js              # Tailwind configuration
├── tsconfig.json                   # TypeScript configuration
├── jest.config.js                  # Jest configuration
└── package.json                    # Dependencies
```

---

## 🧭 Navigation & State Management Strategy

### State Management Architecture

```typescript
// Zustand for client-side state
├── authStore.ts        # User authentication state
├── readingStore.ts     # Active reading session
├── uiStore.ts          # UI state (modals, themes, etc.)
└── settingsStore.ts    # User preferences

// React Query for server state
├── readings queries    # Fetch/cache reading history
├── journal queries     # Journal entries CRUD
├── astrology queries   # Birth charts, transits
└── blog queries        # Blog posts and comments
```

### Route Protection Strategy

```typescript
// Route groups for different access levels
(auth)/          # Public auth pages
(dashboard)/     # Protected user pages
(public)/        # Public content pages
api/             # API routes with middleware
```

---

## ✅ MVP Implementation Priority

### Phase 1: Core Infrastructure

- [x] Authentication system (Supabase Auth)
- [x] Database schema implementation
- [x] Basic UI components (Radix + Tailwind)
- [x] Route protection and navigation

### Phase 2: Essential Features

| Priority   | Page/Feature      | Status         | Dependencies                     |
| ---------- | ----------------- | -------------- | -------------------------------- |
| **High**   | `/dashboard`      | 🟡 In Progress | Auth, UI components              |
| **High**   | `/readings/new`   | 🔴 Planned     | Tarot components, AI integration |
| **High**   | `/profile/edit`   | 🔴 Planned     | Form components, file upload     |
| **Medium** | `/journal`        | 🔴 Planned     | Rich text editor, search         |
| **Medium** | `/explorer/tarot` | 🔴 Planned     | Card database, filtering         |
| **Low**    | `/spread-creator` | 🔴 Planned     | Babylon.js, drag/drop            |

### Phase 3: Advanced Features

- 3D visualizations (Babylon.js)
- AI-powered interpretations
- Social features (comments, sharing)
- PWA capabilities
- Advanced astrology calculations

---

## 🛠️ Development Guidelines

### Component Architecture

- Use **Radix UI** primitives for accessibility
- Implement **compound component** patterns
- Follow **feature-first** folder organization
- Maintain **strict TypeScript** typing

### Testing Strategy

- **Unit tests** for utilities and hooks
- **Component tests** with React Testing Library
- **Integration tests** for user flows
- **E2E tests** for critical paths

### Performance Optimization

- **Route-based code splitting**
- **Image optimization** with Next.js Image
- **Bundle analysis** and tree shaking
- **Caching strategies** for API calls

---

## 🚀 Quick Start Commands

```bash
# Development
pnpm dev

# Build
pnpm build

# Test
pnpm test
pnpm test:e2e

# Database
pnpm db:reset
pnpm db:seed

# Type checking
pnpm type-check
```

---

_This structure follows the [house rules](docs/wiki/house_rules.md) and [design principles](docs/wiki/design_principles.md) established for the Mystical Realms project._
