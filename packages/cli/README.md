# @trackpress/cli

The local-first TrackPress command-line interface.

```bash
npm install --global @trackpress/cli
trackpress doctor
trackpress init /absolute/path/to/track.wav --title "Midnight Signal"
trackpress plan
trackpress render --output ./output
```

TrackPress runs locally and does not upload source audio. FFmpeg and FFprobe must be available on
`PATH`. See the [TrackPress repository](https://github.com/TrackPress/TrackPress) for the complete
quickstart.
