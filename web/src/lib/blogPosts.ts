import { icons } from 'lucide-react';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { type BlogPost, getPosts, readingMinutes } from '@/lib/blog';
import { blogAuthors, blogSource } from '@/lib/source';

/** SVG markup of a Lucide icon name from frontmatter, like the docs sidebar. */
function renderIcon(name: string | undefined): string | undefined {
	if (!name) return;

	const Icon = icons[name as keyof typeof icons];
	if (!Icon) {
		console.warn(`[blog] Unknown icon in frontmatter: ${name}.`);
		return;
	}

	return renderToStaticMarkup(createElement(Icon));
}

/** All posts, newest first, with their reading time. Server only. */
export async function loadBlogPosts(): Promise<BlogPost[]> {
	const pages = blogSource.getPages();
	const meta = new Map(
		await Promise.all(
			pages.map(
				async (page) =>
					[
						page.url,
						{
							icon: renderIcon(page.data.icon),
							minutes: readingMinutes(await page.data.getText('raw')),
						},
					] as const,
			),
		),
	);

	return getPosts(pages, blogAuthors).map((post) => ({
		...post,
		...meta.get(post.url),
	}));
}
