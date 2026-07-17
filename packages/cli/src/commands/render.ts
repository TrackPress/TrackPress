import { mkdir } from "node:fs/promises";
import { join } from "node:path";

import { createReleasePlan } from "@trackpress/core";
import { createRenderCommand, executeBinary } from "@trackpress/render-engine";
import { getTheme } from "@trackpress/themes";
import pc from "picocolors";

import { assertProjectInputs, loadProject } from "../config.js";

interface RenderOptions {
  dryRun: boolean;
  output?: string;
}

export async function runRender(configPath: string, options: RenderOptions): Promise<void> {
  const project = await loadProject(configPath);
  await assertProjectInputs(project);
  const outputDirectory = options.output ?? project.output.directory;
  const plan = createReleasePlan(project);
  const theme = getTheme(project.themeId);

  if (!options.dryRun) {
    await mkdir(outputDirectory, { recursive: true });
  }

  for (const asset of plan.assets) {
    const command = createRenderCommand({
      asset,
      audioPath: project.track.audioPath,
      outputPath: join(outputDirectory, asset.fileName),
      project,
      theme,
    });

    if (options.dryRun) {
      console.log(
        [command.binary, ...command.args].map((value) => JSON.stringify(value)).join(" "),
      );
      continue;
    }

    console.log(`${pc.cyan("rendering")} ${asset.fileName}`);
    await executeBinary(command.binary, command.args, (output) => process.stderr.write(output));
    console.log(`${pc.green("finished")} ${asset.fileName}`);
  }
}
