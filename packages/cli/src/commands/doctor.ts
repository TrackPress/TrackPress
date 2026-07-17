import pc from "picocolors";

import { probeBinary } from "@trackpress/render-engine";

export function runDoctor(): void {
  const probes = [probeBinary("ffmpeg"), probeBinary("ffprobe")];

  console.log(pc.bold("TrackPress doctor"));
  for (const probe of probes) {
    const status = probe.available ? pc.green("ready") : pc.red("missing");
    console.log(
      `  ${probe.binary.padEnd(8)} ${status}${probe.version ? ` — ${probe.version}` : ""}`,
    );
    if (probe.error) console.log(pc.dim(`           ${probe.error}`));
  }

  if (probes.some((probe) => !probe.available)) {
    process.exitCode = 1;
  }
}
