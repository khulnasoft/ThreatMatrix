# Checklist for creating a new release

- [ ] (optional) If we changed/added Docker Analyzers, we need to configure Docker Hub / Dependabot properly.
- [ ] Update `CHANGELOG.md` for the new version
- [ ] Change version number in `docs/source/schema.yml` and `docker/.env`
- [ ] Verify CI Tests
- [ ] Create release for the branch `develop`.
      Write the following statement there (change the version number):

```commandline
please refer to the [Changelog](https://github.com/khulnasoft/ThreatMatrix/blob/develop/.github/CHANGELOG.md#v331)

WARNING: The release will be live within an hour!
```

- [ ] Wait for [dockerHub](https://hub.docker.com/repository/docker/khulnasoft/threatmatrix) to finish the builds
- [ ] Merge the PR to the `master` branch. **Note:** Only use "Merge and commit" as the merge strategy and not "Squash and merge". Using "Squash and merge" makes history between branches misaligned.
- [ ] Remove the "wait" statement in the release description.
- [ ] Publish new Post into official Twitter and LinkedIn accounts:
```commandline
published #ThreatMatrix vX.X.X! https://github.com/khulnasoft/ThreatMatrix/releases/tag/vX.X.X #ThreatIntelligence #CyberSecurity #OpenSource #OSINT #DFIR
```
