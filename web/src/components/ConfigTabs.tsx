import { DynamicCodeBlock as Code } from 'fumadocs-ui/components/dynamic-codeblock';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import TOML from 'smol-toml';
import YAML from 'yaml';
import HCL, { type HclOptions } from '@/utils/hcl';
import PKL, { type PklOptions } from '@/utils/pkl';

export interface ConfigTabsProps {
	comments?: Record<string, string>;
	config: object;
	file: string;
}

export function ConfigTabs({ comments = {}, config, file }: ConfigTabsProps) {
	return (
		<Tabs
			groupId="config-format"
			items={['YAML', 'JSON', 'TOML', 'HCL', 'PKL']}
		>
			<Tab value="JSON">
				<Code
					code={injectComments(
						JSON.stringify(config, null, 2).trim(),
						comments,
						'//',
					)}
					codeblock={{ title: `${file}.json` }}
					lang="json"
				/>
			</Tab>

			<Tab value="TOML">
				<Code
					code={injectComments(TOML.stringify(config).trim(), comments, '#')}
					codeblock={{ title: `${file}.toml` }}
					lang="toml"
				/>
			</Tab>

			<Tab value="YAML">
				<Code
					code={injectComments(
						YAML.stringify(config, {
							defaultKeyType: 'PLAIN',
							defaultStringType: 'QUOTE_SINGLE',
						}).trim(),
						comments,
						'#',
					)}
					codeblock={{ title: `${file}.yml` }}
					lang="yaml"
				/>
			</Tab>

			<Tab value="HCL">
				<Code
					code={injectComments(
						HCL.stringify(config, getHclOptions(file)).trim(),
						comments,
						'#',
						'Note: We built a custom HCL formatter and this syntax may not be 100% accurate!',
					)}
					codeblock={{ title: `${file}.hcl` }}
					lang="hcl"
				/>
			</Tab>

			<Tab value="PKL">
				<Code
					code={injectComments(
						PKL.stringify(config, getPklOptions(file)).trim(),
						comments,
						'//',
						'Note: We built a custom PKL formatter and this syntax may not be 100% accurate!',
					)}
					codeblock={{ title: `${file}.pkl` }}
					lang="pkl"
				/>
			</Tab>
		</Tabs>
	);
}

function injectComments(
	config: string,
	comments: Record<string, string>,
	prefix: string,
	trailingComment?: string,
): string {
	const lines = config.split('\n');

	for (const [key, comment] of Object.entries(comments)) {
		const regex = new RegExp(`^(\\s+)?"?${key}"?`);
		let index = 0;

		for (const line of lines) {
			const matches = line.match(regex);

			if (matches) {
				const indent = matches[1] || '';
				lines.splice(index, 0, `${indent}${prefix} ${comment}`);
				break;
			}

			index += 1;
		}
	}

	if (trailingComment) {
		lines.push(`\n${prefix} ${trailingComment}`);
	}

	return lines.join('\n');
}

function getHclOptions(fileName: string): HclOptions {
	const labeledBlocks: string[] = [];

	if (fileName.startsWith('.moon/tasks') || fileName === 'moon') {
		labeledBlocks.push('tasks', 'fileGroups');
	} else if (fileName === 'template') {
		labeledBlocks.push('variables');
	}

	return { labeledBlocks };
}

function getPklOptions(fileName: string): PklOptions {
	const mappings: string[] = [];

	if (fileName.startsWith('.moon/tasks') || fileName === 'moon') {
		mappings.push(
			'tasks',
			'tasks.deps.env',
			'tasks.env',
			'env',
			'fileGroups',
			'owners.customGroups',
			'workspace.inheritedTasks.rename',
		);
	} else if (fileName === 'template') {
		mappings.push('variables');
	} else if (fileName === '.moon/workspace') {
		mappings.push(
			'codeowners.globalPaths',
			'constraints.tagRelationships',
			'projects.sources',
			'remote.auth.headers',
			'vcs.hooks',
		);
	}

	return { mappings };
}
