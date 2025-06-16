import { create } from "zustand";

export type ThemeOption = "deep-nebula" | "midnight-tarot" | "cosmic-neon";

interface ThemeState {
  theme: ThemeOption;
  setTheme: (theme: ThemeOption) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: "deep-nebula",
  setTheme: (theme) => set({ theme })
}));
