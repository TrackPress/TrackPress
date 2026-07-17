import type { ThemeDefinition } from "@trackpress/core";

export { builtInThemes, minimalSpectrumTheme, neonNightDriveTheme } from "./presets.js";

import { builtInThemes } from "./presets.js";

export function getTheme(themeId: string): ThemeDefinition {
  const theme = builtInThemes.find((candidate) => candidate.id === themeId);
  if (!theme) {
    throw new Error(`Unknown TrackPress theme: ${themeId}`);
  }
  return theme;
}
