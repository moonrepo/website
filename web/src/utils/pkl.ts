export type PklValue =
	| string
	| number
	| boolean
	| null
	| PklValue[]
	| { [key: string]: PklValue };

export interface PklOptions {
	/**
	 * Key paths (dot-separated) whose object entries should use
	 * Mapping bracket syntax `["key"]` instead of bare property names.
	 */
	mappings?: string[];
}

function indent(depth: number): string {
	return '  '.repeat(depth);
}

function isPlainObject(value: PklValue): value is { [key: string]: PklValue } {
	return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function formatKey(key: string): string {
	return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(key) ? key : `["${key}"]`;
}

function formatPrimitive(value: string | number | boolean | null): string {
	if (value === null) return 'null';
	if (typeof value === 'string') return `"${value}"`;

	return String(value);
}

function formatListing(
	arr: PklValue[],
	depth: number,
	path: string,
	mappings: Set<string>,
): string {
	if (arr.length === 0) {
		return 'List()';
	}

	const lines: string[] = [];

	for (const item of arr) {
		if (isPlainObject(item)) {
			lines.push(
				`${indent(depth + 1)}new ${formatObject(item, depth + 1, path, mappings)}`,
			);
		} else if (Array.isArray(item)) {
			lines.push(
				`${indent(depth + 1)}${formatListing(item, depth + 1, path, mappings)}`,
			);
		} else {
			lines.push(`${indent(depth + 1)}${formatPrimitive(item)}`);
		}
	}

	return `new Listing {\n${lines.join('\n')}\n${indent(depth)}}`;
}

function formatObject(
	obj: Record<string, PklValue>,
	depth: number,
	path: string,
	mappings: Set<string>,
): string {
	const entries = Object.entries(obj);

	if (entries.length === 0) {
		return '{}';
	}

	const lines = formatEntries(entries, depth + 1, path, mappings);

	return `{\n${lines.join('\n')}\n${indent(depth)}}`;
}

/**
 * Format the entries of an object as Pkl lines at a given indentation depth.
 * When the parent path is in the mappings set, keys use bracket entry syntax.
 */
function formatEntries(
	entries: [string, PklValue][],
	depth: number,
	parentPath: string,
	mappings: Set<string>,
): string[] {
	const useMapping = mappings.has(parentPath);
	const lines: string[] = [];

	for (const [key, value] of entries) {
		const childPath = parentPath ? `${parentPath}.${key}` : key;
		const formattedKey = useMapping ? `["${key}"]` : formatKey(key);

		if (isPlainObject(value)) {
			lines.push(
				`${indent(depth)}${formattedKey} ${formatObject(value, depth, childPath, mappings)}`,
			);
		} else if (Array.isArray(value)) {
			lines.push(
				`${indent(depth)}${formattedKey} = ${formatListing(value, depth, childPath, mappings)}`,
			);
		} else {
			lines.push(`${indent(depth)}${formattedKey} = ${formatPrimitive(value)}`);
		}
	}

	return lines;
}

export function toPkl(obj: object, options?: PklOptions): string {
	const mappings = new Set(options?.mappings ?? []);
	const lines = formatEntries(Object.entries(obj), 0, '', mappings);

	return lines.join('\n\n');
}

export default {
	stringify: toPkl,
};
