# @trackpress/core

Shared TrackPress schemas and deterministic release planning. This package has no filesystem or
process side effects.

```ts
import { createDefaultProject, createReleasePlan } from "@trackpress/core";

const project = createDefaultProject("./track.wav", {
  artist: "Example Artist",
  title: "Midnight Signal",
});
const plan = createReleasePlan(project);
```

See the [TrackPress repository](https://github.com/TrackPress/TrackPress) for documentation and
contribution guidelines.
