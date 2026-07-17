import type { TrackPressProject } from "./project.js";

export type ReleaseAssetKind = "full";
export type ReleaseAssetOrientation = "landscape" | "portrait";

export interface ReleaseAsset {
  id: string;
  kind: ReleaseAssetKind;
  orientation: ReleaseAssetOrientation;
  width: number;
  height: number;
  fps: 30 | 60;
  startSec: number;
  durationSec: number | null;
  fileName: string;
}

export interface ReleasePlan {
  project: TrackPressProject;
  assets: ReleaseAsset[];
}

function slugify(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function createReleasePlan(project: TrackPressProject): ReleasePlan {
  const baseName =
    slugify(`${project.track.artist}-${project.track.title}`) || "trackpress-release";
  const assets: ReleaseAsset[] = [];

  if (project.output.landscapeFullTrack) {
    assets.push({
      id: "full-track-16x9",
      kind: "full",
      orientation: "landscape",
      width: 1920,
      height: 1080,
      fps: project.output.fps,
      startSec: 0,
      durationSec: null,
      fileName: `${baseName}-full-16x9.mp4`,
    });
  }

  if (project.output.verticalFullTrack) {
    assets.push({
      id: "full-track-9x16",
      kind: "full",
      orientation: "portrait",
      width: 1080,
      height: 1920,
      fps: project.output.fps,
      startSec: 0,
      durationSec: null,
      fileName: `${baseName}-full-9x16.mp4`,
    });
  }

  return { project, assets };
}
