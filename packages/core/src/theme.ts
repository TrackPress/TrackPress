import { z } from "zod";

const HexColorSchema = z.string().regex(/^#[0-9a-f]{6}$/i, "Expected a six-digit hex color");

export const ThemeDefinitionSchema = z.object({
  id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  name: z.string().min(1),
  description: z.string().min(1),
  colors: z.object({
    background: HexColorSchema,
    foreground: HexColorSchema,
    primary: HexColorSchema,
    secondary: HexColorSchema,
    muted: HexColorSchema,
  }),
  typography: z.object({
    family: z.string().min(1),
    titleWeight: z.number().int().min(400).max(900),
    letterSpacingEm: z.number().min(-0.1).max(1),
  }),
  motion: z.object({
    intensity: z.number().min(0).max(1),
    smoothing: z.number().min(0).max(1),
  }),
  safeAreaPercent: z.number().min(0).max(25),
});

export type ThemeDefinition = z.infer<typeof ThemeDefinitionSchema>;
