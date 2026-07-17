import { access, writeFile } from "node:fs/promises";
import { relative, resolve } from "node:path";

import { createDefaultProject } from "@trackpress/core";
import pc from "picocolors";

import { DEFAULT_CONFIG_PATH } from "../config.js";

interface InitOptions {
  artist?: string;
  force?: boolean;
  title?: string;
}

export async function runInit(audioPath: string, options: InitOptions): Promise<void> {
  const absoluteAudioPath = resolve(audioPath);
  try {
    await access(absoluteAudioPath);
  } catch {
    throw new Error(`Audio file not found: ${absoluteAudioPath}`);
  }

  const configPath = resolve(DEFAULT_CONFIG_PATH);
  if (!options.force) {
    try {
      await access(configPath);
      throw new Error(`${DEFAULT_CONFIG_PATH} already exists. Use --force to replace it.`);
    } catch (error) {
      if (error instanceof Error && error.message.includes("already exists")) throw error;
    }
  }

  const relativeAudioPath = relative(process.cwd(), absoluteAudioPath) || audioPath;
  const project = createDefaultProject(relativeAudioPath, {
    title: options.title,
    artist: options.artist,
  });

  await writeFile(configPath, `${JSON.stringify(project, null, 2)}\n`, "utf8");
  console.log(`${pc.green("created")} ${DEFAULT_CONFIG_PATH}`);
}
