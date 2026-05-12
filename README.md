# 🔌 gptme Plugin Registry

Discoverable index of community [gptme](https://gptme.org) plugins, skills, and MCP servers.

**Live at**: https://gptme.github.io/registry.gptme.org

## How to get listed

Add one of these topics to your GitHub repo and the weekly regeneration will pick it up:

| Topic | For |
|-------|-----|
| `gptme-plugin` | Python plugin packages |
| `gptme-skill` | SKILL.md skill bundles |
| `gptme-mcp-server` | MCP servers for gptme |

```bash
gh repo edit owner/repo --add-topic gptme-plugin
```

## Manual curation

For Phase 1, the registry uses a curated `registry.json` file. To add or update an entry, edit `registry.json` at the repo root.

## Development

```bash
python3 scripts/regenerate.py  # regenerates index.html from registry.json
```

The GitHub Action at `.github/workflows/weekly-regenerate.yml` runs weekly on a schedule.
