import React from "react";

export type ThemeOption = "deep-nebula" | "midnight-tarot" | "cosmic-neon";

const themeMap: Record<ThemeOption, string> = {
  "deep-nebula": "Deep Nebula",
  "midnight-tarot": "Midnight Tarot",
  "cosmic-neon": "Cosmic Neon",
};

export function ThemeSwitcher({
  value,
  onChange,
}: {
  value: ThemeOption;
  onChange: (theme: ThemeOption) => void;
}) {
  return (
    <div className="flex gap-2 items-center">
      <label htmlFor="theme-select" className="text-sm font-semibold opacity-80">
        Theme:
      </label>
      <select
        id="theme-select"
        value={value}
        onChange={(e) => onChange(e.target.value as ThemeOption)}
        className="rounded px-2 py-1 bg-indigo-900 text-white border border-indigo-700 focus:border-accent focus:outline-none"
      >
        {Object.entries(themeMap).map(([key, label]) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
