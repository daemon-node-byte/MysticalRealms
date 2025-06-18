// src/theme/colorThemes.ts

export type ColorTheme = {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    background: string;
    border: string;
    card: string;
    [key: string]: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
};

export const deepNebula: ColorTheme = {
  name: "Deep Nebula",
  colors: {
    primary: "#2C003E",
    secondary: "#4B1E6B",
    accent: "#9D4EDD",
    text: "#F5E8FF",
    background: "#0F0014",
    border: "#4B1E6B",
    card: "#2C003E"
  },
  fonts: {
    heading: "Cinzel, serif",
    body: "Roboto Slab, serif"
  }
};

export const midnightTarot: ColorTheme = {
  name: "Midnight Tarot",
  colors: {
    primary: "#1A1A2E",
    secondary: "#16213E",
    accent: "#E94560",
    text: "#EDF2F4",
    background: "#0F0B1D",
    border: "#16213E",
    card: "#1A1A2E"
  },
  fonts: {
    heading: "Playfair Display, serif",
    body: "Lato, sans-serif"
  }
};

export const cosmicNeon: ColorTheme = {
  name: "Cosmic Neon",
  colors: {
    primary: "#100F1D",
    secondary: "#1F1C3D",
    accent: "#00FFC6",
    text: "#E0E0E0",
    background: "#0A0713",
    border: "#1F1C3D",
    card: "#100F1D"
  },
  fonts: {
    heading: "Montserrat Alternates, sans-serif",
    body: "Open Sans, sans-serif"
  }
};

export const colorThemes = [deepNebula, midnightTarot, cosmicNeon];
