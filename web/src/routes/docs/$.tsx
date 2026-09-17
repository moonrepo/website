import { createFileRoute, notFound, redirect } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { flattenTree } from 'fumadocs-core/page-tree';
import { useFumadocsLoader } from 'fumadocs-core/source/client';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import {
	DocsBody,
	DocsDescription,
	DocsPage,
	DocsTitle,
} from 'fumadocs-ui/page';
import { Suspense } from 'react';
import browserCollections from '@/generated/browser';
import { baseOptions } from '@/lib/layout.shared';
import { docsSource } from '@/lib/source';
import { getMdxComponents } from '@/mdxComponents';

export const Route = createFileRoute('/docs/$')({
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
	.handler(async ({ data: slugs }) => {
		const page = docsSource.getPage(slugs);

		if (!page) {
			// No root index page, so send to the first page in the tree
			const firstPage = slugs.every((slug) => slug === '')
				? flattenTree(docsSource.getPageTree().children)[0]
				: undefined;

			if (firstPage) {
				throw redirect({ href: firstPage.url });
			}

			throw notFound();
		}

		return {
			path: page.path,
			pageTree: await docsSource.serializePageTree(docsSource.getPageTree()),
		};
	});

const clientLoader = browserCollections.docs.createClientLoader({
	id: 'docs',
	component({ toc, frontmatter, default: MDX }) {
		return (
			<DocsPage toc={toc}>
				<DocsTitle>{frontmatter.title}</DocsTitle>
				<DocsDescription>{frontmatter.description}</DocsDescription>
				<DocsBody>
					<MDX components={getMdxComponents()} />
				</DocsBody>
			</DocsPage>
		);
	},
});

function Page() {
	const data = useFumadocsLoader(Route.useLoaderData());

	return (
		<DocsLayout {...baseOptions()} tree={data.pageTree}>
			<Suspense>{clientLoader.useContent(data.path)}</Suspense>
		</DocsLayout>
	);
}
