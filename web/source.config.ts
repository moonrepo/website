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
import { remarkRelativeLinks } from './src/lib/remarkRelativeLinks';
// Allows TypeScript to name zod types in the exported collections.
import type {} from 'zod';

const generator = createGenerator({
	cache: createFileSystemGeneratorCache('node_modules/.fuma/typescript'),
});

export const api = defineDocs({
	dir: 'content/api',
	docs: {
		postprocess: {
			includeProcessedMarkdown: true,
		},
	},
});

export const docs = defineDocs({
	dir: 'content/docs',
	docs: {
		postprocess: {
			includeProcessedMarkdown: true,
		},
	},
});

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
