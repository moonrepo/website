import type { InferPageType } from 'fumadocs-core/source';
import type { docsSource } from '@/lib/source';

export async function getLlmText(page: InferPageType<typeof docsSource>) {
	const processed = await page.data.getText('processed');

	return `# ${page.data.title} (${page.url})

${processed}`;
}
