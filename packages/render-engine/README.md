# @trackpress/render-engine

Shell-free FFmpeg command planning and local render execution for TrackPress. FFmpeg must be
available on `PATH` when executing jobs.

```ts
import { createRenderCommand, executeBinary } from "@trackpress/render-engine";

const command = createRenderCommand(job);
await executeBinary(command.binary, command.args);
```

See the [TrackPress repository](https://github.com/TrackPress/TrackPress) for job contracts and
security guidance.
