import { type BlogPost, getPosts, readingMinutes } from '@/lib/blog';
import { blogAuthors, blogSource } from '@/lib/source';

/** All posts, newest first, with their reading time. Server only. */
export async function loadBlogPosts(): Promise<BlogPost[]> {
	const pages = blogSource.getPages();
	const minutes = new Map(
		await Promise.all(
			pages.map(
				async (page) =>
					[page.url, readingMinutes(await page.data.getText('raw'))] as const,
			),
		),
	);

	return getPosts(pages, blogAuthors).map((post) => ({
		...post,
		minutes: minutes.get(post.url),
	}));
}
