import { TypeTable } from 'fumadocs-ui/components/type-table';
import defaultComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { Callout } from '@/components/Callout';
// import { ConfigTabs } from '@/components/ConfigTabs';

export function getMdxComponents(components?: MDXComponents): MDXComponents {
	return {
		...defaultComponents,
		Callout,
		// ConfigTabs,
		TypeTable,
		...components,
	};
}
