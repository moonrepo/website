import { createFileRoute, notFound } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { BlogBackLink, BlogCards, BlogRecentPosts } from '@/components/blog';
import { BlogLayout } from '@/components/blog/layout';
import { getTagPosts } from '@/lib/blog';
import { loadBlogPosts } from '@/lib/blogPosts';

export const Route = createFileRoute('/blog/tags/$tag')({
	component: Page,
	loader: ({ params }) => serverLoader({ data: params.tag }),
});

const serverLoader = createServerFn({
	method: 'GET',
})
	.validator((tag: string) => tag)
	.handler(async ({ data: slug }) => {
		const posts = await loadBlogPosts();
		const result = getTagPosts(posts, slug);

		if (!result) {
			throw notFound();
		}

		return { ...result, recent: posts };
	});

function Page() {
	const { posts, recent, tag } = Route.useLoaderData();

	return (
		<BlogLayout
			beforeTitle={<BlogBackLink href="/blog/tags">All tags</BlogBackLink>}
			sidebar={<BlogRecentPosts posts={recent} />}
			title={`Tagged “${tag.name}”`}
		>
			<div className="px-6 pt-14 pb-16 md:px-12">
				<BlogCards posts={posts} />
			</div>
		</BlogLayout>
	);
}
