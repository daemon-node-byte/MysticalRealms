#!/bin/bash
# This script creates GitHub milestones for the Mystical Realms project.
# Set your repo owner and name
OWNER="daemon-node-byte"
REPO="MysticalRealms"

# Array of milestone titles and descriptions
declare -a MILESTONES=(
  "Sprint 1 – Foundation & Auth|Establish the monorepo, CI/CD, Supabase backend, and core authentication flows."
  "Sprint 2 – Profiles & Dashboard MVP|Implement user profile CRUD, dashboard layout, Card of the Day, Daily Horoscope, and On This Day widgets."
  "Sprint 3 – Tarot Core: Journal, Readings & Astrology Dice|Build Tarot journal, online reading flow, AI integration, and astrology dice features."
  "Sprint 4 – Tarot Interactions: Spread Creator & Card Explorer|Create spread creator, card explorer, and related UI/UX."
  "Sprint 5 – Engagement Features: Quiz & Blog|Add quiz game, blog/articles CMS, and comments."
  "Sprint 6 – Astrology Suite & Calendar|Implement birth chart generator, transit/synastry, and personal calendar."
  "Sprint 7 – Knowledge Base & Horoscopes Explorer|Build astrology knowledge base and horoscope explorer."
  "Sprint 8 – Polish & Hardening|Testing, performance, security, accessibility, and UI/UX refinements."
)

for entry in "${MILESTONES[@]}"; do
  TITLE="${entry%%|*}"
  DESC="${entry#*|}"
  echo "Creating milestone: \"$TITLE\" ..."
  RESPONSE=$(gh api repos/$OWNER/$REPO/milestones -f title="$TITLE" -f description="$DESC" 2>&1)
  if [ $? -eq 0 ]; then
    echo "✅ Success: \"$TITLE\" milestone created."
  else
    echo "❌ Failed to create \"$TITLE\" milestone."
    echo "Error details: $RESPONSE"
  fi
done