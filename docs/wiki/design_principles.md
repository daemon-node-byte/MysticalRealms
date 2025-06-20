# 🎯 Design Philosophy

### Core Principles

1. **🌙 Dark-First Design**

   - Primary experience optimized for low-light environments
   - Reduces eye strain during extended reading sessions
   - Creates intimate, contemplative atmosphere

2. **📏 Hierarchical Clarity**

   - Clear typographic scale (48px → 32px → 24px → 18px → 16px)
   - Consistent spacing based on 8px grid system
   - Logical information architecture

3. **🎭 Mood-Driven Interactions**

   - Accent colors that evoke mystery and energy
   - Context-aware color usage (e.g., gentle purples for readings, vibrant neons for interactive elements)
   - Subtle micro-animations that enhance without distracting

4. **♿ Accessibility First**

   - WCAG AA compliance across all themes
   - High contrast ratios (minimum 4.5:1 for normal text)
   - Keyboard navigation support
   - Screen reader optimization

5. **🌊 Depth & Layering**

   - Soft shadows and translucent panels
   - Glass morphism effects for modal overlays
   - Layered composition that guides user attention

6. **✨ Mystical Authenticity**
   - Consistent iconography with mystical motifs
   - Unified image treatments (subtle glows, vignettes)
   - Smooth animations that feel magical, not mechanical

---

## 🎨 Theme Collection

### Theme Comparison Matrix

| Theme              | Personality           | Use Case                                | Contrast | Accessibility |
| ------------------ | --------------------- | --------------------------------------- | -------- | ------------- |
| **Deep Nebula**    | Ethereal, Regal       | Premium experiences, spiritual content  | AAA      | ✅ Excellent  |
| **Midnight Tarot** | Classic, Timeless     | Traditional readings, scholarly content | AAA      | ✅ Excellent  |
| **Cosmic Neon**    | Futuristic, Energetic | Interactive features, gaming elements   | AA+      | ✅ Very Good  |
| **Sage Minimal**   | Clean, Focused        | Accessibility mode, professional use    | AAA      | ✅ Excellent  |

---

## 🌌 Theme 1: Deep Nebula

_Ethereal • Regal • Dream-like_

### Dark Mode (Primary)

```css
--dn-primary: #2C003E      /* Rich purple backgrounds */
--dn-secondary: #4B1E6B    /* Card surfaces, panels */
--dn-accent: #9D4EDD       /* Interactive elements */
--dn-text: #F5E8FF         /* Primary text */
--dn-text-muted: #B794C7   /* Secondary text */
--dn-background: #0F0014   /* Page background */
--dn-border: #4B1E6B       /* Subtle borders */
--dn-surface: #2C003E      /* Card backgrounds */
```

### Light Mode

```css
--dn-primary: #6B2A8C      /* Adjusted purple for light backgrounds */
--dn-secondary: #F8F5FF    /* Light card surfaces */
--dn-accent: #7B2CBF       /* Accessible accent on light */
--dn-text: #2C003E         /* Dark text on light */
--dn-text-muted: #6B2A8C   /* Muted text */
--dn-background: #FFFFFF   /* Clean white background */
--dn-border: #E5D9F2       /* Light borders */
--dn-surface: #FEFAFF      /* Slight tint for cards */
```

### Typography

- **Headings:** `Cinzel, serif` - Ancient mysticism with sharp elegance
- **Body:** `Roboto Slab, serif` - Readable with character
- **Code:** `JetBrains Mono, monospace`

### Usage Context

- Premium reading experiences
- Spiritual content and meditation features
- High-value user journeys (onboarding, paid features)

---

## 🌃 Theme 2: Midnight Tarot

_Classic • Mysterious • Timeless_

### Dark Mode (Primary)

```css
--mt-primary: #1A1A2E      /* Deep blue-grey backgrounds */
--mt-secondary: #16213E    /* Card surfaces */
--mt-accent: #E94560       /* Vibrant coral accent */
--mt-text: #EDF2F4         /* High contrast text */
--mt-text-muted: #8D98A4   /* Muted text */
--mt-background: #0F0B1D   /* Rich dark background */
--mt-border: #16213E       /* Subtle borders */
--mt-surface: #1A1A2E      /* Card backgrounds */
```

### Light Mode

```css
--mt-primary: #2D3748      /* Adjusted dark blue for contrast */
--mt-secondary: #F7FAFC    /* Light surfaces */
--mt-accent: #D53F8C       /* Accessible pink accent */
--mt-text: #1A1A2E         /* Dark text */
--mt-text-muted: #4A5568   /* Muted text */
--mt-background: #FFFFFF   /* Clean background */
--mt-border: #E2E8F0       /* Light borders */
--mt-surface: #F9FAFB      /* Card surfaces */
```

### Typography

- **Headings:** `Playfair Display, serif` - Elegant, refined
- **Body:** `Lato, sans-serif` - Neutral, highly readable
- **Code:** `Source Code Pro, monospace`

### Usage Context

- Traditional tarot reading interfaces
- Blog and knowledge base content
- Historical and educational sections

---

## ⚡ Theme 3: Cosmic Neon

_Futuristic • Energetic • Tech-Mystic_

### Dark Mode (Primary)

```css
--cn-primary: #100F1D      /* Deep space background */
--cn-secondary: #1F1C3D    /* Panel surfaces */
--cn-accent: #00FFC6       /* Electric cyan accent */
--cn-text: #E0E0E0         /* Bright text */
--cn-text-muted: #9CA3AF   /* Muted text */
--cn-background: #0A0713   /* Cosmic background */
--cn-border: #1F1C3D       /* Panel borders */
--cn-surface: #100F1D      /* Card surfaces */
```

### Light Mode

```css
--cn-primary: #4C1D95      /* Purple for light mode */
--cn-secondary: #F8FAFC    /* Light surfaces */
--cn-accent: #0891B2       /* Teal accent for accessibility */
--cn-text: #1F2937         /* Dark text */
--cn-text-muted: #6B7280   /* Muted text */
--cn-background: #FFFFFF   /* Clean background */
--cn-border: #E5E7EB       /* Light borders */
--cn-surface: #F1F5F9      /* Subtle surface tint */
```

### Typography

- **Headings:** `Montserrat Alternates, sans-serif` - Geometric, modern
- **Body:** `Open Sans, sans-serif` - Clean, web-optimized
- **Code:** `Fira Code, monospace`

### Usage Context

- Interactive gaming elements (dice, quiz)
- 3D visualization interfaces
- Technology-focused features

---

## 🕊️ Theme 4: Sage Minimal

_Clean • Focused • Accessible_

### Dark Mode

```css
--sm-primary: #374151      /* Warm grey primary */
--sm-secondary: #4B5563    /* Secondary surfaces */
--sm-accent: #10B981       /* Gentle green accent */
--sm-text: #F9FAFB         /* High contrast text */
--sm-text-muted: #D1D5DB   /* Muted text */
--sm-background: #1F2937   /* Soft dark background */
--sm-border: #4B5563       /* Subtle borders */
--sm-surface: #374151      /* Card surfaces */
```

### Light Mode (Primary)

```css
--sm-primary: #F9FAFB      /* Clean light surfaces */
--sm-secondary: #F3F4F6    /* Secondary surfaces */
--sm-accent: #059669       /* Accessible green */
--sm-text: #111827         /* Dark text */
--sm-text-muted: #6B7280   /* Muted text */
--sm-background: #FFFFFF   /* Pure white background */
--sm-border: #D1D5DB       /* Clear borders */
--sm-surface: #FFFFFF      /* Clean surfaces */
```

### Typography

- **Headings:** `Inter, sans-serif` - Modern, professional
- **Body:** `Inter, sans-serif` - Consistent, readable
- **Code:** `SF Mono, Monaco, monospace`

### Usage Context

- Accessibility-first experiences
- Professional/clinical use cases
- High-concentration reading tasks
- Users with visual sensitivities

---

## 🎛️ Implementation Guidelines

### CSS Custom Properties Structure

```css
:root {
  /* Theme Selection */
  --theme: "deep-nebula"; /* deep-nebula | midnight-tarot | cosmic-neon | sage-minimal */
  --mode: "dark"; /* dark | light */

  /* Spacing Scale */
  --space-1: 0.25rem; /* 4px */
  --space-2: 0.5rem; /* 8px */
  --space-3: 0.75rem; /* 12px */
  --space-4: 1rem; /* 16px */
  --space-5: 1.25rem; /* 20px */
  --space-6: 1.5rem; /* 24px */
  --space-8: 2rem; /* 32px */
  --space-10: 2.5rem; /* 40px */
  --space-12: 3rem; /* 48px */
  --space-16: 4rem; /* 64px */

  /* Typography Scale */
  --text-xs: 0.75rem; /* 12px */
  --text-sm: 0.875rem; /* 14px */
  --text-base: 1rem; /* 16px */
  --text-lg: 1.125rem; /* 18px */
  --text-xl: 1.25rem; /* 20px */
  --text-2xl: 1.5rem; /* 24px */
  --text-3xl: 1.875rem; /* 30px */
  --text-4xl: 2.25rem; /* 36px */
  --text-5xl: 3rem; /* 48px */

  /* Animation Timing */
  --transition-fast: 150ms ease-in-out;
  --transition-base: 250ms ease-in-out;
  --transition-slow: 350ms ease-in-out;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-base: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-glow: 0 0 0 1px var(--accent), 0 0 20px var(--accent);

  /* Border Radius */
  --radius-sm: 0.125rem; /* 2px */
  --radius-base: 0.25rem; /* 4px */
  --radius-md: 0.375rem; /* 6px */
  --radius-lg: 0.5rem; /* 8px */
  --radius-xl: 0.75rem; /* 12px */
  --radius-full: 9999px;
}

/* Deep Nebula Theme */
[data-theme="deep-nebula"][data-mode="dark"] {
  --primary: #2c003e;
  --secondary: #4b1e6b;
  --accent: #9d4edd;
  --text: #f5e8ff;
  --text-muted: #b794c7;
  --background: #0f0014;
  --border: #4b1e6b;
  --surface: #2c003e;
}

[data-theme="deep-nebula"][data-mode="light"] {
  --primary: #6b2a8c;
  --secondary: #f8f5ff;
  --accent: #7b2cbf;
  --text: #2c003e;
  --text-muted: #6b2a8c;
  --background: #ffffff;
  --border: #e5d9f2;
  --surface: #fefaff;
}

/* Continue for other themes... */
```

### Component Usage Patterns

```typescript
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--accent)] text-[var(--background)] hover:bg-[var(--accent)]/90 shadow-sm hover:shadow-[var(--shadow-glow)]",
        secondary:
          "border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:bg-[var(--secondary)]",
        ghost:
          "text-[var(--text)] hover:bg-[var(--surface)] hover:text-[var(--accent)]",
        outline:
          "border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--background)]"
      },
      size: {
        sm: "h-8 px-3 text-xs",
        default: "h-10 px-4",
        lg: "h-12 px-8 text-lg",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
```

### Theme Context Provider

```typescript
/web/crs / providers / ThemeProvider.tsx;
("use client");

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "deep-nebula" | "midnight-tarot" | "cosmic-neon" | "sage-minimal";
type Mode = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  mode: Mode;
  setTheme: (theme: Theme) => void;
  setMode: (mode: Mode) => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("deep-nebula");
  const [mode, setMode] = useState<Mode>("dark");

  useEffect(() => {
    // Apply theme and mode to document
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.setAttribute("data-mode", mode);

    // Store in localStorage
    localStorage.setItem("mystical-theme", theme);
    localStorage.setItem("mystical-mode", mode);
  }, [theme, mode]);

  useEffect(() => {
    // Load from localStorage on mount
    const savedTheme = localStorage.getItem("mystical-theme") as Theme;
    const savedMode = localStorage.getItem("mystical-mode") as Mode;

    if (savedTheme) setTheme(savedTheme);
    if (savedMode) setMode(savedMode);
  }, []);

  const toggleMode = () => {
    setMode(mode === "dark" ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider
      value={{ theme, mode, setTheme, setMode, toggleMode }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
```

---

## 🎨 Brand Application Guide

### 1. **Layout & Spacing**

- **Grid System:** 8px base unit for consistent rhythm
- **Content Width:** Max 1200px for optimal readability
- **Card Aspect Ratios:** 4:3 for tarot cards, 16:9 for hero images

### 2. **Interactive Elements**

```css
/* Hover Effects */
.mystical-hover {
  transition: all var(--transition-fast);
  transform-origin: center;
}

.mystical-hover:hover {
  transform: scale(1.03);
  box-shadow: var(--shadow-glow);
}

/* Focus States */
.mystical-focus:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
```

### 3. **Iconography Standards**

- **Style:** Line icons with 2px stroke weight
- **Size Scale:** 16px, 20px, 24px, 32px, 48px
- **Treatment:** Use accent color for active states
- **Mystical Motifs:** Stars, moons, infinity symbols, sacred geometry

### 4. **Image Treatment**

```css
.mystical-image {
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-base);
  position: relative;
}

.mystical-image::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow: inset 0 0 0 1px var(--accent);
  opacity: 0;
  transition: opacity var(--transition-base);
}

.mystical-image:hover::after {
  opacity: 0.5;
}
```

### 5. **Typography Hierarchy**

```css
.heading-1 {
  font-size: var(--text-5xl);
  line-height: 1.1;
}
.heading-2 {
  font-size: var(--text-4xl);
  line-height: 1.2;
}
.heading-3 {
  font-size: var(--text-3xl);
  line-height: 1.3;
}
.heading-4 {
  font-size: var(--text-2xl);
  line-height: 1.4;
}
.body-lg {
  font-size: var(--text-lg);
  line-height: 1.6;
}
.body {
  font-size: var(--text-base);
  line-height: 1.6;
}
.caption {
  font-size: var(--text-sm);
  line-height: 1.5;
  opacity: 0.8;
}
```

---

## ♿ Accessibility Compliance

### Contrast Ratios

- **AAA Level:** Text contrast ratio ≥ 7:1
- **AA Level:** Large text contrast ratio ≥ 4.5:1
- **Interactive Elements:** Minimum 3:1 contrast ratio

### Focus Management

- Clear focus indicators on all interactive elements
- Logical tab order throughout the interface
- Skip links for keyboard navigation

### Screen Reader Support

- Semantic HTML structure
- Proper ARIA labels and descriptions
- Alt text for all meaningful images

### Motion Preferences

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 🚀 Implementation Roadmap

### Phase 1: Foundation

- [ ] Set up CSS custom properties system
- [ ] Implement theme context provider
- [ ] Create base component library
- [ ] Establish typography scale

### Phase 2: Theme Integration

- [ ] Deep Nebula theme implementation
- [ ] Midnight Tarot theme implementation
- [ ] Theme switcher component
- [ ] Local storage persistence

### Phase 3: Enhancement

- [ ] Cosmic Neon theme implementation
- [ ] Sage Minimal theme implementation
- [ ] Advanced animation system
- [ ] Accessibility audit and fixes

### Phase 4: Polish

- [ ] Micro-interaction refinements
- [ ] Performance optimization
- [ ] Cross-browser testing
- [ ] User testing and feedback integration

---

_This design system serves as the foundation for all visual elements in Mystical Realms, ensuring a cohesive, accessible, and enchanting user experience across all touchpoints._

Similar code found with 3 license types
