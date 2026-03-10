import { DynamicCodeBlock as Code } from 'fumadocs-ui/components/dynamic-codeblock';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import TOML from 'smol-toml';
import YAML from 'yaml';
import HCL, { type HclOptions } from '@/utils/hcl';
import PKL, { type PklOptions } from '@/utils/pkl';

export interface ConfigTabsProps {
	config: object;
	file: string;
}

export function ConfigTabs({ config, file }: ConfigTabsProps) {
	return (
		<Tabs
			groupId="config-format"
			items={['YAML', 'JSON', 'TOML', 'HCL', 'PKL']}
		>
			<Tab value="JSON">
				<Code
					code={JSON.stringify(config, null, 2).trim()}
					codeblock={{ title: `${file}.json` }}
					lang="json"
				/>
			</Tab>

			<Tab value="TOML">
				<Code
					code={TOML.stringify(config).trim()}
					codeblock={{ title: `${file}.toml` }}
					lang="toml"
				/>
			</Tab>

			<Tab value="YAML">
				<Code
					code={YAML.stringify(config, {
						defaultKeyType: 'PLAIN',
						defaultStringType: 'QUOTE_SINGLE',
					}).trim()}
					codeblock={{ title: `${file}.yml` }}
					lang="yaml"
				/>
			</Tab>

			<Tab value="HCL">
				<Code
					code={
						HCL.stringify(config, getHclOptions(file)).trim() +
						appendComment(
							'# Note: We built a custom HCL formatter and this syntax may not be 100% accurate!',
						)
					}
					codeblock={{ title: `${file}.hcl` }}
					lang="hcl"
				/>
			</Tab>

			<Tab value="PKL">
				<Code
					code={
						PKL.stringify(config, getPklOptions(file)).trim() +
						appendComment(
							'// Note: We built a custom PKL formatter and this syntax may not be 100% accurate!',
						)
					}
					codeblock={{ title: `${file}.pkl` }}
					lang="pkl"
				/>
			</Tab>
		</Tabs>
	);
}

function appendComment(comment: string): string {
	return `\n\n${comment}`;
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
