## Implementing Docstrings in ThreatMatrix Documentation

In the ThreatMatrix documentation site, we use Git submodules to manage multiple repositories as child repositories. This allows us to fetch updated code (including docstrings and API specs) automatically, reducing redundant work for developers.

## Current Submodules

There are four submodules under the khulnasoft:

1. ThreatMatrix
2. GreedyBear
3. pythreatmatrix
4. GoThreatMatrix

These submodules are updated whenever we push new changes to our documentation site, here's the [Github Action](https://github.com/khulnasoft/docs/blob/main/.github/workflows/deploy_and_update_submodules.yml) file.

## Making Changes to Documentation

When you make changes to the ThreatMatrix codebase, it typically does not update automatically in the github repository of documentation site.

While development if you want to update the submodules to latest changes you can do the following:

```
git submodule foreach --recursive 'git fetch --all'
git submodule update --init --remote --recursive --depth 1
git submodule sync --recursive
git submodule update --remote --recursive
```

However, if you need to test changes immediately, you can do the following:

## Add Custom Submodules for Testing:

Point the submodule in `.gitmodules` to your fork of the repository to check the updates instantly.

### Update Submodules:

After modifying `.gitmodules`, run the following command to fetch the latest changes:

```
git submodule update --remote --merge
```

This ensures that your documentation reflects the most recent code changes.
