# AGENTS.md

Guidance for agents writing and editing documentation in this repository (the moonrepo website).

## Repository layout

- `web/content/docs/moon` - moon documentation (MDX). This is where most writing happens.
  - `(fundamentals)` - core concepts (projects, tasks, targets, workspace, etc). The `(group)` folder does not appear in URLs.
  - `commands` - one page per CLI command; sub-commands live in sub-directories.
  - `guides`, `advanced`, `toolchains`, `editors` - topic pages.
- `web/content/docs/proto` - proto documentation.
- `web/content/api/moon` (and `api/proto`) - configuration API reference, one page per config type (struct or enum). Link to these pages; don't edit them while writing docs.
- `web/content/blog` - blog posts.
- `meta.json` - controls sidebar order and titles for each folder. Add new pages to the `pages` list.
- `docs/` - prompts and the style guide ([`DOCS_STYLE_GUIDE.md`](docs/DOCS_STYLE_GUIDE.md), [`COMMAND_PROMPT.md`](docs/COMMAND_PROMPT.md), [`NEW_PAGE_PROMPT.md`](docs/NEW_PAGE_PROMPT.md)). Read the style guide before writing.

## Source of truth

- The moon source code at `/Users/miles/Projects/moon` (primarily `crates/`) is the source of truth. Verify behavior, defaults, and setting names there before documenting them.
  - Commands: `crates/app/src/commands`.
  - Configuration: `crates/config`.
- The API reference pages under `web/content/api/moon` are the source of truth for setting names, types, and anchors.
- The old website docs can be used for tone and context, but are outdated. Never copy content from them.

## Tone and audience

Write as a staff-level engineer with deep knowledge of moon/proto, for junior-to-senior engineers who are new to moon/proto or deepening their understanding.

- Friendly, approachable, and informative. Clear and concise; avoid unnecessary jargon.
- Explain _why_ and _when_, not just _what_. Use practical examples and real use cases.
- Prefer short paragraphs, bullet lists for enumerations, and examples after each concept.
- Don't pad pages. If a section has nothing meaningful to say, leave it out (or empty, if a prompt's table of contents requires it).

## Page structure

Every page starts with frontmatter, then imports, then content:

```mdx
---
title: Projects
icon: Square
---

import { ConfigTabs } from "@/components/ConfigTabs";
import { TypeLabel } from "@/components/TypeLabel";
import { VersionLabel } from "@/components/VersionLabel";

Intro paragraph...

## Section
```

- `title` is required. `icon` (a Lucide icon name) should exist for all pages.
- Don't add an `# H1` heading; the title renders as the heading.
- Only import components the page actually uses.
- Command pages follow the structure in [`docs/COMMAND_PROMPT.md`](docs/COMMAND_PROMPT.md): `title: moon <command>`, a thorough description with at least one `shell` example (lines prefixed with `$ `), then `## Arguments` and `## Options` (omitted if empty).

## Linking

Links are the backbone of these docs. Link generously, but deliberately.

### Link format

- **Docs pages**: use relative _file_ paths, including the `.mdx` extension. These are resolved and validated at build time (`web/src/lib/remarkRelativeLinks.ts`), and a broken path fails the build.
  ```md
  [tasks](./task.mdx)
  [`moon exec`](../commands/exec.mdx)
  [inputs](./task.mdx#inputs)
  ```
- Paths containing parentheses must be wrapped in angle brackets:
  ```md
  [targets](<../(fundamentals)/target.mdx>)
  ```
- **Sections in the current page**: `[inputs](#inputs)`.
- **API reference**: absolute URLs, `/api/moon/<TypeName>#<anchor>`.
- Anchors are the heading text slugified: lowercase, spaces to `-`, code ticks and punctuation removed. For example `### \`runInCI\``is`#runinci`and`## Environment variables`is`#environment-variables`. Always confirm the heading exists; never guess.

### Configuration files

Always write configuration file names with the `.config` extension (moon supports multiple formats), wrap them in code ticks, and link to the relevant page:

| File                      | Link to                              |
| ------------------------- | ------------------------------------ |
| `.moon/workspace.config`  | `workspace` fundamentals page        |
| `.moon/extensions.config` | `extension` fundamentals page        |
| `.moon/toolchains.config` | `toolchain` fundamentals page        |
| `.moon/tasks/*.config`    | `task-inheritance` fundamentals page |
| `moon.config`             | `project` fundamentals page          |
| `template.config`         | `codegen` guide page                 |

### Configuration settings

When referencing a setting (a field or variant of a config struct/enum), link it. Choose the target in this order:

1. **A relevant section in the current page.** If the page has a section that explains the setting, link there. For example, on the task page, `preset` links to `#presets` and `command` links to `#command`.
2. **The API reference page.** Otherwise, link to `/api/moon/<Type>#<anchor>`. For example, `options.runInCI` links to `/api/moon/TaskOptionsConfig#runinci`.

Rules:

- Within the section that explains a setting, link that setting to the API page, not back to its own section.
- For nested paths like `options.mergeArgs` or `docker.file.image`, link to the leaf property on the type that owns it (`TaskOptionsConfig#mergeargs`, `DockerFileConfig#image`). Follow the Type column on the parent API page to find the owning type.
- Enum pages have no per-variant headings; link to the page or `#variants`.
- Link the first mention per paragraph or section, not every occurrence.
- Don't link settings that don't exist in the API reference (removed v1 settings, toolchain plugin settings). Leave them as inline code.
- Don't add links inside headings, code blocks, or component props.
- Values (like `"append"` or `production`), CLI flags, environment variables, and tokens (like `$project`) are not settings. Don't link them to the API reference.

### Commands

Always link CLI commands to their command page:

```md
[`moon exec`](../commands/exec.mdx)
```

## Components

Components are imported from `@/components/*`. `Callout`, `Tabs`/`Tab`, and `Accordions`/`Accordion` come from Fumadocs.

### `ConfigTabs`

Use for every configuration example. Write the config as a JSON object; the component renders YAML, JSON, TOML, HCL, and PKL tabs. `file` is the config file name without extension. Use `comments` to annotate keys.

```tsx
<ConfigTabs
  file="moon"
  config={{
    dependsOn: ["uiKit", "@org/ui-kit"],
  }}
  comments={{
    dependsOn: "Both values are equivalent!",
  }}
/>
```

Use `file=".moon/workspace"`, `file=".moon/tasks/node"`, etc for non-project configs. Don't write raw YAML code blocks for moon configuration.

### `TypeLabel`

Use for type strings (TypeScript-like syntax), typically for settings and CLI options that accept a value:

```tsx
- `--on-failure` <TypeLabel type="bail | continue" /> - Description...
<TypeLabel type="string[]" />
```

### `VersionLabel`

Mark newer features with the version they were introduced in, inline after the setting or heading text:

```tsx
[`options.mergeChecks`](/api/moon/TaskOptionsConfig#mergechecks) <VersionLabel version="2.4.0" />
```

Check the moon changelog or source history for the correct version.

### `Callout`

For notes, caveats, and warnings that readers shouldn't miss. Use sparingly.

```tsx
<Callout type="warning">
  Globs are matched against directories, and hidden directories are skipped.
</Callout>
```

`type` is optional (`info`, `warning`, `error`).

## Code examples

- Shell examples use a `shell` code block, with commands prefixed by `$ ` and a `#` comment describing each example.
- Keep examples realistic (project names like `app`, `client`, `server`, `utils`) and minimal.
- Make sure every example is valid for the current version of moon.

## Verification

Before finishing:

1. Confirm every setting name, default, and behavior against the moon source.
2. Confirm every API anchor exists as a heading in `web/content/api/moon/<Type>.mdx`.
3. Validate links (run from `web/`):
   ```shell
   $ node scripts/validateLinks.ts
   ```
4. Build to catch MDX and broken relative links, if you changed components or imports:
   ```shell
   $ pnpm --filter website build
   ```

Don't commit unless asked.
