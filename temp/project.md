# Projects

Projects are the core unit of code in a moon workspace. This page explains what a project is, how to
declare and configure one, how projects relate to toolchains and to each other, and how everything
ties together into the project graph.

## What is a project?

A project is a self-contained unit of code that lives inside a workspace. That's deliberately broad
— a project can be a web application, a shared component library, a backend service, a Rust crate, a
folder of Terraform files, a CLI, a test suite, or a handful of scripts you run occasionally. If
it's a coherent piece of code with its own boundaries, it can be a project.

A project is _a single directory_. Projects don't span directories, and a directory doesn't hold
more than one project. That boundary is what lets moon reason clearly about the code: everything
inside the directory belongs to the project, and everything outside doesn't.

Inside a project's directory you'll typically find:

- Source files and tests.
- Assets, configuration, documentation — anything else the project needs.
- A manifest from the project's toolchain, when applicable (`package.json`, `Cargo.toml`,
  `pyproject.toml`, etc.).
- Optionally, a `moon.yml` config file at the root, which configures the project's tasks,
  dependencies, metadata, and more.

A project is also the unit that moon operates on. Tasks run inside a project. Project dependencies
link projects together. Caching is keyed per project. When moon talks about "affected" code or "what
to build next," it is talking in terms of projects.

One important caveat: a folder becomes a project only when the workspace knows about it. Just
dropping a directory into the repository isn't enough — the project has to be _declared_ in the
workspace config. That's the subject of the next section.

A few things that are **not** projects:

- A single file on its own.
- A folder of shared utilities used directly across projects (that folder is usually its own
  project, which other projects then depend on).
- The `.moon/` directory, which holds workspace-level config rather than code.

Projects can be as small as a few files or as large as a full application — moon doesn't care about
size, only about clear boundaries. You don't need to restructure your repository to use moon; any
existing folder that holds a coherent piece of code is a candidate.

Mentally, picture a workspace as the root of your repository, with projects as folders underneath
it, each containing the files that belong to that project and, optionally, a `moon.yml`.

## Declaring a project

Declaration happens in `.moon/workspace.yml`, under the `projects` setting — see the workspace
documentation for the full syntax of that setting. This section focuses on why the declaration
matters and what changes once it's in place.

Declaration is required even though the project's folder already exists on disk. Without it, moon
has no way to build a project graph, no stable identifier to cache against, and no handle to address
the project from the CLI or from other projects' configs. A folder that isn't declared is
effectively invisible to moon:

- The CLI can't find it — `moon project <id>` will error out.
- Other projects can't reference it through `dependsOn`.
- Global task configuration in `.moon/tasks/**/*` can't be inherited into it.
- It contributes nothing to the project graph.

When a project is declared through glob-based discovery, its directory name becomes the project's ID
by default. If that isn't what you want (for example, the folder is named something generic like
`app`), you can override the ID in the project's `moon.yml`.

After declaring a project, the quickest sanity check is:

```shell
moon project <id>
```

If moon prints the project's details, the declaration is working. If it errors, double-check that
the path in `.moon/workspace.yml` points at the project's root directory.

As a worked example, imagine a repository with a frontend app at `apps/client`, a backend service at
`apps/server`, and a handful of shared libraries under `packages/`. A typical declaration might look
like this:

```yaml title=".moon/workspace.yml"
projects:
  sources:
    client: "apps/client"
    server: "apps/server"
  globs:
    # Plus every folder under packages/
    - "packages/*"
```

Once declared, all three patterns are first-class projects: you can reference them in `dependsOn`,
run their tasks from the CLI, and they show up in the project graph alongside each other.

## Project configuration

`moon.yml` is the per-project configuration file. It lives at the root of the project's directory —
the same directory registered in `.moon/workspace.yml` — and a project can have at most one of them.
The file is optional: a project is allowed to exist with no `moon.yml` at all.

Many projects work fine without one. Toolchain auto-detection handles the basics, and global tasks
from `.moon/tasks/**/*` cover common actions like lint, format, and test. Reach for `moon.yml` when
a project needs to deviate from the defaults or declare something unique to itself —
project-specific tasks, explicit dependencies on other projects, metadata like language or
ownership, toolchain overrides, Docker integration, and so on.

The file uses YAML by default. moon also supports other formats via the `moon.*` naming convention,
but YAML is the idiomatic choice.

It helps to hold a mental map of what goes into a `moon.yml`. Broadly, the settings fall into a few
categories, each of which is covered in the sections that follow:

- **Metadata** — `id`, `language`, `layer`, `stack`, `tags`, the `project:` block, `owners:`.
- **Dependencies** — `dependsOn`.
- **Tasks** — `tasks`, `fileGroups`, `env`.
- **Overrides** — `toolchains`, `workspace.inheritedTasks`.
- **Integrations** — `docker`.

A minimal `moon.yml` doesn't need to be ambitious. A few lines is plenty:

```yaml title="packages/ui-kit/moon.yml"
language: "typescript"
layer: "library"

dependsOn:
  - "designTokens"
```

Start small. You rarely need to fill everything out at once — add fields as the project's needs
grow, rather than trying to anticipate every setting up front.

It's worth being clear on how `moon.yml` relates to the workspace. `.moon/workspace.yml` declares
_which_ folders are projects; `moon.yml` configures _each_ project individually — two different jobs
that don't compete. The same division applies to tasks: a project's `moon.yml` can override or
augment workspace-level `.moon/tasks/**/*`, but the mechanics of inheritance live in the tasks
section later in this doc.

## Language, layer, stack, and tags

### `layer`

`layer` describes _what role the project plays_. An application behaves differently from a library,
which behaves differently from an internal tool — `layer` makes that role explicit so moon (and your
team) can reason about it.

Supported values:

- `application` — apps of any kind.
- `automation` — automated testing suites: E2E, integration, visual, etc.
- `configuration` — config files or infrastructure definitions.
- `library` — self-contained, shareable, publishable code.
- `scaffolding` — templates or generators.
- `tool` — internal tools, CLIs, one-off scripts.
- `unknown` (default).

```yaml title="moon.yml"
layer: "library"
```

### `stack`

`stack` describes _which broad technology stack the project belongs to_. It's most commonly used to
enforce cross-stack boundaries — for example, preventing a frontend project from depending on a
backend one.

Supported values:

- `backend` — server-side APIs and services.
- `data` — data sources, database layers.
- `frontend` — client-side user interfaces.
- `infrastructure` — cloud, server, and container infrastructure.
- `systems` — low-level systems programming.
- `unknown` (default).

```yaml title="moon.yml"
stack: "frontend"
```

### `tags`

`tags` is free-form categorization you define yourself. Unlike the three settings above, `tags` is
open-ended: moon doesn't know or care about the strings, you do. Use tags whenever you need a
dimension the enumerated settings don't capture — technology, domain, team ownership, lifecycle
stage, anything.

```yaml title="moon.yml"
tags:
  - "react"
  - "ui"
```

The important distinction: `language`, `layer`, and `stack` are enumerated (moon knows the valid
values), while `tags` is open-ended (you know the valid values). If a categorization is well-defined
and project-wide, prefer one of the enumerated settings; otherwise, reach for tags.

### What each setting drives

Setting these values isn't cosmetic — moon actually uses them:

- **Task inheritance** reads `language`, `layer`, and `tags` to decide which global task files in
  `.moon/tasks/**/*` apply to a project.
- **Constraints and boundaries** read `layer`, `stack`, and `tags` when checking whether one project
  is allowed to depend on another.
- **CLI querying** (`moon query projects`) can filter on any of the four.
- **Editor extensions** use `language` and `layer` for tooling behavior.

### When to set each

A rough guide:

- `language` — almost always. Auto-detection is a fallback, not a substitute.
- `layer` — whenever you want task inheritance to scope cleanly or you plan to enforce boundaries.
- `stack` — when you need cross-stack constraints.
- `tags` — any time you need a dimension the first three don't capture. Remember that tags also feed
  task inheritance and boundary checks, not just description.

### A note on the `unknown` default

Anything you don't configure defaults to `unknown`. That's a legitimate value, but it's worth
knowing that categorization-driven features — task inheritance scoped by layer, cross-stack boundary
checks, and so on — quietly skip projects whose relevant setting is `unknown`. If a global rule
isn't firing for a project you expected it to, an unset `language`, `layer`, or `stack` is a likely
culprit.

### A worked example

Putting it all together, a TypeScript React component library might configure all four dimensions:

```yaml title="packages/ui-kit/moon.yml"
language: "typescript"
layer: "library"
stack: "frontend"
tags:
  - "react"
  - "ui"
```

With those four lines set, the project picks up any global tasks scoped to TypeScript libraries,
participates in frontend-only boundary checks, and shows up when you run queries like "all frontend
libraries" or "all React projects."

## Toolchains and projects

Every project runs on one or more toolchains. A toolchain is how moon knows which language, package
manager, or binary your project expects — and, critically, _which version_ of each. This section is
about how toolchains attach to a project and what changes when they do. We assume you already know
what a toolchain is; if not, read the toolchain concept page first.

### A project usually uses multiple toolchains

It is tempting to think of a project as belonging to a single toolchain, but that's rarely how
things shake out. A TypeScript application will commonly pull in the `typescript`, `node`, and `npm`
toolchains all at once. A Rust project might use `rust` for the compiler and a separate toolchain
for a linter. Projects are multi-toolchain by default — keep that picture in mind as you read on.

### `language` vs `toolchains`

These two settings are easy to confuse. They answer different questions:

- `language` describes _what the code is written in_. It is metadata used for task inheritance,
  editor extensions, and categorization.
- `toolchains` describes _which tools moon will install and run_ on this project's behalf.

They often overlap — a project with `language: 'javascript'` will typically use the `node` toolchain
— but one is a label and the other is a real, executable thing. Treat them as related but distinct.

### Why moon manages toolchains at all

A common first reaction is: "I already have Node installed, why does moon need its own copy?" The
answer is consistency. If every contributor, CI job, and production build relies on "whatever
happens to be on `PATH`," you get subtle version drift and the classic "works on my machine"
problems. By owning the toolchain, moon guarantees everyone runs the same versions of the same
tools, from the same place.

### How a project gets its toolchains

A project's active toolchains come from three places, merged together:

1. **Workspace configuration** — toolchains declared in `.moon/toolchains.*`. This is where versions
   live. Most of the time, this is the only place you need to edit.
2. **Detected toolchains** — toolchains moon infers from files in the project (for example, a
   `package.json` implies `node` and `npm`).
3. **Project overrides** — a `toolchains` block in the project's `moon.yml`, which can set a
   default, tweak settings for a specific toolchain, or disable one outright.

Versions belong at the workspace level. A project should only override _settings_, not re-declare
which version of a tool to install — that way you don't end up with three projects quietly running
three different versions of Node.

### `toolchains.default`

When a task in a project doesn't specify which toolchain it runs on, moon uses the project's
default. Set this when you want every task in the project to run through the same toolchain unless
told otherwise.

```yaml title="moon.yml"
toolchains:
  default: "node"
```

Per-task toolchain selection is covered in the task configuration docs.

### Overriding workspace-level toolchain settings

Most toolchain settings live at the workspace level and apply to every project. When a single
project needs to deviate, you can override just the settings you care about by providing a block
under the toolchain's name:

```yaml title="moon.yml"
toolchains:
  typescript:
    syncProjectReferences: false
```

Only the settings you list are overridden — everything else still inherits from the workspace.
Again: overrides are for settings, not for versions.

### Disabling a toolchain for a project

Sometimes a toolchain is auto-detected where you don't want it — a project directory might contain a
stray config file, or the project intentionally opts out of a given tool. Set the toolchain to
`false` (or `null`) to disable it:

```yaml title="moon.yml"
toolchains:
  typescript: false
```

moon will skip detection and ignore that toolchain for this project entirely.

### "Why did my task run on `system` instead of `node`?"

The `system` toolchain is moon's fallback — it runs your command against whatever is on `PATH`. If
you see it show up when you expected a real toolchain, it means moon couldn't figure out which
toolchain to use. Common fixes:

- Set `toolchains.default` in the project's `moon.yml`.
- Give the task an explicit toolchain.
- Check that the project actually has the config files that would trigger detection (e.g., a
  `package.json` for `node`).

### Side effects of toolchains on a project

Attaching a toolchain to a project changes more than just how tasks run:

- **Aliases** — the toolchain decides where the project's alias comes from. For a `node` project,
  that's the `name` field in `package.json`.
- **Implicit dependencies** — moon discovers implicit project dependencies by following the
  toolchain's ecosystem (for example, reading `package.json`'s `dependencies`).
- **Docker defaults** — when generating a `Dockerfile`, moon picks a base image from the first
  detected toolchain unless you override it.

This is why the same project can behave quite differently once its toolchain changes.

### A quick decision checklist

When configuring toolchains on a project, the usual flow is:

1. Accept the defaults. Most projects work without any project-level toolchain config at all.
2. If you see `system` running unexpectedly, set `toolchains.default`.
3. If a project needs to deviate from workspace settings for one toolchain, add an override block
   under that toolchain's name.
4. If a toolchain is being detected where you don't want it, disable it with `false`.

Mentally, picture it as: workspace toolchain config + detected toolchains + project overrides → the
set of toolchains moon uses when running tasks in this project.

## Dependencies

Projects don't live in isolation. When one project uses another — an application that imports a
shared library, a service that consumes a generated client, a test suite that exercises an app —
moon needs to know, so it can build the project graph and sequence work correctly (library built
before the app that imports it, and so on).

There are two flavors of dependency: **explicit** ones that you write in `moon.yml`, and
**implicit** ones that moon discovers from the project's toolchain ecosystem. The two coexist — moon
uses the union of both when building the project graph.

Before diving in, a small clarification: this section is about _project-to-project_ dependencies.
Task-to-task dependencies (one task must run before another, possibly in a different project) are a
different concept and are configured on tasks themselves.

### Explicit dependencies with `dependsOn`

Explicit dependencies are declared in the `dependsOn` field of `moon.yml`. In its simplest form,
it's a list of project IDs or aliases:

```yaml title="moon.yml"
dependsOn:
  - "apiClients"
  - "designSystem"
```

When you need to say more than just the ID, each entry can be an object instead. The most common
reason to use the object form is to attach a **scope** — the type of relationship between the two
projects.

```yaml title="moon.yml"
dependsOn:
  - id: "apiClients"
    scope: "production"
  - id: "designSystem"
    scope: "peer"
```

### Scopes

A dependency's scope tells moon how the relationship should behave. The available scopes:

- `production` (default) — the dependency is needed by the project's production output.
- `development` — the dependency is only needed during development (tests, local tooling).
- `build` — the dependency is needed to build the project but not at runtime.
- `peer` — the dependency is expected to be present in the consumer's environment rather than
  bundled.

Scopes matter because they affect how dependencies are installed and propagated. A dev-only
dependency shouldn't end up in a production container; a peer dependency shouldn't be bundled.
Getting the scope right means moon makes these decisions correctly on your behalf.

### Implicit dependencies

Most dependencies don't need to be written down at all. moon discovers them automatically by reading
the project's toolchain manifest. For a `node` project, that means parsing `package.json` and
treating any workspace-local packages listed there as project dependencies. Other toolchains do the
analogous thing for their ecosystems — `Cargo.toml`, `pyproject.toml`, and so on.

This is why a well-configured moon workspace often has very little `dependsOn` in it: the ecosystem
already says what depends on what, and moon just reads it.

### When to use explicit over implicit

Reach for `dependsOn` when the implicit mechanism can't see the dependency:

- **Cross-language links** — a TypeScript app that uses a binary built in a Rust project.
- **Cross-ecosystem links** — a script that consumes the outputs of a project in a different
  toolchain.
- **Build-time producers and consumers** — a project that generates files another project reads,
  without a manifest entry between them.

Anything the toolchain manifest doesn't capture is a candidate for `dependsOn`.

### A worked example

A single `moon.yml` can mix both forms:

```yaml title="apps/client/moon.yml"
dependsOn:
  # Simple form, inherits the default `production` scope
  - "designSystem"

  # Object form, with an explicit dev-only scope
  - id: "e2eTests"
    scope: "development"

  # Cross-language: this Rust project builds a CLI the app uses at build time
  - id: "codegenTool"
    scope: "build"
```

### Pitfalls

One small thing to avoid: redundantly declaring an implicit dependency as explicit. It's harmless,
but it duplicates what the toolchain already provides and adds noise. Let the toolchain do the work
when it can, and use `dependsOn` for the dependencies it can't see.

## Ownership and metadata

Two related but distinct settings live here: the `project:` block, which holds project-level
metadata for humans and tooling, and the `owners:` block, which defines file-level code ownership
used to generate `CODEOWNERS` for your VCS.

In large monorepos, knowing who to ping about a project and who to assign reviews to are two of the
most valuable things you can encode. These settings give you a single source of truth for both.

### The `project:` block

`project:` is purely informational. moon surfaces it in the CLI and otherwise leaves it alone — you
and your own tooling decide what to do with it.

The fields you'll reach for most often:

- `title` — a human-readable display name. This is _different_ from the project's `id`: `title` is
  for humans ("UI Kit"), `id` is the unique machine handle (`uiKit`).
- `description` — a short summary of what the project does.
- `owner` — the team or organization that owns the project. Use a team name, not an individual.
- `maintainers` — the people who review changes and support the project. Names, emails, LDAP
  handles, GitHub usernames — whatever your team uses.
- `channel` — the chat channel where the project is discussed (Slack, Discord, Teams, IRC).

```yaml title="moon.yml"
project:
  title: "UI Kit"
  description: "Shared React component library."
  channel: "#ui-kit"
  owner: "frontend-platform"
  maintainers: ["alice", "bob"]
```

You can also attach arbitrary custom fields to the `project:` block — anything that's valid JSON is
accepted. Useful for your own tooling: deprecation flags, tier or priority labels, team-specific
annotations.

```yaml title="moon.yml"
project:
  # ...
  deprecated: true
  tier: 1
```

### The `owners:` block

`owners:` is about _source code_ ownership within the project — which files are reviewed by which
team or person. moon uses it to generate a `CODEOWNERS` file for your VCS platform.

Supported providers are GitHub, GitLab, and Bitbucket. The syntax for owner strings (`@team`,
`@username`, and so on) follows each platform's conventions, and moon doesn't validate them — it's
your responsibility to write them correctly.

The core setting is `paths`, which comes in two forms. The simple form is a list of globs, all
assigned to a single `defaultOwner`:

```yaml title="moon.yml"
owners:
  defaultOwner: "@frontend"
  paths:
    - "**/*.ts"
    - "**/*.tsx"
    - "*.config.js"
```

The richer form is a map from glob to a list of owners, which lets different paths have different
owners — and multiple owners per path:

```yaml title="moon.yml"
owners:
  defaultOwner: "@frontend"
  paths:
    "**/*.rs": ["@backend"]
    "**/*.js": [] # Falls back to defaultOwner
    "*.config.js": ["@frontend", "@frontend-infra"]
```

A few platform-specific extras exist for tighter VCS integration:

- `customGroups` — Bitbucket-only, defines custom groups that get injected into the generated
  `CODEOWNERS` file.
- `optional` — GitLab-only, marks the project's code owners section as optional.
- `requiredApprovals` — Bitbucket and GitLab, sets the number of approvals required for changes to
  owned paths.

### How the two blocks relate

It's easy to confuse `project.owner` with `owners:`. They aren't the same thing:

- `project.owner` is a _single, high-level_ declaration: "this team owns this project."
- `owners.paths` is _fine-grained_: "these specific files are reviewed by these people."

A project commonly has one `project.owner` and many `owners.paths` entries. Together, they answer
two different questions: who owns the project as a whole, and who reviews which parts of its source
code.

## Tasks in a project

A task is an action that runs within the context of a project — building, testing, linting, whatever
the project needs done. Tasks are the _work_ in moon; everything else in this doc exists to help
tasks run in the right order, in the right environment, with the right inputs.

Tasks reach a project from two places. A project defines its own tasks in `moon.yml`, and it also
inherits tasks from workspace-level files in `.moon/tasks/**/*`. Both sources are first-class, and a
project's final task list is the merged result.

This section covers the shape of tasks at a project level. The mechanics of task inheritance — which
global files apply to which projects, how tasks merge, precedence — are deep enough to deserve their
own doc.

### Project-level tasks

Project-level tasks live under the `tasks:` map in `moon.yml`. Each key is the task's name; each
value is the task's configuration.

```yaml title="moon.yml"
tasks:
  build:
    command: "vite build"
    inputs:
      - "src/**/*"
    outputs:
      - "dist"
```

A task's name is how you address it — combined with the project's ID, it produces a target like
`uiKit:build` that you can run from the CLI.

### Inherited tasks

Most projects share a common set of actions: lint, format, test, typecheck. Rather than repeating
these in every `moon.yml`, they're defined once in `.moon/tasks/**/*` and _inherited_ by the
projects they apply to. moon uses the project's `language`, `layer`, and `tags` to decide which
global task files apply.

The headline payoff: one lint rule, defined once, applied consistently across every project that
should have it.

When a project needs to deviate, it can redefine a task of the same name in its own `moon.yml`. The
project's version wins — useful for tweaking args, adding inputs, or swapping commands for one
specific project.

For finer control, `workspace.inheritedTasks` lets a project exclude specific inherited tasks,
restrict inheritance to an explicit `include` list, or rename tasks as they come in:

```yaml title="moon.yml"
workspace:
  inheritedTasks:
    # Only inherit these global tasks
    include: ["lint", "test"]
    # Skip the global typecheck task for this project
    exclude: ["typecheck"]
    # Rename the global 'buildApplication' to just 'build' here
    rename:
      buildApplication: "build"
```

### `fileGroups`

File groups are reusable, named collections of globs. Rather than repeating `src/**/*` and friends
across every task, define them once and reference them from task inputs, outputs, and args via
tokens.

```yaml title="moon.yml"
fileGroups:
  sources:
    - "src/**/*"
    - "types/**/*"
  tests:
    - "tests/**/*"
    - "**/__tests__/**/*"

tasks:
  build:
    command: "vite build"
    inputs:
      - "@group(sources)"
```

File groups defined globally in `.moon/tasks/**/*` are inherited by every project, so most
workspaces put the common groups there and only define project-specific ones locally.

### `env`

The project-level `env` setting applies environment variables to _every_ task in the project.
Task-level `env` wins when both set the same variable.

```yaml title="moon.yml"
env:
  NODE_ENV: "production"
```

### Composing tasks with `extends`

A task can extend a sibling task — or an inherited one — to inherit its settings with local
overrides. This is the idiomatic way to express common variants like "lint" and "lint-fix" without
duplicating config.

```yaml title="moon.yml"
tasks:
  lint:
    command: "eslint ."
    inputs:
      - "src/**/*"

  lint-fix:
    extends: "lint"
    args: "--fix"
```

### A worked example

A realistic project might combine several of these pieces in one file:

```yaml title="packages/ui-kit/moon.yml"
env:
  NODE_ENV: "production"

fileGroups:
  # Project-specific; 'sources' is assumed to be inherited from globals
  stories:
    - "**/*.stories.{ts,tsx}"

tasks:
  # Project-only task
  build-storybook:
    command: "storybook build"
    inputs:
      - "@group(stories)"
      - "@group(sources)"
    outputs:
      - "storybook-static"

  # Override the inherited 'test' task with project-specific args
  test:
    command: "vitest run"
    args: "--coverage"
```

With the inherited tasks still doing the heavy lifting for lint, format, and typecheck, the project
only needs to describe what makes it different.

## The project graph

Everything in this doc ultimately feeds into one structure: the project graph. The graph is a
global, directed, acyclic picture of what projects exist in the workspace and how they connect.
Nodes are projects; edges are dependencies. That's it at the mechanical level — but it's the single
most important thing moon builds, because the rest of moon's features key off of it.

### How the graph gets built

moon assembles the graph from the pieces this doc has already walked through:

- Declared projects from `.moon/workspace.yml` become the nodes.
- Explicit `dependsOn` entries in each project's `moon.yml` become edges.
- Implicit dependencies discovered through each project's toolchain manifests add more edges.
- Metadata (`language`, `layer`, `stack`, `tags`) is attached to nodes so it's available when moon
  validates relationships between them.

Nothing new happens here — every input to the graph is something you've already configured. moon
just collects it and wires it together.

### What the graph is used for

Once the graph exists, moon can do things that would be hard or impossible without it:

- **Ordering work.** Task execution follows a topological walk of the graph. If an app's `build`
  depends on a library's `build`, the library builds first. This is how moon guarantees consumers
  see fresh producer outputs.
- **Affected analysis.** When files change, moon walks _downstream_ from the changed projects to
  find everything affected by the change. Upstream and unaffected projects can be skipped entirely —
  a big part of why CI speeds up on moon.
- **Constraint and boundary checks.** With every edge in hand, moon can enforce rules like "frontend
  projects can't depend on backend projects" by inspecting each edge against the `layer`, `stack`,
  and `tags` of the projects on either side.
- **Querying and visualization.** `moon project-graph` renders the graph for you, and
  `moon query projects` filters it by whatever criteria you care about.

### Upstream and downstream

Two words you'll see throughout moon's docs and output:

- **Upstream** — a project's dependencies. The producers.
- **Downstream** — a project's dependents. The consumers.

When a file in project A changes, its downstream is the set of projects that depend (directly or
transitively) on A. Those are the projects that may need to rebuild or retest.

### No cycles allowed

The graph is directed _and acyclic_. Cycles — where A depends on B and B depends on A, possibly
through a chain — aren't permitted, because there's no valid order in which to build them. moon will
refuse to load the workspace until the cycle is broken.

If you hit one, look for the shortest chain of `dependsOn` entries (including implicit dependencies
from toolchain manifests) that loops back on itself, and break it by inverting the relationship,
extracting a shared project, or moving code around.

### Bringing it all together

Everything in this doc — declaring projects, writing a `moon.yml`, picking a `language` and `layer`
and `stack` and `tags`, attaching toolchains, declaring `dependsOn`, defining tasks — exists to
produce a clean, useful project graph. Get that graph right and moon's most valuable features
(caching, affected-only runs, parallel execution, boundary enforcement) start working for you
automatically. Most of the care you put into a project's config is really care being put into the
shape of the graph.

## See also

- Workspace — how the container that holds projects is structured and configured.
- Toolchain — what a toolchain is and how moon installs and manages tools.
- Tasks — the full task concept, including inputs, outputs, and options.
- Task inheritance — how global task files in `.moon/tasks/**/*` match and merge into projects.
- Targets — the `project:task` reference format used throughout moon.
- Constraints and boundaries — the rules that can be enforced across project graph edges.
- `.moon/workspace.yml` reference — full syntax for declaring projects.
- `moon.yml` reference — full list of per-project settings.
