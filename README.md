# TrackPress

**Press one track. Publish everywhere.**

TrackPress is an open-source, local-first toolkit that turns one music track into a complete
release pack: full-length landscape and vertical videos, reusable themes, and a machine-readable
QA plan.

The project ships as both a CLI and a local Web Studio. Audio and source artwork stay on your
machine.

## Workspace

| Path                     | Purpose                                             |
| ------------------------ | --------------------------------------------------- |
| `apps/studio`            | React/Vite local Web Studio                         |
| `packages/cli`           | `trackpress` command-line interface                 |
| `packages/core`          | Project schema and release planning                 |
| `packages/themes`        | Built-in, reusable visual themes                    |
| `packages/render-engine` | FFmpeg discovery, command planning, and execution   |
| `docs`                   | Architecture, quickstart, and release documentation |

## Quickstart

Requirements: Node.js 20.19+, pnpm 11+, and FFmpeg on `PATH`.

```bash
corepack enable
pnpm install
pnpm build
pnpm trackpress doctor
pnpm trackpress init ./music/track.wav --title "My Track"
pnpm trackpress plan
pnpm dev
```

The default project creates one 16:9 full-track asset and one 9:16 full-track asset at 60 FPS.

Read the [quickstart](docs/quickstart.md) and [architecture](docs/architecture.md) guides for the
full workflow.

## Project status

TrackPress is in early development. The initial render engine provides a deterministic FFmpeg
spectrum renderer and a stable contract for richer browser/WebGL render adapters.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). TrackPress is released under the [MIT License](LICENSE).
