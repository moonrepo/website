export const SITE_NAME = 'moonrepo';

export const SITE_URL = 'https://moonrepo.dev';

export const SITE_DESCRIPTION =
	'Productivity tooling for developers and monorepos, from the build system moon, to the toolchain manager proto.';

const TWITTER_HANDLE = '@tothemoonrepo';

const MAX_DESCRIPTION_LENGTH = 160;

export interface SeoOptions {
	/** page title, without the site name */
	title?: string;
	description?: string;
	/** path of the page, like `/moon/docs/task`, for canonical and OG URLs */
	path: string;
	/** absolute or root-relative image URL, for social cards */
	image?: string;
	type?: 'website' | 'article';
	/** extra `article:*` or other OG meta, like `{ 'article:published_time': '...' }` */
	properties?: Record<string, string | undefined>;
}

/** Title, description, Open Graph, and Twitter tags for a route's `head()`. */
export function seo({
	title,
	description = SITE_DESCRIPTION,
	path,
	image,
	type = 'website',
	properties = {},
}: SeoOptions) {
	const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
	const url = new URL(path, SITE_URL).href;
	const imageUrl = image && new URL(image, SITE_URL).href;
	const text = truncate(description);

	const meta = [
		{ title: fullTitle },
		{ name: 'description', content: text },
		{ property: 'og:site_name', content: SITE_NAME },
		{ property: 'og:type', content: type },
		{ property: 'og:title', content: title ?? SITE_NAME },
		{ property: 'og:description', content: text },
		{ property: 'og:url', content: url },
		{
			name: 'twitter:card',
			content: imageUrl ? 'summary_large_image' : 'summary',
		},
		{ name: 'twitter:site', content: TWITTER_HANDLE },
		{ name: 'twitter:title', content: title ?? SITE_NAME },
		{ name: 'twitter:description', content: text },
	];

	if (imageUrl) {
		meta.push(
			{ property: 'og:image', content: imageUrl },
			{ name: 'twitter:image', content: imageUrl },
		);
	}

	for (const [property, content] of Object.entries(properties)) {
		if (content) meta.push({ property, content });
	}

	return { meta, links: [{ rel: 'canonical', href: url }] };
}

/**
 * Plain text of the first paragraph of processed markdown, for pages without
 * a `description` in their frontmatter.
 */
export function excerpt(markdown: string): string | undefined {
	const paragraph = markdown
		.split(/\n\s*\n/)
		.map((block) => block.trim())
		.find(
			(block) =>
				block && !/^(#|import |export |<|```|\||- |\* |\d+\. |>)/.test(block),
		);

	if (!paragraph) return;

	const text = paragraph
		.replace(/!?\[([^\]]*)\]\((<[^>]*>|[^)]*)\)/g, '$1')
		.replace(/[`*_]/g, '')
		.replace(/\s+/g, ' ')
		.trim();

	// Skip placeholders like `TODO`
	return text.length >= 40 ? text : undefined;
}

function truncate(text: string): string {
	if (text.length <= MAX_DESCRIPTION_LENGTH) return text;

	const cut = text.slice(0, MAX_DESCRIPTION_LENGTH - 1);

	return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
}
