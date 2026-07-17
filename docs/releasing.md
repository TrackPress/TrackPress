# Releasing

TrackPress uses Changesets for package versioning and GitHub Actions for release pull requests and
npm publication.

## Contributor flow

```bash
pnpm changeset
git add .changeset
git commit
```

Describe the user-visible change and select the affected packages.

## Maintainer flow

1. Merge changes containing Changesets into `main`.
2. The release workflow opens or updates a version pull request.
3. Review generated changelogs and package versions.
4. Merge the version pull request.
5. The workflow publishes public packages and creates Git tags.

Repository setup requires an npm automation token stored as `NPM_TOKEN`. GitHub Actions receives
only the minimum `contents`, `pull-requests`, and OIDC permissions required by the workflow.
