import {
	defineCollections,
	defineConfig,
	defineDocs,
} from 'fumadocs-mdx/config';
import { createGenerator, remarkAutoTypeTable } from 'fumadocs-typescript';

const generator = createGenerator();

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
	// schema: frontmatterSchema.extend({
	// 	author: z.string(),
	// 	date: z.iso.date().or(z.date()),
	// }),
});

export default defineConfig({
	mdxOptions: {
		remarkPlugins: [[remarkAutoTypeTable, { generator }]],
	},
});
