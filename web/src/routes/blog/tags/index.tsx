import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { BlogBackLink, BlogRecentPosts, BlogTagCards } from '@/components/blog';
import { BlogLayout } from '@/components/blog/layout';
import { getTags } from '@/lib/blog';
import { loadBlogPosts } from '@/lib/blogPosts';

export const Route = createFileRoute('/blog/tags/')({
	component: Page,
	loader: () => serverLoader(),
});

const serverLoader = createServerFn({
	method: 'GET',
}).handler(async () => {
	const posts = await loadBlogPosts();

	return { posts, tags: getTags(posts) };
});

function Page() {
	const { posts, tags } = Route.useLoaderData();

	return (
		<BlogLayout
			beforeTitle={<BlogBackLink href="/blog" />}
			sidebar={<BlogRecentPosts posts={posts} />}
			title="Tags"
		>
			<div className="px-6 pt-14 pb-16 md:px-12">
				<BlogTagCards className="max-w-[820px]" tags={tags} />
			</div>
		</BlogLayout>
	);
}
