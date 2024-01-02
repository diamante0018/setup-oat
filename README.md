This action downloads and installs [OAT][oat-link].
OAT only supports Linux and Windows operating systems.

# Usage

Just add the following lines to the `steps:` list in your GitHub Action YAML file:

```yaml
- uses: diamante0018/setup-oat@main
  with:
    version: "0.4.0"
```

By default, OAT is installed in `.oat` directory relative to the GitHub workspace.
You can optionally change it using the `path` input.

[oat-link]:     https://github.com/Laupetin/OpenAssetTools
