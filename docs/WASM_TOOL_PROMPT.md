For the API documentation page at `web/content/wasm/docs/tool.mdx`, implement the content according to the following structure and guidelines.

## Requirements

See `docs/DOCS_STYLE_GUIDE.md`.

## Reference

What an tool is and how it functions can be found in proto: `/Users/miles/Projects/proto`.

The source code for real world tools can be found at `/Users/miles/Projects/moonrepo/plugins/tools`. Refer to the implementation for detailed information on how each tool is structured, what configuration settings it supports, and how it integrates with the proto ecosystem.

Existing documentation to reference can be found at `/Users/miles/Projects/moon/website/docs/proto/wasm-plugin.mdx`.

## Structure

The page should use the following structure:

```
---
title: <TITLE>
---

<DESCRIPTION>

## Concepts

<CONCEPTS UNIQUE TO TOOL>

## Configuration

<HOW THE TOOL SUPPORTS SETTINGS>

## APIs

### `register_tool`
### `initialize_tool`
### `define_tool_config`

### Resolution

### `detect_version_files`
### `parse_version_file`
### `load_versions`
### `resolve_version`

### Installation

### `native_install`
### `native_uninstall`
### `download_prebuilt`
### `build_instructions`
### `unpack_archive`
### `verify_checksum`

### Execution

### `locate_executables`
### `activate_environment`

### Management

### `pin_version`
### `unpin_version`
### `sync_manifest`
### `sync_shell_profile`

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
