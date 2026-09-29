import {
	defineCollections,
	defineConfig,
	defineDocs,
	frontmatterSchema,
} from 'fumadocs-mdx/config';
import {
	createFileSystemGeneratorCache,
	createGenerator,
	remarkAutoTypeTable,
} from 'fumadocs-typescript';
// Allows TypeScript to name zod types in the exported collections.
import type {} from 'zod';
import { remarkRelativeLinks } from './src/lib/remarkRelativeLinks.ts';

const generator = createGenerator({
	cache: createFileSystemGeneratorCache('node_modules/.fuma/typescript'),
});

// Each product has its own collection, containing `docs` and `api` sections
function defineProduct(product: string) {
	return defineDocs({
		dir: `content/${product}`,
		docs: {
			postprocess: {
				includeProcessedMarkdown: true,
			},
		},
	});
}

export const moon = defineProduct('moon');

export const proto = defineProduct('proto');

export const schematic = defineProduct('schematic');

export const blog = defineCollections({
	type: 'doc',
	dir: 'content/blog',
	schema: frontmatterSchema,
	// schema: frontmatterSchema.extend({
	// 	author: z.string(),
	// 	date: z.iso.date().or(z.date()),
	// }),
});

export default defineConfig({
	mdxOptions: {
		remarkPlugins: [remarkRelativeLinks, [remarkAutoTypeTable, { generator }]],
	},
});
