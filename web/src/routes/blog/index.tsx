import { muted } from '@moonrepo/ui/layout/styles';
import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { BlogCards, BlogRecentPosts } from '@/components/blog';
import { BlogLayout } from '@/components/blog/layout';
import { loadBlogPosts } from '@/lib/blogPosts';

export const Route = createFileRoute('/blog/')({
	component: Page,
	loader: () => serverLoader(),
});

const serverLoader = createServerFn({
	method: 'GET',
}).handler(async () => ({ posts: await loadBlogPosts() }));

function Page() {
	const { posts } = Route.useLoaderData();

	return (
		<BlogLayout sidebar={<BlogRecentPosts posts={posts} />} title="Blog">
			<div className="px-6 pt-14 pb-16 md:px-12">
				{posts.length === 0 ? (
					<p className={muted}>No posts yet.</p>
				) : (
					<BlogCards posts={posts} />
				)}
			</div>
		</BlogLayout>
	);
}
