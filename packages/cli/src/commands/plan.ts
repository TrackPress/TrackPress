import { createReleasePlan } from "@trackpress/core";

import { assertProjectInputs, loadProject } from "../config.js";

export async function runPlan(configPath: string, json: boolean): Promise<void> {
  const project = await loadProject(configPath);
  await assertProjectInputs(project);
  const plan = createReleasePlan(project);
  if (json) {
    console.log(JSON.stringify(plan, null, 2));
    return;
  }

  console.log(`${plan.project.track.artist} — ${plan.project.track.title}`);
  console.table(
    plan.assets.map((asset) => ({
      id: asset.id,
      format: `${asset.width}×${asset.height}`,
      fps: asset.fps,
      start: `${asset.startSec}s`,
      duration: asset.durationSec === null ? "full" : `${asset.durationSec}s`,
      file: asset.fileName,
    })),
  );
}
