import type { ReleaseAsset, ThemeDefinition, TrackPressProject } from "@trackpress/core";

export interface RenderJob {
  asset: ReleaseAsset;
  audioPath: string;
  outputPath: string;
  project: TrackPressProject;
  theme: ThemeDefinition;
}

export interface RenderCommand {
  binary: string;
  args: string[];
}

function ffmpegColor(hex: string): string {
  return `0x${hex.slice(1)}`;
}

export function createRenderCommand(job: RenderJob, binary = "ffmpeg"): RenderCommand {
  const { asset, project, theme } = job;
  const args = ["-hide_banner", "-y"];

  if (asset.startSec > 0) {
    args.push("-ss", String(asset.startSec));
  }

  args.push("-i", job.audioPath);

  if (asset.durationSec !== null) {
    args.push("-t", String(asset.durationSec));
  }

  const colors = `${ffmpegColor(theme.colors.primary)}|${ffmpegColor(theme.colors.secondary)}`;
  const filter = [
    "[0:a]asplit=2[aout][visual]",
    `[visual]showfreqs=s=${asset.width}x${asset.height}:rate=${asset.fps}:mode=bar:ascale=log:fscale=log:colors=${colors}[v]`,
  ].join(";");

  args.push(
    "-filter_complex",
    filter,
    "-map",
    "[v]",
    "-map",
    "[aout]",
    "-r",
    String(asset.fps),
    "-c:v",
    project.output.codec === "h265" ? "libx265" : "libx264",
    "-preset",
    "medium",
    "-crf",
    "18",
    "-pix_fmt",
    "yuv420p",
    "-c:a",
    "aac",
    "-b:a",
    "320k",
    "-shortest",
    "-movflags",
    "+faststart",
    job.outputPath,
  );

  return { binary, args };
}
