# Sitemap & Userflow

This document outlines the sitemap and user flow for the Tarot & Astrology web app, detailing both public and authenticated sections.

```asciidoc
Public
├── Home (“hero” with featured article + CTA to login/signup)
├── About (mission, community values)
├── Blog & Articles
│   ├── List (filter by category: Tarot, Astrology, Community)
│   └── Read (with comments for logged-in users)
├── Tarot Explorer
│   └── Card Gallery (search & filter)
└── Sign Up / Login

Authenticated (“App” shell w/ nav)
├── Dashboard
│   ├── News Feed (community posts, shared spreads, featured readings)
│   ├── Card of the Day
│   ├── Daily Horoscopes
│   └── “On this date” astrology/tarot events
├── My Profile
│   ├── Avatar, bio, badges & status
│   ├── Journal (private / public entries)
│   └── Personal Calendar (birthdates of family & friends)
├── Tarot Journal
│   ├── New Entry (manual / import from live reading)
│   └── Browse Past Entries
├── Live Tarot Reading
│   ├── Choose Spread (catalog)
│   ├── Choose Deck & Options (reversals, majors-only, etc.)
│   └── AI-Enhanced Interpretation
├── Spread Creator
│   ├── Drag-and-Drop Canvas
│   ├── Label Positions
│   └── Save / Share to Community
├── Tarot Quiz Game
│   └── Keyword → Pick the Card
├── Astrology Tools
│   ├── Birth Chart Generator (SVG / PDF export)
│   ├── Transit Analysis
│   ├── Synastry Chart
│   └── Dice Reading (3×12-sided + AI interpolation)
└── Knowledge Base
    ├── Zodiac Signs
    ├── Houses & Systems
    └── Planets & Meanings
```

```mermaid

flowchart LR
    A[Public]
    A1[Home]
    A2[About]
    A3[Blog & Articles]
    A3a[List filter by category]
    A3b[Read comments for logged-in]
    A4[Tarot Explorer]
    A4a[Card Gallery]
    A5[Sign Up / Login]

    B[Authenticated App Shell]
    B1[Dashboard]
    B1a[News Feed]
    B1b[Card of the Day]
    B1c[Daily Horoscopes]
    B1d[On this date events]
    B2[My Profile]
    B2a[Avatar, bio, badges]
    B2b[Journal]
    B2c[Personal Calendar]
    B3[Tarot Journal]
    B3a[New Entry]
    B3b[Browse Past Entries]
    B4[Live Tarot Reading]
    B4a[Choose Spread]
    B4b[Choose Deck & Options]
    B4c[AI-Enhanced Interpretation]
    B5[Spread Creator]
    B5a[Drag-and-Drop Canvas]
    B5b[Label Positions]
    B5c[Save / Share]
    B6[Tarot Quiz Game]
    B6a[Keyword → Pick the Card]
    B7[Astrology Tools]
    B7a[Birth Chart Generator]
    B7b[Transit Analysis]
    B7c[Synastry Chart]
    B7d[Dice Reading]
    B8[Knowledge Base]
    B8a[Zodiac Signs]
    B8b[Houses & Systems]
    B8c[Planets & Meanings]

    A --> A1
    A --> A2
    A --> A3
    A3 --> A3a
    A3 --> A3b
    A --> A4
    A4 --> A4a
    A --> A5

    A5 --> B

    B --> B1
    B1 --> B1a
    B1 --> B1b
    B1 --> B1c
    B1 --> B1d
    B --> B2
    B2 --> B2a
    B2 --> B2b
    B2 --> B2c
    B --> B3
    B3 --> B3a
    B3 --> B3b
    B --> B4
    B4 --> B4a
    B4 --> B4b
    B4 --> B4c
    B --> B5
    B5 --> B5a
    B5 --> B5b
    B5 --> B5c
    B --> B6
    B6 --> B6a
    B --> B7
    B7 --> B7a
    B7 --> B7b
    B7 --> B7c
    B7 --> B7d
    B --> B8
    B8 --> B8a
    B8 --> B8b
    B8 --> B8c

```
