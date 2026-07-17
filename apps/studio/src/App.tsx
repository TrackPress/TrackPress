import { useMemo, useState } from "react";

import { createDefaultProject, createReleasePlan } from "@trackpress/core";
import { builtInThemes } from "@trackpress/themes";

export function App() {
  const [title, setTitle] = useState("Midnight Signal");
  const [artist, setArtist] = useState("Example Artist");
  const [audioName, setAudioName] = useState("Drop a WAV or FLAC to begin");
  const [themeId, setThemeId] = useState("neon-night-drive");

  const project = useMemo(() => {
    const nextProject = createDefaultProject(audioName, { title, artist });
    return { ...nextProject, themeId };
  }, [artist, audioName, themeId, title]);
  const plan = useMemo(() => createReleasePlan(project), [project]);
  const activeTheme = builtInThemes.find((theme) => theme.id === themeId) ?? builtInThemes[0];

  return (
    <main className="shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="TrackPress Studio home">
          <span className="brand-mark">TP</span>
          <span>TrackPress</span>
          <span className="badge">Studio</span>
        </a>
        <a className="github-link" href="https://github.com/TrackPress/TrackPress">
          GitHub ↗
        </a>
      </header>

      <section className="hero">
        <p className="eyebrow">LOCAL-FIRST MUSIC RELEASE ENGINE</p>
        <h1>One track in. A complete release pack out.</h1>
        <p className="subtitle">
          Build landscape and vertical full-track videos with shared themes, deterministic output,
          and media that stays on your machine.
        </p>
      </section>

      <section className="workspace">
        <aside className="panel controls">
          <div className="panel-heading">
            <span>Project</span>
            <span className="status-dot">Draft</span>
          </div>

          <label className="dropzone">
            <input
              type="file"
              accept="audio/wav,audio/flac,audio/mpeg,audio/aac"
              onChange={(event) => setAudioName(event.target.files?.[0]?.name ?? audioName)}
            />
            <span className="drop-icon">⌁</span>
            <strong>{audioName}</strong>
            <small>Source audio never leaves this device</small>
          </label>

          <label>
            Track title
            <input value={title} onChange={(event) => setTitle(event.target.value)} />
          </label>
          <label>
            Artist
            <input value={artist} onChange={(event) => setArtist(event.target.value)} />
          </label>
          <label>
            Theme
            <select value={themeId} onChange={(event) => setThemeId(event.target.value)}>
              {builtInThemes.map((theme) => (
                <option key={theme.id} value={theme.id}>
                  {theme.name}
                </option>
              ))}
            </select>
          </label>

          <button type="button">Prepare release pack</button>
        </aside>

        <section className="panel preview-panel">
          <div className="panel-heading">
            <span>Live preview</span>
            <span>1920 × 1080 · 60 FPS</span>
          </div>
          <div
            className="preview"
            style={
              {
                "--theme-primary": activeTheme?.colors.primary,
                "--theme-secondary": activeTheme?.colors.secondary,
              } as React.CSSProperties
            }
          >
            <div className="stars" />
            <div className="preview-copy">
              <span>OFFICIAL AUDIO · TRACKPRESS RELEASE</span>
              <h2>{title || "Untitled Track"}</h2>
              <p>{artist || "Unknown Artist"}</p>
            </div>
            <div className="spectrum" aria-hidden="true">
              {Array.from({ length: 44 }, (_, index) => (
                <i key={index} style={{ height: `${18 + ((index * 37) % 72)}%` }} />
              ))}
            </div>
          </div>
        </section>
      </section>

      <section className="outputs">
        <div className="section-heading">
          <div>
            <p className="eyebrow">RELEASE PLAN</p>
            <h2>{plan.assets.length} platform-ready assets</h2>
          </div>
          <span>H.264 · AAC 320 kbps · Fast start</span>
        </div>
        <div className="asset-grid">
          {plan.assets.map((asset) => (
            <article className="asset" key={asset.id}>
              <span className={`format ${asset.orientation}`}>
                {asset.orientation === "landscape" ? "16:9" : "9:16"}
              </span>
              <div>
                <strong>
                  {asset.orientation === "landscape" ? "Landscape" : "Vertical"} full track
                </strong>
                <small>
                  {asset.width}×{asset.height} · Full duration
                </small>
              </div>
              <span className="ready">Ready</span>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
