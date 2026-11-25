For each documentation page at `web/content/proto/docs/tools`, spawn an opus 5.5 subagent to generate and implement the content.

## Requirements

See `docs/DOCS_STYLE_GUIDE.md`.

## Reference

What a tool is and how it functions can be found in proto: `/Users/miles/Projects/proto`.

The source code for each tool can be found at `/Users/miles/Projects/moonrepo/plugins/tools`. Refer to the implementation for detailed information on how each tool is structured, what configuration settings it supports, how the tiers are defined, and how it integrates with the proto ecosystem.

Additionally, tool functionality is based on what WASM functions are implemented within each tool (via extism), and they're defined here: `/Users/miles/Projects/proto/crates/pdk-api/src`.

## Structure

The page should use the following structure:

```
---
title: <TITLE>
---

<DESCRIPTION>

## Prerequisites

<LIST OF REQS/REQUIRED TOOLS/BINS>

## Installation

<HOW TO INSTALL/ENABLE THE TOOL>

## Configuration

### `<NAME>` - SETTING(S)

## Core features

### Execution environment

<DESCRIBE `activate_environment` API>

### Global packages

<DESCRIBE `locate_executables` API>

### Version files

<DESCRIBE `detect_version_files` AND `parse_version_file` APIs>

## Ecosystem

<ANYTHING UNIQUE TO THEIR ECOSYSTEM. FOR EXAMPLE "java vendors">

## Troubleshooting

<ANY COMMON TROUBLESHOOTING POINTS>

## Caveats

<ANY LIMITATIONS, WARNINGS, OR IMPORTANT NOTES ABOUT THE TOOL>
```

### Configuration

If there are no settings for the command, omit the `## Configuration` section entirely.

Otherwise, list each setting in the following format:

```
### `SETTING`

VALUE - DESCRIPTION

CODE EXAMPLE
```

The value should use the `TypeLabel` component, and the type string should match TypeScript syntax.

### Sections

If a section is not applicable, does not define the WASM API, or does not exist for the tool, omit the corresponding section entirely.
