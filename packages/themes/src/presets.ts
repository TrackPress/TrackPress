import { ThemeDefinitionSchema, type ThemeDefinition } from "@trackpress/core";

export const neonNightDriveTheme = ThemeDefinitionSchema.parse({
  id: "neon-night-drive",
  name: "Neon Night Drive",
  description: "Cyan and magenta city-light energy with a deep midnight background.",
  colors: {
    background: "#03031a",
    foreground: "#f8f7ff",
    primary: "#22d3ee",
    secondary: "#ec4899",
    muted: "#8b88ad",
  },
  typography: {
    family: "Inter, ui-sans-serif, system-ui, sans-serif",
    titleWeight: 800,
    letterSpacingEm: 0.08,
  },
  motion: {
    intensity: 0.72,
    smoothing: 0.78,
  },
  safeAreaPercent: 8,
});

export const minimalSpectrumTheme = ThemeDefinitionSchema.parse({
  id: "minimal-spectrum",
  name: "Minimal Spectrum",
  description: "A restrained monochrome spectrum for official audio releases.",
  colors: {
    background: "#09090b",
    foreground: "#fafafa",
    primary: "#e4e4e7",
    secondary: "#71717a",
    muted: "#a1a1aa",
  },
  typography: {
    family: "Inter, ui-sans-serif, system-ui, sans-serif",
    titleWeight: 700,
    letterSpacingEm: 0.04,
  },
  motion: {
    intensity: 0.42,
    smoothing: 0.86,
  },
  safeAreaPercent: 8,
});

export const builtInThemes: readonly ThemeDefinition[] = [
  neonNightDriveTheme,
  minimalSpectrumTheme,
];
