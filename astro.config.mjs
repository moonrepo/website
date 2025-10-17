// @ts-check

import solidJs from '@astrojs/solid-js';
import starlight from '@astrojs/starlight';
// import starlightDocSearch from '@astrojs/starlight-docsearch';
import { defineConfig } from 'astro/config';
import starlightBlog from 'starlight-blog';
import starlightChangelogs, {
	makeChangelogsSidebarLinks,
} from 'starlight-changelogs';
import starlightLinksValidator from 'starlight-links-validator';
import starlightLlmsTxt from 'starlight-llms-txt';

// https://astro.build/config
export default defineConfig({
	site: 'https://moonrepo.dev',
	integrations: [
		starlight({
			title: 'exo',
			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/exo',
				},
				{
					icon: 'discord',
					label: 'Discord',
					href: 'https://discord.gg/qCh9MEynv2',
				},
				{
					icon: 'x.com',
					label: 'X',
					href: 'https://twitter.com/tothemoonrepo',
				},
			],
			sidebar: [
				{
					label: 'moon',
					items: [
						{
							label: 'Fundamentals',
							items: [
								'docs/moon/project',
								'docs/moon/task',
								'docs/moon/workspace',
							],
						},
						{
							label: 'Guides',
							autogenerate: { directory: 'docs/moon/guides' },
						},
						...makeChangelogsSidebarLinks([
							{
								type: 'all',
								base: 'moon/changelog',
								label: 'Changelog',
							},
						]),
					],
				},
			],
			plugins: [
				starlightBlog({
					authors: {
						miles: {
							name: 'Miles Johnson',
							url: 'https://github.com/milesj',
						},
					},
					metrics: {
						readingTime: true,
						words: 'total',
					},
					navigation: 'header-start',
					postCount: 10,
				}),
				starlightChangelogs(),
				// starlightDocSearch({
				// 	appId: 'YOUR_APP_ID',
				// 	apiKey: 'YOUR_SEARCH_API_KEY',
				// 	indexName: 'YOUR_INDEX_NAME',
				// }),
				starlightLinksValidator(),
				starlightLlmsTxt(),
			],
		}),
		solidJs({ devtools: false }),
	],
});
