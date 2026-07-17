import { createDefaultProject, createReleasePlan } from "@trackpress/core";
import { describe, expect, it } from "vitest";

import { createRenderCommand } from "./render-command.js";

const theme = {
  id: "test-theme",
  name: "Test Theme",
  description: "Test theme",
  colors: {
    background: "#000000",
    foreground: "#ffffff",
    primary: "#22d3ee",
    secondary: "#ec4899",
    muted: "#888888",
  },
  typography: { family: "sans-serif", titleWeight: 700, letterSpacingEm: 0.05 },
  motion: { intensity: 0.5, smoothing: 0.8 },
  safeAreaPercent: 8,
} as const;

describe("createRenderCommand", () => {
  it("builds a shell-free vertical full-track 60 FPS FFmpeg command", () => {
    const project = createDefaultProject("/music/track.wav");
    const asset = createReleasePlan(project).assets[1];
    if (!asset) throw new Error("Expected a vertical full-track asset");

    const command = createRenderCommand({
      asset,
      audioPath: project.track.audioPath,
      outputPath: `/output/${asset.fileName}`,
      project,
      theme,
    });

    expect(command.binary).toBe("ffmpeg");
    expect(command.args).toContain("60");
    expect(command.args.join(" ")).toContain("showfreqs=s=1080x1920:rate=60");
    expect(command.args).not.toContain("-t");
    expect(command.args.at(-1)).toContain("full-9x16.mp4");
  });
});
