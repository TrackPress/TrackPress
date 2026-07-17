import { spawn, spawnSync } from "node:child_process";

export interface BinaryProbe {
  binary: string;
  available: boolean;
  version: string | null;
  error: string | null;
}

export function probeBinary(binary: string): BinaryProbe {
  const result = spawnSync(binary, ["-version"], {
    encoding: "utf8",
    shell: false,
  });
  const firstLine = result.stdout?.split("\n")[0]?.trim() || null;

  return {
    binary,
    available: result.status === 0,
    version: firstLine,
    error: result.error?.message ?? (result.status === 0 ? null : result.stderr?.trim() || null),
  };
}

export function executeBinary(
  binary: string,
  args: readonly string[],
  onOutput?: (line: string) => void,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(binary, args, { shell: false, stdio: ["ignore", "pipe", "pipe"] });

    child.stdout.on("data", (chunk: Buffer) => onOutput?.(chunk.toString()));
    child.stderr.on("data", (chunk: Buffer) => onOutput?.(chunk.toString()));
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${binary} exited with code ${code ?? "unknown"}`));
      }
    });
  });
}
