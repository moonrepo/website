import { createSearchAPI, type SearchAPI } from 'fumadocs-core/search/server';
import { productSources } from '@/lib/source';

// Tagged by product, so results can be filtered with `?tag=moon`
export const searchServer: SearchAPI = createSearchAPI('advanced', {
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
