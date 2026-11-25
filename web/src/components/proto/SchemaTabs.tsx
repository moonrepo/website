import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import TOML from 'smol-toml';
import YAML from 'yaml';
import { CodeBlock as Code } from '@/components/CodeBlock';

// Maps with user-defined keys (OS names, architectures, executables, etc),
// whose keys proto doesn't convert to kebab-case
const PRESERVED_KEYS = new Set([
	'aliases',
	'arch',
	'exes',
	'libc',
	'platform',
	'secondary',
	'shim-env-vars',
]);

function toKebabCase(value: string): string {
	return value.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

// Format v1 keys are kebab-case in TOML, and camelCase in JSON and YAML
function convertKeys(data: unknown, parentKey = ''): unknown {
	if (Array.isArray(data)) {
		return data.map((item) => convertKeys(item, parentKey));
	}

	if (data && typeof data === 'object') {
		return Object.fromEntries(
			Object.entries(data).map(([key, value]) => {
				const nextKey = PRESERVED_KEYS.has(parentKey) ? key : toKebabCase(key);

				return [nextKey, convertKeys(value, nextKey)];
			}),
		);
	}

	return data;
}

function formatToml(config: Record<string, unknown>): string {
	const lines = TOML.stringify(config)
		.trim()
		// Write strings with backslashes, like regex patterns, as literal strings,
		// so that `\d` doesn't have to be escaped as `\\d`
		.replace(/"((?:[^"\\]|\\.)*)"/g, (match, inner: string) =>
			inner.includes('\\\\') &&
			!inner.includes("'") &&
			/^(?:[^\\]|\\\\)*$/.test(inner)
				? `'${inner.replace(/\\\\/g, '\\')}'`
				: match,
		)
		.split('\n');

	// Separate tables with a blank line, including after empty tables
	return lines
		.flatMap((line, index) =>
			index > 0 && line.startsWith('[') && lines[index - 1] !== ''
				? ['', line]
				: [line],
		)
		.join('\n');
}

export interface SchemaTabsProps {
	/** Schema as a JSON object. For format v1, write keys in camelCase. */
	config: object;
	/** File name without an extension. */
	file?: string;
	/** Schema format, which controls the casing of TOML keys. */
	format?: 'v1' | 'v2';
}

export function SchemaTabs({
	config,
	file = 'protostar',
	format = 'v2',
}: SchemaTabsProps) {
	const tomlConfig = (
		format === 'v1' ? convertKeys(config) : config
	) as Record<string, unknown>;

	return (
		<Tabs groupId="schema-format" items={['TOML', 'JSON', 'YAML']}>
			<Tab value="TOML">
				<Code
					code={formatToml(tomlConfig)}
					codeblock={{ title: `${file}.toml` }}
					lang="toml"
				/>
			</Tab>

			<Tab value="JSON">
				<Code
					code={JSON.stringify(config, null, 2).trim()}
					codeblock={{ title: `${file}.json` }}
					lang="json"
				/>
			</Tab>

			<Tab value="YAML">
				<Code
					code={YAML.stringify(config, {
						defaultKeyType: 'PLAIN',
						defaultStringType: 'QUOTE_SINGLE',
					}).trim()}
					codeblock={{ title: `${file}.yaml` }}
					lang="yaml"
				/>
			</Tab>
		</Tabs>
	);
}
