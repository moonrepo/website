import { useProductTheme } from '@moonrepo/ui/theme';
import { createFileRoute, notFound, redirect } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { flattenTree } from 'fumadocs-core/page-tree';
import { useFumadocsLoader } from 'fumadocs-core/source/client';
import type { CompiledMDXProperties } from 'fumadocs-mdx';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { getLayoutTabs } from 'fumadocs-ui/layouts/shared';
import { SearchTrigger } from 'fumadocs-ui/layouts/shared/slots/search-trigger';
import {
	DocsBody,
	DocsDescription,
	DocsPage,
	DocsTitle,
} from 'fumadocs-ui/page';
import { Suspense } from 'react';
import { SiteHeader } from '@/components/SiteHeader';
import browserCollections from '@/generated/browser';
import { baseOptions } from '@/lib/layout.shared';
import { isProduct, PRODUCT_THEMES, type Product } from '@/lib/products';
import { productSources } from '@/lib/source';
import { getMdxComponents } from '@/mdxComponents';

// Renders the `docs` and `api` sections of a product, for example,
// `/moon/docs/task` and `/moon/api/TaskConfig`.
export const Route = createFileRoute('/$product/$')({
	component: Page,
	loader: async ({ params }) => {
		const data = await serverLoader({
			data: {
				product: params.product,
				slugs: params._splat?.split('/').filter(Boolean) ?? [],
			},
		});

		await clientLoaders[data.product].preload(data.path);

		return data;
	},
});

const serverLoader = createServerFn({
	method: 'GET',
})
	.validator((data: { product: string; slugs: string[] }) => data)
	.handler(async ({ data: { product, slugs } }) => {
		if (!isProduct(product)) {
			throw notFound();
		}

		const source = productSources[product];
		const page = source.getPage(slugs);

		if (!page) {
			// Folders without an index page, like `/moon/api`,
			// send to the first page within the folder
			const prefix = `/${[product, ...slugs].join('/')}/`;
			const firstPage = flattenTree(source.getPageTree().children).find(
				(item) => item.url.startsWith(prefix),
			);

			if (firstPage) {
				throw redirect({ href: firstPage.url });
			}

			throw notFound();
		}

		return {
			product,
			path: page.path,
			pageTree: await source.serializePageTree(source.getPageTree()),
		};
	});

function renderContent({
	toc,
	frontmatter,
	default: MDX,
}: CompiledMDXProperties<{ title: string; description?: string }>) {
	return (
		<DocsPage toc={toc}>
			<DocsTitle>{frontmatter.title}</DocsTitle>
			<DocsDescription>{frontmatter.description}</DocsDescription>
			<DocsBody>
				<MDX components={getMdxComponents()} />
			</DocsBody>
		</DocsPage>
	);
}

const clientLoaders = {
	moon: browserCollections.moon.createClientLoader({
		id: 'moon',
		component: renderContent,
	}),
	proto: browserCollections.proto.createClientLoader({
		id: 'proto',
		component: renderContent,
	}),
	schematic: browserCollections.schematic.createClientLoader({
		id: 'schematic',
		component: renderContent,
	}),
} satisfies Record<Product, unknown>;

function Page() {
	const { product, path, pageTree } = useFumadocsLoader(Route.useLoaderData());
	const tabs = getLayoutTabs(pageTree);
	const themeClass = useProductTheme(PRODUCT_THEMES[product]);
	const base = baseOptions();

	return (
		<div className={themeClass}>
			<SiteHeader />
			<DocsLayout
				{...base}
				// Offset the sticky sidebar and TOC below the header on desktop,
				// while Fumadocs' own sub-navigation sticks on mobile
				containerProps={{
					className: 'md:[--fd-banner-height:var(--site-header-height)]',
				}}
				nav={{ ...base.nav, title: 'Documentation' }}
				// The header has its own search and theme toggle, so only keep
				// the small search trigger for the mobile sub-navigation
				slots={{ searchTrigger: { full: () => null, sm: SearchTrigger } }}
				// Only show the section switcher when there's more than 1 (docs, api)
				tabs={tabs.length > 1 ? tabs : false}
				themeSwitch={{ enabled: false }}
				tree={pageTree}
			>
				<Suspense>{clientLoaders[product].useContent(path)}</Suspense>
			</DocsLayout>
		</div>
	);
}
