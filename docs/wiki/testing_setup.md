Great call. To build a solid **testing suite** for your Next.js (App Router, TypeScript) + Supabase + Babylon.js app, we’ll cover:

---

## ✅ Testing Stack Overview

| Area             | Tool(s)                                                                       |
| ---------------- | ----------------------------------------------------------------------------- |
| **Unit Testing** | [Jest](https://jestjs.io/) + [ts-jest](https://github.com/kulshekhar/ts-jest) |
| **Component**    | [React Testing Library](https://testing-library.com/)                         |
| **Integration**  | Supabase SDK Mocks, or test project DB w/ [vitest](https://vitest.dev/)       |
| **E2E Testing**  | [Playwright](https://playwright.dev/) or [Cypress](https://cypress.io/)       |
| **3D Scenes**    | Babylon.js: mocked canvas + render checks with ThreeMeshUI or DOM refs        |

---

## 📦 Dependencies to Install

```bash
# Unit + Component
pnpm add -D jest ts-jest @testing-library/react @testing-library/jest-dom @testing-library/user-event @types/jest

# Optional: Mock Supabase
pnpm add -D msw @supabase/supabase-js vitest

# E2E
pnpm add -D playwright
# or
pnpm add -D cypress
```

---

## 🧪 Jest Config (`jest.config.ts`)

```ts
export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1"
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"]
};
```

### `jest.setup.ts`

```ts
import "@testing-library/jest-dom";
```

---

## 🧪 Example Component Test

### `components/tarot/TarotCard.tsx`

```tsx
// A basic card
export function TarotCard({ name }: { name: string }) {
  return <div data-testid="tarot-card">{name}</div>;
}
```

### `__tests__/TarotCard.test.tsx`

```tsx
import { render, screen } from "@testing-library/react";
import { TarotCard } from "@/components/tarot/TarotCard";

describe("TarotCard", () => {
  it("renders card name", () => {
    render(<TarotCard name="The Fool" />);
    expect(screen.getByTestId("tarot-card")).toHaveTextContent("The Fool");
  });
});
```

---

## 🤖 Supabase Mock Strategy

For unit tests, **mock `supabaseClient`**:

### `__mocks__/supabase.ts`

```ts
export const supabase = {
  auth: {
    getUser: jest.fn(() =>
      Promise.resolve({ data: { user: { id: "user123" } }, error: null })
    )
  },
  from: jest.fn(() => ({
    select: jest.fn(() => Promise.resolve({ data: [], error: null })),
    insert: jest.fn(() => Promise.resolve({ data: [], error: null }))
  }))
};
```

In your app:

```ts
// lib/supabaseClient.ts
export const supabase = createClient(...) // default export
```

Then in tests:

```ts
jest.mock("@/lib/supabaseClient", () => require("__mocks__/supabase"));
```

---

## 🚀 Playwright (E2E)

To initialize Playwright:

```bash
npx playwright install
```

Add a test:

### `e2e/dashboard.spec.ts`

```ts
import { test, expect } from "@playwright/test";

test("dashboard loads", async ({ page }) => {
  await page.goto("http://localhost:3000/dashboard");
  await expect(page.getByText("Card of the Day")).toBeVisible();
});
```

Run dev server then:

```bash
npx playwright test
```

---

## 🔁 Run All Tests

Add to `package.json`:

```json
"scripts": {
  "test": "jest",
  "test:watch": "jest --watch",
  "test:e2e": "playwright test"
}
```

---

## 🔍 Suggested Test Coverage Targets (MVP Phase)

| Area                    | Type        | Tool                 |
| ----------------------- | ----------- | -------------------- |
| Auth flow               | Integration | Jest + Supabase mock |
| TarotCard + Spread UIs  | Unit/Comp   | RTL                  |
| Reading API & AI calls  | Unit        | Jest                 |
| FastAPI astrology tests | Unit/API    | Pytest               |
| Dice roll UI + logic    | Component   | RTL                  |
| Blog & article display  | E2E         | Playwright           |

---

Would you like me to:

- Scaffold the `__tests__` folder for each major feature?
- Add CI test workflow to GitHub Actions?
- Set up FastAPI test suite (`pytest`, `httpx`, etc)?

Let me know and I’ll generate it.
