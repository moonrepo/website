import { type InferPageType, llms } from 'fumadocs-core/source';
import {
	type blogSource,
	type ProductSource,
	productSources,
} from '@/lib/source';

export async function getLlmText(
	page: InferPageType<ProductSource> | InferPageType<typeof blogSource>,
) {
	const processed = await page.data.getText('processed');

	return `# ${page.data.title} (${page.url})

${processed}`;
}

/** The `llms.txt` index of every product, with pages linked to their Markdown. */
export async function getLlmIndex(): Promise<string> {
	const indexes = await Promise.all(
		Object.values(productSources).map((source) =>
			llms(source, {
				// A page's Markdown is served at its URL with `.mdx`, see `start.ts`.
				// External links, like those to docs.rs, aren't pages and are kept.
				renderUrl: (item) =>
					source.getNodePage(item) ? `${item.url}.mdx` : item.url,
			}).index(),
		),
	);

	return indexes.join('\n\n');
}
