import { useProductTheme } from '@moonrepo/ui/theme';
import { createFileRoute, notFound, redirect } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { flattenTree } from 'fumadocs-core/page-tree';
import { useFumadocsLoader } from 'fumadocs-core/source/client';
import type { CompiledMDXProperties } from 'fumadocs-mdx';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { Breadcrumb } from 'fumadocs-ui/layouts/docs/page/slots/breadcrumb';
import { SearchTrigger } from 'fumadocs-ui/layouts/shared/slots/search-trigger';
import {
	DocsBody,
	DocsDescription,
	DocsPage,
	DocsTitle,
} from 'fumadocs-ui/page';
import { Suspense } from 'react';
import { DocsSidebarTabs } from '@/components/DocsSidebarTabs';
import { PageActions } from '@/components/PageActions';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import browserCollections from '@/generated/browser';
import { readingMinutes } from '@/lib/blog';
import { baseOptions } from '@/lib/layout.shared';
import { excerpt, seo } from '@/lib/meta';
import {
	isProduct,
	PRODUCT_THEMES,
	PRODUCTS,
	type Product,
} from '@/lib/products';
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
	head: ({ loaderData }) =>
		loaderData
			? seo({
					title: docsTitle(loaderData.title, loaderData.product),
					description: loaderData.description,
					path: loaderData.url,
				})
			: {},
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
			title: page.data.title,
			description:
				page.data.description ??
				excerpt(await page.data.getText('processed')) ??
				PRODUCTS[product].description,
			minutes: readingMinutes(await page.data.getText('raw')),
			path: page.path,
			url: page.url,
			pageTree: await source.serializePageTree(source.getPageTree()),
		};
	});

function docsTitle(title: string, product: Product) {
	const name = PRODUCTS[product].title;

	return title === name ? `${name} docs` : `${title} - ${name}`;
}

interface ContentProps {
	/** path of the content file, relative to `web/content` */
	file: string;
	/** estimated reading time, see `readingMinutes()` */
	minutes: number;
	url: string;
}

function renderContent(
	{
		toc,
		frontmatter,
		default: MDX,
	}: CompiledMDXProperties<{ title: string; description?: string }>,
	{ file, minutes, url }: ContentProps,
) {
	return (
		<DocsPage breadcrumb={{ enabled: false }} toc={toc}>
			<div className="flex flex-row items-center gap-4">
				<Breadcrumb />
				<span className="ml-auto shrink-0 text-sm text-fd-muted-foreground">
					{minutes} min read
				</span>
			</div>
			<div className="border-b pb-6">
				<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
					<DocsTitle>{frontmatter.title}</DocsTitle>
					<PageActions className="shrink-0" file={file} url={url} />
				</div>
				<DocsDescription className="mt-4 mb-0">
					{frontmatter.description}
				</DocsDescription>
			</div>
			<DocsBody>
				<MDX components={getMdxComponents()} />
			</DocsBody>
		</DocsPage>
	);
}

const clientLoaders = {
	moon: browserCollections.moon.createClientLoader<ContentProps>({
		id: 'moon',
		component: renderContent,
	}),
	proto: browserCollections.proto.createClientLoader<ContentProps>({
		id: 'proto',
		component: renderContent,
	}),
	schematic: browserCollections.schematic.createClientLoader<ContentProps>({
		id: 'schematic',
		component: renderContent,
	}),
	wasm: browserCollections.wasm.createClientLoader<ContentProps>({
		id: 'wasm',
		component: renderContent,
	}),
} satisfies Record<Product, unknown>;

function Page() {
	const { minutes, product, path, pageTree, url } = useFumadocsLoader(
		Route.useLoaderData(),
	);
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
				// The product and section switchers are rendered in the banner,
				// since the built-in tabs can only switch between root folders
				// of the same page tree, and each product has its own
				sidebar={{
					banner: <DocsSidebarTabs product={product} tree={pageTree} />,
				}}
				// The header has its own search and theme toggle, so only keep
				// the small search trigger for the mobile sub-navigation
				slots={{ searchTrigger: { full: () => null, sm: SearchTrigger } }}
				tabs={false}
				themeSwitch={{ enabled: false }}
				tree={pageTree}
			>
				<Suspense>
					{clientLoaders[product].useContent(path, {
						file: `${product}/${path}`,
						minutes,
						url,
					})}
				</Suspense>
			</DocsLayout>
			<SiteFooter />
		</div>
	);
}
