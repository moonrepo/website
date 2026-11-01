import { createFileRoute } from '@tanstack/react-router';
import { createSearchAPI } from 'fumadocs-core/search/server';
import { productSources } from '@/lib/source';

// Tagged by product, so results can be filtered with `?tag=moon`
const server = createSearchAPI('advanced', {
	language: 'english',
	// Content is lazy loaded (async mode), so indexes are built on first search
	indexes: () =>
		Promise.all(
			Object.entries(productSources).flatMap(([product, source]) =>
				source.getPages().map(async (page) => ({
					id: page.url,
					url: page.url,
					title: page.data.title,
					description: page.data.description,
					structuredData: await page.data.structuredData(),
					tag: product,
				})),
			),
		),
});

export const Route = createFileRoute('/api/search')({
	server: {
		handlers: {
			GET: async ({ request }) => server.GET(request),
		},
	},
});
