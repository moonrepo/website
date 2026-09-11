import {
	applyMdxPreset,
	defineCollections,
	defineConfig,
	defineDocs,
} from 'fumadocs-mdx/config';
import {
	createFileSystemGeneratorCache,
	createGenerator,
	remarkAutoTypeTable,
} from 'fumadocs-typescript';

const generator = createGenerator({
	cache: createFileSystemGeneratorCache('node_modules/.fuma/typescript'),
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
	// schema: frontmatterSchema.extend({
	// 	author: z.string(),
	// 	date: z.iso.date().or(z.date()),
	// }),
});

export default defineConfig({
	mdxOptions: applyMdxPreset({
		remarkPlugins: [[remarkAutoTypeTable, { generator }]],
	}),
});
