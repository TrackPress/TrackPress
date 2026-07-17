# Contributing to TrackPress

Thanks for helping musicians ship better release packs without uploading source media to a
third-party service.

## Development setup

```bash
corepack enable
pnpm install
pnpm build
pnpm test
pnpm dev
```

Use Node.js 20.19 or newer and install FFmpeg if you want to exercise render commands.

## Pull requests

1. Keep each pull request focused on one outcome.
2. Add or update tests for behavior changes.
3. Run `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build`.
4. Add a Changeset for changes to publishable packages: `pnpm changeset`.
5. Do not commit copyrighted audio, generated videos, credentials, or personal media.

## Package boundaries

- Put reusable data contracts in `@trackpress/core`.
- Keep Node/FFmpeg process access inside `@trackpress/render-engine`.
- Keep themes declarative and side-effect free.
- Treat the CLI and Studio as adapters over shared packages.
