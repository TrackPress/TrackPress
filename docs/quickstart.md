# Quickstart

## 1. Install prerequisites

- Node.js 20.19 or newer
- pnpm 11 through Corepack
- FFmpeg and FFprobe available on `PATH`

```bash
corepack enable
pnpm install
pnpm build
pnpm trackpress doctor
```

## 2. Create a project

```bash
pnpm trackpress init /absolute/path/to/track.wav \
  --title "Midnight Signal" \
  --artist "Example Artist"
```

This writes `trackpress.config.json`. Paths are resolved relative to the config file when the CLI
loads it.

## 3. Inspect the release plan

```bash
pnpm trackpress plan
```

The default release plan contains:

- one 1920×1080 full video;
- one 1080×1920 full video;
- H.264/AAC output at 60 FPS;
- deterministic filenames for both aspect ratios.

## 4. Render

Preview commands without starting FFmpeg:

```bash
pnpm trackpress render --dry-run
```

Execute locally:

```bash
pnpm trackpress render --output ./output
```

## 5. Start the Studio

```bash
pnpm dev
```

Open the Vite URL printed in the terminal. The initial Studio builds and previews release plans;
desktop file access and render job orchestration are the next adapter layer.
