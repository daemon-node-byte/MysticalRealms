Here are the **MDX templates** and file structure recommendations for your **blog** and **astrology knowledge base**, designed for use with **Next.js App Router + MDX + Contentlayer (or a custom file-based loader)**.

---

## 📁 File Structure for MDX Content

```
/content/
  blog/
    what-is-tarot.mdx
    interpreting-major-arcana.mdx
  knowledge/
    planets/
      mars.mdx
      venus.mdx
    houses/
      eighth-house.mdx
    signs/
      aries.mdx
      pisces.mdx
```

---

## 📦 Blog MDX Template

### `content/blog/what-is-tarot.mdx`

```mdx
---
title: "What is Tarot? An Introduction to the Cards"
slug: "what-is-tarot"
description: "A beginner-friendly guide to Tarot, its origins, and how readings work."
date: "2025-06-14"
tags: ["tarot", "beginner", "history"]
author: "Mystic Raven"
coverImage: "/images/blog/what-is-tarot.jpg"
---

import { TarotCard } from "@/components/tarot/TarotCard";

## 🧙 What is Tarot?

Tarot is a system of symbolic cards used for guidance, self-reflection, and spiritual insight.

<TarotCard name="The Fool" />

### 🔮 Where Did Tarot Originate?

The Tarot has roots in 15th-century Europe...

### 📚 What Are the Cards?

There are two main sections of the tarot deck:

- **Major Arcana** – archetypal energies (e.g., The Fool, The Tower)
- **Minor Arcana** – everyday events (4 suits: Cups, Pentacles, Swords, Wands)

---

## 🧠 Getting Started with Your First Reading

- Pick a spread
- Shuffle and draw
- Reflect on the meanings

> Tarot doesn't predict the future—it reveals what’s already present within you.
```

---

## 📦 Knowledge Base MDX Template

### `content/knowledge/planets/venus.mdx`

```mdx
---
title: "Venus: The Planet of Love and Harmony"
slug: "venus"
category: "planet"
symbol: "♀"
element: "Earth"
rulingSigns: ["Taurus", "Libra"]
keywords: ["love", "beauty", "art", "pleasure"]
---

## 🌟 Venus

Venus represents the **principles of attraction**, **relationships**, and **aesthetic beauty**. It governs how we express affection and what we find pleasurable.

---

### ☄️ Venus in the Signs

- **Venus in Aries**: Bold and impulsive in love.
- **Venus in Pisces**: Dreamy, empathetic, and romantic.

---

### 🏠 Venus in the Houses

- **1st House**: Charming persona, attraction through appearance.
- **7th House**: Strong desire for partnership and harmony.

---

### 🧘 Associations

| Attribute  | Value       |
| ---------- | ----------- |
| Metal      | Copper      |
| Day        | Friday      |
| Tarot Card | The Empress |
```

---

## 🛠 Suggested Config (Contentlayer)

If you’re using **Contentlayer**, define your schema in `contentlayer.config.ts`:

```ts
export const Blog = defineDocumentType(() => ({
  name: "Blog",
  filePathPattern: `blog/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    slug: { type: "string", required: true },
    date: { type: "date", required: true },
    tags: { type: "list", of: { type: "string" } },
    author: { type: "string", required: true },
    description: { type: "string" },
    coverImage: { type: "string" }
  }
}));

export const Knowledge = defineDocumentType(() => ({
  name: "Knowledge",
  filePathPattern: `knowledge/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    slug: { type: "string", required: true },
    category: { type: "string" },
    element: { type: "string" },
    rulingSigns: { type: "list", of: { type: "string" } },
    keywords: { type: "list", of: { type: "string" } },
    symbol: { type: "string" }
  }
}));
```

---

## 🧭 Navigation Use

You can query blog and knowledge base content via:

```ts
import { allBlogs, allKnowledges } from "contentlayer/generated";

const blogPosts = allBlogs.sort(
  (a, b) => +new Date(b.date) - +new Date(a.date)
);
const signs = allKnowledges.filter((k) => k.category === "sign");
```

---

## ➕ Want Auto-Generate More?

Let me know if you'd like:

- A full set of 12 signs, 12 houses, and 10 planets in `knowledge/`
- Blog post seed generation (e.g., 10 tarot articles)
- A dynamic `[slug].tsx` page renderer for both blog and knowledge base

Just say the word.
