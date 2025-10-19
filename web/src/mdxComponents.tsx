import { TypeTable } from 'fumadocs-ui/components/type-table';
import defaultComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';

export function getMdxComponents(components?: MDXComponents): MDXComponents {
	return {
		...defaultComponents,
		TypeTable,
		...components,
	};
}
