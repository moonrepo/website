For the API documentation page at `web/content/wasm/docs/toolchain.mdx`, implement the content according to the following structure and guidelines.

## Requirements

See `docs/DOCS_STYLE_GUIDE.md`.

## Reference

What an toolchain is and how it functions can be found in moon: `/Users/miles/Projects/moon`.

The source code for real world toolchains can be found at `/Users/miles/Projects/moonrepo/plugins/toolchains`. Refer to the implementation for detailed information on how each toolchain is structured, what configuration settings it supports, and how it integrates with the moon ecosystem.

## Structure

The page should use the following structure:

```
---
title: <TITLE>
---

<DESCRIPTION>

## Concepts

<CONCEPTS UNIQUE TO TOOLCHAINS>

## Configuration

<HOW THE TOOLCHAIN SUPPORTS SETTINGS>

## APIs

### `register_toolchain`
### `initialize_toolchain`
### `define_toolchain_config`

### Tier 1

### `detect_version_files`
### `define_docker_metadata`
### `prune_docker`
### `scaffold_docker`
### `sync_workspace`
### `sync_project`

### Tier 2

### `extend_project_graph`
### `extend_command`
### `extend_task_command`
### `extend_task_script`
### `hash_task_contents`
### `define_requirements`
### `install_dependencies`
### `locate_dependencies_root`
### `parse_lock`
### `parse_manifest`
### `setup_environment`

### Tier 3

### `setup_toolchain`
### `teardown_toolchain`

## Caveats

<ANY LIMITATIONS, WARNINGS, OR IMPORTANT NOTES>
```

If a section does not have any relevant content, remove it!

### APIs

For each API section, describe what that API does and when its used, link to the docs.rs types for it, and provide code examples demonstrating its usage.

Additionally, below the header, display the following table of information. The Input/Output should link to the docs.rs type.

```
| Input | Output | Required | Memoized |
| --- | --- | --- | --- |
| <TYPE> | <TYPE> | <YES/NO> | <YES/NO> |
```
