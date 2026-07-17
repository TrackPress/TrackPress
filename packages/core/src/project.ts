import { z } from "zod";

export const VideoCodecSchema = z.enum(["h264", "h265"]);
export const VisualizerSchema = z.enum(["spectrum"]);

export const TrackPressProjectSchema = z.object({
  schemaVersion: z.literal(1),
  track: z.object({
    audioPath: z.string().min(1),
    title: z.string().min(1),
    artist: z.string().min(1),
  }),
  themeId: z.string().min(1),
  visualizer: VisualizerSchema.default("spectrum"),
  output: z.object({
    directory: z.string().min(1).default("output"),
    fps: z.union([z.literal(30), z.literal(60)]).default(60),
    codec: VideoCodecSchema.default("h264"),
    landscapeFullTrack: z.boolean().default(true),
    verticalFullTrack: z.boolean().default(true),
  }),
});

export type TrackPressProject = z.infer<typeof TrackPressProjectSchema>;

export function createDefaultProject(
  audioPath: string,
  metadata: { title?: string; artist?: string } = {},
): TrackPressProject {
  return TrackPressProjectSchema.parse({
    schemaVersion: 1,
    track: {
      audioPath,
      title: metadata.title ?? "Untitled Track",
      artist: metadata.artist ?? "Unknown Artist",
    },
    themeId: "neon-night-drive",
    visualizer: "spectrum",
    output: {
      directory: "output",
      fps: 60,
      codec: "h264",
      landscapeFullTrack: true,
      verticalFullTrack: true,
    },
  });
}
