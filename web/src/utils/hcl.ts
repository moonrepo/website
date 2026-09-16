export type HclValue =
	| string
	| number
	| boolean
	| null
	| HclValue[]
	| { [key: string]: HclValue };

export interface HclOptions {
	/**
	 * Key paths (dot-separated) whose object entries should be expanded
	 * as labeled blocks instead of nested blocks.
	 */
	labeledBlocks?: string[];
}

function indent(depth: number): string {
	return '  '.repeat(depth);
}

function formatKey(key: string): string {
	return /^[a-zA-Z_][a-zA-Z0-9_-]*$/.test(key) ? key : `"${key}"`;
}

function isPlainObject(value: HclValue): value is { [key: string]: HclValue } {
	return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function formatValue(
	value: HclValue,
	depth: number,
	path: string,
	labeled: Set<string>,
): string {
	if (value === null) {
		return 'null';
	}

	switch (typeof value) {
		case 'string':
			return `"${value}"`;
		case 'number':
		case 'boolean':
			return String(value);
		default:
			break;
	}

	if (Array.isArray(value)) {
		if (value.length === 0) {
			return '[]';
		}

		// If all items are primitives, format inline
		if (value.every((v) => v === null || typeof v !== 'object')) {
			return `[${value.map((v) => formatValue(v, depth, path, labeled)).join(', ')}]`;
		}

		// Complex array items go on separate lines
		const items = value.map(
			(v) => `${indent(depth + 1)}${formatValue(v, depth + 1, path, labeled)},`,
		);

		return `[\n${items.join('\n')}\n${indent(depth)}]`;
	}

	// Object value (inline block)
	return formatBlock(value, depth, path, labeled);
}

/**
 * Format the entries of an object as HCL lines at a given indentation depth.
 * Handles labeled block expansion when a child key's path is in the labeled set.
 */
function formatEntries(
	entries: [string, HclValue][],
	depth: number,
	parentPath: string,
	labeled: Set<string>,
): string[] {
	const lines: string[] = [];

	for (const [key, value] of entries) {
		const formattedKey = formatKey(key);
		const childPath = parentPath ? `${parentPath}.${key}` : key;

		if (labeled.has(childPath) && isPlainObject(value)) {
			// Expand each entry as a labeled block: blockType "label" { … }
			for (const [label, inner] of Object.entries(value)) {
				const innerPath = `${childPath}.${label}`;

				if (isPlainObject(inner)) {
					lines.push(
						`${indent(depth)}${formattedKey} "${label}" ${formatValue(inner, depth, innerPath, labeled)}`,
					);
				} else {
					lines.push(
						`${indent(depth)}${formattedKey} "${label}" = ${formatValue(inner, depth, innerPath, labeled)}`,
					);
				}
			}
		} else if (isPlainObject(value)) {
			lines.push(
				`${indent(depth)}${formattedKey} ${formatValue(value, depth, childPath, labeled)}`,
			);
		} else {
			lines.push(
				`${indent(depth)}${formattedKey} = ${formatValue(value, depth, childPath, labeled)}`,
			);
		}
	}

	return lines;
}

function formatBlock(
	obj: Record<string, HclValue>,
	depth: number,
	path: string,
	labeled: Set<string>,
): string {
	const entries = Object.entries(obj);

	if (entries.length === 0) {
		return '{}';
	}

	const lines = formatEntries(entries, depth + 1, path, labeled);

	return `{\n${lines.join('\n')}\n${indent(depth)}}`;
}

export function toHcl(obj: object, options?: HclOptions): string {
	const labeled = new Set(options?.labeledBlocks ?? []);
	const lines = formatEntries(Object.entries(obj), 0, '', labeled);

	return lines.join('\n\n');
}

export default {
	stringify: toHcl,
};
