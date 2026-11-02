import type { BlogPost } from '@/lib/blog';
// Relative, since `vite.config.ts` imports this without path aliases
import { SITE_NAME, SITE_URL } from './meta.ts';

export const BLOG_FEED_PATH = '/blog/rss.xml';

export const BLOG_FEED_TITLE = `${SITE_NAME} blog`;

const BLOG_FEED_DESCRIPTION =
	'Release announcements, guides, and news from the moonrepo team.';

function escapeXml(value: string): string {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&apos;');
}

function tag(name: string, value: string | undefined): string {
	return value === undefined ? '' : `<${name}>${escapeXml(value)}</${name}>`;
}

/** RSS 2.0 feed of blog posts, newest first. */
export function renderBlogFeed(posts: BlogPost[]): string {
	const feedUrl = new URL(BLOG_FEED_PATH, SITE_URL).href;
	const latest = posts.find((post) => post.date)?.date;

	const items = posts.map((post) => {
		const url = new URL(post.url, SITE_URL).href;

		return [
			'<item>',
			tag('title', post.title),
			tag('link', url),
			`<guid isPermaLink="true">${escapeXml(url)}</guid>`,
			tag('description', post.description),
			tag('pubDate', post.date && new Date(post.date).toUTCString()),
			...post.authors.map((author) => tag('dc:creator', author.name)),
			...post.tags.map((t) => tag('category', t.name)),
			'</item>',
		].join('');
	});

	return [
		'<?xml version="1.0" encoding="UTF-8"?>',
		'<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">',
		'<channel>',
		tag('title', BLOG_FEED_TITLE),
		tag('link', new URL('/blog', SITE_URL).href),
		tag('description', BLOG_FEED_DESCRIPTION),
		tag('language', 'en'),
		`<atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml"/>`,
		tag('lastBuildDate', latest && new Date(latest).toUTCString()),
		...items,
		'</channel>',
		'</rss>',
	].join('\n');
}
