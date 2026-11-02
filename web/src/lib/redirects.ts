// URLs from the previous Docusaurus site mapped to their new locations.
// Applied as Nitro route rules in `vite.config.ts`, and every target is
// checked by `scripts/validateLinks.ts`. Exact paths win over `/**` patterns.

// Pages that kept their path, and only moved under `/moon/docs`
const MOON_COMMANDS = [
	'action-graph',
	'bin',
	'check',
	'ci',
	'clean',
	'completions',
	'daemon',
	'daemon/logs',
	'daemon/restart',
	'daemon/start',
	'daemon/status',
	'daemon/stop',
	'docker',
	'docker/file',
	'docker/prune',
	'docker/scaffold',
	'docker/setup',
	'exec',
	'ext',
	'extension',
	'extension/add',
	'extension/info',
	'generate',
	'hash',
	'init',
	'layout-graph',
	'mcp',
	'overview',
	'project',
	'project-graph',
	'projects',
	'query',
	'query/affected',
	'query/changed-files',
	'query/projects',
	'query/tasks',
	'run',
	'setup',
	'sync',
	'sync/code-owners',
	'sync/config-schemas',
	'sync/projects',
	'sync/vcs-hooks',
	'task',
	'task-graph',
	'tasks',
	'teardown',
	'template',
	'templates',
	'toolchain',
	'toolchain/add',
	'toolchain/info',
	'upgrade',
];

const MOON_GUIDES = [
	'ci',
	'codegen',
	'codeowners',
	'daemon',
	'docker',
	'exec-plan',
	'mcp',
	'notifications',
	'offline-mode',
	'open-source',
	'profile',
	'remote-cache',
	'renovate',
	'root-project',
	'sharing-config',
	'vcs-hooks',
	'webhooks',
];

function moveUnder(
	names: string[],
	from: string,
	to: string,
): Record<string, string> {
	return Object.fromEntries(
		names.map((name) => [`${from}/${name}`, `${to}/${name}`]),
	);
}

export const REDIRECTS: Record<string, string> = {
	'/moonbase': '/',
	'/search': '/',

	// Getting started
	'/docs': '/moon/docs',
	'/docs/install': '/moon/docs',
	'/docs/setup-workspace': '/moon/docs/start/workspace',
	'/docs/setup-toolchain': '/moon/docs/start/toolchains',
	'/docs/create-project': '/moon/docs/start/projects',
	'/docs/create-task': '/moon/docs/start/tasks',
	'/docs/run-task': '/moon/docs/start/run',
	'/docs/migrate/2.0': '/moon/docs/guides/migrate/2.0',
	'/docs/cheat-sheet': '/moon/docs/guides/recipes',
	'/docs/env-vars': '/moon/docs/advanced/env-vars',

	// Concepts
	'/docs/concepts': '/moon/docs/config',
	'/docs/concepts/affected': '/moon/docs/advanced/affected',
	'/docs/concepts/cache': '/moon/docs/advanced/cache',
	'/docs/concepts/file-group': '/moon/docs/advanced/file-groups',
	'/docs/concepts/file-pattern': '/moon/docs/config#file-and-glob-paths',
	'/docs/concepts/project': '/moon/docs/project',
	'/docs/concepts/query-lang': '/moon/docs/advanced/query-lang',
	'/docs/concepts/target': '/moon/docs/target',
	'/docs/concepts/task': '/moon/docs/task',
	'/docs/concepts/task-inheritance': '/moon/docs/task-inheritance',
	'/docs/concepts/token': '/moon/docs/advanced/tokens',
	'/docs/concepts/toolchain': '/moon/docs/toolchain',
	'/docs/concepts/workspace': '/moon/docs/workspace',

	// How it works
	'/docs/how-it-works': '/moon/docs/project-graph',
	'/docs/how-it-works/action-graph': '/moon/docs/action-graph',
	'/docs/how-it-works/dep-graph': '/moon/docs/action-graph',
	'/docs/how-it-works/languages': '/moon/docs/toolchain',
	'/docs/how-it-works/layout-graph': '/moon/docs/advanced/layout-graph',
	'/docs/how-it-works/project-graph': '/moon/docs/project-graph',
	'/docs/how-it-works/task-graph': '/moon/docs/task-graph',

	// Configuration files
	'/docs/config': '/moon/docs/config',
	'/docs/config/overview': '/moon/docs/config',
	'/docs/config/extensions': '/moon/docs/extension',
	'/docs/config/global-project': '/moon/docs/task-inheritance',
	'/docs/config/inherited-tasks': '/moon/docs/task-inheritance',
	'/docs/config/project': '/moon/docs/project',
	'/docs/config/tasks': '/moon/docs/task',
	'/docs/config/template': '/moon/docs/guides/codegen',
	'/docs/config/toolchain': '/moon/docs/toolchain',
	'/docs/config/workspace': '/moon/docs/workspace',

	// Commands
	'/docs/commands': '/moon/docs/commands/overview',
	'/docs/commands/dep-graph': '/moon/docs/commands/action-graph',
	...moveUnder(MOON_COMMANDS, '/docs/commands', '/moon/docs/commands'),

	// Guides
	...moveUnder(MOON_GUIDES, '/docs/guides', '/moon/docs/guides'),
	'/docs/guides/debug-task': '/moon/docs/skills/debug-task',
	'/docs/guides/extensions': '/moon/docs/extension',
	'/docs/guides/git-hooks': '/moon/docs/guides/vcs-hooks',
	'/docs/guides/wasm-plugins': '/wasm',
	'/docs/guides/javascript/bun-handbook':
		'/moon/docs/toolchains/javascript/bun',
	'/docs/guides/javascript/deno-handbook':
		'/moon/docs/toolchains/javascript/deno',
	'/docs/guides/javascript/node-handbook':
		'/moon/docs/toolchains/javascript/node',
	'/docs/guides/javascript/typescript-project-refs':
		'/moon/docs/toolchains/typescript',
	'/docs/guides/node/examples': '/moon/docs/toolchains/javascript/node',
	'/docs/guides/rust/handbook': '/moon/docs/toolchains/rust',
	'/docs/guides/examples/typescript': '/moon/docs/toolchains/typescript',
	// Examples for JavaScript tools, like ESLint, Jest, and Vite
	'/docs/guides/examples/**': '/moon/docs/toolchains/javascript',

	// Editors
	'/docs/editors': '/moon/docs/editors/vscode',
	'/docs/editors/vscode': '/moon/docs/editors/vscode',

	// The proto docs haven't been rewritten yet, so everything lands on the
	// index. Map individual pages once they exist.
	'/docs/proto': '/proto/docs',
	'/docs/proto/**': '/proto/docs',

	// Blog posts and tags kept their paths
	'/blog/archive': '/blog',
	'/blog/atom.xml': '/blog/rss.xml',
	'/blog/page/**': '/blog',

	// Everything else, like doc tags, and pages without a replacement (FAQ,
	// comparison, terminology)
	'/docs/**': '/moon/docs',
};
