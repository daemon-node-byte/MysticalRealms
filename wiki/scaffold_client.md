Here’s a **scaffolded layout** of the `pages/` and `components/` structure for your **Next.js (TypeScript)** Tarot & Astrology app, aligned with the MVP feature roadmap.

---

## 🧱 File Structure (Simplified Overview)

```
/app/                         # App Router
  layout.tsx                 # Global layout
  page.tsx                   # Home Page
  dashboard/
    page.tsx
  login/
    page.tsx
  signup/
    page.tsx
  profile/
    [username]/page.tsx      # Public profile view
    edit/page.tsx            # Profile editor
  readings/
    new/page.tsx             # New tarot reading
    [readingId]/page.tsx     # View saved reading
  journal/
    page.tsx
    [entryId]/page.tsx
  spread-creator/
    page.tsx
  explorer/
    tarot/page.tsx
    astrology/page.tsx
  quiz/
    page.tsx
  blog/
    page.tsx
    [slug]/page.tsx
  calendar/
    page.tsx
  horoscopes/
    page.tsx
  dice/
    page.tsx
  knowledge-base/
    page.tsx
    [slug]/page.tsx
  api/                        # Optional internal API routes (e.g. for LLMs)
/components/
  layout/
    Header.tsx
    Footer.tsx
    Sidebar.tsx
    AuthGuard.tsx
  ui/
    Card.tsx
    Button.tsx
    Avatar.tsx
    Badge.tsx
  dashboard/
    DailyHoroscope.tsx
    CardOfTheDay.tsx
    NewsFeed.tsx
  tarot/
    DeckSelector.tsx
    SpreadSelector.tsx
    TarotCard.tsx
    JournalEntryForm.tsx
    ReadingRenderer.tsx
  astrology/
    BirthChartViewer.tsx
    TransitTable.tsx
    DiceRoller.tsx
    SynastryViewer.tsx
  quiz/
    QuizCard.tsx
    QuizProgress.tsx
  blog/
    FeaturedPost.tsx
    BlogPostPreview.tsx
  markdown/
    MDXRenderer.tsx
/lib/
  supabaseClient.ts          # Supabase init
  auth.ts                    # Auth utils
  apiClient.ts               # FastAPI / OpenAI handlers
  helpers.ts
/styles/
  globals.css
/types/
  index.ts                   # Shared types
```

---

## 📄 Example Layout

### `app/layout.tsx`

```tsx
import "./globals.css";
import { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <Header />
        <main className="container mx-auto px-4 py-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

---

## 🧠 AuthGuard Wrapper

Used in dashboard/protected areas.

```tsx
// components/layout/AuthGuard.tsx
"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "@supabase/auth-helpers-react";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const user = useUser();

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user]);

  if (!user) return null;
  return <>{children}</>;
};
```

---

## 🧭 Navigation Strategy

Pages like `/readings/new`, `/spread-creator`, `/dashboard` will use **Zustand** for transient UI state and **React Query** for persistent Supabase data (like readings or journal entries).

---

## ✅ Ready-To-Use Pages (MVP priority)

| Page                     | Features                                 |
| ------------------------ | ---------------------------------------- |
| `/login`, `/signup`      | Auth UI (Supabase)                       |
| `/dashboard`             | Card of the Day, Horoscope, Feed         |
| `/readings/new`          | Select spread + deck → AI interpretation |
| `/journal`               | List of entries, import from reading     |
| `/spread-creator`        | Babylon.js canvas, drag/drop UI          |
| `/explorer/tarot`        | Tarot card grid, modal view              |
| `/blog`, `/blog/[slug]`  | MDX articles with comments               |
| `/knowledge-base/[slug]` | Markdown info pages                      |
| `/dice`                  | 3D dice roll → LLM result                |

---

## ✅ Next Steps

Would you like me to:

- Scaffold the `TarotCard.tsx` component?
- Generate MDX templates for blogs & knowledge base?
- Set up page metadata (`generateMetadata`) for SEO?
- Add dynamic routing logic or layout nesting?

Let me know how you'd like to continue.
