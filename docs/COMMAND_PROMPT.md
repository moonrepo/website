For each command documentation page at `web/content/docs/moon/commands`, spawn a sonnet subagent to generate and implement the content.

## Requirements

See `docs/DOCS_STYLE_GUIDE.md`.

## Structure

The page should use the following structure:

```
---
title: moon COMMAND
---

DESCRIPTION

## Arguments

- ARGUMENT(S)

## Options

- OPTION(s)
```

### Command

The name of the command as it would appear on the command line, e.g., `moon exec`. This should match the name of the file.

If the command is in a directory, then it is a sub-command and should be referenced as `moon parent-command sub-command`, e.g., `moon query projects`.

### Description

Generate a description of what the command does, by inspecting the source code at `/Users/miles/Projects/moon/crates/app/src/commands`.

DO NOT use the description from the `--help` output (those defined with Rust `clap`), as we want thorough documentation. Instead, analyze the source code to understand the command's functionality and provide a clear and concise explanation. Can also reference the `website/docs/commands` for additional context, but do not copy the content directly.

Include at least 1 reference command line usage, in the following format:

```shell
$ moon COMMAND ARGUMENTS --OPTIONS
```

### Arguments

If there are no arguments for the command, omit the `## Arguments` section entirely.

Otherwise, list each argument in the following format:

1. Required argument:

```
- `<ARG>` - DESCRIPTION
# or variadic
- `<ARGS...>` - DESCRIPTION
```

2. Optional argument:

```
- `[ARG]` - DESCRIPTION
# or variadic
- `[ARGS...]` - DESCRIPTION
```

3. Rest/passthrough arguments (after `--`):

```
- `-- [ARGS...]` - DESCRIPTION
```

### Options

If there are no options for the command, omit the `## Options` section entirely.

Otherwise, list each option in the following format:

1. Option without value (boolean flag):

```
- `--OPTION` - DESCRIPTION
# or with short flag
- `-O`, `--OPTION` - DESCRIPTION
```

2. Option with value:

```
- `--OPTION` VALUE - DESCRIPTION
# or with short flag
- `-O`, `--OPTION` VALUE - DESCRIPTION
```

The value should use the `TypeLabel` component, and the type string should match TypeScript syntax. For example:

```tsx
<TypeLabel type="boolean" />
<TypeLabel type="string[]" />
<TypeLabel type="a | b | c" />
<TypeLabel type="1 | 2 | 3" />
```
