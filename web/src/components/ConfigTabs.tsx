import { CodeBlock as Code2, Pre } from 'fumadocs-ui/components/codeblock';
import { DynamicCodeBlock as Code } from 'fumadocs-ui/components/dynamic-codeblock';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';

import TOML from 'smol-toml';
import YAML from 'yaml';

export interface ConfigTabsProps {
	config: object;
	file: string;
}

export function ConfigTabs({ config, file }: ConfigTabsProps) {
	return (
		<Tabs groupId="config-format" items={['JSON', 'TOML', 'YAML']}>
			<Tab value="JSON">
				<Code
					code={JSON.stringify(config, null, 2)}
					codeblock={{ title: `${file}.json` }}
					lang="json"
				/>
			</Tab>

			<Tab value="TOML">
				<Code
					code={TOML.stringify(config)}
					codeblock={{ title: `${file}.toml` }}
					lang="toml"
				/>
			</Tab>

			<Tab value="YAML">
				<Code
					code={YAML.stringify(config, {
						defaultKeyType: 'PLAIN',
						defaultStringType: 'QUOTE_SINGLE',
					})}
					codeblock={{ title: `${file}.yml` }}
					lang="yaml"
				/>
			</Tab>
		</Tabs>
	);
}
