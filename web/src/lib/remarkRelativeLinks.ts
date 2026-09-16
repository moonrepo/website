import fs from 'node:fs';
import path from 'node:path';

interface Node {
	type: string;
	url?: string;
	attributes?: { type: string; name?: string; value?: unknown }[];
	children?: Node[];
}

interface File {
	path?: string;
}

// Relative to the working directory, like the collection `dir`s in `source.config.ts`
const CONTENT_DIR = path.resolve('content');

function isRelativeFileLink(href: string): boolean {
	return (
		(href.startsWith('./') || href.startsWith('../')) &&
		/\.mdx?(#.*)?$/.test(href)
	);
}

// Mirrors Fumadocs page conventions: `(group)` folders and `index` files
// don't contribute to the slug, and each collection folder is its base URL.
function fileToUrl(filePath: string): string {
	const segments = path
		.relative(CONTENT_DIR, filePath)
		.replace(/\.mdx?$/, '')
		.split(path.sep)
		.filter((segment) => !(segment.startsWith('(') && segment.endsWith(')')));

	if (segments.at(-1) === 'index') {
		segments.pop();
	}

	return `/${segments.join('/')}`;
}

function resolveHref(href: string, sourcePath: string): string {
	const [target, hash] = href.split('#', 2);
	const targetPath = path.resolve(path.dirname(sourcePath), decodeURI(target));

	if (!fs.existsSync(targetPath)) {
		throw new Error(
			`Broken link "${href}" in ${path.relative(CONTENT_DIR, sourcePath)}, file does not exist.`,
		);
	}

	return hash ? `${fileToUrl(targetPath)}#${hash}` : fileToUrl(targetPath);
}

function visit(node: Node, sourcePath: string) {
	if ((node.type === 'link' || node.type === 'definition') && node.url) {
		if (isRelativeFileLink(node.url)) {
			node.url = resolveHref(node.url, sourcePath);
		}
	} else if (node.attributes) {
		for (const attr of node.attributes) {
			if (
				attr.type === 'mdxJsxAttribute' &&
				attr.name === 'href' &&
				typeof attr.value === 'string' &&
				isRelativeFileLink(attr.value)
			) {
				attr.value = resolveHref(attr.value, sourcePath);
			}
		}
	}

	node.children?.forEach((child) => {
		visit(child, sourcePath);
	});
}

/**
 * Resolves relative file links, like `[Task](./task.mdx)`, into page URLs
 * at compile time. This is the build-time equivalent of Fumadocs'
 * `createRelativeLink`, which is server component only.
 */
export function remarkRelativeLinks() {
	return (tree: Node, file: File) => {
		if (file.path) {
			visit(tree, file.path);
		}
	};
}
