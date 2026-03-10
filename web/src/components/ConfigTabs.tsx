import { DynamicCodeBlock as Code } from 'fumadocs-ui/components/dynamic-codeblock';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import TOML from 'smol-toml';
import YAML from 'yaml';
import HCL, { type HclOptions } from '@/utils/hcl';

export interface ConfigTabsProps {
	config: object;
	file: string;
}

export function ConfigTabs({ config, file }: ConfigTabsProps) {
	return (
		<Tabs groupId="config-format" items={['YAML', 'JSON', 'TOML', 'HCL']}>
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
					code={HCL.stringify(config, getHclOptions(file)).trim()}
					codeblock={{ title: `${file}.hcl` }}
					lang="hcl"
				/>
			</Tab>
		</Tabs>
	);
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
