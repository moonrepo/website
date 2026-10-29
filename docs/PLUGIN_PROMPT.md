For each plugin API documentation page (tool, toolchain, extension, backend) at `web/content/wasm/docs`, spawn an opus 5.5 subagent to generate and implement the content.

## Requirements

See `docs/DOCS_STYLE_GUIDE.md`.

## Reference

What a toolchain is and how it functions can be found in moon: `/Users/miles/Projects/moon`.

The source code for each toolchain can be found at `/Users/miles/Projects/moonrepo/plugins/toolchains`. Refer to the implementation for detailed information on how each toolchain is structured, what configuration settings it supports, how the tiers are defined, and how it integrates with the moon ecosystem.

Additionally, toolchain tiers are based on what WASM functions are implemented within each toolchain (via extism), and the tier groups are defined here: `/Users/miles/Projects/moon/crates/app/src/commands/toolchain/info.rs`.

## Structure

The page should use the following structure:

```
---
title: <TITLE>
---

<DESCRIPTION>

## Prerequisites

<LIST OF REQS/REQUIRED TOOLS/BINS>

### Repository structure

<ALL THE DIFFERENT SUPPORTED FS LAYOUTS>

## Installation

<HOW TO INSTALL/ENABLE THE TOOLCHAIN>

## Configuration

- SETTING(S)

### Project overrides

<DESCRIBE HOW PROJECT-SPECIFIC OVERRIDES CAN BE APPLIED TO THE TOOLCHAIN CONFIGURATION>

## Core features

<DESCRIBE CORE FEATURES AS SECTIONS, DERIVED FROM CONFIG, AND USED BY TIERS. FOR EXAMPLE "Project refernces for TypeScript">

## Tier 1: Syncing and usage detection

### Syncing operations

<DESCRIBE `sync_workspace` and `sync_project` APIs>

### Project and task detection

<HOW IS THE TOOLCHAIN DETECTED AT THE TASK AND PROJECT LEVEL, DERIVED FROM `RegisterToolchainOutput`>

### Docker integration

<DESCRIBE `define_docker_metadata`, `scaffold_docker`, `prune_docker` APIs>

### Version detection

<DESCRIBE `detect_version_files` API>

## Tier 2: Ecosystem integration

### Requiring other toolchains

<DESCRIBE `define_requirements` API>

### Extending projects

<DESCRIBE `extend_project_graph` API>

### Extending tasks

<DESCRIBE `extend_command`, `extend_task_command`, `extend_task_script` APIs>

### Locating dependencies root

<DESCRIBE `locate_dependencies_root` API>

### Installing and deduping dependencies

<DESCRIBE `install_dependencies` API>

### Parsing manifest and lock files

<DESCRIBE `parse_manifest` AND `parse_lock` APIs>

### Setting up the environment

<DESCRIBE `setup_environment` API>

### Hashing task content

<DESCRIBE `hash_task_contents` API>

## Tier 3: Tool management

<ENABLED WITH THE `version` CONFIG SETTING>

### Installing with proto

<HOW IT INSTALLS, EITHER WITH PREBUILTS OR FROM SOURCE>

### Setup and teardown

<DESCRIBE `setup_toolchain` AND `teardown_toolchain` APIs>

## Caveats

<ANY LIMITATIONS, WARNINGS, OR IMPORTANT NOTES ABOUT THE TOOLCHAIN>
```

### Configuration

If there are no settings for the command, omit the `## Configuration` section entirely.

Otherwise, list each setting in the following format:

```
- `SETTING` VALUE - DESCRIPTION
```

The value should use the `TypeLabel` component, and the type string should match TypeScript syntax.

### Tiers

If a tier (or tier section) is not applicable, does not define the WASM API, or does not exist for the toolchain, omit the corresponding section entirely.
