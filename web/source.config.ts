import {
	defineCollections,
	defineConfig,
	defineDocs,
} from 'fumadocs-mdx/config';

export const docs = defineDocs({
	dir: 'content/docs',
});

export const blog = defineCollections({
	type: 'doc',
	dir: 'content/blog',
	// schema: frontmatterSchema.extend({
	// 	author: z.string(),
	// 	date: z.iso.date().or(z.date()),
	// }),
});

export default defineConfig();
