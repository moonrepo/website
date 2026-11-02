import { createFileRoute } from '@tanstack/react-router';
import { loadBlogPosts } from '@/lib/blogPosts';
import { renderBlogFeed } from '@/lib/rss';

export const Route = createFileRoute('/blog/rss.xml')({
	server: {
		handlers: {
			GET: async () =>
				new Response(renderBlogFeed(await loadBlogPosts()), {
					headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
				}),
		},
	},
});
