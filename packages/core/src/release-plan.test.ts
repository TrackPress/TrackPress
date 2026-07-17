import { describe, expect, it } from "vitest";

import { createDefaultProject } from "./project.js";
import { createReleasePlan } from "./release-plan.js";

describe("createReleasePlan", () => {
  it("creates landscape and vertical full-track videos", () => {
    const project = createDefaultProject("/music/track.wav", {
      artist: "Example Artist",
      title: "Midnight Signal",
    });

    const plan = createReleasePlan(project);

    expect(plan.assets).toHaveLength(2);
    expect(plan.assets[0]).toMatchObject({
      orientation: "landscape",
      width: 1920,
      height: 1080,
      fps: 60,
      durationSec: null,
    });
    expect(plan.assets[1]).toMatchObject({
      orientation: "portrait",
      width: 1080,
      height: 1920,
      fps: 60,
      durationSec: null,
      fileName: "example-artist-midnight-signal-full-9x16.mp4",
    });
  });
});
