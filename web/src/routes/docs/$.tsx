import { createFileRoute, notFound } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import type * as PageTree from 'fumadocs-core/page-tree';
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
import { source } from '@/lib/source';
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
	.inputValidator((slugs: string[]) => slugs)
	.handler(async ({ data: slugs }) => {
		const page = source.getPage(slugs);

		if (!page) {
			throw notFound();
		}

		return {
			path: page.path,
			pageTree: await source.serializePageTree(source.getPageTree()),
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

function transformPageTree(tree: PageTree.Folder): PageTree.Folder {
	function transform<T extends PageTree.Item | PageTree.Separator>(item: T) {
		if (typeof item.icon !== 'string') return item;

		return {
			...item,
			icon: (
				<span
					// biome-ignore lint/security/noDangerouslySetInnerHtml: allowed
					dangerouslySetInnerHTML={{
						__html: item.icon,
					}}
				/>
			),
		};
	}

	return {
		...tree,
		index: tree.index ? transform(tree.index) : undefined,
		children: tree.children.map((item) => {
			if (item.type === 'folder') {
				return transformPageTree(item);
			}

			return transform(item);
		}),
	};
}
