# 🧪 Testing Strategy & Implementation Guide

_A comprehensive testing framework for the Mystical Realms platform, covering unit tests, integration tests, E2E testing, and specialized 3D/AI testing approaches._

---

## 📋 Table of Contents

- [Testing Philosophy](#testing-philosophy)
- [Current Implementation Status](#current-implementation-status)
- [Testing Stack Overview](#testing-stack-overview)
- [Test Coverage Strategy](#test-coverage-strategy)
- [Implementation Guidelines](#implementation-guidelines)
- [Specialized Testing Areas](#specialized-testing-areas)
- [CI/CD Integration](#cicd-integration)
- [Future Testing Roadmap](#future-testing-roadmap)
- [Quality Metrics](#quality-metrics)

---

## 🎯 Testing Philosophy

### Core Principles

1. **Test-Driven Development (TDD)**: Write tests before implementation
2. **Testing Pyramid**: More unit tests, fewer integration tests, minimal E2E tests
3. **Fast Feedback**: Tests should run quickly and provide immediate feedback
4. **Reliable**: Tests should be deterministic and not flaky
5. **Maintainable**: Test code quality should match production code quality

### Testing Strategy

```
    ┌─────────────────────────┐
    │     E2E Tests          │  ← Few, Slow, High Confidence
    │   (Playwright/Cypress) │
    └─────────────────────────┘
           ┌─────────────────────────────┐
           │   Integration Tests        │  ← Some, Medium Speed
           │ (API Routes, DB, Services) │
           └─────────────────────────────┘
                  ┌─────────────────────────────────┐
                  │        Unit Tests              │  ← Many, Fast, Low Cost
                  │  (Components, Utils, Logic)    │
                  └─────────────────────────────────┘
```

---

## 📊 Current Implementation Status

### ✅ Implemented

- [x] **Jest Configuration**: Base Jest setup with TypeScript support
- [x] **React Testing Library**: Component testing framework
- [x] **Test Scripts**: Package.json scripts for test execution
- [x] **Basic Test Structure**: Folder organization established

### 🔄 In Progress

- [ ] **API Route Testing**: Jest tests for Next.js API routes
- [ ] **Database Testing**: Supabase test database setup
- [ ] **Component Test Coverage**: Core UI components
- [ ] **CI/CD Integration**: GitHub Actions test workflows

### ⏳ Planned

- [ ] **E2E Testing Framework**: Playwright implementation
- [ ] **3D Scene Testing**: Babylon.js test utilities
- [ ] **AI Service Testing**: OpenAI integration tests
- [ ] **Performance Testing**: Load testing framework

---

## 🛠️ Testing Stack Overview

### Frontend Testing

| Area               | Primary Tool                                                                  | Secondary Tool                                                          |
| ------------------ | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| **Unit Testing**   | [Jest](https://jestjs.io/) + [ts-jest](https://github.com/kulshekhar/ts-jest) | [Vitest](https://vitest.dev/) (future consideration)                    |
| **Component**      | [React Testing Library](https://testing-library.com/)                         | [Testing Library Jest-DOM](https://github.com/testing-library/jest-dom) |
| **Integration**    | Jest + Supabase SDK Mocks                                                     | Test Database Instance                                                  |
| **E2E Testing**    | [Playwright](https://playwright.dev/)                                         | [Cypress](https://cypress.io/) (alternative)                            |
| **Visual Testing** | [Chromatic](https://www.chromatic.com/) (future)                              | [Storybook](https://storybook.js.org/) integration                      |

### Backend Testing

| Area             | Tool                                                             | Purpose                     |
| ---------------- | ---------------------------------------------------------------- | --------------------------- |
| **Unit Testing** | [Pytest](https://pytest.org/)                                    | Python service testing      |
| **API Testing**  | [FastAPI TestClient](https://fastapi.tiangolo.com/)              | Astrology service endpoints |
| **Database**     | [Pytest-PostgreSQL](https://pypi.org/project/pytest-postgresql/) | Database integration tests  |
| **Mocking**      | [pytest-mock](https://pytest-mock.readthedocs.io/)               | External service mocking    |

### Specialized Testing

| Area               | Tool/Approach                                                                            | Notes                             |
| ------------------ | ---------------------------------------------------------------------------------------- | --------------------------------- |
| **3D Scenes**      | Custom Babylon.js test utilities                                                         | Canvas mocking, render validation |
| **AI Integration** | OpenAI API mocking + response validation                                                 | Cost-effective testing approach   |
| **Performance**    | [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)                           | Web vitals and performance        |
| **Security**       | [npm audit](https://docs.npmjs.com/cli/v8/commands/npm-audit) + [Snyk](https://snyk.io/) | Dependency vulnerability scanning |

---

## 🎯 Test Coverage Strategy

### Coverage Targets

| Phase          | Unit Tests | Integration Tests | E2E Tests | Overall Target |
| -------------- | ---------- | ----------------- | --------- | -------------- |
| **MVP**        | 70%        | 50%               | 20%       | 60%            |
| **Beta**       | 80%        | 70%               | 40%       | 75%            |
| **Production** | 85%        | 80%               | 60%       | 80%            |

### Priority Areas (MVP Phase)

| Area                  | Priority  | Type        | Tool                 | Status     |
| --------------------- | --------- | ----------- | -------------------- | ---------- |
| Authentication Flow   | 🔴 High   | Integration | Jest + Supabase mock | ⏳ Planned |
| Tarot Card Components | 🔴 High   | Unit/Comp   | RTL                  | ⏳ Planned |
| Reading API Logic     | 🔴 High   | Unit        | Jest                 | ⏳ Planned |
| Astrology Service     | 🔴 High   | Unit/API    | Pytest + TestClient  | ⏳ Planned |
| Database Operations   | 🟡 Medium | Integration | Jest + Test DB       | ⏳ Planned |
| 3D Dice Logic         | 🟡 Medium | Component   | RTL + Custom utils   | ⏳ Planned |
| Blog & CMS            | 🟢 Low    | E2E         | Playwright           | ⏳ Planned |
| Social Features       | 🟢 Low    | Integration | Jest + Supabase      | ⏳ Planned |

---

## 📝 Implementation Guidelines

### Frontend Test Structure

```typescript
// Component test example
// filepath: src/components/TarotCard/TarotCard.test.tsx
import { render, screen } from "@testing-library/react";
import { TarotCard } from "./TarotCard";

describe("TarotCard Component", () => {
  const mockCard = {
    id: "the-fool",
    name: "The Fool",
    arcana: "major",
    image_url: "/cards/the-fool.jpg",
    keywords: ["new beginnings", "spontaneity"]
  };

  it("renders card name and image", () => {
    render(<TarotCard card={mockCard} />);

    expect(screen.getByText("The Fool")).toBeInTheDocument();
    expect(screen.getByAltText("The Fool tarot card")).toBeInTheDocument();
  });

  it("displays keywords when provided", () => {
    render(<TarotCard card={mockCard} showKeywords />);

    expect(screen.getByText("new beginnings")).toBeInTheDocument();
    expect(screen.getByText("spontaneity")).toBeInTheDocument();
  });
});
```

### API Route Testing

```typescript
// API route test example
// filepath: src/pages/api/readings/create.test.ts
import { createMocks } from "node-mocks-http";
import handler from "./create";
import { createClient } from "@supabase/supabase-js";

jest.mock("@supabase/supabase-js");

describe("/api/readings/create", () => {
  it("creates a new tarot reading", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        spreadType: "three-card",
        cards: ["the-fool", "the-magician", "the-high-priestess"]
      }
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(201);
    expect(JSON.parse(res._getData())).toMatchObject({
      id: expect.any(String),
      spreadType: "three-card"
    });
  });
});
```

### Backend Service Testing

```python
# FastAPI service test example
# filepath: apps/astro-service/tests/test_chart_service.py
import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_create_birth_chart():
    """Test birth chart generation endpoint"""
    chart_data = {
        "birth_date": "1990-01-01",
        "birth_time": "12:00",
        "birth_location": {
            "latitude": 40.7128,
            "longitude": -74.0060
        }
    }

    response = client.post("/chart/birth", json=chart_data)

    assert response.status_code == 200
    data = response.json()
    assert "planets" in data
    assert "houses" in data
    assert len(data["planets"]) == 10  # Standard 10 planets
```

---

## 🔬 Specialized Testing Areas

### 3D Scene Testing

```typescript
// 3D component test utilities
// filepath: src/components/3D/test-utils.ts
import { NullEngine } from "@babylonjs/core/Engines/nullEngine";
import { Scene } from "@babylonjs/core/scene";

export const createMockBabylonScene = () => {
  const engine = new NullEngine();
  const scene = new Scene(engine);
  return { engine, scene };
};

export const mockWebGLContext = () => {
  const canvas = document.createElement("canvas");
  const context = {
    getExtension: jest.fn(),
    getParameter: jest.fn(),
    createShader: jest.fn()
    // ... other WebGL methods
  };

  jest.spyOn(canvas, "getContext").mockReturnValue(context);
  return { canvas, context };
};
```

### AI Service Testing

```typescript
// AI service mock
// filepath: src/lib/ai/openai.test.ts
import { interpretTarotReading } from "./openai";

jest.mock("openai", () => ({
  OpenAI: jest.fn().mockImplementation(() => ({
    chat: {
      completions: {
        create: jest.fn().mockResolvedValue({
          choices: [
            {
              message: {
                content: "Mock AI interpretation for tarot reading"
              }
            }
          ]
        })
      }
    }
  }))
}));

describe("OpenAI Integration", () => {
  it("generates tarot reading interpretation", async () => {
    const cards = ["the-fool", "the-magician"];
    const spread = "two-card";

    const interpretation = await interpretTarotReading(cards, spread);

    expect(interpretation).toContain("Mock AI interpretation");
  });
});
```

---

## ⚙️ CI/CD Integration

### GitHub Actions Workflow

```yaml
# filepath: .github/workflows/test.yml
name: Test Suite

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  frontend-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "pnpm"

      - name: Install dependencies
        run: pnpm install

      - name: Run unit tests
        run: pnpm test:unit

      - name: Run integration tests
        run: pnpm test:integration
        env:
          SUPABASE_URL: ${{ secrets.SUPABASE_TEST_URL }}
          SUPABASE_ANON_KEY: ${{ secrets.SUPABASE_TEST_ANON_KEY }}

      - name: Upload coverage reports
        uses: codecov/codecov-action@v3

  backend-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v4
        with:
          python-version: "3.11"

      - name: Install dependencies
        run: |
          cd apps/astro-service
          pip install -r requirements.txt
          pip install pytest pytest-cov

      - name: Run Python tests
        run: |
          cd apps/astro-service
          pytest --cov=app --cov-report=xml

      - name: Upload coverage
        uses: codecov/codecov-action@v3

  e2e-tests:
    runs-on: ubuntu-latest
    needs: [frontend-tests, backend-tests]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "pnpm"

      - name: Install dependencies
        run: pnpm install

      - name: Install Playwright
        run: pnpm exec playwright install

      - name: Run E2E tests
        run: pnpm test:e2e
        env:
          PLAYWRIGHT_BASE_URL: http://localhost:3000
```

---

## 🚀 Future Testing Roadmap

### Phase 1: Foundation (Current Sprint)

- [x] **Basic Jest Configuration**: TypeScript support, test scripts
- [ ] **Core Component Tests**: TarotCard, Spread, Reading components
- [ ] **API Route Tests**: Authentication, readings, user management
- [ ] **Database Test Setup**: Supabase test instance configuration

### Phase 2: Integration (Next 2 Sprints)

- [ ] **E2E Framework Setup**: Playwright installation and configuration
- [ ] **3D Testing Utilities**: Babylon.js test helpers and mocks
- [ ] **AI Service Testing**: OpenAI integration test framework
- [ ] **Performance Baseline**: Lighthouse CI integration

### Phase 3: Advanced Testing (Future Sprints)

- [ ] **Visual Regression Testing**: Chromatic or similar tool
- [ ] **Load Testing**: Artillery or K6 for performance testing
- [ ] **Security Testing**: Automated security scanning
- [ ] **Accessibility Testing**: Axe-core integration

### Phase 4: Production Readiness

- [ ] **Monitoring Integration**: Error tracking in tests
- [ ] **Test Data Management**: Automated test data generation
- [ ] **Cross-browser Testing**: BrowserStack or similar
- [ ] **Mobile Testing**: Device simulation and testing

---

## 📊 Quality Metrics

### Test Quality Indicators

```typescript
// Test quality metrics tracking
// filepath: scripts/test-metrics.ts
export interface TestMetrics {
  coverage: {
    lines: number;
    functions: number;
    branches: number;
    statements: number;
  };
  performance: {
    testSuiteRunTime: number;
    slowestTests: Array<{
      name: string;
      duration: number;
    }>;
  };
  reliability: {
    flakyTests: number;
    failureRate: number;
  };
}
```

### Success Criteria

| Metric                   | Target      | Current | Status     |
| ------------------------ | ----------- | ------- | ---------- |
| **Unit Test Coverage**   | 80%         | 0%      | 🔴 Missing |
| **Integration Coverage** | 70%         | 0%      | 🔴 Missing |
| **E2E Test Coverage**    | 60%         | 0%      | 🔴 Missing |
| **Test Suite Speed**     | < 5 minutes | N/A     | ⏳ TBD     |
| **Flaky Test Rate**      | < 1%        | N/A     | ⏳ TBD     |
| **Build Success Rate**   | > 95%       | N/A     | ⏳ TBD     |

### Monitoring & Reporting

- **Daily**: Test execution results in CI/CD
- **Weekly**: Coverage reports and trend analysis
- **Monthly**: Test performance and flaky test review
- **Quarterly**: Testing strategy and tool evaluation

---

## 🔧 Development Workflow Integration

### Pre-commit Hooks

```json
// filepath: package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged && pnpm test:unit",
      "pre-push": "pnpm test:integration"
    }
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write",
      "jest --findRelatedTests --passWithNoTests"
    ]
  }
}
```

### Test Commands

```json
// filepath: package.json scripts
{
  "scripts": {
    "test": "jest",
    "test:unit": "jest --testPathPattern=unit",
    "test:integration": "jest --testPathPattern=integration",
    "test:e2e": "playwright test",
    "test:coverage": "jest --coverage",
    "test:watch": "jest --watch",
    "test:debug": "jest --runInBand --detectOpenHandles"
  }
}
```

---

This comprehensive testing strategy ensures the Mystical Realms platform maintains high quality, reliability, and performance while supporting rapid development and deployment cycles. The phased approach allows for gradual implementation while prioritizing the most critical areas first.

**Related Documentation:**

- [House Rules](house_rules.md) - Code organization and best practices
- [Sprint Summary](sprint_summery.md) - Implementation timeline
- [Database Schema](database_schema_complete.md) - Data layer testing
- [Tech Stack Roadmap](techstack_roadmap.md) - Technology decisions
