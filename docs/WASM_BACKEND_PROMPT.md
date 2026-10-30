For the API documentation page at `web/content/wasm/docs/backend.mdx`, implement the content according to the following structure and guidelines.

## Requirements

See `docs/DOCS_STYLE_GUIDE.md`.

## Reference

What an backend is and how it functions can be found in proto: `/Users/miles/Projects/proto`.

The source code for real world backends can be found at `/Users/miles/Projects/moonrepo/plugins/backends`. Refer to the implementation for detailed information on how each backend is structured, what configuration settings it supports, and how it integrates with the proto ecosystem.

Some existing documentation to reference can be found at `/Users/miles/Projects/moon/website/docs/proto/wasm-plugin.mdx`.

## Structure

The page should use the following structure:

```
---
title: <TITLE>
---

<DESCRIPTION>

## Concepts

<CONCEPTS UNIQUE TO BACKEND>

## Configuration

<HOW THE BACKEND SUPPORTS SETTINGS>

## APIs

### `register_backend`
### `define_backend_config`

### Tool

<TALK ABOUT HOW TOOLS WORK IN THE BACKEND AND LINK TO THE TOOL API DOCS>

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
