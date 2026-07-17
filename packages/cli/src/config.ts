import { access, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

import { TrackPressProjectSchema, type TrackPressProject } from "@trackpress/core";

export const DEFAULT_CONFIG_PATH = "trackpress.config.json";

export async function loadProject(configPath: string): Promise<TrackPressProject> {
  const absoluteConfigPath = resolve(configPath);
  const contents = await readFile(absoluteConfigPath, "utf8");
  const project = TrackPressProjectSchema.parse(JSON.parse(contents));

  return {
    ...project,
    track: {
      ...project.track,
      audioPath: resolve(dirname(absoluteConfigPath), project.track.audioPath),
    },
    output: {
      ...project.output,
      directory: resolve(dirname(absoluteConfigPath), project.output.directory),
    },
  };
}

export async function assertProjectInputs(project: TrackPressProject): Promise<void> {
  try {
    await access(project.track.audioPath);
  } catch {
    throw new Error(`Audio file not found: ${project.track.audioPath}`);
  }
}
