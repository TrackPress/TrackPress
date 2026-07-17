# Architecture

TrackPress separates product contracts from operating-system and presentation concerns.

```text
apps/studio ───────┐
                   ├──> packages/core
packages/cli ──────┤          ▲
        │          ├──> packages/themes
        └──────────└──> packages/render-engine ──> FFmpeg/FFprobe
```

## Design rules

### Core is the source of truth

`@trackpress/core` owns project validation, output dimensions, naming, and deterministic release
planning. It has no filesystem or process side effects.

### Themes are data

`@trackpress/themes` exports declarative colors, typography, spectrum, motion, and safe-area values.
Themes do not execute arbitrary shell or browser code.

### Rendering is an adapter

`@trackpress/render-engine` translates release assets into argument arrays and invokes FFmpeg
without a shell. The initial adapter uses FFmpeg's spectrum filters. Future WebGL/audioMotion
adapters must implement the same job contract and preserve deterministic output metadata.

### CLI and Studio share behavior

The CLI handles automation and headless rendering. Studio handles visual configuration and job
inspection. Neither should redefine output planning rules.

## Planned adapters

- browser/WebGL renderer with audio-reactive capture;
- hook analysis based on energy, novelty, and structural boundaries;
- GPU capability detection and render profiles;
- visual and technical QA reports;
- plugin/theme discovery with explicit trust boundaries.
