import { createFileRoute } from '@tanstack/react-router';
import { createSearchAPI } from 'fumadocs-core/search/server';
import { productSources } from '@/lib/source';

// Tagged by product, so results can be filtered with `?tag=moon`
const server = createSearchAPI('advanced', {
	language: 'english',
	indexes: Object.entries(productSources).flatMap(([product, source]) =>
		source.getPages().map((page) => ({
			id: page.url,
			url: page.url,
			title: page.data.title,
			description: page.data.description,
			structuredData: page.data.structuredData,
			tag: product,
		})),
	),
});

export const Route = createFileRoute('/api/search')({
	server: {
		handlers: {
			GET: async ({ request }) => server.GET(request),
		},
	},
});
