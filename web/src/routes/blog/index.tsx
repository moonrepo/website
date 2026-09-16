import { createFileRoute, Link } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';
import { blogSource } from '@/lib/source';

export const Route = createFileRoute('/blog/')({
	component: Page,
	loader: () => serverLoader(),
});

const serverLoader = createServerFn({
	method: 'GET',
}).handler(() => ({
	posts: blogSource.getPages().map((page) => ({
		url: page.url,
		title: page.data.title,
		description: page.data.description,
	})),
}));

function Page() {
	const { posts } = Route.useLoaderData();

	return (
		<HomeLayout {...baseOptions()}>
			<main className="container max-w-(--fd-layout-width) mx-auto px-4 py-12">
				<h1 className="font-semibold text-3xl mb-8">Blog</h1>

				{posts.length === 0 ? (
					<p className="text-fd-muted-foreground">No posts yet.</p>
				) : (
					<div className="flex flex-col gap-4">
						{posts.map((post) => (
							<Link
								className="block rounded-lg border bg-fd-card p-4 transition-colors hover:bg-fd-accent"
								key={post.url}
								params={{ _splat: post.url.replace(/^\/blog\//, '') }}
								to="/blog/$"
							>
								<p className="font-medium">{post.title}</p>
								{post.description && (
									<p className="text-sm text-fd-muted-foreground">
										{post.description}
									</p>
								)}
							</Link>
						))}
					</div>
				)}
			</main>
		</HomeLayout>
	);
}
