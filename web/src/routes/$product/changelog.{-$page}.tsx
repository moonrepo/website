import { heading, muted } from '@moonrepo/ui/layout/styles';
import { createFileRoute, notFound } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { ChangelogPagination, ChangelogTimeline } from '@/components/changelog';
import { SiteLayout } from '@/components/SiteLayout';
import { loadChangelog } from '@/lib/changelog';
import { isProduct, PRODUCT_THEMES, PRODUCTS } from '@/lib/products';

// Releases of a product, paginated, like `/moon/changelog/2`.
export const Route = createFileRoute('/$product/changelog/{-$page}')({
	component: Page,
	loader: async ({ params }) => {
		const page = params.page === undefined ? 1 : Number(params.page);

		if (!Number.isInteger(page) || page < 1) {
			throw notFound();
		}

		return {
			page,
			...(await serverLoader({ data: { page, product: params.product } })),
		};
	},
});

const serverLoader = createServerFn({
	method: 'GET',
})
	.validator((data: { page: number; product: string }) => data)
	.handler(async ({ data: { page, product } }) => {
		const changelog = isProduct(product)
			? await loadChangelog(product, page)
			: undefined;

		if (!changelog || changelog.entries.length === 0) {
			throw notFound();
		}

		return changelog;
	});

function Page() {
	const { product } = Route.useParams();
	const { entries, nextPage, page } = Route.useLoaderData();
	const title = isProduct(product) ? PRODUCTS[product].title : product;
	const href = (page: number) =>
		page > 1 ? `/${product}/changelog/${page}` : `/${product}/changelog`;

	return (
		<SiteLayout
			theme={isProduct(product) ? PRODUCT_THEMES[product] : undefined}
		>
			<div className="mx-auto flex w-full max-w-[900px] flex-col gap-10 px-6 py-14 md:px-12">
				<header>
					<h1 className={`${heading} text-4xl`}>{title} changelog</h1>
					<p className={`${muted} mt-3`}>
						Release notes for every version of {title}.
					</p>
				</header>
				<ChangelogTimeline
					entries={entries.map(({ date, html, ...entry }) => ({
						...entry,
						date: new Date(date),
						body: (
							// biome-ignore lint/security/noDangerouslySetInnerHtml: rendered from release notes on the server
							<div dangerouslySetInnerHTML={{ __html: html }} />
						),
					}))}
				/>
				<ChangelogPagination
					newer={page > 1 ? href(page - 1) : undefined}
					older={nextPage ? href(nextPage) : undefined}
				/>
			</div>
		</SiteLayout>
	);
}
