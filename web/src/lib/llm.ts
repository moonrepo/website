import type { InferPageType } from 'fumadocs-core/source';
import type { ProductSource } from '@/lib/source';

export async function getLlmText(page: InferPageType<ProductSource>) {
	const processed = await page.data.getText('processed');

	return `# ${page.data.title} (${page.url})

${processed}`;
}
