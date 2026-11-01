import { githubReleases } from '@fumadocs/changelog/github';
import { rehypeCode } from 'fumadocs-core/mdx-plugins/rehype-code';
import { remarkGfm } from 'fumadocs-core/mdx-plugins/remark-gfm';
import { toHtml } from 'hast-util-to-html';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { CHANGELOG_REPOS, type Product } from '@/lib/products';

export interface ChangelogPage {
	entries: {
		date: string;
		html: string;
		id: string;
		title: string;
		url?: string;
	}[];
	nextPage?: number;
}

const processor = unified()
	.use(remarkParse)
	.use(remarkGfm)
	.use(remarkRehype)
	.use(rehypeCode, { fallbackLanguage: 'plaintext' });

async function renderMarkdown(content: string): Promise<string> {
	return toHtml(await processor.run(processor.parse(content)));
}

// Release notes are followed by cargo-dist's install and download
// instructions, which aren't relevant to a changelog
function stripReleaseBoilerplate(content: string): string {
	return content
		.replace(/^##\s+(Install|Download)\s[\s\S]*$/m, '')
		.replace(/^##\s+Release Notes\s*$/m, '')
		.trim();
}

const cache = new Map<string, Promise<ChangelogPage>>();

/** A page of a product's releases, newest first. Server only. */
export function loadChangelog(
	product: Product,
	page: number,
): Promise<ChangelogPage> | undefined {
	const repo = CHANGELOG_REPOS[product];

	if (!repo) {
		return;
	}

	const key = `${product}:${page}`;
	let result = cache.get(key);

	if (!result) {
		result = fetchChangelog(repo, page);
		// Don't cache failures, like hitting the rate limit
		result.catch(() => cache.delete(key));
		cache.set(key, result);
	}

	return result;
}

async function fetchChangelog(
	repo: { owner: string; repo: string },
	page: number,
): Promise<ChangelogPage> {
	const { entries, nextPage } = await githubReleases({
		...repo,
		page,
		perPage: 20,
		token: process.env.GITHUB_TOKEN,
	});

	return {
		entries: await Promise.all(
			entries.map(async (entry) => ({
				date: entry.date.toISOString(),
				html: await renderMarkdown(
					stripReleaseBoilerplate(entry.content ?? ''),
				),
				id: entry.id,
				// Releases are named by their version, like `2.6.5`, so use the tag
				title: entry.id,
				url: entry.url,
			})),
		),
		nextPage,
	};
}
