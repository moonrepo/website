import { createFileRoute, notFound } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { DocsBody, DocsDescription, DocsTitle } from 'fumadocs-ui/page';
import { Suspense } from 'react';
import browserCollections from '@/generated/browser';
import { baseOptions } from '@/lib/layout.shared';
import { blogSource } from '@/lib/source';
import { getMdxComponents } from '@/mdxComponents';

export const Route = createFileRoute('/blog/$')({
	component: Page,
	loader: async ({ params }) => {
		const slugs = params._splat?.split('/') ?? [];
		const data = await serverLoader({ data: slugs });

		await clientLoader.preload(data.path);

		return data;
	},
});

const serverLoader = createServerFn({
	method: 'GET',
})
	.validator((slugs: string[]) => slugs)
	.handler(({ data: slugs }) => {
		const page = blogSource.getPage(slugs);

		if (!page) {
			throw notFound();
		}

		return {
			path: page.path,
		};
	});

const clientLoader = browserCollections.blog.createClientLoader({
	id: 'blog',
	component({ frontmatter, default: MDX }) {
		return (
			<article className="container max-w-(--fd-layout-width) mx-auto px-4 py-12">
				<DocsTitle>{frontmatter.title}</DocsTitle>
				<DocsDescription>{frontmatter.description}</DocsDescription>
				<DocsBody>
					<MDX components={getMdxComponents()} />
				</DocsBody>
			</article>
		);
	},
});

function Page() {
	const data = Route.useLoaderData();

	return (
		<HomeLayout {...baseOptions()}>
			<Suspense>{clientLoader.useContent(data.path)}</Suspense>
		</HomeLayout>
	);
}
