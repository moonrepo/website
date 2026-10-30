For the API documentation page at `web/content/wasm/docs/extension.mdx`, implement the content according to the following structure and guidelines.

## Requirements

See `docs/DOCS_STYLE_GUIDE.md`.

## Reference

What an extension is and how it functions can be found in moon: `/Users/miles/Projects/moon`.

The source code for real world extensions can be found at `/Users/miles/Projects/moonrepo/plugins/extensions`. Refer to the implementation for detailed information on how each extension is structured, what configuration settings it supports, and how it integrates with the moon ecosystem.

## Structure

The page should use the following structure:

```
---
title: <TITLE>
---

<DESCRIPTION>

## Concepts

<CONCEPTS UNIQUE TO EXTENSIONS>

## Configuration

<HOW THE EXTENSION SUPPORTS SETTINGS>

## APIs

### `register_extension`
### `define_extension_config`
### `initialize_extension`
### `execute_extension`
### `extend_project_graph`
### `extend_command`
### `extend_task_command`
### `extend_task_script`
### `sync_project`
### `sync_workspace`

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
