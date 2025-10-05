import { defineCollection } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { blogSchema } from 'starlight-blog/schema';
import { changelogsLoader } from 'starlight-changelogs/loader';

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({ extend: (context) => blogSchema(context) }),
	}),
	changelogs: defineCollection({
		loader: changelogsLoader([
			{
				provider: 'github',
				owner: 'moonrepo',
				repo: 'moon',
				token: import.meta.env.GITHUB_TOKEN,
				base: 'moon/changelog',
			},
		]),
	}),
};
