import { Command } from "commander";

import { runDoctor } from "./commands/doctor.js";
import { runInit } from "./commands/init.js";
import { runPlan } from "./commands/plan.js";
import { runRender } from "./commands/render.js";
import { DEFAULT_CONFIG_PATH } from "./config.js";

const program = new Command()
  .name("trackpress")
  .description("Press one track into a complete release video pack")
  .version("0.1.0");

program.command("doctor").description("Check local render dependencies").action(runDoctor);

program
  .command("init")
  .description("Create a TrackPress project file")
  .argument("<audio>", "Path to a WAV, FLAC, or other FFmpeg-compatible audio file")
  .option("--title <title>", "Track title")
  .option("--artist <artist>", "Artist name")
  .option("--force", "Replace an existing project file", false)
  .action(runInit);

program
  .command("plan")
  .description("Validate a project and print its release assets")
  .option("-c, --config <path>", "Project file", DEFAULT_CONFIG_PATH)
  .option("--json", "Print machine-readable JSON", false)
  .action((options: { config: string; json: boolean }) => runPlan(options.config, options.json));

program
  .command("render")
  .description("Render all planned assets with the local FFmpeg adapter")
  .option("-c, --config <path>", "Project file", DEFAULT_CONFIG_PATH)
  .option("-o, --output <directory>", "Override the output directory")
  .option("--dry-run", "Print FFmpeg commands without executing them", false)
  .action((options: { config: string; output?: string; dryRun: boolean }) =>
    runRender(options.config, options),
  );

program.parseAsync().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
