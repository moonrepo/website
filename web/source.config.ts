import {
	defineCollections,
	defineConfig,
	defineDocs,
} from 'fumadocs-mdx/config';
import {
	createFileSystemGeneratorCache,
	createGenerator,
	remarkAutoTypeTable,
} from 'fumadocs-typescript';
// Allows TypeScript to name zod types in the exported collections.
import type {} from 'zod';
import { blogPageSchema } from './src/lib/blog.ts';
import { remarkRelativeLinks } from './src/lib/remarkRelativeLinks.ts';

const generator = createGenerator({
	cache: createFileSystemGeneratorCache('node_modules/.fuma/typescript'),
});

// Each product has its own collection, containing `docs` and `api` sections
function defineProduct(product: string) {
	return defineDocs({
		dir: `content/${product}`,
		docs: {
			async: true,
			postprocess: {
				includeProcessedMarkdown: true,
			},
		},
	});
}

export const moon = defineProduct('moon');

export const proto = defineProduct('proto');

export const schematic = defineProduct('schematic');

export const wasm = defineProduct('wasm');

export const blog = defineCollections({
	type: 'doc',
	dir: 'content/blog',
	async: true,
	postprocess: {
		includeProcessedMarkdown: true,
	},
	schema: blogPageSchema,
});

export default defineConfig({
	mdxOptions: {
		remarkPlugins: [remarkRelativeLinks, [remarkAutoTypeTable, { generator }]],
	},
});
