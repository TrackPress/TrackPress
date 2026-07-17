# Security Policy

## Supported versions

Until TrackPress reaches 1.0, security fixes target the latest release only.

## Reporting a vulnerability

Please use GitHub private vulnerability reporting for this repository. Do not open a public issue
for an unpatched vulnerability.

Include the affected command or package, reproduction steps, impact, and any suggested mitigation.
Never attach private audio, access tokens, or personal files to a report.

TrackPress executes FFmpeg locally. Project files and theme packages should be treated as untrusted
input; never add shell interpolation to render commands.
